<template>
	<div class="main-wrapper">
		<div class="left">
			<EnemyCard playerAddress="0x6BDD6Bb68Ec6927F56749b46746F0AFA7CdA9F3c"/>
		</div>
		<div class="middle">
			<div id="hex-grid" :class="{rotate: playerIs === 1}">
				<div class="row" v-for="(row, y) in ourState" :key="y">
					<div @click="select(col, x, y)" class="col" v-for="(col, x) in row" :key="x">
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
			<PlayerCard playerAddress="0x6BDD6Bb68Ec6927F56749b46746F0AFA7CdA9F3c"/>
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
		selected:undefined
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
				if(col.type === "base") {
					col.img = "/base.png"
				}
				else if(col.type == "fighter") {
					col.img = "/fighter.png"
				}
				else if(col.type == "scout") {
					col.img = "/scout.png"
				}
				else if(col.type == "destroyer") {
					col.img = "/destroyer.png"
				}
				else if(col.type == "carrier") {
					col.img = "/carrier.png"
				}
				else if(col.type == "gunship") {
					col.img = "/gunship.png"
				}
				return col
			  })
		  })
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
	    endTurn() {
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
			classes += "enemy "
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
						this.selected = undefined
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
				this.selected = undefined
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
				this.selected = undefined
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
  }
}
</script>

<style>
h1 {
	margin: 0;
}
#hex-grid {
	margin-left: -56px !important;
    width: fit-content;
    margin: 0 auto;
	min-width: 110%;
}
.row {
	display: block;
}
.row:nth-child(even) {
	transform:translateX(52.5px);
	margin-top:-37.5px;
	margin-bottom:-37.5px;
}
.col {
	display: inline;
	position: relative;
}
.hex-parcel {
	filter:invert();
	opacity: 0.3;
	height: 120px;
	cursor: pointer;
}
.col:hover .hex-parcel {
	opacity: 1;
	
}
.col .tooltip {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: 15px;
  left: -25px;
}

/* Show the tooltip text when you mouse over the tooltip container */
.col:hover .tooltip {
  visibility: visible;
}
.col-piece {
	position: absolute;
	opacity: 1 !important;
	left: 18.75px;
	bottom: 26.25px;
	height: 67.5px;
}

.move-circle {
	position: absolute;
	opacity: 1 !important;
	left: 30px;
	bottom: 40px;
	height: 45px;
	opacity: 0.6 !important;
}
.enemy {
	filter: sepia(1) hue-rotate(270deg) saturate(100);
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
	border: 1px solid #797979;
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
	border-right: 1px solid #797979;
}
.middle {
	order: 2;
}
.right {
	order: 3;
	border-left: 1px solid #797979;
}
</style>
