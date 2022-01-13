const CONSTANTS = require('../constants.json');

function isOccupied(board, x, y) {
    return board[y][x].type ? true : false
}

function legalMoves(board, x, y, turnNum) {
    const isEven = y % 2  == 0
    let legalMoves = [
        { x, y: y - 1 },
        { x: x + 1, y: y - 1 },
        { x: x + 1, y },
        { x: x + 1, y: y + 1 },
        { x, y: y + 1 },
        { x: x - 1, y }
    ]
    if(isEven) {
        legalMoves[0].x -= 1;
        legalMoves[1].x -= 1;
        legalMoves[3].x -= 1;
        legalMoves[4].x -= 1;
    }

    if(CONSTANTS.spaceshipsAttributes[board[y][x].type].warp === true && canMakeAction("warp", board, x, y, turnNum)) {
        if(x === 0) {
            if(!isEven) legalMoves.push({ x: 8, y })
            else legalMoves.push(
                { x: 8, y: y - 1 },
                { x: 8, y },
                { x: 8, y: y + 1 }
            )
        } else if(x === 8) {
            if(isEven) legalMoves.push({ x: 0, y })
            else legalMoves.push(
                { x: 0, y: y - 1 },
                { x: 0, y },
                { x: 0, y: y + 1 }
            )
        }
    }
    
    return legalMoves
        .filter(move => {
        const minX = 0
        const minY = 0
        const maxY = board.length-1
        const maxX = board[0].length-1
        return move.x >= minX && move.x <= maxX && move.y >= minY && move.y <= maxY
        })
      .filter(move => !isOccupied(board, move.x, move.y))
}

function isLegalMove(board, selectedX, selectedY, moveX, moveY, turnNum) {
    return legalMoves(board, selectedX, selectedY, turnNum).filter(move => move.x === moveX && move.y === moveY).length > 0
}

function isOurPiece(board, playerNumber, x, y) {
    return board[y][x].owner === playerNumber;
}

function isEnemyPiece(board, playerNumber, x ,y) {
    return board[y][x].owner !== playerNumber
}

function isMyPiece(board, playerNumber, x ,y) {
    return board[y][x].owner === playerNumber
}

function canMakeAction(action, board, x, y, turnNum) {
    if(action === 'attack') {
        return board[y][x].lastAttackTurn !== turnNum
    } else if(action === 'repair') {
        return board[y][x].lastRepairTurn !== turnNum
    } else if(action === 'warp') {
        return board[y][x].lastWarpTurn !== turnNum
    }
    return false
}

function legalAttacks(board, x, y, turnNum) {
    const type = board[y][x].type
    const attack = CONSTANTS.spaceshipsAttributes[type].attack
    if(!attack || !canMakeAction("attack", board, x, y, turnNum)) return []
    const isEven = y % 2  == 0
    let legalMoves = [
        { x, y: y - 1 },
        { x: x + 1, y: y - 1 },
        { x: x + 1, y },
        { x: x + 1, y: y + 1 },
        { x, y: y + 1 },
        { x: x - 1, y } 
    ]
    if(isEven) {
        legalMoves[0].x -= 1;
        legalMoves[1].x -= 1;
        legalMoves[3].x -= 1;
        legalMoves[4].x -= 1;
    }
    const playerNumber = board[y][x].owner;
    return legalMoves
    .filter(move => {
        const minX = 0
        const minY = 0
        const maxY = board.length-1
        const maxX = board[0].length-1
        return move.x >= minX && move.x <= maxX && move.y >= minY && move.y <= maxY
    })
    .filter(move => isOccupied(board, move.x, move.y))
    .filter(move => isEnemyPiece(board, playerNumber, move.x, move.y))
}

function legalRepairs(board, x, y, turnNum) {
    const type = board[y][x].type
    const repairPercent = CONSTANTS.spaceshipsAttributes[type].repairPercent
    if(!repairPercent || !canMakeAction("repair", board, x, y, turnNum)) return []
    const isEven = y % 2  == 0
    let legalMoves = [
        { x, y: y - 1 },
        { x: x + 1, y: y - 1 },
        { x: x + 1, y },
        { x: x + 1, y: y + 1 },
        { x, y: y + 1 },
        { x: x - 1, y } 
    ]
    if(isEven) {
        legalMoves[0].x -= 1;
        legalMoves[1].x -= 1;
        legalMoves[3].x -= 1;
        legalMoves[4].x -= 1;
    }
    const playerNumber = board[y][x].owner;
    return legalMoves
    .filter(move => {
        const minX = 0
        const minY = 0
        const maxY = board.length-1
        const maxX = board[0].length-1
        return move.x >= minX && move.x <= maxX && move.y >= minY && move.y <= maxY
    })
    .filter(move => isOccupied(board, move.x, move.y))
    .filter(move => board[move.y][move.x].type !== "base")
    .filter(move => isMyPiece(board, playerNumber, move.x, move.y))
    .filter(move => board[move.y][move.x].hp < CONSTANTS.spaceshipsAttributes[board[move.y][move.x].type].hp)
}

function isLegalAttack(board, selectedX, selectedY, x, y, turnNum) {
    return legalAttacks(board, selectedX, selectedY, turnNum).filter(move => move.x === x && move.y === y).length > 0
}

function isLegalRepair(board, selectedX, selectedY, x, y, turnNum) {
    return legalRepairs(board, selectedX, selectedY, turnNum).filter(move => move.x === x && move.y === y).length > 0
}

function checkPlayerUnarmed(board, playerNo) {
    for(let i = 0; i<board.length; i++) {
        for(let j = 0; j<board[i].length; j++) {
            const piece = board[i][j]
            if(piece.type && piece.owner !== playerNo && piece.type !== 'base' && piece.type !== 'salvation') {
                return false
            }
        }
    }
    return true
}

module.exports = {
    isOccupied,
    legalMoves,
    isLegalMove,
    isOurPiece,
    isEnemyPiece,
    canMakeAction,
    legalAttacks,
    legalRepairs,
    isLegalAttack,
    isLegalRepair,
    checkPlayerUnarmed
}