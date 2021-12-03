<template>
	<div class="main-wrapper">
		<div class="left">
			<EnemyCard :playerAddress="enemyAddress" :fuel="enemyFuel"/>
		</div>
		<div class="middle">
			<div id="hex-grid" :class="{rotate: playerIs === 1}">
				<div class="row" v-for="(row, y) in ourState" :key="y">
					<div @click="select(col, x, y)" :class="colClasses(x,y)" v-for="(col, x) in row" :key="x">
						<img :class="hexClasses(x,y)" src="hex.png" height="80px"/>
						<img :class="pieceClasses(col.owner, x, y)" :src="col.img"/>
						<img v-if="isLegalMove(x,y)" class="move-circle" src="circle.png"/>
						<div v-if="col.type" :class="{tooltip:true, rotate: playerIs === 1}">
							<span class="attribute" v-for="(value, key) in getSpaceshipAttributes(col)" :key="key">
							{{key}}: {{value}}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="right">
			<PlayerCard @endTurn="endTurn" @surrender="surrender" :playerAddress="$store.state.address" :fuel="myFuel"/>
		</div>
	</div>
	<!-- <b-button v-if="isMyTurn" @click="endTurn">End Turn</b-button>
	{{isMyTurn}} {{myFuel}} {{enemyFuel}} -->
</template>

<script>
import axios from 'axios'
import CONSTANTS from "../../constants.json"
import PlayerCard from "@/components/PlayerCard.vue"
import EnemyCard from "@/components/EnemyCard.vue"

