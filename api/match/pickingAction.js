"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const getAddress = require('../../api-utils/getAddress');
const { ObjectId } = require('mongodb');
const CONSTANTS = require('../../constants.json');
const { endMatch, updateFuel, endTurn } = require('../../api-utils/match')
const { isOccupied, isLegalMove, isOurPiece, isLegalAttack, isLegalRepair, canMakeAction, checkPlayerUnarmed, legalShockable, parseHexID, getAdjacentPieces } = require('../../common/board')


module.exports = async (req, res) => {
    const client = await clientPromise;
    const db = client.db()
    const address = getAddress(req.query.signature)
    const spaceshipName = JSON.parse(req.query.spaceshipName)
    const to = JSON.parse(req.query.to)
    const matches = db.collection("matches")
    const matchDoc = (await matches.find({_id:ObjectId(req.query.matchId)}).limit(1).toArray())[0];
    if(!matchDoc) throw new Error("Match does not exist")
    if(!matchDoc.picking) throw new Error("Picking is over!")

    const board = matchDoc.board
    if(matchDoc.winner) throw new Error("Match already ended")
    let playerNumber;
    if(matchDoc.player0 === address) playerNumber = 0
    if(matchDoc.player1 === address) playerNumber = 1
    if(playerNumber !== 0 && playerNumber !== 1) throw new Error("You are not a player in this match")
    if(matchDoc.playerTurn !== playerNumber) throw new Error("Not your turn")
    if(Date.now() - matchDoc.lastTurnTimestamp > CONSTANTS.pickingTurnTimeout * 1000) throw new Error("Picking turn timeout ended")

    console.log(spaceshipName, to)
    res.status(200).json({ success: true });
}