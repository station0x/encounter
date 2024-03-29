// TO-DO: Board initialization needs to be modular and imported from one file to here and create match by inviation
"use strict";
const CONSTANTS = require('../../constants')
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const getAddress = require('../../api-utils/getAddress');
const { ObjectId  } = require('mongodb');

module.exports = async (req, res) => {
   const client = await clientPromise;
   const db = client.db()
   const address = getAddress(req.query.signature)
   const players = db.collection("players")
   let playerDoc = (await players.find({address}).limit(1).toArray())[0]
   if(playerDoc.banned === true) throw new Error("Player is banned")
   if(playerDoc.activeMatch) throw new Error("Player already in match")
   const matchmakingQueue = db.collection("matchmaking_queue")
   let enqueued = await matchmakingQueue.count()

   if(enqueued > 0) {
       const enemyAddress = (await matchmakingQueue.find().limit(1).toArray())[0].address
       let enemyDoc = (await players.find({address:enemyAddress}).limit(1).toArray())[0]

       if(enemyDoc.activeMatch) {
        await matchmakingQueue.deleteOne({address: enemyAddress})
        await matchmakingQueue.insertOne({address})
        res.status(200).json({ success:true });
        return
       }
       if(playerDoc.address === enemyDoc.address) throw new Error("player can't play against himself")

        // Dequeue enemy
        await matchmakingQueue.deleteOne({address: enemyAddress})

       const matches = db.collection("matches")
       const board = CONSTANTS.initialBoardState.map(row => row.map(col => {
           if(!col.type) {
               return col
           }
           
           col.lastAttackTurn = 0
           col.lastRepairTurn = 0
           col.lastWarpTurn = 0

           col.hp = CONSTANTS.spaceshipsAttributes[col.type].hp
           return col
       }))
       const result = await matches.insertOne({
           type:"matchmaking",
           player0: enemyDoc.address,
           player1: playerDoc.address,
           fuel0: CONSTANTS.initFuel,
           fuel1: CONSTANTS.initFuel,
           turnNum: 1,
           playerTurn: Math.floor(Math.random() * 2),
           lastTurnTimestamp: Date.now(),
           winner: undefined,
           history: [],
           chat: [],
           log: [],
           logsIndex: 0,
           initialBoard: board,
           board,
           picking: true,
           player0PickingInsertions: 0,
           player1PickingInsertions: 0,
           pickingRound: 0,
           dodged: false
       })
       const id = result.insertedId
   
       await players.updateOne({_id:playerDoc._id}, {
           $set:{activeMatch: id, inviteLink: new ObjectId()}
       })
   
       await players.updateOne({_id:enemyDoc._id}, {
           $set:{activeMatch: id, inviteLink: new ObjectId()}
       })

   } else {
        await matchmakingQueue.insertOne({
            address
        })
   }
   res.status(200).json({ success:true });

}