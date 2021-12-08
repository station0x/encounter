<template>
	<div class="main-wrapper">
		<div class="left">
			<EnemyCard @endEnemyTurn="endEnemyTurn" :playerAddress="enemyAddress" :fuel="enemyFuel" :lastTurnTimestamp="lastTurnTimestamp" :isEnemyTurn="!isMyTurn"/>
			<div class="chat-wrapper">
				<div id="logs">
					<div v-for="(msg, key) in sortedLogsAndChats" :key="key">
						<div class="chat-message">
							{{ formatMsg(msg) }}
						</div>
					</div>
					
				</div>
				<div class="chat-input">
					<b-field>
						<!-- <b-input @focus="chatMessage = ''" v-model="chatMessage" :custom-class="{'chat-textarea': true, 'chat-placeholder-color': chatMessage === 'Please be nice in chat!'}" size="is-small" expanded></b-input> -->
						<b-input v-on:keyup.native.enter="sendMessage" v-model="chatMessage" custom-class="chat-textarea" size="is-small" expanded></b-input>
						<p class="control">
							<b-button class="chat-btn" @click="sendMessage" label="Send"></b-button>
						</p>
					</b-field>
				</div>
			</div>
		</div>
		<div class="middle">
			<div id="hex-grid" :class="{rotate: playerIs === 1}">
				<div class="row" v-for="(row, y) in ourState" :key="y">
					<div @mouseover="hovered = {x,y}" @click="select(col, x, y)" class="col" v-for="(col, x) in row" :key="x">
						<img :class="hexClasses(x,y)" src="hex.png" height="80px"/>
						<img :class="pieceClasses(col.owner, x, y)" :src="col.img"/>
						<img v-if="isLegalMove(x,y)" class="move-circle" src="circle.png"/>
						<!-- <div v-if="col.type" class="tooltip">
							<div class="spaceship-type">{{ col.type }}</div>
							<span class="attribute" v-for="(value, key) in getSpaceshipAttributes(col)" :key="key">
							{{key}}: {{value}}
							</span>
						</div> -->
					</div>
				</div>
			</div>
		</div>
		<div class="right">
			<div v-if="spaceshipStats.type" class="spaceship-stats">
				<center>
					<img class="spaceship-img" :src="spaceshipStats.img"/>
					<h1 class="spaceship-type" :style="{color: spaceshipStats.owner === this.playerIs ? '#416BFF' : '#C72929'}">{{spaceshipStats.type}}</h1>
				</center>
				<b-progress 
					class="hp-progress"
					:type="spaceshipStats.hpColor" 
					:value="spaceshipStats.hp"
					:max="spaceshipStats.maxHp"
					show-value>
					<h1 class="progressbar-text">HP:  {{spaceshipStats.hp}} / {{ spaceshipStats.maxHp}}</h1>
				</b-progress>
				<h1 v-if="spaceshipStats.type !== 'base'" style="color: white; font-size: 17px; text-align: left; margin: 0px 20px 10px 20px;font-family: 'ClashDisplay-Variable';">Abilities</h1>
				<div v-if="spaceshipStats.type !== 'base'" class="ability move">
					<img class="ability-icon" :src="moveIcon"/>
					<div class="ability-text" style="color: #EFC97F">Move</div>
					<span class="energy-ability">{{spaceshipStats.moveCost}}</span>
					<img class="energy-icon-ability" src="/energy.svg" width="23px"/>
				</div>
				<div v-if="spaceshipStats.type !== 'carrier' && spaceshipStats.type !== 'base'" class="ability attack">
					<img class="ability-icon" :src="attackIcon"/>
					<div class="ability-text" style="color: #FF4949">Attack {{spaceshipStats.attack}}</div>
					<span class="attack-ability">{{spaceshipStats.attackCost}}</span>
					<img class="energy-icon-ability" src="/energy.svg" width="23px"/>
				</div>
				<div v-if="spaceshipStats.type === 'carrier' && spaceshipStats.type !== 'base'" class="ability repair">
					<img class="ability-icon" :src="repairIcon"/>
					<div class="ability-text" style="color: #348227">Repair 25%</div>
					<span class="attack-ability">{{spaceshipStats.repairCost}}</span>
					<img class="energy-icon-ability" src="/energy.svg" width="23px"/>
				</div>
			</div>
			<PlayerCard @endTurn="endTurn" @surrender="surrender" :playerAddress="$store.state.address" :fuel="myFuel" :lastTurnTimestamp="lastTurnTimestamp" :isMyTurn="isMyTurn"/>
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
import arraySort from 'array-sort'

