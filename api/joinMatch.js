"use strict";
const CONSTANTS = require('../constants.json')
// Import the dependency.
const clientPromise = require('../api-utils/mongodb-client');
const getAddress = require('../api-utils/getAddress');
const { ObjectId  } = require('mongodb');

const LINK_EXPIRY_DURATION = 60 * 60 * 1000 // 1 hour

module.exports = async (req, res) => {
   const client = await clientPromise;
   const db = client.db()
   const address = getAddress(req.query.signature)
   const players = db.collection("players")
   const enemyDoc = (await players.find({inviteLink:ObjectId(req.query.inviteLink)}).limit(1).toArray())[0];
   if(!enemyDoc) throw new Error("Invite link not found")
   else {
    if(enemyDoc.activeMatch) throw new Error("enemy already in match")
    const timestamp = ObjectId(req.query.inviteLink).getTimestamp().getTime()
    if((Date.now() - timestamp > LINK_EXPIRY_DURATION)) throw new Error("Invite link expired")
   }
   let playerDoc = (await players.find({address}).limit(1).toArray())[0];
   let inviteLink;
   if(!playerDoc) { // player document doesn't exist, let's create one
      inviteLink = new ObjectId();
      playerDoc = {
        address,
        matchHistory:[],
        lastSeenTimestamp: Date.now(),
        inviteLink
     }

      await players.insertOne(playerDoc)
   }

    if(playerDoc.address === enemyDoc.address) throw new Error("player can't play against himself")
    if(playerDoc.activeMatch) throw new Error("player already in match")
    const matches = db.collection("matches")
    const board = CONSTANTS.initialBoardState.map(row => row.map(col => {
        if(!col.type) {
            return col
        }

        col.lastAttackTurn = 0
        col.lastRepairTurn = 0

        col.hp = CONSTANTS.spaceshipsAttributes[col.type].hp
        return col
    }))
    const result = await matches.insertOne({
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
        board
    })
    const id = result.insertedId

    await players.updateOne({_id:playerDoc._id}, {
        $set:{activeMatch: id}
    })

    await players.updateOne({_id:enemyDoc._id}, {
        $set:{activeMatch: id}
    })

   res.status(200).json({ success:true });

}