const CONSTANTS = require('../constants.json');
var Elo = require( 'elo-js' );
var elo = new Elo();

async function endMatch(matchDoc, players, winner) {
    const newMatchDoc = {...matchDoc}
    newMatchDoc.winner = winner
    let player0Doc = (await players.find({address:newMatchDoc.player0}).limit(1).toArray())[0]
    let player1Doc = (await players.find({address:newMatchDoc.player1}).limit(1).toArray())[0]

    let newPlayer0Stats = {...player0Doc}
    newPlayer0Stats.matchHistory.push(newMatchDoc._id)

    let newPlayer1Stats = {...player1Doc}
    newPlayer1Stats.matchHistory.push(newMatchDoc._id)

    if(newMatchDoc.type === "matchmaking") {
        newPlayer0Stats.elo = newPlayer0Stats.elo === undefined ? 1200 : newPlayer0Stats.elo
        newPlayer1Stats.elo = newPlayer1Stats.elo === undefined ? 1200 : newPlayer1Stats.elo

        if(newMatchDoc.winner === 0) {
            newPlayer0Stats.elo = elo.ifWins(newPlayer0Stats.elo, newPlayer1Stats.elo)
            newPlayer1Stats.elo = elo.ifLoses(newPlayer1Stats.elo, newPlayer0Stats.elo)
        } else {
            newPlayer1Stats.elo = elo.ifWins(newPlayer1Stats.elo, newPlayer0Stats.elo)
            newPlayer0Stats.elo = elo.ifLoses(newPlayer0Stats.elo, newPlayer1Stats.elo)
        }
    }
    
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
    if(playerNumber === 0) {
        newMatchDoc.fuel1 = Math.min(newMatchDoc.fuel1 + CONSTANTS.fuelPerTurn, CONSTANTS.maxFuel)
    } else if(playerNumber === 1) {
        newMatchDoc.fuel0 = Math.min(newMatchDoc.fuel0 + CONSTANTS.fuelPerTurn, CONSTANTS.maxFuel)
    }
    return newMatchDoc
}

module.exports = {
    endMatch,
    updateFuel,
    endTurn
}