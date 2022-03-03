"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');

module.exports = async (req, res) => {
    const client = await clientPromise;
    const db = client.db()
    const players = db.collection("players")
    let playerDocs = await players.find({ elo: { "$gt": 1200 } }).sort({elo: -1}).toArray()

    playerDocs = playerDocs
        .map(v => {
            const player = {}
            player.elo = v.elo
            player.player = v.playerAlias && v.playerAlias.length > 0 ? v.playerAlias: v.address
            player.address = v.address
            player.gm = v.gm
            player.banned = v.banned
            return player
        })
        .filter(v => !v.banned)

    res.status(200).json({ success: true, leaderboard: playerDocs });
}