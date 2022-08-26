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
    if(!isAdmin(req.query)) {
        res.json({success:false, error:"invalid: not admin"})
        return
    }
    const client = await clientPromise;
    const db = client.db()
    let firstMatchDocId = await db.collection("matches").findOne();
    firstMatchDocId = firstMatchDocId._id
    
   res.status(200).json({ firstMatchDocId, success: true });
}