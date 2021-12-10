"use strict";
// Import the dependency.
const clientPromise = require('../api-utils/mongodb-client');

function validate(query) {
    if(!query.password || query.password !== process.env.ADMIN_PASSWORD) throw new Error('Admin password is wrong')
    if(!query.key || query.key.length < 8) throw new Error('Access key must be atleast 8 characters')
    if(!query.timesLeft || query.key.value < 1) throw new Error('Access keys cannot have zero values')
    return true
}

module.exports = async (req, res) => {
    console.log(req.query)
    // const address = getAddress(req.query.signature)
    if(!validate(req.query)) {
        res.json({success:false, error:"invalid"})
        return
    }
    const key = req.query.key
    const timesLeft = Number(req.query.timesLeft)

    const client = await clientPromise
    const db = client.db()
    const keys = db.collection("access_keys")
    const keyDoc = (await keys.find({key}).limit(1).toArray())[0];
    console.log(keyDoc)
    if(keyDoc) throw new Error('Key Already exists')

    await keys.insertOne({
        key,
        timesLeft
    })

    res.status(200).json({ success: true, key });
}
 