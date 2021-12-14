"use strict";
const CONSTANTS = require('../../constants.json')
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const getAddress = require('../../api-utils/getAddress');
const { ObjectId  } = require('mongodb');

module.exports = async (req, res) => {
   const client = await clientPromise;
   const db = client.db()
   const address = getAddress(req.query.signature)

   const matchmakingQueue = db.collection("matchmaking_queue")

    const matchmakingDoc = (await matchmakingQueue.find({address}).limit(1).toArray())[0]

    if(!matchmakingDoc) throw new Error("player not in queue")

    // Dequeue enemy
    await matchmakingQueue.deleteOne({address})

   res.status(200).json({ success:true })
}