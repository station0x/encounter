"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const CONSTANTS = require('../../constants');
const arraySort = require('array-sort')

module.exports = async (req, res) => {
    let address = req.query.address
    const client = await clientPromise;
    const db = client.db()
    const cursor = db.collection("matches").find({$or: [ {player0: address}, {player1: address} ], $and: [{ winner: {$ne: null},  $or: [{picking: true},{picking: false}]}],  })
    let picks = {}
    let allPicks = 0

    let matchDoc
    let matchesNo = 0

    let spaceshipsNameChange = {
        "fighter": "battlestar",
        "scout": "thunderbird",
        "carrier": "salvation",
        "warpship": "ubiquity",
        "destroyer": "colossus",
        "stalker": "nightstalker"
    }
    
    CONSTANTS.allSpaceships.map(spaceship => {
        picks[spaceship] = 0
    })
    
    while ((matchDoc = await cursor.next())) {
        let board = matchDoc.initialBoard
        matchesNo++
        let i = matchDoc.player0 === address ? 7 : 1
        for(let j=0; j<board.length; j++) {
            if(board[i][j].type !== undefined && board[i][j].type !== 'base') {
                if(spaceshipsNameChange[board[i][j].type] === undefined) picks[board[i][j].type] = (picks[board[i][j].type] ?? 0) + 1;
                else picks[spaceshipsNameChange[board[i][j].type]] = (picks[spaceshipsNameChange[board[i][j].type]] ?? 0) + 1;
                allPicks++
            }
        }
    }

    picks = Object.keys(picks).map((type) => {
        return {type, number: picks[type]}
    })
    picks = arraySort([...picks], 'number', {reverse: true})

   res.status(200).json({ matchesNo, picks, allPicks, success: true });
}