export default {
  name: 'Board',
  props:['state','playerIs', 'playerTurn', 'fuel0', 'fuel1', 'turnNum'],
  data() {
	return {
		selected:undefined,
		turnSfx: require('../assets/sfx/turn.mp3'),
		shotSfx: require('../assets/sfx/shot.mp3'),
		repairSfx: require('../assets/sfx/repair.mp3'),
		blue: {
			fighter: require('../assets/blue/fighter.png'),
			gunship: require('../assets/blue/gunship.png'),
			scout: require('../assets/blue/scout.png'),
			destoyer: require('../assets/blue/destroyer.png'),
			carrier: require('../assets/blue/carrier.png'),
			base: require('../assets/blue/base.png')
		},
		red: {
			fighter: require('../assets/red/fighter.png'),
			gunship: require('../assets/red/gunship.png'),
			scout: require('../assets/red/scout.png'),
			destoyer: require('../assets/red/destroyer.png'),
			carrier: require('../assets/red/carrier.png'),
			base: require('../assets/red/base.png')
		}
	}
  },
  components: {
		PlayerCard,
		EnemyCard
  },
  computed:{
	  ourState () {
		  if(!this.state) return []
		  return this.state.map(row => {
			  return row.map(col => {
				if(col.owner === this.playerIs) {
					if(col.type === "base") {
						col.img = this.blue.base
					}
					else if(col.type == "fighter") {
						col.img = this.blue.fighter
					}
					else if(col.type == "scout") {
						col.img = this.blue.scout
					}
					else if(col.type == "destroyer") {
						col.img = this.blue.destoyer
					}
					else if(col.type == "carrier") {
						col.img = this.blue.carrier
					}
					else if(col.type == "gunship") {
						col.img = this.blue.gunship
					}
				} else if (col.owner !== this.playerIs) {
					if(col.type === "base") {
						col.img = this.red.base
					}
					else if(col.type == "fighter") {
						col.img = this.red.fighter
					}
					else if(col.type == "scout") {
						col.img = this.red.scout
					}
					else if(col.type == "destroyer") {
						col.img = this.red.destoyer
					}
					else if(col.type == "carrier") {
						col.img = this.red.carrier
					}
					else if(col.type == "gunship") {
						col.img = this.red.gunship
					}
				}
				return col
			  })
		  })
	  },
	  enemyAddress() {
		return this.$store.state.matchState.playerIs === 0 ? this.$store.state.matchState.player1 : this.$store.state.matchState.player0
	  },
	  canMove() {
		if(!this.selected || !this.isMyTurn) return false
		const type = this.state[this.selected.y][this.selected.x].type
		if(!type) return false
		const attributes = CONSTANTS.spaceshipsAttributes[type]
		return this.myFuel >= attributes.moveFuelCost;
	  },
	  canAttack() {
		if(!this.selected || !this.isMyTurn) return false
		const type = this.state[this.selected.y][this.selected.x].type
		if(!type) return false
		if(this.state[this.selected.y][this.selected.x].lastAttackTurn === this.turnNum) return false
		const attributes = CONSTANTS.spaceshipsAttributes[type]
		return this.myFuel >= attributes.attackFuelCost
	  },
	  canRepair() {
		if(!this.selected || !this.isMyTurn) return false
		const type = this.state[this.selected.y][this.selected.x].type
		if(!type) return false
		if(this.state[this.selected.y][this.selected.x].lastRepairTurn === this.turnNum) return false
		const attributes = CONSTANTS.spaceshipsAttributes[type]
		return this.myFuel >= attributes.repairFuelCost
	  },
	  legalMoves() {
		  if(!this.selected || !this.isMyTurn || !this.canMove) {
			  return []
		  } else {
			  let x = this.selected.x
			  let y = this.selected.y
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
			  return legalMoves
			  	.filter(move => {
				  const minX = 0
				  const minY = 0
				  const maxY = this.state.length-1
				  const maxX = this.state[0].length-1
				  return move.x >= minX && move.x <= maxX && move.y >= minY && move.y <= maxY
			  	})
				.filter(move => !this.isOccupied(move.x, move.y))
		  }
	  },
	  legalAttacks() {
		if(!this.selected || !this.isMyTurn || !this.canAttack) {
				return []
			} else {
				let x = this.selected.x
				let y = this.selected.y
				const type = this.state[y][x].type
				const attack = CONSTANTS.spaceshipsAttributes[type].attack
				if(!attack) return []
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
				return legalMoves
				.filter(move => {
					const minX = 0
					const minY = 0
					const maxY = this.state.length-1
					const maxX = this.state[0].length-1
					return move.x >= minX && move.x <= maxX && move.y >= minY && move.y <= maxY
				})
				.filter(move => this.isOccupied(move.x, move.y))
				.filter(move => this.isEnemyPiece(move.x, move.y))
			}
	  },
	  legalRepairs() {
		if(!this.selected || !this.isMyTurn || !this.canRepair) {
				return []
			} else {
				let x = this.selected.x
				let y = this.selected.y
				const type = this.state[y][x].type
				const repairPercent = CONSTANTS.spaceshipsAttributes[type].repairPercent
				if(!repairPercent) return []
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
				return legalMoves
				.filter(move => {
					const minX = 0
					const minY = 0
					const maxY = this.state.length-1
					const maxX = this.state[0].length-1
					return move.x >= minX && move.x <= maxX && move.y >= minY && move.y <= maxY
				})
				.filter(move => this.isOccupied(move.x, move.y))
				.filter(move => this.ourState[move.y][move.x].type !== "base")
				.filter(move => this.isMyPiece(move.x, move.y))
				.filter(move => this.ourState[move.y][move.x].hp < CONSTANTS.spaceshipsAttributes[this.ourState[move.y][move.x].type].hp)
			}
	  },
	  isMyTurn () {
		  return this.playerTurn === this.playerIs
	  },
	  myFuel () {
		  return this.playerIs === 0? this.fuel0: this.fuel1
	  },
	  enemyFuel () {
		  return this.playerIs === 0? this.fuel1: this.fuel0
	  }
  },
  methods: {
	  	surrender() {
			const winner = this.playerIs === 0 ? 1 : 0
			this.$store.commit('setWinner', winner)
			this.$store.dispatch('enqueue', axios.get('/api/surrender', {
				params:{
					signature:this.$store.state.signature,
					matchId: this.$store.state.matchId
				}
			}))
		},
	    playSound(sfx) {
			var audio = new Audio(sfx)
			audio.play()
		},
	    endTurn() {
			this.playSound(this.turnSfx)
            this.$store.commit('endTurn')
			this.$store.dispatch('enqueue', axios.get('/api/endTurn', {
				params:{
					signature:this.$store.state.signature,
					matchId: this.$store.state.matchId
				}
			}))
    	},
	  isLegalMove(x,y) {
		  return this.legalMoves.filter(move => move.x === x && move.y === y).length > 0
	  },
	  isLegalAttack(x,y) {
		   return this.legalAttacks.filter(move => move.x === x && move.y === y).length > 0
	  },
	  isLegalRepair(x,y) {
		   return this.legalRepairs.filter(move => move.x === x && move.y === y).length > 0
	  },
	  pieceClasses(owner, x, y) {
		  let classes = "col-piece "

		  if(owner == !this.playerIs) {
			if(this.isLegalAttack(x,y)) {
				classes += "isTargetable "
			}
		  } else {
			if(this.isLegalRepair(x,y)) {
				classes += "isRepairable "
			}
		  }
		  
		  if(this.playerIs === 1) {
			  classes += "rotate"
		  }

		  return classes;
	  },
	  hexClasses(x,y) {
		let classes = "hex-parcel "

		if(this.selected && this.selected.x === x && this.selected.y === y) {
			classes += "selected "
		}

		if(this.isLegalAttack(x,y)) {
			classes += "isTargetable "
		} else if (this.isLegalRepair(x,y)) {
			classes += "isRepairable "
		}

		return classes
	  },
	  colClasses(x,y) {
		  let classes = "col "

		  if(y < 5) classes += 'top '
		  else classes += 'bottom'

		  return classes
	  },
	  select(piece, x, y) {
		  if(!this.isMyTurn) return
		  if(piece.type) { // if column contains a piece
			  if(piece.owner === this.playerIs){ // if piece is mine
				if(this.selected && this.selected.x === x && this.selected.y === y) { // if this is the selected piece
					this.selected = undefined // unselect
				} else { // if piece is not selected
					if(this.isLegalRepair(x,y) && piece.type != "base") { // if piece is a legal repair (except base)
						const newState = [...this.state]
						const repairPercent = CONSTANTS.spaceshipsAttributes[newState[this.selected.y][this.selected.x].type].repairPercent
						const maxHp = CONSTANTS.spaceshipsAttributes[newState[y][x].type].hp
						if(!repairPercent) return
						const hp = newState[y][x].hp
						const newHp = Math.min(Math.floor(hp + (maxHp / 100 * repairPercent)), maxHp);
						newState[y][x].hp = newHp
						const fuelCost = CONSTANTS.spaceshipsAttributes[newState[this.selected.y][this.selected.x].type].repairFuelCost
						this.$store.commit('setMyFuel', this.myFuel - fuelCost)
						if(this.myFuel - fuelCost === 0) {
							this.$store.commit('endTurn')
							this.playSound(this.turnSfx)
						}
						newState[y][x].lastRepairTurn = this.turnNum
						this.$store.commit('setBoard', newState)
						this.$store.dispatch('enqueue', axios.get('/api/boardAction', {
							params:{
								signature:this.$store.state.signature,
								matchId: this.$store.state.matchId,
								action: 'repair',
								from: this.selected,
								to: {x,y}
							}
						}))
						this.playSound(this.repairSfx)
					} else if(piece.type != "base") { // if not base
						this.selected = { // select piece
							x,
							y
						}
					}
				}
			  } else if(this.isLegalAttack(x,y)) { // if piece is not mine but is a legal attack
				const newState = [...this.state]
				const attack = CONSTANTS.spaceshipsAttributes[newState[this.selected.y][this.selected.x].type].attack
				if(!attack) return
				const hp = newState[y][x].hp
				const newHp = hp - attack;
				if(newHp > 0) {
					newState[y][x].hp = newHp
				} else {
					if(newState[y][x].type === "base") {
						this.$store.commit('setWinner', this.playerIs)
					}
					newState[y][x] = {}
				}
				const fuelCost = CONSTANTS.spaceshipsAttributes[newState[this.selected.y][this.selected.x].type].attackFuelCost
				this.$store.commit('setMyFuel', this.myFuel - fuelCost)
				if(this.myFuel - fuelCost === 0) {
					this.$store.commit('endTurn')
					this.playSound(this.turnSfx)
				}
				newState[y][x].lastAttackTurn = this.turnNum
				this.$store.commit('setBoard', newState)
				this.$store.dispatch('enqueue', axios.get('/api/boardAction', {
					params:{
						signature:this.$store.state.signature,
						matchId: this.$store.state.matchId,
						action: 'attack',
						from: this.selected,
						to: {x,y}
					}
				}))
				this.playSound(this.shotSfx)
			}
		} else {
			if(this.isLegalMove(x,y)) {
				const newState = [...this.state]
				const fuelCost = CONSTANTS.spaceshipsAttributes[newState[this.selected.y][this.selected.x].type].moveFuelCost
				newState[y][x] = newState[this.selected.y][this.selected.x]
				newState[this.selected.y][this.selected.x] = {}
				this.$store.commit('setMyFuel', this.myFuel - fuelCost)
				if(this.myFuel - fuelCost === 0) {
					this.$store.commit('endTurn')
					this.playSound(this.turnSfx)
				}
				this.$store.commit('setBoard', newState)
				this.$store.dispatch('enqueue', axios.get('/api/boardAction', {
					params:{
						signature:this.$store.state.signature,
						matchId: this.$store.state.matchId,
						action: 'move',
						from: this.selected,
						to: {x,y}
					}
				}))
				this.selected = {x,y}
			}
		}
	  },
	  isOccupied(x,y) {
		return this.ourState[y][x].type ? true : false
	  },
	  isEnemyPiece(x,y) {
		return this.ourState[y][x].owner !== this.playerIs
	  },
	  isMyPiece(x,y) {
		return this.ourState[y][x].owner === this.playerIs
	  },
	  getSpaceshipAttributes (piece) {
		let attributes = {
			type: piece.type,
			hp:`${piece.hp}/${CONSTANTS.spaceshipsAttributes[piece.type].hp}`
		}
		const constantAttributes = CONSTANTS.spaceshipsAttributes[piece.type]
		if(constantAttributes.attack) attributes.attack = constantAttributes.attack
		if(constantAttributes.repairPercent) attributes.repair = `${constantAttributes.repairPercent}%`
		return attributes
	  }
  },
  watch: {
	  "$store.state.matchState" (newState, oldState) {
		if(oldState.playerTurn !== newState.playerTurn) this.selected = undefined
		  const attacks = []
		  const destroys = []
		  const repairs = []
		  for (let y = 0; y < oldState.state.length; y++) {
			  const row = oldState.state[y];
			  for (let x = 0; x < row.length; x++) {
				  const oldPiece = row[x];
				  const newPiece = newState.state[y][x];
				  if(oldPiece.type) {
					if(oldPiece.owner === this.playerIs && !newPiece.type) {
						destroys.push(oldPiece.type)
					} else if(oldPiece.owner === this.playerIs && newPiece.hp < oldPiece.hp) {
						attacks.push(oldPiece.type)
					} else if(oldPiece.owner !== this.playerIs && newPiece.hp > oldPiece.hp) {
						repairs.push(oldPiece.type)
					}
				  }
			  }
		  }
			const toastConfig = {
				duration: 10000,
				position: 'is-bottom'
			}
			attacks.forEach(v => {
				this.playSound(this.shotSfx)
				this.$buefy.toast.open({message:`Your ${v} was attacked`, type: 'is-danger', ...toastConfig})
			})
			destroys.forEach(v => {
				this.playSound(this.shotSfx)
				this.$buefy.toast.open({message:`Your ${v} was destroyed`, type: 'is-danger', ...toastConfig})
			})
			repairs.forEach(v => {
				this.playSound(this.repairSfx)
				this.$buefy.toast.open({message: `Your enemy's ${v} was repaired`, type: 'is-info' , ...toastConfig})
			})
	  }
  }
}
</script>

