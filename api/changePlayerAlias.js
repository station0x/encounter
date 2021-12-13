"use strict";
// Import the dependency.
const clientPromise = require('../api-utils/mongodb-client');
const getAddress = require('../api-utils/getAddress');
const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {
    const address = getAddress(req.query.signature)
    const alias = req.query.alias

   const client = await clientPromise;
   const db = client.db()
   const players = db.collection("players")
   const playerDoc = (await players.find({address}).limit(1).toArray())[0]

   if(!playerDoc) throw new Error('No player with this address')

    await players.updateOne({address},{
        $set:{playerAlias: alias}
    })

   res.status(200).json({ sucess: true });
}