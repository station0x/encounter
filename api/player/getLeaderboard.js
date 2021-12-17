"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');

module.exports = async (req, res) => {
    const client = await clientPromise;
    const db = client.db()
    const players = db.collection("players")
    let playerDocs = await players.find().toArray()

    playerDocs = playerDocs
        .map(v => {
            const player = {}
            player.elo = v.elo === undefined ? 1200 : v.elo
            player.player = v.playerAlias && v.playerAlias.length > 0 ? v.playerAlias: v.address
            player.gm = v.gm
            return player
        })
        .filter(v => v.elo > 1200)

    res.status(200).json({ success: true, leaderboard: playerDocs });
}