<style>
:root {
	--scale: 0.9;
}
h1 {
	margin: 0;
}
#hex-grid {
	margin-left: -63px !important;
	margin-top: 40px !important;
    width: fit-content;
    margin: 0 auto;
	min-width: 110%;
}
.row {
	display: block;
}
.row:nth-child(even) {
	transform:translateX(calc(52.5px * var(--scale)));
	margin-top: calc(-37.5px * var(--scale));
	margin-bottom: calc(-37.5px * var(--scale));
}
.col {
	display: inline;
	position: relative;
}
.hex-parcel {
	filter:invert();
	opacity: 0.1;
	height: calc(120px * var(--scale));
	cursor: pointer;
}
.col:hover .hex-parcel {
	opacity: 1;
	
}
.col .tooltip {
    visibility: hidden;
    width: 270px;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    top: 15px;
    left: -25px;
    border-radius: 5px;
    border: 1px solid white;
    background: black;
    height: 300px;
    padding: 20px;

}

/* Show the tooltip text when you mouse over the tooltip container */
.col:hover .tooltip {
  visibility: visible;
}
.col-piece {
	position: absolute;
	opacity: 1 !important;
	left: calc(18.75px * var(--scale));
	bottom: calc(26.25px * var(--scale));
	height: calc(67.5px * var(--scale));
}

.move-circle {
	position: absolute;
	opacity: 1 !important;
	left: calc(30px * var(--scale));
	bottom: calc(40px * var(--scale));
	height: calc(45px * var(--scale));
	opacity: 0.6 !important;
}
.selected {
	opacity:1
}
.rotate {
  -webkit-transform: scaleY(-1);
  transform: scaleY(-1);
}
.isTargetable {
	cursor:url(/crosshair.png), auto;
}
.isRepairable {
	cursor:url(/crosshair.png), auto;
}
.attribute {
	display: block;
}
.main-wrapper {
	border: 1px solid #303030;
	height: 830px;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: stretch;
	/* padding-top: 7.5vh; */
}
.left, .right {
	flex-grow: 0;
   	flex-shrink: 0;
	flex-basis: 21.8%;
	position: relative;
}
.middle {
	flex-grow: 0;
   	flex-shrink: 0;
  	flex-basis: 50%;
}
.left {
	order: 1;
	border-right: 1px solid #303030;
}
.middle {
	order: 2;
}
.right {
	order: 3;
	border-left: 1px solid #303030;
}
</style>
