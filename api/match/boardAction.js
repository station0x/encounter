"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const getAddress = require('../../api-utils/getAddress');
const { ObjectId } = require('mongodb');
const CONSTANTS = require('../../constants.json');
const {endMatch, updateFuel, endTurn} = require('../../api-utils/match')
const {isOccupied, isLegalMove, isOurPiece, isLegalAttack, isLegalRepair, canMakeAction, checkPlayerUnarmed} = require('../../common/board')


module.exports = async (req, res) => {
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
    [newMatchStats, fuel] = updateFuel(newMatchStats, playerNumber, fromAttributes.moveFuelCost)

    // Update Match History
    newMatchStats.history.push({from: {x: from.x, y: from.y}, to: {x: to.x, y: to.y}, action, playerNumber})

    if(fuel === 0) { // if remaining fuel is 0, automatically end turn
        newMatchStats = endTurn(newMatchStats, playerNumber)
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
        const type = newMatchStats.board[to.y][to.x].type
        newMatchStats.board[to.y][to.x] = {}
        // if base is destroyed, end game
        if(type === "base") { // game ended
            newMatchStats = await endMatch(newMatchStats, db.collection("players"), playerNumber)
        } else {
            // if all enemy spaceships are destroyed except the base (end the game)
            if(checkPlayerUnarmed(newMatchStats.board, playerNumber)) {
                newMatchStats = await endMatch(newMatchStats, db.collection("players"), playerNumber)
            }
        }
    }

    // Update fuel
    [newMatchStats, fuel] = updateFuel(newMatchStats, playerNumber, fromAttributes.attackFuelCost)

    // Update Last turn used
    newMatchStats.board[from.y][from.x].lastAttackTurn = newMatchStats.turnNum

    // Update Match History
    newMatchStats.history.push({from: {x: from.x, y: from.y}, to, action, playerNumber})

    // Update game log
    newMatchStats.log.push({index: matchDoc.logsIndex, playerNo: playerNumber, action: 'attack', fromPiece: newMatchStats.board[from.y][from.x], toPiece: newMatchStats.board[to.y][to.x]})

    // Increase Logs Index
    newMatchStats.logsIndex++

    if(fuel === 0) { // if remaining fuel is 0, automatically end turn
        newMatchStats = endTurn(newMatchStats, playerNumber)
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
    [newMatchStats, fuel] = updateFuel(newMatchStats, playerNumber, fromAttributes.repairFuelCost)

    // Update Last turn used
    newMatchStats.board[from.y][from.x].lastRepairTurn = newMatchStats.turnNum

    // Update Match History
    newMatchStats.history.push({from: {x: from.x, y: from.y}, to: {x: to.x, y: to.y}, action, playerNumber})

    // Update game log
    newMatchStats.log.push({index: matchDoc.logsIndex, playerNo: playerNumber, action: 'repair', fromPiece: newMatchStats.board[from.y][from.x], toPiece: newMatchStats.board[to.y][to.x]})

    // Increase Logs Index
    newMatchStats.logsIndex++
    
    if(fuel === 0) { // if remaining fuel is 0, automatically end turn
        newMatchStats = endTurn(newMatchStats, playerNumber)
    }

    await matches.updateOne({_id:matchDoc._id}, {
        $set:newMatchStats
    })
   }
   res.status(200).json({ success: true });
}