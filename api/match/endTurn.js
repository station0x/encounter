"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const getAddress = require('../../api-utils/getAddress');
const { ObjectId } = require('mongodb');
const CONSTANTS = require('../../constants.json');


module.exports = async (req, res) => {
    const client = await clientPromise;
    const db = client.db()
    const address = getAddress(req.query.signature)
    const matches = db.collection("matches")
    const matchDoc = (await matches.find({_id:ObjectId(req.query.matchId)}).limit(1).toArray())[0];
    if(!matchDoc) throw new Error("Match does not exist")
    if(matchDoc.winner) throw new Error("Match already ended")
    let playerNumber;
    if(matchDoc.player0 === address) playerNumber = 0
    if(matchDoc.player1 === address) playerNumber = 1
    if(playerNumber !== 0 && playerNumber !== 1) throw new Error("You are not a player in this match")
    if(matchDoc.playerTurn !== playerNumber) throw new Error("Not your turn")

    let newMatchStats = {...matchDoc}
    newMatchStats.playerTurn = newMatchStats.playerTurn === 0 ? 1 : 0
    if(playerNumber === 0) {
        newMatchStats.fuel1 = Math.min(newMatchStats.fuel1 + CONSTANTS.fuelPerTurn, CONSTANTS.maxFuel)
    } else if(playerNumber === 1) {
        newMatchStats.fuel0 = Math.min(newMatchStats.fuel0 + CONSTANTS.fuelPerTurn, CONSTANTS.maxFuel)
    }
    // Update Match History
    newMatchStats.history.push({from: {}, to: {}, action: 'endTurn', playerNumber})

    // Increment Turn Number
    newMatchStats.turnNum = newMatchStats.turnNum + 1

    // Update last turn timestamp
    newMatchStats.lastTurnTimestamp = Date.now()

    await matches.updateOne({_id:matchDoc._id}, {
        $set:newMatchStats
    })

    res.status(200).json({ success: true });
}
 