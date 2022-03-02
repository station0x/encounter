"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const { ObjectId } = require('mongodb');

function getHoursAndMins(mins) {
    let num = mins
    let hours = (num/60)
    let rhours = Math.floor(hours)
    let minutes = (hours - rhours) * 60
    let rminutes = Math.round(minutes)
    return ('0' + rhours).slice(-2) + ":" + ('0' + rminutes).slice(-2) + ':00'
}

module.exports = async (req, res) => {
    const client = await clientPromise;
    const address = req.query.address
    const db = client.db()
    const matches = db.collection("matches")
    const players = db.collection("players")
    let allMatches = await matches.find({$or: [ {player0: address}, {player1: address} ], winner: {$ne: null} }).toArray()

    const enemyAddresses = allMatches.reduce((set, match) => {
        let enemyIs = match.player0 === address ? 1 : 0
        let enemyAddress = enemyIs === 0 ? match.player0 : match.player1
        set.add(enemyAddress)
        return set
    }, new Set())

    const aliases = (await Promise.all(Array.from(enemyAddresses).map(enemyAddress => {
        return players.find({address: enemyAddress}).limit(1).toArray()
    }))).map(playerDoc => ({address: playerDoc[0].address, alias: playerDoc[0].playerAlias}))
        .reduce((obj, item) => ({ ...obj, [item.address]:item.alias }), {})

    allMatches = allMatches.map(match => {
        let enemyIs = match.player0 === address ? 1 : 0
        let enemyAddress = enemyIs === 0 ? match.player0 : match.player1
        if(aliases[enemyAddress] !== undefined && aliases[enemyAddress].length > 0) match.enemyAlias = aliases[enemyAddress]
        else match.enemyAlias = 'Enemy'
        match.startDate = match._id.getTimestamp().toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })
        match.duration = getHoursAndMins(Math.abs(new Date(match._id.getTimestamp()) - new Date(match.lastTurnTimestamp)) / 60000)
        return match
    })
    res.status(200).json({ allMatches, success: true });
}