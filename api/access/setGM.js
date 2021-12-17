"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');

function validate(query) {
    if(!query.password || query.password !== process.env.ADMIN_PASSWORD) throw new Error('Admin password is wrong')
    if(!query.address) throw new Error('Player address not provided')
    return true
}

module.exports = async (req, res) => {
    if(!validate(req.query)) {
        res.json({success:false, error:"invalid"})
        return
    }
    const address = req.query.address

    const client = await clientPromise
    const db = client.db()
    const players = db.collection("players")

    await players.updateOne({address}, {
        $set:{gm: true}
     })

    res.status(200).json({ success: true });
}
 