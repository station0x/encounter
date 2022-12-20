"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const getAddress = require('../../api-utils/getAddress');
const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {
    const client = await clientPromise;
    const db = client.db()
    const players = db.collection("players")
    const matches = db.collection("matches")
    const address = getAddress(req.query.signature)
    
    // get caller active match
    let callerDoc = (await players.find({address: address}).limit(1).toArray())[0]
    let callerMatchId = callerDoc.activeMatch
    if(!callerMatchId || callerMatchId.length === 0) throw new Error('Player has no running matches')
    
    const matchDoc = (await matches.find({_id:ObjectId(callerMatchId)}).limit(1).toArray())[0];

    if(!matchDoc) throw new Error("Match does not exist")
    if(matchDoc.winner) throw new Error("Match already ended")

    let playerNumber;
    if(matchDoc.player0 === address) playerNumber = 0
    if(matchDoc.player1 === address) playerNumber = 1
    if(playerNumber !== 0 && playerNumber !== 1) throw new Error("You are not a player in this match")

    if(matchDoc.dodged && matchDoc.winner === null) {
        // Remove matchID
        await players.updateOne({address:address}, {
            $unset:{activeMatch:""},
        }),
        res.status(200).json({ success: true });
    } else throw new Error('Not stuck! Match already running')

}