export default {
  name: 'Board',
  props:['state','playerIs', 'playerTurn', 'fuel0', 'fuel1', 'turnNum', 'chat', 'log', 'lastTurnTimestamp'],
  data() {
	return {
		selected: undefined,
		hovered: undefined,
		chatMessage: '',
		sendingMsg: false,
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
		},
		moveIcon: require('../assets/img/moveIcon.svg'),
		attackIcon: require('../assets/img/attackIcon.svg'),
		repairIcon: require('../assets/img/repairIcon.svg')
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
	sortedLogsAndChats() {
		return arraySort([...this.chat, ...this.log], 'index')
	},
	keymap () {
		return {
			'enter': this.sendMessage
		}
	},
	spaceshipStats() {
		  if(this.hovered === undefined){
			  return {}
		  }
		  const piece = this.ourState[this.hovered.y][this.hovered.x]
		  if(!piece.type) return {}
		  piece.maxHp = CONSTANTS.spaceshipsAttributes[piece.type].hp
		  piece.attack = CONSTANTS.spaceshipsAttributes[piece.type].attack
		  piece.moveCost = CONSTANTS.spaceshipsAttributes[piece.type].moveFuelCost
		  if(piece.type === 'carrier') piece.repairCost = CONSTANTS.spaceshipsAttributes[piece.type].repairFuelCost
		  else piece.attackCost = CONSTANTS.spaceshipsAttributes[piece.type].attackFuelCost
		  piece.hpPercentage = Math.floor(piece.hp / piece.maxHp * 100)
		  piece.hpColor = 'is-success'
		  if(piece.hpPercentage < 50) piece.hpColor = 'is-danger'
		  else if(piece.hpPercentage < 100) piece.hpColor = 'is-warning'

		  return piece
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
			this.$store.dispatch('enqueue', () => axios.get('/api/surrender', {
				params:{
					signature:this.$store.state.signature,
					matchId: this.$store.state.matchId
				}
			}))
		},
		formatMsg(msgObj) {
			let suffix = ''
			if(msgObj.msg) {
				if(msgObj.playerNo === this.playerIs) {
					suffix = 'You: '
				} else {
					suffix = 'Enemy: '
				}
				return suffix + msgObj.msg
			} else if(msgObj.action) {
				if(msgObj.playerNo === this.playerIs) {
					suffix = ''
				} else {
					suffix = ''
				}
				return suffix + this.formatAction(msgObj)
			}
		},
		formatAction(actionObj) {
			let message = ''
			if(actionObj.playerNo === this.playerIs) {
				if(actionObj.action === 'attack') {
					if(actionObj.toPiece.type) {
						message = 'Your ' + this.capitalize(actionObj.fromPiece.type) + ' attacked the enemy\'s ' + this.capitalize(actionObj.toPiece.type)
					} else if(!actionObj.toPiece.type && actionObj.fromPiece.type){
						message = 'Your '+ this.capitalize(actionObj.fromPiece.type) + ' destroyed the enemy\'s unit'
					}
				} else if(actionObj.action === 'repair') {
					message = 'Your ' + this.capitalize(actionObj.fromPiece.type) + ' repaired your ' + this.capitalize(actionObj.toPiece.type)
				}
			} else {
				if(actionObj.action === 'attack') {
					if(actionObj.toPiece.type) {
						message = 'Your ' + this.capitalize(actionObj.toPiece.type) + ' was attacked by the enemy\'s ' + this.capitalize(actionObj.fromPiece.type)
					} else if(!actionObj.toPiece.type && actionObj.fromPiece.type) {
						message = 'Your unit was destroyed by the enemy\'s'  + this.capitalize(actionObj.fromPiece.type)
					}
				} else if(actionObj.action === 'repair') {
					message = 'Your enemy\'s ' + this.capitalize(actionObj.toPiece.type) + ' was repaired by their ' + this.capitalize(actionObj.fromPiece.type)
				}
			}
			return message
		},
		capitalize(str) {
			if(str) {
				const lower = str.toLowerCase()
				return str.charAt(0).toUpperCase() + lower.slice(1)
			}
			return str
		},
	    playSound(sfx) {
			var audio = new Audio(sfx)
			audio.play()
		},
	    endTurn() {
            this.$store.commit('endTurn')
			this.$store.dispatch('enqueue', () => axios.get('/api/endTurn', {
				params:{
					signature:this.$store.state.signature,
					matchId: this.$store.state.matchId
				}
			}))
    	},
	    endEnemyTurn() {
            this.$store.commit('endTurn')
			this.$store.dispatch('enqueue', axios.get('/api/endEnemyTurn', {
				params:{
					signature:this.$store.state.signature,
					matchId: this.$store.state.matchId
				}
			}))
    	},
		async sendMessage() {
			if(this.chatMessage.length > 0) {
				this.$store.commit('sendMessage', this.chatMessage)
				var container = this.$el.querySelector("#logs")
				container.scrollTop = container.scrollHeight
				axios.get('/api/sendMessage', {
					params:{
						signature:this.$store.state.signature,
						matchId: this.$store.state.matchId,
						message: this.chatMessage
					}
				})
				this.chatMessage = ""
			}
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
						newState[this.selected.y][this.selected.x].lastRepairTurn = this.turnNum
						this.$store.commit('setBoard', newState)
						if(this.myFuel - fuelCost === 0) {
							this.$store.commit('endTurn')
						}
						const from = {...this.selected}
						this.$store.dispatch('enqueue', () => axios.get('/api/boardAction', {
							params:{
								signature:this.$store.state.signature,
								matchId: this.$store.state.matchId,
								action: 'repair',
								from,
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
				newState[this.selected.y][this.selected.x].lastAttackTurn = this.turnNum
				this.$store.commit('setBoard', newState)
				if(this.myFuel - fuelCost === 0) {
					this.$store.commit('endTurn')
				}
				const from = {...this.selected}
				this.$store.dispatch('enqueue', () => axios.get('/api/boardAction', {
					params:{
						signature:this.$store.state.signature,
						matchId: this.$store.state.matchId,
						action: 'attack',
						from,
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
				}
				this.$store.commit('setBoard', newState)
				const from = {...this.selected}
				this.$store.dispatch('enqueue', () => axios.get('/api/boardAction', {
					params:{
						signature:this.$store.state.signature,
						matchId: this.$store.state.matchId,
						action: 'move',
						from,
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
	  sortedLogsAndChats () {
		var container = this.$el.querySelector("#logs")
		container.scrollTop = container.scrollHeight;
	  },
	  "$store.state.matchState" (newState, oldState) {
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
		attacks.forEach(v => {
			this.playSound(this.shotSfx)
		})
		destroys.forEach(v => {
			this.playSound(this.shotSfx)
		})
		repairs.forEach(v => {
			this.playSound(this.repairSfx)
		})

		if(oldState.playerTurn !== newState.playerTurn) {
			this.selected = undefined
			this.playSound(this.turnSfx)
		}
	}
  }
}
</script>

<style>
:root {
	--scale: 0.87;
}
h1 {
	margin: 0;
}
#hex-grid {
	margin-left: 0px !important;
	margin-top: 30px !important;
    width: fit-content;
    margin: 0 auto;
}
.row {
	display: block;
}
.row:nth-child(even) {
	transform:translateX(calc(52.5px * var(--scale)));
	margin-top: calc(-36.4px * var(--scale));
	margin-bottom: calc(-36.4px * var(--scale));
}
.col {
	display: inline;
	position: relative;
	cursor: pointer;
}
.hex-parcel {
	/* filter:invert(); */
	opacity: 0.65;
	height: calc(120px * var(--scale));
	cursor: pointer;
}
.col:hover .hex-parcel {
	filter:invert();
	opacity: 1;
}
.spaceship-stats {
	margin: 0 auto;
	padding: 10px;
}
.spaceship-type {
	color: #416BFF;
	font-family: 'ClashDisplay-Variable';
	font-size: 21px;
	text-transform: capitalize;
}
.spaceship-img {
	width: 120px;
	margin: 10px 20px 0px 20px;
}
.hp-progress {
	margin: 10px 20px 5px 20px;
}
.progressbar-text {
	color: black; 
	font-size: 12px; 
	font-weight: 500;
}
.ability {
	box-sizing: border-box;
	border-radius: 4px;
	width: 67%;
	margin: 0 auto;
	height: 42px;
	padding: 5px;
	margin-bottom: 13px;
}
.move {
	border: 0.5px solid #EFC97F;
}
.attack {
	border: 0.5px solid #FF4949;
}
.repair {
	border: 0.5px solid #348227;
}
.ability-icon {
	width: 20px;
	margin: 5.5px;
}
.ability-text {
	font-family: 'ClashDisplay-Variable';
    margin-top: -18px;
    font-size: 16px;
    margin-left: 10px;
    display: inline-block;
    line-height: 42px;
    vertical-align: middle;
}
.energy-ability {
	font-family: 'ClashDisplay-Variable';
	line-height: 42px;
    vertical-align: middle;
    display: inline-block;
    margin-top: -18px;
    font-size: 20px;
    margin-left: 35%;
	color: #EFC97F;
}
.attack-ability {
	font-family: 'ClashDisplay-Variable';
	line-height: 42px;
    vertical-align: middle;
    display: inline-block;
    margin-top: -18px;
    font-size: 20px;
    margin-left: 20%;
	color: #EFC97F;
}
.energy-icon-ability {
	margin-bottom: 5px;
	margin-right: -50px;
	height: 17px;
	display: inline-block;
}
/* .col .tooltip {
    visibility: hidden;
    width: 270px;
    background-color: black !important;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    position: absolute;
    left: -80px;
    border-radius: 5px;
    border: 1px solid white;
	opacity: 1;
    height: 300px;
    padding: 20px;
	z-index: 10;
}
.bottomTooltip {
	bottom: 125px;
}
.topTooltip {
	bottom: 0px;
	transform: translateY(150px);
} */
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
	opacity: 1;
	filter: invert();
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
	flex-grow: 1;
   	flex-shrink: 0;
	/* min-width: 890px; */
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
.chat-wrapper {
	height: 52%;
    width: 100%;
    bottom: 0;
    position: absolute;
	padding: 20px;
}
.chat-input {
	height: 55px;
	width: 100%;
	bottom: 0;
	position: absolute;
	left: 0;
}
.chat-btn {
	background: black !important;
	border-radius: 0px !important;
    border-top: 1px solid #303030 !important;
	border-right: 1px solid #303030 !important;
	border-bottom: 1px solid #303030 !important;
	border-left: none !important;
	height: 55px !important;
	padding: 14px;
	color: white !important;
	font-size: 14px !important;
	font-weight: 500;
	right: 0 !important;
}
.chat-btn:hover {
	border: 1px solid white !important;
}
.chat-textarea {
	background: black;
}
input.input.is-small.chat-textarea {
    background: black;
    border-top: 1px solid #303030;
	border-left: 1px solid #303030;
	border-bottom: 1px solid #303030;
	border-right: none;
	font-size: 15px;
	height: 55px;
	padding: 14px;
	color: white;
}
input.input.is-small.chat-textarea:focus {
	box-shadow: none;
}
input[placeholder], [placeholder], *[placeholder] {
    color: white;
}
.control.is-small.is-clearfix {
	width: calc(100% - 60px);
}
#logs {
    height: 90%;
    padding-bottom: 10px;
	overflow: scroll;
}
.chat-message {
	background: black;
	padding: 3px 0px;
	color: rgba(255,255,255,0.5);
}
.chat-placeholder-color {
	color: rgba(255,255,255,0.4) !important;
}
img {
    -khtml-user-select: none;
    -o-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
}
</style>
