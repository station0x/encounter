"use strict";
// Import the dependency.
const clientPromise = require('../api-utils/mongodb-client');
const getAddress = require('../api-utils/getAddress');
const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {
   const client = await clientPromise;
   const db = client.db()
   const address = getAddress(req.query.signature)
   const players = db.collection("players")
   const playerDoc = (await players.find({address}).limit(1).toArray())[0];
   let response = {success: false}
   if(playerDoc.accessKey !== undefined) {
      response = {
         success: true,
         address
      } 
   }
   res.status(200).json({ response });
}