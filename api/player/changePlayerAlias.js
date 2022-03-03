"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const getAddress = require('../../api-utils/getAddress');
const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {
    const address = getAddress(req.query.signature)
    let alias = req.query.alias
    if(!alias || alias.trim().length === 0) throw new Error("No alias provided")
    alias = alias.trim()
   const client = await clientPromise;
   const db = client.db()
   const players = db.collection("players")
   const playerDocByAddress = (await players.find({address}).limit(1).toArray())[0]
   if(playerDocByAddress.banned === true) throw new Error("Player is banned")
   const playerDocByAlias = (await players.find({playerAlias:alias}).limit(1).toArray())[0]

   if(!playerDocByAddress) throw new Error('No player with this address')
   if(playerDocByAlias) {
    res.status(200).json({ success: false, error: "Name not available" });
    return
   }

    await players.updateOne({address},{
        $set:{playerAlias: alias}
    })

   res.status(200).json({ success: true });
}