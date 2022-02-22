"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const getAddress = require('../../api-utils/getAddress');
const { ObjectId } = require('mongodb');
const CONSTANTS = require('../../constants');
const { endMatch, updateFuel, endTurn } = require('../../api-utils/match')
const { isOccupied, isLegalMove, isOurPiece, isLegalAttack, isLegalRepair, canMakeAction, checkPlayerUnarmed, legalShockable, parseHexID, getAdjacentPieces } = require('../../common/board')


module.exports = async (req, res) => {
   const client = await clientPromise;
   const db = client.db()
   const address = getAddress(req.query.signature)
   const from = JSON.parse(req.query.from)
   const to = JSON.parse(req.query.to)
   const action = req.query.action
   const matches = db.collection("matches")
   const matchDoc = (await matches.find({_id:ObjectId(req.query.matchId)}).limit(1).toArray())[0];
   if(!matchDoc) throw new Error("Match does not exist")
   if(matchDoc.picking) throw new Error("Match is in picking mode!")
   if(matchDoc.winner) throw new Error("Match already ended")
   const board = matchDoc.board
   let playerNumber;
   if(matchDoc.player0 === address) playerNumber = 0
   if(matchDoc.player1 === address) playerNumber = 1
   if(playerNumber !== 0 && playerNumber !== 1) throw new Error("You are not a player in this match")
   if(matchDoc.playerTurn !== playerNumber) throw new Error("Not your turn")
   if(Date.now() - matchDoc.lastTurnTimestamp > CONSTANTS.turnTimeout * 1000) throw new Error("Turn timeout ended")
   if(!isOccupied(board, from.x, from.y)) throw new Error("Source is not occupied")
   if(!isOurPiece(board, playerNumber, from.x, from.y)) throw new Error("Not your piece")

   let fuel = playerNumber === 0? matchDoc.fuel0: matchDoc.fuel1
   const fromAttributes = CONSTANTS.spaceshipsAttributes[board[from.y][from.x].type]
   const toAttributes = CONSTANTS.spaceshipsAttributes[board[to.y][to.x].type]

   if(action === "move") {
    let newMatchStats = {...matchDoc}
    const hpCost = fromAttributes.moveHpCost || false
    if(isOccupied(board, to.x, to.y)) throw new Error("Destination is already occupied")
    if(!isLegalMove(board, from.x, from.y, to.x, to.y, matchDoc.turnNum)) throw new Error("Illegal move")
    if(!hpCost) { if(!fromAttributes.moveFuelCost || fuel < fromAttributes.moveFuelCost) throw new Error("Insufficient fuel to move") }

    // Move Piece
    if(hpCost) {
        const hp = newMatchStats.board[from.y][from.x].hp
        const newHp = hp - hpCost;
        if(newHp > 0) {
            newMatchStats.board[from.y][from.x].hp = newHp
            newMatchStats.board[to.y][to.x] = newMatchStats.board[from.y][from.x]
            newMatchStats.board[from.y][from.x] = {}
        } else throw new Error("Insufficient HP to move")
    } else {
        newMatchStats.board[to.y][to.x] = newMatchStats.board[from.y][from.x]
        newMatchStats.board[from.y][from.x] = {}
    }

    // Update fuel
    ;[newMatchStats, fuel] = updateFuel(newMatchStats, playerNumber, fromAttributes.moveFuelCost)

    // Update Match History
    newMatchStats.history.push({from: {x: from.x, y: from.y}, to: {x: to.x, y: to.y}, action, playerNumber})

    // Update game log
    newMatchStats.log.push({index: matchDoc.logsIndex, playerNo: playerNumber, action, from: {x: from.x, y: from.y}, to: {x: to.x, y: to.y}, fromPiece: newMatchStats.board[from.y][from.x], toPiece: newMatchStats.board[to.y][to.x]})

    // Increase Logs Index
    newMatchStats.logsIndex++

    // Update Last turn Warp used
    if((from.x === 0 && to.x === 8) || (from.x === 8 && to.x === 0)) {
        if(!canMakeAction("warp", newMatchStats.board, to.x, to.y, matchDoc.turnNum)) throw new Error('Piece already made an action in this turn')
        newMatchStats.board[to.y][to.x].lastWarpTurn = newMatchStats.turnNum
    }
    
    if(fuel === 0) { // if remaining fuel is 0, automatically end turn
        newMatchStats = endTurn(newMatchStats, playerNumber)
    }
    await matches.updateOne({_id:matchDoc._id}, {
        $set:newMatchStats
    })
   } else if(action === "attack") {
    let newMatchStats = {...matchDoc}
    let shock = fromAttributes.shock || false
    let vamp = fromAttributes.vamp || false
    let onDestroyDamage = toAttributes.onDestroyDamage || false
    if(!isOccupied(board, to.x, to.y)) throw new Error("Destination is not occupied")
    if(!shock) { if(!isLegalAttack(board, from.x, from.y, to.x, to.y, matchDoc.turnNum)) throw new Error("Illegal attack") }
    if(!vamp) { if(!fromAttributes.attackFuelCost || fuel < fromAttributes.attackFuelCost) throw new Error("Insufficient fuel to attack") }

    let attack = fromAttributes.attack
    if(!attack) return
    const bonusAttack = newMatchStats.board[from.y][from.x].bonusAttack || 0
    // Bonus Attack Calculation
    attack += bonusAttack
    
    if(shock) {
        let targetsAcc = new Set()
        let targets = [...legalShockable(newMatchStats.board, targetsAcc, parseHexID(from.x, from.y), parseHexID(to.x, to.y), playerNumber)]
        .map((target) => { return { x: parseInt(target[1]), y: parseInt(target[0]) } })

        for(const target of targets) {
            const hp = newMatchStats.board[target.y][target.x].hp
            const newHp = hp - attack;
            if(newHp > 0) {
                newMatchStats.board[target.y][target.x].hp = newHp
                // Update game log
                newMatchStats.log.push({index: matchDoc.logsIndex, playerNo: playerNumber, action, from: {x: from.x, y: from.y}, to: {x: target.x, y: target.y}, fromPiece: newMatchStats.board[from.y][from.x], toPiece: newMatchStats.board[target.y][target.x]})
            } else {
                onDestroyDamage = CONSTANTS.spaceshipsAttributes[board[target.y][target.x].type].onDestroyDamage
                if(onDestroyDamage) {
                    let targets = [...getAdjacentPieces(newMatchStats.board, target.x, target.y, playerNumber)]
                    for(const target of targets) {
                        const hp = newMatchStats.board[target.y][target.x].hp
                        const newHp = hp - onDestroyDamage;
                        if(newHp > 0) {
                            newMatchStats.board[target.y][target.x].hp = newHp
                            // Update game log
                            newMatchStats.log.push({index: matchDoc.logsIndex, playerNo: playerNumber, action, from: {x: to.x, y: to.y}, to: {x: target.x, y: target.y}, fromPiece: newMatchStats.board[to.y][to.x], toPiece: newMatchStats.board[target.y][target.x]})
                        } else {
                            const type = newMatchStats.board[target.y][target.x].type
                            newMatchStats.board[target.y][target.x] = {}
                            // Update game log
                            newMatchStats.log.push({index: matchDoc.logsIndex, playerNo: playerNumber, action, from: {x: to.x, y: to.y}, to: {x: target.x, y: target.y}, fromPiece: newMatchStats.board[to.y][to.x], toPiece: newMatchStats.board[target.y][target.x], destroyed: newMatchStats.board[target.y][target.x].type})
                            // if base is destroyed, end game
                            let playerUnderExplosion = newMatchStats.board[target.y][target.x].owner
                            let winner = playerUnderExplosion === 0 ? 1 : 0
                            if(type === "base") { // game ended
                                newMatchStats = await endMatch(newMatchStats, db.collection("players"), winner)
                            } else {
                                // if all enemy spaceships are destroyed except the base (end the game)
                                if(checkPlayerUnarmed(newMatchStats.board, playerUnderExplosion)) {
                                    newMatchStats = await endMatch(newMatchStats, db.collection("players"), winner)
                                }
                            }
                        }
                    }
                }
                const type = newMatchStats.board[target.y][target.x].type
                newMatchStats.board[target.y][target.x] = {}
                // Update game log
                newMatchStats.log.push({index: matchDoc.logsIndex, playerNo: playerNumber, action, from: {x: from.x, y: from.y}, to: {x: target.x, y: target.y}, fromPiece: newMatchStats.board[from.y][from.x], toPiece: newMatchStats.board[target.y][target.x], destroyed: type})
                // if base is destroyed, end game
                if(type === "base") { // game ended
                    newMatchStats = await endMatch(newMatchStats, db.collection("players"), playerNumber)
                } else {
                    // if all enemy spaceships are destroyed except the base (end the game)
                    if(checkPlayerUnarmed(newMatchStats.board, playerNumber)) {
                        newMatchStats = await endMatch(newMatchStats, db.collection("players"), playerNumber)
                    }
                }
            }
        }
    } else {
        const hp = newMatchStats.board[to.y][to.x].hp
        const newHp = hp - attack;
        if(newHp > 0) {
            newMatchStats.board[to.y][to.x].hp = newHp
            // Update game log
            newMatchStats.log.push({index: matchDoc.logsIndex, playerNo: playerNumber, action, from: {x: from.x, y: from.y}, to: {x: to.x, y: to.y}, fromPiece: newMatchStats.board[from.y][from.x], toPiece: newMatchStats.board[to.y][to.x]})
        } else {
            if(onDestroyDamage) {
                let targets = [...getAdjacentPieces(newMatchStats.board, to.x, to.y, playerNumber)]
                for(const target of targets) {
                    const hp = newMatchStats.board[target.y][target.x].hp
                    const newHp = hp - onDestroyDamage;
                    if(newHp > 0) {
                        newMatchStats.board[target.y][target.x].hp = newHp
                        // Update game log
                        newMatchStats.log.push({index: matchDoc.logsIndex, playerNo: playerNumber, action, from: {x: to.x, y: to.y}, to: {x: target.x, y: target.y}, fromPiece: newMatchStats.board[to.y][to.x], toPiece: newMatchStats.board[target.y][target.x]})
                    } else {
                        const type = newMatchStats.board[target.y][target.x].type
                        newMatchStats.board[target.y][target.x] = {}
                        // Update game log
                        newMatchStats.log.push({index: matchDoc.logsIndex, playerNo: playerNumber, action, from: {x: to.x, y: to.y}, to: {x: target.x, y: target.y}, fromPiece: newMatchStats.board[to.y][to.x], toPiece: newMatchStats.board[target.y][target.x], destroyed: newMatchStats.board[target.y][target.x].type})
                        // if base is destroyed, end game
                        let playerUnderExplosion = newMatchStats.board[target.y][target.x].owner
                        let winner = playerUnderExplosion === 0 ? 1 : 0
                        if(type === "base") { // game ended
                            newMatchStats = await endMatch(newMatchStats, db.collection("players"), winner)
                        } else {
                            // if all enemy spaceships are destroyed except the base (end the game)
                            if(checkPlayerUnarmed(newMatchStats.board, playerUnderExplosion)) {
                                newMatchStats = await endMatch(newMatchStats, db.collection("players"), winner)
                            }
                        }
                    }
                }
            }
            const type = newMatchStats.board[to.y][to.x].type
            newMatchStats.board[to.y][to.x] = {}
            // Update game log
            newMatchStats.log.push({index: matchDoc.logsIndex, playerNo: playerNumber, action, from: {x: from.x, y: from.y}, to: {x: to.x, y: to.y}, fromPiece: newMatchStats.board[from.y][from.x], toPiece: newMatchStats.board[to.y][to.x], destroyed: type})
            // if base is destroyed, end game
            if(type === "base") { // game ended
                newMatchStats = await endMatch(newMatchStats, db.collection("players"), playerNumber)
            } else {
                // if all enemy spaceships are destroyed except the base (end the game)
                if(checkPlayerUnarmed(newMatchStats.board, playerNumber)) {
                    newMatchStats = await endMatch(newMatchStats, db.collection("players"), playerNumber)
                }
            }
        }
    }

    if(vamp) {
        let maxHp = fromAttributes.hp
        let newHp = newMatchStats.board[from.y][from.x].hp + vamp
        newMatchStats.board[from.y][from.x].hp = Math.min(newHp, maxHp)
    }
    // Update fuel
    ;[newMatchStats, fuel] = updateFuel(newMatchStats, playerNumber, fromAttributes.attackFuelCost)

    // Update Bonus Attack
    newMatchStats.board[from.y][from.x].bonusAttack = (CONSTANTS.spaceshipsAttributes[newMatchStats.board[from.y][from.x].type].bonusAttackOnAttack || 0) + bonusAttack

    // Update Last turn Attack used
    newMatchStats.board[from.y][from.x].lastAttackTurn = newMatchStats.turnNum

    // Update Match History
    newMatchStats.history.push({from: {x: from.x, y: from.y}, to, action, playerNumber})

    // Increase Logs Index
    newMatchStats.logsIndex++

    if(fuel === 0) { // if remaining fuel is 0, automatically end turn
        newMatchStats = endTurn(newMatchStats, playerNumber)
    }

    await matches.updateOne({_id:matchDoc._id}, {
        $set:newMatchStats
    })
   } else if(action === "repair") {
    if(!isOccupied(board, to.x, to.y)) throw new Error("Destination is not occupied")
    if(!isLegalRepair(board, from.x, from.y, to.x, to.y, matchDoc.turnNum)) throw new Error("Illegal repair")
    if(!fromAttributes.repairFuelCost || fuel < fromAttributes.repairFuelCost) throw new Error("Insufficient fuel to repair")

    let newMatchStats = {...matchDoc}
    const maxHp = CONSTANTS.spaceshipsAttributes[newMatchStats.board[to.y][to.x].type].hp
    const repairPercent = CONSTANTS.spaceshipsAttributes[newMatchStats.board[from.y][from.x].type].repairPercent
    if(!repairPercent) return
    const hp = newMatchStats.board[to.y][to.x].hp
    const newHp = Math.min(Math.floor(hp + (maxHp / 100 * repairPercent)), maxHp);
    newMatchStats.board[to.y][to.x].hp = newHp

    // Update fuel
    ;[newMatchStats, fuel] = updateFuel(newMatchStats, playerNumber, fromAttributes.repairFuelCost)

    // Update Last turn used
    newMatchStats.board[from.y][from.x].lastRepairTurn = newMatchStats.turnNum

    // Update Match History
    newMatchStats.history.push({from: {x: from.x, y: from.y}, to: {x: to.x, y: to.y}, action, playerNumber})

    // Update game log
    newMatchStats.log.push({index: matchDoc.logsIndex, playerNo: playerNumber, action, from: {x: from.x, y: from.y}, to: {x: to.x, y: to.y}, fromPiece: newMatchStats.board[from.y][from.x], toPiece: newMatchStats.board[to.y][to.x]})

    // Increase Logs Index
    newMatchStats.logsIndex++
    
    if(fuel === 0) { // if remaining fuel is 0, automatically end turn
        newMatchStats = endTurn(newMatchStats, playerNumber)
    }

    await matches.updateOne({_id:matchDoc._id}, {
        $set:newMatchStats
    })
   }
   res.status(200).json({ success: true });
}
