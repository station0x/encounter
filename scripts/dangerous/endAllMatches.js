(async function() {
    const dotenv = require("dotenv")

    dotenv.config()

    const clientPromise = require('../../api-utils/mongodb-client');
    const client = await clientPromise;
    const db = client.db()

    const matches = db.collection("matches")
    const players = db.collection("players")

    await matches.deleteMany({winner: { $type: 10 }})
    await players.updateMany({activeMatch: {$exists: true}}, {$unset:{activeMatch:""}})

    process.exit()
}())
