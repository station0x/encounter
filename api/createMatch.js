"use strict";
// Import the dependency.
const clientPromise = require('../api-utils/mongodb-client');
const getAddress = require('../api-utils/getAddress');
const { ObjectId } = require('mongodb');

const LINK_EXPIRY_DURATION = 60 * 60 * 1000 // 1 hour

module.exports = async (req, res) => {
   const client = await clientPromise;
   const db = client.db()
   const address = getAddress(req.query.signature)
   const players = db.collection("players")
   const playerDoc = (await players.find({address}).limit(1).toArray())[0];
   let inviteLink;
   if(!playerDoc) { // player document doesn't exist, let's create one
      inviteLink = new ObjectId();
      await players.insertOne({
         address,
         matchHistory:[],
         lastSeenTimestamp: Date.now(),
         inviteLink
      })
   } else {
      if(playerDoc.activeMatch) throw new Error("player already in match")
      const timestamp = playerDoc.inviteLink.getTimestamp().getTime()
      if(Date.now() - timestamp > LINK_EXPIRY_DURATION) {
         inviteLink = new ObjectId();
         await players.updateOne({address}, {
            $set:{inviteLink}
         })
      } else {
         inviteLink = playerDoc.inviteLink
      }

   }
   res.status(200).json({ inviteLink });

}