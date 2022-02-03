const CONSTANTS = require('../constants.json');

function isOccupied(board, x, y) {
    return board[y][x].type ? true : false
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

function isMyBase(board, x, y, playerNumber) {
    return board[y][x].type === "base" && board[y][x].owner === playerNumber ? true : false
}

function fromTarget(x, y, fromX, fromY) {
    return parseHexID(x,y) === parseHexID(fromX, fromY) ? true : false
}

function parseHexID(x,y) {
    return y.toString() + x.toString()
}

function unparseHexID(id) {
    return { x: parseInt(id[1]), y: parseInt(id[0]) }
}

function isAdjacent(from, to) {
    (Math.abs(parseInt(from[0]) - parseInt(to[0])) <= 1 && Math.abs(parseInt(from[1]) - parseInt(to[1])) <= 1) ? true : false
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

function legalAttacks(board, x, y, turnNum) {
    const type = board[y][x].type
    const attack = CONSTANTS.spaceshipsAttributes[type].attack
    if(!attack || !canMakeAction("attack", board, x, y, turnNum)) return []
    const isEven = y % 2  == 0
    let legalTargets = [
        { x, y: y - 1 },
        { x: x + 1, y: y - 1 },
        { x: x + 1, y },
        { x: x + 1, y: y + 1 },
        { x, y: y + 1 },
        { x: x - 1, y } 
    ]
    if(isEven) {
        legalTargets[0].x -= 1;
        legalTargets[1].x -= 1;
        legalTargets[3].x -= 1;
        legalTargets[4].x -= 1;
    }
    const playerNumber = board[y][x].owner;
    
    legalTargets = legalTargets
    .filter(target => {
        const minX = 0
        const minY = 0
        const maxY = board.length-1
        const maxX = board[0].length-1
        return target.x >= minX && target.x <= maxX && target.y >= minY && target.y <= maxY
    })
    .filter(target => isOccupied(board, target.x, target.y));

    if(CONSTANTS.spaceshipsAttributes[board[y][x].type].shock !== true) legalTargets = legalTargets.filter(target => isEnemyPiece(board, playerNumber, target.x, target.y))
    return legalTargets
}

function getAdjacentPieces(board, x, y) {
    const type = board[y][x].type
    const isEven = y % 2  == 0
    let legalTargets = [
        { x, y: y - 1 },
        { x: x + 1, y: y - 1 },
        { x: x + 1, y },
        { x: x + 1, y: y + 1 },
        { x, y: y + 1 },
        { x: x - 1, y } 
    ]
    if(isEven) {
        legalTargets[0].x -= 1;
        legalTargets[1].x -= 1;
        legalTargets[3].x -= 1;
        legalTargets[4].x -= 1;
    }
    const playerNumber = board[y][x].owner;
    
    legalTargets = legalTargets
    .filter(target => {
        const minX = 0
        const minY = 0
        const maxY = board.length-1
        const maxX = board[0].length-1
        return target.x >= minX && target.x <= maxX && target.y >= minY && target.y <= maxY
    })
    .filter(target => isOccupied(board, target.x, target.y));
    return legalTargets
}

function getAdjacentEnemies(board, x, y) {
    const type = board[y][x].type
    const isEven = y % 2  == 0
    let legalTargets = [
        { x, y: y - 1 },
        { x: x + 1, y: y - 1 },
        { x: x + 1, y },
        { x: x + 1, y: y + 1 },
        { x, y: y + 1 },
        { x: x - 1, y } 
    ]
    if(isEven) {
        legalTargets[0].x -= 1;
        legalTargets[1].x -= 1;
        legalTargets[3].x -= 1;
        legalTargets[4].x -= 1;
    }
    const playerNumber = board[y][x].owner;
    
    legalTargets = legalTargets
    .filter(target => {
        const minX = 0
        const minY = 0
        const maxY = board.length-1
        const maxX = board[0].length-1
        return target.x >= minX && target.x <= maxX && target.y >= minY && target.y <= maxY
    })
    .filter(target => isOccupied(board, target.x, target.y))
    .filter(target => isEnemyPiece(board, playerNumber, target.x, target.y))
    return legalTargets
}

function getAdjacentAllies(board, x, y) {
    const type = board[y][x].type
    const isEven = y % 2  == 0
    let legalTargets = [
        { x, y: y - 1 },
        { x: x + 1, y: y - 1 },
        { x: x + 1, y },
        { x: x + 1, y: y + 1 },
        { x, y: y + 1 },
        { x: x - 1, y } 
    ]
    if(isEven) {
        legalTargets[0].x -= 1;
        legalTargets[1].x -= 1;
        legalTargets[3].x -= 1;
        legalTargets[4].x -= 1;
    }
    const playerNumber = board[y][x].owner;
    
    legalTargets = legalTargets
    .filter(target => {
        const minX = 0
        const minY = 0
        const maxY = board.length-1
        const maxX = board[0].length-1
        return target.x >= minX && target.x <= maxX && target.y >= minY && target.y <= maxY
    })
    .filter(target => isOccupied(board, target.x, target.y))
    .filter(target => isMyPiece(board, playerNumber, target.x, target.y))
    return legalTargets
}  

function legalShockable(board, targetsSet, fromID, toID, playerNumber) {
    let targets = new Set(targetsSet)
    let { x, y } = unparseHexID(toID)
    targets.add(fromID)
    targets.add(toID)

    const isEven = y % 2  == 0

    let legalTargets = [
        { x, y: y - 1 },
        { x: x + 1, y: y - 1 },
        { x: x + 1, y },
        { x: x + 1, y: y + 1 },
        { x, y: y + 1 },
        { x: x - 1, y } 
    ]
    if(isEven) {
        legalTargets[0].x -= 1;
        legalTargets[1].x -= 1;
        legalTargets[3].x -= 1;
        legalTargets[4].x -= 1;
    }
    let legalTargetsSet = legalTargets
    .filter(target => {
        const minX = 0
        const minY = 0
        const maxY = board.length-1
        const maxX = board[0].length-1
        return target.x >= minX && target.x <= maxX && target.y >= minY && target.y <= maxY
    })
    .filter(target => isOccupied(board, target.x, target.y))
    .filter(target => !isMyBase(board, target.x, target.y, playerNumber))
    .map(target => parseHexID(target.x, target.y))
    .filter(target => !targets.has(target))
    .reduce((set, target) => set.add(target), new Set())    

    if(legalTargetsSet.size === 0) return legalTargetsSet
    else {
        legalTargetsSet.forEach((target) => {
            let newTargets = legalShockable(board, targets, toID, target, playerNumber)
            newTargets.forEach(target => legalTargetsSet.add(target))
        })
        legalTargetsSet.add(toID)
        return legalTargetsSet
    }
}

function legalRepairs(board, x, y, turnNum) {
    const type = board[y][x].type
    const repairPercent = CONSTANTS.spaceshipsAttributes[type].repairPercent
    if(!repairPercent || !canMakeAction("repair", board, x, y, turnNum)) return []
    const isEven = y % 2  == 0
    let legalAllies = [
        { x, y: y - 1 },
        { x: x + 1, y: y - 1 },
        { x: x + 1, y },
        { x: x + 1, y: y + 1 },
        { x, y: y + 1 },
        { x: x - 1, y } 
    ]
    if(isEven) {
        legalAllies[0].x -= 1;
        legalAllies[1].x -= 1;
        legalAllies[3].x -= 1;
        legalAllies[4].x -= 1;
    }
    const playerNumber = board[y][x].owner;
    return legalAllies
    .filter(ally => {
        const minX = 0
        const minY = 0
        const maxY = board.length-1
        const maxX = board[0].length-1
        return ally.x >= minX && ally.x <= maxX && ally.y >= minY && ally.y <= maxY
    })
    .filter(ally => isOccupied(board, ally.x, ally.y))
    .filter(ally => board[ally.y][ally.x].type !== "base")
    .filter(ally => isMyPiece(board, playerNumber, ally.x, ally.y))
    .filter(ally => board[ally.y][ally.x].hp < CONSTANTS.spaceshipsAttributes[board[ally.y][ally.x].type].hp)
}

function isLegalAttack(board, selectedX, selectedY, x, y, turnNum) {
    return legalAttacks(board, selectedX, selectedY, turnNum).filter(move => move.x === x && move.y === y).length > 0
}

function isLegalMove(board, selectedX, selectedY, moveX, moveY, turnNum) {
    return legalMoves(board, selectedX, selectedY, turnNum).filter(move => move.x === moveX && move.y === moveY).length > 0
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
    parseHexID,
    legalAttacks,
    legalRepairs,
    legalShockable,
    isLegalAttack,
    isLegalRepair,
    checkPlayerUnarmed,
    getAdjacentPieces,
    getAdjacentEnemies,
    getAdjacentAllies
}