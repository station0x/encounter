"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const getAddress = require('../../api-utils/getAddress');
const { ObjectId } = require('mongodb');
const CONSTANTS = require('../../constants');

function isAdmin(query) {
    return CONSTANTS.admins.includes(getAddress(query.signature))
}

module.exports = async (req, res) => {
    console.log(req.query)
    if(!isAdmin(req.query)) {
        res.json({success:false, error:"invalid: not admin"})
        return
    }
    const client = await clientPromise;
    const db = client.db()
    const players = db.collection("players")
    if(req.query.ban === 'true') {
        await players.update({address:req.query.address}, {$set: {
            banned:true,
            reason: req.query.reason
        }})
    } else if(req.query.ban === 'false') {
        await players.update({address:req.query.address}, {$unset: {
            banned:"",
            reason: ""
        }})
    }

   res.status(200).json({ success: true });
}