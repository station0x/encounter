"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const getAddress = require('../../api-utils/getAddress');
const { ObjectId } = require('mongodb');
const CONSTANTS = require('../../constants');
const {endTurn, dodgeMatch} = require('../../api-utils/match');
const { rowOccupied } = require('../../common/board');

module.exports = async (req, res) => {
    const client = await clientPromise;
    const db = client.db()
    const address = getAddress(req.query.signature)
    const matches = db.collection("matches")
    const players = db.collection("players")
    const matchDoc = (await matches.find({_id: new ObjectId(req.query.matchId)}).limit(1).toArray())[0];    console.log(matchDoc)
    if(!matchDoc) throw new Error("Match does not exist")
    if(matchDoc.winner) throw new Error("Match already ended")
    let playerNumber;
    if(matchDoc.player0 === address) playerNumber = 0
    if(matchDoc.player1 === address) playerNumber = 1
    if(playerNumber !== 0 && playerNumber !== 1) throw new Error("You are not a player in this match")
    if(matchDoc.playerTurn !== playerNumber) throw new Error("Not your turn")
    
    let newMatchStats = {...matchDoc}
    const pickingRound = matchDoc.pickingRound
    let playerInsertions = playerNumber === 0 ? matchDoc.player0PickingInsertions : matchDoc.player1PickingInsertions
    
    if(matchDoc.picking && playerInsertions < CONSTANTS.pickingInsertionsAllowedPerTurn) {
        // Dodge the game without penalty (for testing)
        let dodgerAddress = matchDoc.playerTurn === 0 ? matchDoc.player0 : player1
        dodgeMatch(newMatchStats, matches, dodgerAddress, players)
        await Promise.all([
            players.updateOne({address:matchDoc.player0}, {
                $unset:{activeMatch:""},
            }),
            players.updateOne({address:matchDoc.player1}, {
                $unset:{activeMatch:""}
            })
        ])
    } else {
        newMatchStats = endTurn(matchDoc, playerNumber)
        if(matchDoc.picking) {
            newMatchStats.pickingRound++
            if(playerNumber === 0) {
                newMatchStats.player0PickingInsertions = 0
                matchDoc.board[7] = matchDoc.board[7].map(col => {
                    if(!col.type) {
                        return col
                    }
                    col.canRemove = false
                    return col
                })
            } else {
                newMatchStats.player1PickingInsertions = 0
                newMatchStats.board[1] = newMatchStats.board[1].map(col => {
                    if(!col.type) {
                        return col
                    }
                    col.canRemove = false
                    return col
                })
            }
            if(rowOccupied(newMatchStats.board[1]) && rowOccupied(newMatchStats.board[7])) {
                newMatchStats.board[1] = newMatchStats.board[1].map(col => {
                    col.lastAttackTurn = 0
                    col.lastRepairTurn = 0
                    col.lastWarpTurn = 0
                    col.hp = CONSTANTS.spaceshipsAttributes[col.type].hp
                    return col
                })
                newMatchStats.board[7] = newMatchStats.board[7].map(col => {
                    col.lastAttackTurn = 0
                    col.lastRepairTurn = 0
                    col.lastWarpTurn = 0
                    col.hp = CONSTANTS.spaceshipsAttributes[col.type].hp
                    return col
                })
                newMatchStats.picking = false
                newMatchStats.board = newMatchStats.board
                .map(row => row.map(col => {
                    if(!col.type) {
                        return col
                    }
                    
                    col.lastAttackTurn = 0
                    col.lastRepairTurn = 0
                    col.lastWarpTurn = 0
         
                    col.hp = CONSTANTS.spaceshipsAttributes[col.type].hp
                    return col
                }))
                newMatchStats.initialBoard = newMatchStats.board
            }
        }
        await matches.updateOne({_id:matchDoc._id}, {
            $set:newMatchStats
        })
    }
    res.status(200).json({ success: true });
}
 