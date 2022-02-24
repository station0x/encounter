"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const getAddress = require('../../api-utils/getAddress');
const { ObjectId } = require('mongodb');
const CONSTANTS = require('../../constants');


module.exports = async (req, res) => {
    const client = await clientPromise;
    const db = client.db()
    const cursor = db.collection("matches").find();
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
        for(let i=0; i<board.length; i++) {
            for(let j=0; j<board[i].length; j++) {
                if(board[i][j].type !== undefined && board[i][j].type !== 'base') {
                    if(spaceshipsNameChange[board[i][j].type] === undefined) picks[board[i][j].type] = (picks[board[i][j].type] ?? 0) + 1;
                    else picks[spaceshipsNameChange[board[i][j].type]] = (picks[spaceshipsNameChange[board[i][j].type]] ?? 0) + 1;
                    allPicks++
                }
            }
        }
    }

    picks = Object.keys(picks).map((type) => {
        return {type, number: picks[type]}
    })

   res.status(200).json({ matchesNo, picks, allPicks, success: true });
}
