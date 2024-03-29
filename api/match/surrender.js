"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const getAddress = require('../../api-utils/getAddress');
const { ObjectId } = require('mongodb');
const CONSTANTS = require('../../constants');
const {endMatch} = require('../../api-utils/match')

module.exports = async (req, res) => {
    const client = await clientPromise;
    const db = client.db()
    const address = getAddress(req.query.signature)
    const matches = db.collection("matches")
    const matchDoc = (await matches.find({_id:ObjectId(req.query.matchId)}).limit(1).toArray())[0]
    const players = db.collection("players")
    if(!matchDoc) throw new Error("Match does not exist")
    if(matchDoc.winner) throw new Error("Match already ended")
    let player0Doc = (await players.find({address:matchDoc.player0}).limit(1).toArray())[0]
    let player1Doc = (await players.find({address:matchDoc.player1}).limit(1).toArray())[0]
    let playerNumber;
    if(matchDoc.player0 === address) playerNumber = 0
    if(matchDoc.player1 === address) playerNumber = 1
    if(playerNumber !== 0 && playerNumber !== 1) throw new Error("You are not a player in this match")

    let newMatchStats = {...matchDoc}
    const winner = playerNumber === 0 ? 1 : 0

    newMatchStats = await endMatch(newMatchStats, db.collection("players"), winner)

    await matches.updateOne({_id:matchDoc._id}, {
        $set:newMatchStats
    })

    res.status(200).json({ success: true });
}
 