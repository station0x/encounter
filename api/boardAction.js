"use strict";
// Import the dependency.
const clientPromise = require('../api-utils/mongodb-client');
const getAddress = require('../api-utils/getAddress');
const { ObjectId } = require('mongodb');
const CONSTANTS = require('../constants.json');

function isOccupied(board, x, y) {
    return board[y][x].type ? true : false
}

function legalMoves(board, x, y) {
    const isEven = y % 2  == 0
    let legalMoves = [
        { x, y: y - 1 },
        { x: x + 1, y: y - 1 },
        { x: x + 1, y },
        { x: x + 1, y: y + 1 },
        { x, y: y + 1 },
        { x: x - 1, y } 
    ]
    if(isEven) {
        legalMoves[0].x -= 1;
        legalMoves[1].x -= 1;
        legalMoves[3].x -= 1;
        legalMoves[4].x -= 1;
    }
    return legalMoves
        .filter(move => {
        const minX = 0
        const minY = 0
        const maxY = board.length-1
        const maxX = board[0].length-1
        return move.x >= minX && move.x <= maxX && move.y >= minY && move.y <= maxY
        })
      .filter(move => !isOccupied(board, move.x, move.y))
}

function isLegalMove(board, selectedX, selectedY, moveX, moveY) {
    return legalMoves(board, selectedX, selectedY).filter(move => move.x === moveX && move.y === moveY).length > 0
}

function isOurPiece(board, playerNumber, x, y) {
    return board[y][x].owner === playerNumber;
}

function isEnemyPiece(board, playerNumber, x ,y) {
    return board[y][x].owner !== playerNumber
}

function isMyPiece(board, playerNumber, x ,y) {
    return board[y][x].owner === playerNumber
}

function canMakeAction(action, board, x, y, turnNum) {
    if(action === 'attack') {
        return board[y][x].lastAttackTurn !== turnNum
    } else if(action === 'repair') {
        return board[y][x].lastRepairTurn !== turnNum
    }
    return false
}

function legalAttacks(board, x, y) {
    const type = board[y][x].type
    const attack = CONSTANTS.spaceshipsAttributes[type].attack
    if(!attack) return []
    const isEven = y % 2  == 0
    let legalMoves = [
        { x, y: y - 1 },
        { x: x + 1, y: y - 1 },
        { x: x + 1, y },
        { x: x + 1, y: y + 1 },
        { x, y: y + 1 },
        { x: x - 1, y } 
    ]
    if(isEven) {
        legalMoves[0].x -= 1;
        legalMoves[1].x -= 1;
        legalMoves[3].x -= 1;
        legalMoves[4].x -= 1;
    }
    const playerNumber = board[y][x].owner;
    return legalMoves
    .filter(move => {
        const minX = 0
        const minY = 0
        const maxY = board.length-1
        const maxX = board[0].length-1
        return move.x >= minX && move.x <= maxX && move.y >= minY && move.y <= maxY
    })
    .filter(move => isOccupied(board, move.x, move.y))
    .filter(move => isEnemyPiece(board, playerNumber, move.x, move.y))
}

function legalRepairs(board, x, y) {
    const type = board[y][x].type
    const repairPercent = CONSTANTS.spaceshipsAttributes[type].repairPercent
    if(!repairPercent) return []
    const isEven = y % 2  == 0
    let legalMoves = [
        { x, y: y - 1 },
        { x: x + 1, y: y - 1 },
        { x: x + 1, y },
        { x: x + 1, y: y + 1 },
        { x, y: y + 1 },
        { x: x - 1, y } 
    ]
    if(isEven) {
        legalMoves[0].x -= 1;
        legalMoves[1].x -= 1;
        legalMoves[3].x -= 1;
        legalMoves[4].x -= 1;
    }
    const playerNumber = board[y][x].owner;
    return legalMoves
    .filter(move => {
        const minX = 0
        const minY = 0
        const maxY = board.length-1
        const maxX = board[0].length-1
        return move.x >= minX && move.x <= maxX && move.y >= minY && move.y <= maxY
    })
    .filter(move => isOccupied(board, move.x, move.y))
    .filter(move => board[move.y][move.x].type !== "base")
    .filter(move => isMyPiece(board, playerNumber, move.x, move.y))
    .filter(move => board[move.y][move.x].hp < CONSTANTS.spaceshipsAttributes[board[move.y][move.x].type].hp)
}

