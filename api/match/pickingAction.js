"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const getAddress = require('../../api-utils/getAddress');
const { ObjectId } = require('mongodb');
const CONSTANTS = require('../../constants');
const { isOccupied } = require('../../common/board')


module.exports = async (req, res) => {
    console.log('picking action fired')
    const client = await clientPromise;
    const db = client.db()
    const address = getAddress(req.query.signature)
    const spaceshipType = req.query.spaceshipType
    const posX = req.query.posX
    const action = req.query.action
    const matches = db.collection("matches")
    const matchDoc = (await matches.find({_id:ObjectId(req.query.matchId)}).limit(1).toArray())[0];
    if(!matchDoc) throw new Error("Match does not exist")
    if(!matchDoc.picking) throw new Error("Picking is over!")

    const board = matchDoc.board
    if(matchDoc.winner) throw new Error("Match already ended")
    let playerNumber;
    if(matchDoc.player0 === address) playerNumber = 0
    if(matchDoc.player1 === address) playerNumber = 1
    if(playerNumber !== 0 && playerNumber !== 1) throw new Error("You are not a player in this match")
    if(matchDoc.playerTurn !== playerNumber) throw new Error("Not your turn")
    if(Date.now() - matchDoc.lastTurnTimestamp > CONSTANTS.pickingTurnTimeout * 1000) throw new Error("Picking turn timeout ended")

    const to = {
        x: posX,
        y: playerNumber === 0 ? 7 : 1
    }
    const playerInsertions = playerNumber === 0 ? matchDoc.player0PickingInsertions : matchDoc.player1PickingInsertions

    if(action === "insert") {
        let newMatchStats = {...matchDoc}
        const pickingInsertionsAllowedPerTurn = CONSTANTS.pickingInsertionsAllowedPerTurn
        if(isOccupied(board, to.x, to.y)) throw new Error("Destination is already occupied")
        if(playerInsertions >= pickingInsertionsAllowedPerTurn)  throw new Error("Player reached maximum picks")

        // Insert Piece into board
        newMatchStats.board[to.y][to.x] = {
            type: spaceshipType,
            owner: playerNumber,
            canRemove: true
        }

        if(playerNumber === 0) newMatchStats.player0PickingInsertions++
        else newMatchStats.player1PickingInsertions++
        await matches.updateOne({_id:matchDoc._id}, {
            $set:newMatchStats
        })
    } else if(action === "remove") {
        let newMatchStats = {...matchDoc}
        if(!isOccupied(board, to.x, to.y)) throw new Error("Destination is not occupied")
        if(playerInsertions === 0)  throw new Error("There's no picks to remove from")

        // Remove Piece from board
        newMatchStats.board[to.y][to.x] = {}

        if(playerNumber === 0) newMatchStats.player0PickingInsertions--
        else newMatchStats.player1PickingInsertions--
        await matches.updateOne({_id:matchDoc._id}, {
            $set:newMatchStats
        })
    }
    
    res.status(200).json({ success: true });
}