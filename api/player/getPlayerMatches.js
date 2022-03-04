"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const CONSTANTS = require('../../constants');
const arraySort = require('array-sort')

function getHoursAndMins(mins) {
    let num = mins
    let hours = (num/60)
    let rhours = Math.floor(hours)
    let minutes = (hours - rhours) * 60
    let rminutes = Math.round(minutes)
    return ('0' + rhours).slice(-2) + ":" + ('0' + rminutes).slice(-2) + ':00'
}

module.exports = async (req, res) => {
    let picks = CONSTANTS.allSpaceships.reduce((picks, spaceship) => ({...picks, [spaceship]: 0}), {})
    let allPicks = 0
    let spaceshipsNameChange = {
        "fighter": "battlestar",
        "scout": "thunderbird",
        "carrier": "salvation",
        "warpship": "ubiquity",
        "destroyer": "colossus",
        "stalker": "nightstalker"
    }

    const client = await clientPromise;
    const address = req.query.address
    const db = client.db()
    const matches = db.collection("matches")
    const players = db.collection("players")
    const projection = { _id: 1, initialBoard: 1, lastTurnTimestamp: 1, player0: 1, player1: 1, type: 1, winner: 1 }
    let allMatches = await matches.find({$or: [ {player0: address}, {player1: address} ], winner: {$ne: null} }).project(projection).batchSize(1000).toArray()

 
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
        // Calculate spaceship picks
        let board = match.initialBoard
        let i = match.player0 === address ? 7 : 1
        for(let j=0; j<board.length; j++) {
            if(board[i][j].type !== undefined && board[i][j].type !== 'base') {
                if(spaceshipsNameChange[board[i][j].type] === undefined) picks[board[i][j].type] = (picks[board[i][j].type] ?? 0) + 1;
                else picks[spaceshipsNameChange[board[i][j].type]] = (picks[spaceshipsNameChange[board[i][j].type]] ?? 0) + 1;
                allPicks++
            }
        }
        match.startDate = match._id.getTimestamp().toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })
        match.duration = getHoursAndMins(Math.abs(new Date(match._id.getTimestamp()) - new Date(match.lastTurnTimestamp)) / 60000)
        return match
    })
    picks = Object.keys(picks).map((type) => {
        return {type, number: picks[type]}
    })
    picks = arraySort([...picks], 'number', {reverse: true})

    res.status(200).json({ picks, allPicks, allMatches, success: true });
}


// "use strict";
// // Import the dependency.
// const clientPromise = require('../../api-utils/mongodb-client');
// const { ObjectId } = require('mongodb');
// const CONSTANTS = require('../../constants');


// function getHoursAndMins(mins) {
//     let num = mins
//     let hours = (num/60)
//     let rhours = Math.floor(hours)
//     let minutes = (hours - rhours) * 60
//     let rminutes = Math.round(minutes)
//     return ('0' + rhours).slice(-2) + ":" + ('0' + rminutes).slice(-2) + ':00'
// }

// module.exports = async (req, res) => {
//     const picks = CONSTANTS.allSpaceships.reduce((picks, spaceship) => ({...picks, [spaceship]: 0}), {})
//     let matchDoc
//     let allMatches = []
//     let allPicks = 0
//     let spaceshipsNameChange = {
//         "fighter": "battlestar",
//         "scout": "thunderbird",
//         "carrier": "salvation",
//         "warpship": "ubiquity",
//         "destroyer": "colossus",
//         "stalker": "nightstalker"
//     }

//     const client = await clientPromise;
//     const address = req.query.address
//     const db = client.db()
//     const matches = db.collection("matches")
//     const players = db.collection("players")

//     let matchesCursor = matches.find({$or: [ {player0: address}, {player1: address} ], winner: {$ne: null} }).batchSize(1000)
    
//     while ((matchDoc = await matchesCursor.next())) {

//         // Calculate spaceship picks
//         let board = matchDoc.initialBoard
//         let i = matchDoc.player0 === address ? 7 : 1
//         for(let j=0; j<board.length; j++) {
//             if(board[i][j].type !== undefined && board[i][j].type !== 'base') {
//                 if(spaceshipsNameChange[board[i][j].type] === undefined) picks[board[i][j].type] = (picks[board[i][j].type] ?? 0) + 1;
//                 else picks[spaceshipsNameChange[board[i][j].type]] = (picks[spaceshipsNameChange[board[i][j].type]] ?? 0) + 1;
//                 allPicks++
//             }
//             matchDoc.startDate = matchDoc._id.getTimestamp().toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })
//             matchDoc.duration = getHoursAndMins(Math.abs(new Date(matchDoc._id.getTimestamp()) - new Date(matchDoc.lastTurnTimestamp)) / 60000)
//             allMatches.push(matchDoc)
//         }
//     }
 
//     // const enemyAddresses = allMatches.reduce((set, match) => {
//     //     let enemyIs = match.player0 === address ? 1 : 0
//     //     let enemyAddress = enemyIs === 0 ? match.player0 : match.player1
//     //     set.add(enemyAddress)
//     //     return set
//     // }, new Set())

//     // const aliases = (await Promise.all(Array.from(enemyAddresses).map(enemyAddress => {
//     //     return players.find({address: enemyAddress}).limit(1).toArray()
//     // }))).map(playerDoc => ({address: playerDoc[0].address, alias: playerDoc[0].playerAlias}))
//     //     .reduce((obj, item) => ({ ...obj, [item.address]:item.alias }), {})

//     // allMatches = allMatches.map(match => {
//     //     let enemyAddress = match.player0 === address ? match.player1 : match.player0
//     //     if(aliases[enemyAddress] !== undefined && aliases[enemyAddress].length > 0) match.enemyAlias = aliases[enemyAddress]
//     //     else match.enemyAlias = 'Enemy'

//     //     return match
//     // })

//     console.log(picks, allPicks, allMatches)

//     res.status(200).json({ picks, allPicks, allMatches, success: true });
// }


