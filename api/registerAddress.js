"use strict";
// Import the dependency.
const clientPromise = require('../api-utils/mongodb-client');
const getAddress = require('../api-utils/getAddress');
const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {
    const address = getAddress(req.query.signature)
    const key = req.query.key

   const client = await clientPromise;
   const db = client.db()
   const players = db.collection("players")
   const accessKeys = db.collection("access_keys")
   const playerDoc = (await players.find({address}).limit(1).toArray())[0]
   const accessKey = (await accessKeys.find({key}).limit(1).toArray())[0]

   if(!accessKey || accessKey.timesLeft === 0) throw new Error('Access key not valid')

   let inviteLink;
   if(!playerDoc) { // player document doesn't exist, let's create one
      inviteLink = new ObjectId();
      await players.insertOne({
         address,
         playerAlias: '',
         matchHistory:[],
         lastSeenTimestamp: Date.now(),
         inviteLink,
         accessKey: key
      })
      
      accessKey.timesLeft -= 1
      await accessKeys.updateOne({key}, {
        $set:{timesLeft: accessKey.timesLeft}
    })
   } else if(playerDoc && !playerDoc.accessKey) {
      await players.updateOne({address}, {
         $set:{accessKey: key}
      })
      
      accessKey.timesLeft -= 1
      await accessKeys.updateOne({key}, {
        $set:{timesLeft: accessKey.timesLeft}
    })

   } else throw new Error('Address already registered')
   res.status(200).json({ sucess: true });
}