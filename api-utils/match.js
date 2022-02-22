const CONSTANTS = require('../constants');
var Elo = require( 'elo-js' );
var elo = new Elo();

async function endMatch(matchDoc, players, winner) {
    const newMatchDoc = {...matchDoc}
    newMatchDoc.winner = winner

    // player docs getters
    let player0Doc = (await players.find({address:newMatchDoc.player0}).limit(1).toArray())[0]
    let player1Doc = (await players.find({address:newMatchDoc.player1}).limit(1).toArray())[0]

    let newPlayer0Stats = {...player0Doc}
    newPlayer0Stats.matchHistory.push(newMatchDoc._id)

    let newPlayer1Stats = {...player1Doc}
    newPlayer1Stats.matchHistory.push(newMatchDoc._id)


    if(newMatchDoc.type === "matchmaking") {
        // Elo calculation and update
        newPlayer0Stats.elo = newPlayer0Stats.elo === undefined ? 1200 : newPlayer0Stats.elo
        newPlayer1Stats.elo = newPlayer1Stats.elo === undefined ? 1200 : newPlayer1Stats.elo

        if(newMatchDoc.winner === 0) {
            newPlayer0Stats.elo = elo.ifWins(newPlayer0Stats.elo, newPlayer1Stats.elo)
            newPlayer1Stats.elo = elo.ifLoses(newPlayer1Stats.elo, newPlayer0Stats.elo)
        } else {
            newPlayer1Stats.elo = elo.ifWins(newPlayer1Stats.elo, newPlayer0Stats.elo)
            newPlayer0Stats.elo = elo.ifLoses(newPlayer0Stats.elo, newPlayer1Stats.elo)
        }

        // Win streak update
        newPlayer0Stats.winStreak = newPlayer0Stats.winStreak === undefined ? 0 : newPlayer0Stats.winStreak
        newPlayer1Stats.winStreak = newPlayer1Stats.winStreak === undefined ? 0 : newPlayer1Stats.winStreak
        if(newMatchDoc.winner === 0) {
            newPlayer0Stats.winStreak = Math.min(newPlayer0Stats.winStreak + 1, 5)
            newPlayer1Stats.winStreak = 0
        } else {
            newPlayer1Stats.winStreak = Math.min(newPlayer1Stats.winStreak + 1, 5)
            newPlayer0Stats.winStreak = 0
        }

    }
    
    // Remove matchID
    await Promise.all([
        players.updateOne({address:newMatchDoc.player0}, {
            $unset:{activeMatch:""},
        }),
        players.updateOne({address:newMatchDoc.player1}, {
            $unset:{activeMatch:""}
        })
    ])
    
    delete newPlayer0Stats.activeMatch
    delete newPlayer1Stats.activeMatch

    await Promise.all([
        players.updateOne({address:newMatchDoc.player0}, {
            $set:newPlayer0Stats
        }),
        
        players.updateOne({address:newMatchDoc.player1}, {
            $set:newPlayer1Stats
        })
    ])

    // Calculate rewards
    if(newMatchDoc.type === "matchmaking") {
        let winnerDoc = winner === 0 ? newPlayer0Stats : newPlayer1Stats;
        let halfRewards = Math.floor((winnerDoc.elo / 100)**2)
        let sanRewards = 0;

        if(winnerDoc.winStreak === 5) {
            sanRewards = Math.floor((winnerDoc.elo / 10)*2)
            winnerDoc.winStreak = 0;
        }

        if(winnerDoc.elo >= CONSTANTS.economicPolicy.minRewardsElo) {
            await players.updateOne({address: winnerDoc.address}, {
                $inc:{"rewards.HALF": halfRewards, "rewards.SAN": sanRewards },
                $set: { winStreak: winnerDoc.winStreak }
            })
        }
        newMatchDoc.potentialRewards = {
            "HALF": halfRewards
        }

        if(sanRewards > 0) {
            newMatchDoc.potentialRewards.SAN = sanRewards
        }
    }
    return newMatchDoc
}

function updateFuel(matchDoc, playerNumber, cost) {
    let fuel = playerNumber === 0? matchDoc.fuel0: matchDoc.fuel1
    const newMatchDoc = {...matchDoc}
    fuel -= cost;
    if(playerNumber === 0) {
        newMatchDoc.fuel0 = fuel
    } else if(playerNumber === 1) {
        newMatchDoc.fuel1 = fuel
    }
    return [newMatchDoc, fuel]
}

function endTurn(matchDoc, playerNumber) {
    const newMatchDoc = {...matchDoc}
    newMatchDoc.playerTurn = newMatchDoc.playerTurn === 0 ? 1 : 0
    // Push to history
    newMatchDoc.history.push({from: {}, to: {}, action: 'endTurn', playerNumber})
    // Increment Turn Number
    newMatchDoc.turnNum = newMatchDoc.turnNum + 1
    // Update last turn timestamp
    newMatchDoc.lastTurnTimestamp = Date.now()
    // Update pick turn if in picking mode
    if(matchDoc.picking) newMatchDoc.pickingRound = newMatchDoc.pickingRound + 1
    if(playerNumber === 0) {
        newMatchDoc.fuel1 = Math.min(newMatchDoc.fuel1 + CONSTANTS.fuelPerTurn, CONSTANTS.maxFuel)
    } else if(playerNumber === 1) {
        newMatchDoc.fuel0 = Math.min(newMatchDoc.fuel0 + CONSTANTS.fuelPerTurn, CONSTANTS.maxFuel)
    }
    return newMatchDoc
}

async function dodgeMatch(matchDoc, matches) {
    const newMatchDoc = {...matchDoc}
    if(!newMatchDoc.dodged) {
        newMatchDoc.dodged = true
        newMatchDoc.board = newMatchDoc.board.map(row => row.map(col => {
            if(!col.type) {
                return col
            }
            
            col.lastAttackTurn = 0
            col.lastRepairTurn = 0
            col.lastWarpTurn = 0
    
            col.hp = CONSTANTS.spaceshipsAttributes[col.type].hp
            return col
        }))
    } 
    await matches.updateOne({_id:matchDoc._id}, {
        $set:newMatchDoc
    })

    return newMatchDoc
}

module.exports = {
    endMatch,
    updateFuel,
    endTurn,
    dodgeMatch
}