function isLegalAttack(board, selectedX, selectedY, x, y) {
    return legalAttacks(board, selectedX, selectedY).filter(move => move.x === x && move.y === y).length > 0
}

function isLegalRepair(board, selectedX, selectedY, x, y) {
    return legalRepairs(board, selectedX, selectedY).filter(move => move.x === x && move.y === y).length > 0
}

function CheckPlayerUnarmed(board, playerNo) {
    for(let i = 0; i<board.length; i++) {
        for(let j = 0; j<board[i].length; j++) {
            const piece = board[i][j]
            if(piece.type && piece.owner !== playerNo && piece.type !== 'base' && piece.type !== 'carrier') {
                return false
            }
        }
    }
    return true
}

module.exports = async (req, res) => {
    console.log(req.query)
   const client = await clientPromise;
   const db = client.db()
   const address = getAddress(req.query.signature)
   const from = JSON.parse(req.query.from)
   const to = JSON.parse(req.query.to)
   const action = req.query.action
   const matches = db.collection("matches")
   const matchDoc = (await matches.find({_id:ObjectId(req.query.matchId)}).limit(1).toArray())[0];
   if(!matchDoc) throw new Error("Match does not exist")
   const board = matchDoc.board
   if(matchDoc.winner) throw new Error("Match already ended")
   let playerNumber;
   if(matchDoc.player0 === address) playerNumber = 0
   if(matchDoc.player1 === address) playerNumber = 1
   if(playerNumber !== 0 && playerNumber !== 1) throw new Error("You are not a player in this match")
   if(matchDoc.playerTurn !== playerNumber) throw new Error("Not your turn")
   if(Date.now() - matchDoc.lastTurnTimestamp > CONSTANTS.turnTimeout * 1000) throw new Error("Turn timeout ended")
   if(!isOccupied(board, from.x, from.y)) throw new Error("Source is not occupied")
   if(!isOurPiece(board, playerNumber, from.x, from.y)) throw new Error("Not your piece")

   let fuel = playerNumber === 0? matchDoc.fuel0: matchDoc.fuel1
   const fromAttributes = CONSTANTS.spaceshipsAttributes[board[from.y][from.x].type]

   if(action === "move") {
    if(isOccupied(board, to.x, to.y)) throw new Error("Destination is already occupied")
    if(!isLegalMove(board, from.x, from.y, to.x, to.y)) throw new Error("Illegal move")
    if(!fromAttributes.moveFuelCost || fuel < fromAttributes.moveFuelCost) throw new Error("Insufficient fuel to move")

    // Move Piece
    let newMatchStats = {...matchDoc}
    newMatchStats.board[to.y][to.x] = newMatchStats.board[from.y][from.x]
    newMatchStats.board[from.y][from.x] = {}

    // Update fuel
    fuel -= fromAttributes.moveFuelCost;
    if(playerNumber === 0) {
        newMatchStats.fuel0 = fuel
    } else if(playerNumber === 1) {
        newMatchStats.fuel1 = fuel
    }

    // Update Match History
    newMatchStats.history.push({from: {x: from.x, y: from.y}, to: {x: to.x, y: to.y}, action, playerNumber})

    if(fuel === 0) { // if remaining fuel is 0, automatically end turn
        newMatchStats.playerTurn = newMatchStats.playerTurn === 0 ? 1 : 0
        // Push to history
        newMatchStats.history.push({from: {}, to: {}, action: 'endTurn', playerNumber})
        // Increment Turn Number
        newMatchStats.turnNum = newMatchStats.turnNum + 1
        // Update last turn timestamp
        newMatchStats.lastTurnTimestamp = Date.now()
        if(playerNumber === 0) {
            newMatchStats.fuel1 = Math.min(newMatchStats.fuel1 + CONSTANTS.fuelPerTurn, CONSTANTS.maxFuel)
        } else if(playerNumber === 1) {
            newMatchStats.fuel0 = Math.min(newMatchStats.fuel0 + CONSTANTS.fuelPerTurn, CONSTANTS.maxFuel)
        }
    }

    await matches.updateOne({_id:matchDoc._id}, {
        $set:newMatchStats
    })
   } else if(action === "attack") {
    if(!isOccupied(board, to.x, to.y)) throw new Error("Destination is not occupied")
    if(!isLegalAttack(board, from.x, from.y, to.x, to.y)) throw new Error("Illegal attack")
    if(!fromAttributes.attackFuelCost || fuel < fromAttributes.attackFuelCost) throw new Error("Insufficient fuel to attack")
    if(!canMakeAction(action, board, from.x, from.y, matchDoc.turnNum)) throw new Error('Piece already made an action in this turn')

    let newMatchStats = {...matchDoc}
    const attack = CONSTANTS.spaceshipsAttributes[newMatchStats.board[from.y][from.x].type].attack
    if(!attack) return
    const hp = newMatchStats.board[to.y][to.x].hp
    const newHp = hp - attack;
    if(newHp > 0) {
        newMatchStats.board[to.y][to.x].hp = newHp
    } else {
        // if base is destroyed, end game
        const type = newMatchStats.board[to.y][to.x].type
        newMatchStats.board[to.y][to.x] = {}
        if(type === "base") { // game ended
            newMatchStats.winner = playerNumber
            const players = db.collection("players")
            let player0Doc = (await players.find({address:matchDoc.player0}).limit(1).toArray())[0]
            let player1Doc = (await players.find({address:matchDoc.player1}).limit(1).toArray())[0]
            let newPlayer0Stats = {...player0Doc}
            newPlayer0Stats.matchHistory.push(ObjectId(req.query.matchId))
            let newPlayer1Stats = {...player1Doc}
            newPlayer1Stats.matchHistory.push(ObjectId(req.query.matchId))
            await Promise.all([
                players.updateOne({address:newMatchStats.player0}, {
                    $unset:{activeMatch:""},
                }),
                players.updateOne({address:newMatchStats.player1}, {
                    $unset:{activeMatch:""}
                })
            ])
            
            delete newPlayer0Stats.activeMatch
            delete newPlayer1Stats.activeMatch
        
            await Promise.all([
                players.updateOne({address:newMatchStats.player0}, {
                    $set:newPlayer0Stats
                }),
                
                players.updateOne({address:newMatchStats.player1}, {
                    $set:newPlayer1Stats
                })
            ])
        } else {
            // if all enemy spaceships are destroyed except the base (end the game)
            if(CheckPlayerUnarmed(newMatchStats.board, playerNumber)) {
                newMatchStats.winner = playerNumber
                const players = db.collection("players")
                let player0Doc = (await players.find({address:matchDoc.player0}).limit(1).toArray())[0]
                let player1Doc = (await players.find({address:matchDoc.player1}).limit(1).toArray())[0]
                let newPlayer0Stats = {...player0Doc}
                newPlayer0Stats.matchHistory.push(ObjectId(req.query.matchId))
                let newPlayer1Stats = {...player1Doc}
                newPlayer1Stats.matchHistory.push(ObjectId(req.query.matchId))
                await Promise.all([
                    players.updateOne({address:newMatchStats.player0}, {
                        $unset:{activeMatch:""},
                    }),
                    players.updateOne({address:newMatchStats.player1}, {
                        $unset:{activeMatch:""}
                    })
                ])
                
                delete newPlayer0Stats.activeMatch
                delete newPlayer1Stats.activeMatch
            
                await Promise.all([
                    players.updateOne({address:newMatchStats.player0}, {
                        $set:newPlayer0Stats
                    }),
                    
                    players.updateOne({address:newMatchStats.player1}, {
                        $set:newPlayer1Stats
                    })
                ])
            }
        }
    }

    // Update fuel
    fuel -= fromAttributes.attackFuelCost;
    if(playerNumber === 0) {
        newMatchStats.fuel0 = fuel
    } else if(playerNumber === 1) {
        newMatchStats.fuel1 = fuel
    }

    // Update Last turn used
    newMatchStats.board[from.y][from.x].lastAttackTurn = newMatchStats.turnNum

    // Update Match History
    newMatchStats.history.push({from: {x: from.x, y: from.y}, to, action, playerNumber})

    // Update game log
    newMatchStats.log.push({index: matchDoc.logsIndex, playerNo: playerNumber, action: 'attack', fromPiece: newMatchStats.board[from.y][from.x], toPiece: newMatchStats.board[to.y][to.x]})

    // Increase Logs Index
    newMatchStats.logsIndex++

    if(fuel === 0) { // if remaining fuel is 0, automatically end turn
        newMatchStats.playerTurn = newMatchStats.playerTurn === 0 ? 1 : 0
        // Push to history
        newMatchStats.history.push({from: {}, to: {}, action: 'endTurn', playerNumber})
        // Increment Turn Number
        newMatchStats.turnNum = newMatchStats.turnNum + 1
        // Update last turn timestamp
        newMatchStats.lastTurnTimestamp = Date.now()
        if(playerNumber === 0) {
            newMatchStats.fuel1 = Math.min(newMatchStats.fuel1 + CONSTANTS.fuelPerTurn, CONSTANTS.maxFuel)
        } else if(playerNumber === 1) {
            newMatchStats.fuel0 = Math.min(newMatchStats.fuel0 + CONSTANTS.fuelPerTurn, CONSTANTS.maxFuel)
        }
    }

    await matches.updateOne({_id:matchDoc._id}, {
        $set:newMatchStats
    })
   } else if(action === "repair") {
    if(!isOccupied(board, to.x, to.y)) throw new Error("Destination is not occupied")
    if(!isLegalRepair(board, from.x, from.y, to.x, to.y)) throw new Error("Illegal repair")
    if(!fromAttributes.repairFuelCost || fuel < fromAttributes.repairFuelCost) throw new Error("Insufficient fuel to repair")
    if(!canMakeAction(action, board, from.x, from.y, matchDoc.turnNum)) throw new Error('Piece already made an action in this turn')

    let newMatchStats = {...matchDoc}
    const maxHp = CONSTANTS.spaceshipsAttributes[newMatchStats.board[to.y][to.x].type].hp
    const repairPercent = CONSTANTS.spaceshipsAttributes[newMatchStats.board[from.y][from.x].type].repairPercent
    if(!repairPercent) return
    const hp = newMatchStats.board[to.y][to.x].hp
    const newHp = Math.min(Math.floor(hp + (maxHp / 100 * repairPercent)), maxHp);
    newMatchStats.board[to.y][to.x].hp = newHp

    // Update fuel
    fuel -= fromAttributes.repairFuelCost;
    if(playerNumber === 0) {
        newMatchStats.fuel0 = fuel
    } else if(playerNumber === 1) {
        newMatchStats.fuel1 = fuel
    }

    // Update Last turn used
    newMatchStats.board[from.y][from.x].lastRepairTurn = newMatchStats.turnNum

    // Update Match History
    newMatchStats.history.push({from: {x: from.x, y: from.y}, to: {x: to.x, y: to.y}, action, playerNumber})

    // Update game log
    newMatchStats.log.push({index: matchDoc.logsIndex, playerNo: playerNumber, action: 'repair', fromPiece: newMatchStats.board[from.y][from.x], toPiece: newMatchStats.board[to.y][to.x]})

    // Increase Logs Index
    newMatchStats.logsIndex++
    
    if(fuel === 0) { // if remaining fuel is 0, automatically end turn
        newMatchStats.playerTurn = newMatchStats.playerTurn === 0 ? 1 : 0
        // Push to history
        newMatchStats.history.push({from: {}, to: {}, action: 'endTurn', playerNumber})
        // Increment Turn Number
        newMatchStats.turnNum = newMatchStats.turnNum + 1
        // Update last turn timestamp
        newMatchStats.lastTurnTimestamp = Date.now()
        if(playerNumber === 0) {
            newMatchStats.fuel1 = Math.min(newMatchStats.fuel1 + CONSTANTS.fuelPerTurn, CONSTANTS.maxFuel)
        } else if(playerNumber === 1) {
            newMatchStats.fuel0 = Math.min(newMatchStats.fuel0 + CONSTANTS.fuelPerTurn, CONSTANTS.maxFuel)
        }
    }

    await matches.updateOne({_id:matchDoc._id}, {
        $set:newMatchStats
    })
   }
   res.status(200).json({ success: true });
}