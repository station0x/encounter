"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');

module.exports = async (req, res) => {
    const client = await clientPromise;
    const db = client.db()
    const players = db.collection("players")
    const projection = { _id: 0, elo: 1, playerAlias: 1, address: 1, gm: 1 }
    // Sort then limit (MongoServer exec default behavior)
    // Old Implementation (Slower)
    // let playerDocs = await players.find({ elo: { "$gt": 1200 } }).sort({elo: -1}).toArray() 

    // playerDocs = playerDocs
    //     .map(v => {
    //         const player = {}
    //         player.elo = v.elo
    //         player.player = v.playerAlias && v.playerAlias.length > 0 ? v.playerAlias: v.address
    //         player.address = v.address
    //         player.gm = v.gm
    //         return player
    //     })

    // Deacrease time by 30% (benchmarked locally) (Iterate using cursor instead of await/ increasing batch size from 101 to 1000)
    let playerDocs = []
    await players.find({ elo: { "$gt": 1200 } }).project(projection).batchSize(1000).sort({elo: -1}).forEach(v => {
        let player = {}
        player.elo = v.elo
        player.player = v.playerAlias && v.playerAlias.length > 0 ? v.playerAlias: v.address
        player.address = v.address
        player.gm = v.gm
        playerDocs.push(player)
    })


    // Use aggregation pipeline instead of cursor-iterator to speed up querying (far massive docs only)
    // let playerDocs = []
    // await players.aggregate([ { $match: {elo: { "$gt": 1200}} }, { $sort: {elo: -1} } ]).forEach(v => {
    //     const player = {}
    //     player.elo = v.elo
    //     player.player = v.playerAlias && v.playerAlias.length > 0 ? v.playerAlias: v.address
    //     player.address = v.address
    //     player.gm = v.gm
    //     playerDocs.push(player)
    // })

    res.status(200).json({ success: true, leaderboard: playerDocs});
}