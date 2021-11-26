"use strict";
// Import the dependency.
const clientPromise = require('../api-utils/mongodb-client');
const getAddress = require('../api-utils/getAddress');
const { ObjectId, Timestamp } = require('mongodb');
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
module.exports = async (req, res) => {
   const client = await clientPromise;
   const db = client.db()
   const address = getAddress(req.query.signature)
   const from = JSON.parse(req.query.from);
   const to = JSON.parse(req.query.to);
   const matches = db.collection("matches")
   const matchDoc = (await matches.find({_id:ObjectId(req.query.matchId)}).limit(1).toArray())[0];
   if(!matchDoc) throw new Error("Match does not exist")
   const board = matchDoc.board;
   if(matchDoc.winner) throw new Error("Match already ended")
   let playerNumber;
   if(matchDoc.player0 === address) playerNumber = 0
   if(matchDoc.player1 === address) playerNumber = 1
   if(playerNumber !== 0 && playerNumber !== 1) throw new Error("You are not a player in this match")
   if(matchDoc.playerTurn !== playerNumber) throw new Error("Not your turn")
   if(!isOccupied(board, from.x, from.y)) throw new Error("Source is not occupied")
   if(!isOurPiece(board, playerNumber, from.x, from.y)) throw new Error("Not your piece")
   let fuel = playerNumber === 0? matchDoc.fuel0: matchDoc.fuel1
   const fromAttributes = CONSTANTS.spaceshipsAttributes[board[from.y][from.x].type]

   if(req.query.action === "move") {
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
    if(fuel === 0) { // if remaining fuel is 0, automatically end turn
        newMatchStats.playerTurn = newMatchStats.playerTurn === 0 ? 1 : 0
        if(playerNumber === 0) {
            newMatchStats.fuel1 += Math.min(newMatchStats.fuel1 + CONSTANTS.fuelPerTurn, CONSTANTS.maxFuel)
        } else if(playerNumber === 1) {
            newMatchStats.fuel0 += Math.min(newMatchStats.fuel0 + CONSTANTS.fuelPerTurn, CONSTANTS.maxFuel)
        }
    }

    await matches.updateOne({_id:matchDoc._id}, {
        $set:newMatchStats
    })
   } else if(req.query.action === "attack") {
    if(!isOccupied(board, to.x, to.y)) throw new Error("Destination is not occupied")
    if(!isLegalAttack(board, from.x, from.y, to.x, to.y)) throw new Error("Illegal attack")
    if(!fromAttributes.attackFuelCost || fuel < fromAttributes.attackFuelCost) throw new Error("Insufficient fuel to attack")

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
            await Promise.all([
                players.updateOne({address:newMatchStats.player0}, {
                    $unset:{activeGame:""}
                }),
                players.updateOne({address:newMatchStats.player1}, {
                    $unset:{activeGame:""}
                })
            ])
        }
    }
    // Update fuel
    fuel -= fromAttributes.attackFuelCost;
    if(playerNumber === 0) {
        newMatchStats.fuel0 = fuel
    } else if(playerNumber === 1) {
        newMatchStats.fuel1 = fuel
    }
    if(fuel === 0) { // if remaining fuel is 0, automatically end turn
        newMatchStats.playerTurn = newMatchStats.playerTurn === 0 ? 1 : 0
        if(playerNumber === 0) {
            newMatchStats.fuel1 += Math.min(newMatchStats.fuel1 + CONSTANTS.fuelPerTurn, CONSTANTS.maxFuel)
        } else if(playerNumber === 1) {
            newMatchStats.fuel0 += Math.min(newMatchStats.fuel0 + CONSTANTS.fuelPerTurn, CONSTANTS.maxFuel)
        }
    }

    await matches.updateOne({_id:matchDoc._id}, {
        $set:newMatchStats
    })
   } else if(req.query.action === "repair") {
    if(!isOccupied(board, to.x, to.y)) throw new Error("Destination is not occupied")
    if(!isLegalRepair(board, from.x, from.y, to.x, to.y)) throw new Error("Illegal repair")
    if(!fromAttributes.repairFuelCost || fuel < fromAttributes.repairFuelCost) throw new Error("Insufficient fuel to repair")

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
    if(fuel === 0) { // if remaining fuel is 0, automatically end turn
        newMatchStats.playerTurn = newMatchStats.playerTurn === 0 ? 1 : 0
        if(playerNumber === 0) {
            newMatchStats.fuel1 += Math.min(newMatchStats.fuel1 + CONSTANTS.fuelPerTurn, CONSTANTS.maxFuel)
        } else if(playerNumber === 1) {
            newMatchStats.fuel0 += Math.min(newMatchStats.fuel0 + CONSTANTS.fuelPerTurn, CONSTANTS.maxFuel)
        }
    }

    await matches.updateOne({_id:matchDoc._id}, {
        $set:newMatchStats
    })
   }
   res.status(200).json({ success: true });
}