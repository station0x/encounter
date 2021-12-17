"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const getAddress = require('../../api-utils/getAddress');

module.exports = async (req, res) => {
   const client = await clientPromise;
   const db = client.db()
   const address = getAddress(req.query.signature)
   const players = db.collection("players")

   const playerDoc = (await players.find({address}).limit(1).toArray())[0];
    let matchId
   if(playerDoc) { // player document doesn't exist, let's create one
    matchId = playerDoc.activeMatch
   }
   res.status(200).json({ matchId });

}