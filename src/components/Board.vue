<template>
	<div class="main-wrapper">
		<div class="columns m-0 board-grid">
			<div class="column left p-0" :class="{'no-right-border': $store.getters.isMobile}">
				<EnemyCard @endEnemyTurn="endEnemyTurn" :playerAddress="enemyAddress" :fuel="enemyFuel" :lastTurnTimestamp="lastTurnTimestamp" :isEnemyTurn="!isMyTurn" :playerAlias="enemyAlias"/>
				<div v-if="!$store.getters.isMobile" class="chat-wrapper">					
					<div class="logs-tabs">
						<b-tabs v-model="tabsModel" @input="tabClicked" expanded class="logs-tabs">
							<b-tab-item value="logs" >
								<template #header>
									<b-icon icon="information-outline"></b-icon>
									<span> Game Log <b-tag v-if="newLogs !== 0" type="is-dark" rounded style="margin-left:6px"> {{ newLogs }} </b-tag> </span>
								</template>
								<div id="action-logs">
									<div v-for="(msg, key) in sortedLogs" :key="key">
										<div v-if="msg.playerNo === playerIs" class="chat-message" :style="{'color': (sortedLogs.length - 1) - key < newLogs ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)'}">
											{{formatAction(msg)}}
										</div>
										<div v-else-if="msg.playerNo !== playerIs" class="chat-message" :style="{'color': (sortedLogs.length - 1) - key < newLogs ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)'}">
											{{formatAction(msg)}}
										</div>
									</div>
								</div>
							</b-tab-item>
							<b-tab-item value="chat" class="logs-tabs">
								<template #header>
									<b-icon icon="forum"></b-icon>
									<span> Chat <b-tag v-if="newChats !== 0" type="is-link is-light" rounded style="margin-left:6px"> {{ newChats }} </b-tag> </span>
								</template>
								<div id="chat-logs">
									<div v-for="(msg, key) in sortedChats" :key="key">
										<div v-if="msg.msg" class="chat-message">
											<span v-if="msg.playerNo === playerIs" :class="{'newEle-left': (sortedChats.length - 1) - key < newChats}" style="color: #416BFF">You: </span>
											<span v-else :class="{'newEle-left': (sortedChats.length - 1) - key < newChats}" style="color: #C72929">Enemy: </span>
																					
											<span :class="{'newEle-right': (sortedChats.length - 1) - key < newChats}"> {{msg.msg}} </span>
										</div>
									</div>
								</div>
							</b-tab-item>
						</b-tabs>
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
			<div class="column is-narrow middle p-0">
				<div class="hex-grid-container">
					<div id="hex-grid" :style="gridProps" :class="{rotate: playerIs === 1}">
						<div class="row" v-for="(row, y) in ourState" :key="y">
							<div @mouseover="hovered = {x,y}" @click="select(col, x, y)" :class="{
								'col': true, 
								'hoverable-movable': col.type !== 'base' && col.owner === playerIs && !isLegalRepair(x,y),
								'hoverable-attackable': isLegalAttack(x,y),
								'hoverable-repairabe': isLegalRepair(x,y),
								'hoverable-approachable': isLegalMove(x,y)
								}" v-for="(col, x) in row" :key="x" :style="gridProps">
								<!-- <img v-if="selected !== undefined && ourState[selected.y][selected.x].type === 'carrier' && isLegalRepair(x,y)" :class="hexClasses(x,y)" src="green-hex.png" height="80px"/>
								<img v-else-if="selected !== undefined && ourState[selected.y][selected.x].type !== 'carrier' && isLegalAttack(x,y)" :class="hexClasses(x,y)" src="red-hex.png" height="80px"/>
								<img v-else :class="hexClasses(x,y)" src="hex.png" height="80px"/> -->
								<img :class="hexClasses(x,y)" :src="hexImg(x,y)" height="80px" :style="gridProps"/> 
								<img :class="pieceClasses(col.owner, x, y)" :src="col.img" :style="gridProps"/>
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
				<div v-if="!$store.getters.isMobile" @click="openGameGuideModal" class="clickable-text" style="text-align: center; color: #F98F09; width: fit-content; margin: 0 auto; margin-top: 30px;">Game Guide  <b-icon icon="alert-circle" size="is-small" style="margin-left: 5px; margin-top: -40px"></b-icon></div>
			</div>
			<div class="column right p-0">
				<div v-if="!$store.getters.isMobile" class="spaceship-stats">
					<center v-if="spaceshipStats.type === 'base'" style="margin-top: 25%">
						<img class="spaceship-img" :src="spaceshipStats.img"/>
						<h1 class="spaceship-type" :style="{color: spaceshipStats.owner === this.playerIs ? '#416BFF' : '#C72929'}">{{spaceshipStats.type}}</h1>
					</center>
					<center v-else>
						<img class="spaceship-img" :src="spaceshipStats.img"/>
						<h1 class="spaceship-type" :style="{color: spaceshipStats.owner === this.playerIs ? '#416BFF' : '#C72929'}">{{spaceshipStats.type}}</h1>
					</center>
					<b-progress 
						v-if="spaceshipStats.type"
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
				<PlayerCard @endTurn="endTurn" @surrender="surrender" :playerAddress="$store.state.address" :fuel="myFuel" :lastTurnTimestamp="lastTurnTimestamp" :isMyTurn="isMyTurn" :playerAlias="playerAlias"/>
				<div v-if="$store.getters.isMobile">
					<b-tabs v-model="tabsModel" @input="tabClicked" expanded size="is-small" position="is-centered" class="block mobile-tabs">
						<b-tab-item value="radar">
							<template #header>
								<b-icon custom-size="mdi-18px" icon="radar"></b-icon>
								<span> Radar </span>
							</template>
							<div id="radar">
								<div v-if="$store.getters.isMobile" class="spaceship-stats">
									<div class="columns is-mobile m-0" style="min-height: 100%">
										<div class="column is-3" style="padding: 0.7rem">
											<center>
												<img class="spaceship-img" :src="spaceshipStats.img"/>
											</center>
											<b-progress 
												v-if="spaceshipStats.type"
												class="hp-progress"
												:type="spaceshipStats.hpColor" 
												:value="spaceshipStats.hp"
												size="is-small"
												:max="spaceshipStats.maxHp">
											</b-progress>
											<h1 class="progressbar-outer-text">HP:  {{spaceshipStats.hp}} / {{ spaceshipStats.maxHp}}</h1>
										</div>
										<div class="column is-5" style="padding: 0">
											<h1 class="spaceship-type" :style="{color: spaceshipStats.owner === this.playerIs ? '#416BFF' : '#C72929'}">{{spaceshipStats.type}}</h1>
											<p class="spaceships-desc">{{spaceshipStats.desc}}</p>
										</div>
										<div class="column is-4" style="padding: 0.4rem">
											<div v-if="spaceshipStats.type !== 'base'" class="info-card">
												<center>
													<img class="info-card-icon" :src="moveInfoIcon" />
													<h1 class="info-card-text"> Moving </h1>
													<span :myTurn="!isMyTurn" class="info-card-energy">-{{spaceshipStats.moveCost}}</span>
													<img :myTurn="!isMyTurn" class="info-card-energy-icon" src="/energy.svg" width="23px"/>
												</center>
											</div>
											<div v-if="spaceshipStats.type !== 'carrier' && spaceshipStats.type !== 'base'" class="info-card">
												<center>
													<img class="info-card-icon" :src="attackInfoIcon" />
													<p class="info-card-attack-number">{{ spaceshipStats.attack }}</p>
													<h1 class="info-card-text"> Attacking </h1>
													<span :myTurn="!isMyTurn" class="info-card-energy">-{{spaceshipStats.attackCost}}</span>
													<img :myTurn="!isMyTurn" class="info-card-energy-icon" src="/energy.svg" width="23px"/>
												</center>
											</div>
											<div v-if="spaceshipStats.type === 'carrier' && spaceshipStats.type !== 'base'" class="info-card">
												<center>
													<img class="info-card-icon" :src="repairInfoIcon" />
													<p class="info-card-repair-number">25%</p>
													<h1 class="info-card-text"> Repairing </h1>
													<span :myTurn="!isMyTurn" class="info-card-energy">-{{spaceshipStats.repairCost}}</span>
													<img :myTurn="!isMyTurn" class="info-card-energy-icon" src="/energy.svg" width="23px"/>
												</center>
											</div>
											<div class="info-card"></div>
										</div>
									</div>
								</div>
							</div>
						</b-tab-item>
						<b-tab-item value="logs" >
							<template #header>
								<b-icon custom-size="mdi-18px" icon="information-outline"></b-icon>
								<span> Game Log <b-tag v-if="newLogs !== 0" type="is-link is-light" rounded style="margin-left:6px"> {{ newLogs }} </b-tag> </span>
							</template>
							<div id="action-logs">
								<div v-for="(msg, key) in sortedLogs" :key="key">
									<div v-if="msg.playerNo === playerIs" class="chat-message" :style="{'color': (sortedLogs.length - 1) - key < newLogs ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)'}">
										{{formatAction(msg)}}
									</div>
									<div v-else-if="msg.playerNo !== playerIs" class="chat-message" :style="{'color': (sortedLogs.length - 1) - key < newLogs ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)'}">
										{{formatAction(msg)}}
									</div>
								</div>
							</div>
						</b-tab-item>
						<b-tab-item value="chat" class="logs-tabs">
							<template #header>
								<b-icon custom-size="mdi-18px" icon="forum"></b-icon>
								<span> Chat <b-tag v-if="newChats !== 0" type="is-link is-light" rounded style="margin-left:6px"> {{ newChats }} </b-tag> </span>
							</template>
							<div id="chat-logs">
								<div v-for="(msg, key) in sortedChats" :key="key">
									<div v-if="msg.msg" class="chat-message">
										<span v-if="msg.playerNo === playerIs" :class="{'newEle-left': (sortedChats.length - 1) - key < newChats}" style="color: #416BFF">You: </span>
										<span v-else :class="{'newEle-left': (sortedChats.length - 1) - key < newChats}" style="color: #C72929">Enemy: </span>
																				
										<span :class="{'newEle-right': (sortedChats.length - 1) - key < newChats}"> {{msg.msg}} </span>
									</div>
								</div>
							</div>
						</b-tab-item>
						<b-tab-item value="menu" class="logs-tabs">
							<template #header>
								<b-icon custom-size="mdi-24px" icon="menu"></b-icon>
							</template>
							<div id="menu">
								<center>
									<a @click="openLeaderboard" class="button nav-btn">
										Leaderboard
									</a>
									<a @click="openProfile" class="button nav-btn">
										Profile
									</a>
								</center>
								<center>
									<a @click="confirmSurrender" class="button surrender">Surrender</a>
								</center>
							</div>
						</b-tab-item>
					</b-tabs>
					<div v-if="tabsModel === 'chat'" class="chat-input">
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
import GameGuide from '@/components/GameGuide.vue'
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
		newLogs: 0,
		newChats: 0,
		tabsModel: 'logs',
		playerProfile: undefined,
		enemyProfile: undefined,
		turnSfx: require('../assets/sfx/turn.mp3'),
		shotSfx: require('../assets/sfx/shot.mp3'),
		repairSfx: require('../assets/sfx/repair.mp3'),
		radioSfxes: [require('../assets/sfx/radio1.mp3'), require('../assets/sfx/radio2.mp3'), require('../assets/sfx/radio3.mp3')],
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
		repairIcon: require('../assets/img/repairIcon.svg'),
		blankImg: require('../assets/img/blank.gif'),
		attackInfoIcon: require('../assets/img/attack-info.svg'),
		moveInfoIcon: require('../assets/img/move-info.svg'),
		repairInfoIcon: require('../assets/img/repair-info.svg')
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
				} else {
					col.img = this.blankImg
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
				} else {
					col.img = this.blankImg
				}
			}
			return col
			})
		})
	},
	sortedLogs() {
		return arraySort([...this.log], 'index')
	},
	sortedChats() {
		return arraySort([...this.chat], 'index')
	},
	keymap () {
		return {
			'enter': this.sendMessage
		}
	},
	playerAlias() {
		if(this.playerProfile !== undefined) {
			if (this.playerProfile.playerAlias === undefined) return 'You'
			else return this.playerProfile.playerAlias.length > 0 ? this.playerProfile.playerAlias : 'You'
		} else return 'You'
	},
	enemyAlias() {
		console.log(this.enemyProfile)
		if(this.enemyProfile !== undefined) {
			if (this.enemyProfile.playerAlias === undefined) return 'Enemy'
			else return this.enemyProfile.playerAlias > 0 ?  this.enemyProfile.playerAlias : 'Enemy'
		} else return 'Enemy'
	},
	spaceshipStats() {
		let piece
		  if(this.hovered === undefined){
			  piece = this.ourState[8][4]
		  } else {
			  piece = this.ourState[this.hovered.y][this.hovered.x]
		  }
		  if(!piece.type) piece = this.ourState[8][4]
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
	  },
	  gridProps() {
		let styles = {}
		if(this.$store.getters.innerWidth > 769) {
			styles['--scale'] = 1.03
		}
		else {
			styles['--scale'] = this.$store.getters.innerWidth / 895
		}
		styles['--factor'] = 0.9 * styles['--scale']
		return styles
	  }
  },
  methods: {
	    async fetchProfile(address, isEnemy) {
            const res = await axios.get('/api/player/fetchPlayerProfile', {
                params:{
                    address: address
                }
            })
            isEnemy ? this.enemyProfile = res.data.playerDoc : this.playerProfile = res.data.playerDoc
        },
		confirmSurrender() {
            this.$buefy.dialog.confirm({
                title: 'Surrender',
                message: 'Are you sure you want to surrender? This action cannot be undone.',
                confirmText: 'Surrender',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () => this.surrender()
            })
        },
	  	surrender() {
			const winner = this.playerIs === 0 ? 1 : 0
			this.$store.commit('setWinner', winner)
			this.$store.dispatch('enqueue', () => axios.get('/api/match/surrender', {
				params:{
					signature:this.$store.state.signature,
					matchId: this.$store.state.matchId
				}
			}))
		},
		openProfile() {
          let routeData = this.$router.resolve({ name: 'Player Profile', params: { playerAddress: this.$store.state.address } })
          window.open(routeData.href, '_blank')
        },
        openLeaderboard() {
          let routeData = this.$router.resolve({ name: 'Leaderboard' })
          window.open(routeData.href, '_blank')
        },
		hexImg(x, y) {
			if(this.selected) {
				if(this.ourState[this.selected.y][this.selected.x].type === "carrier" && this.isLegalRepair(x, y)) {
					return 'green-hex.png'
				} else if(this.ourState[this.selected.y][this.selected.x].type !== "carrier" && this.isLegalAttack(x, y)) {
					return 'red-hex.png'
				} else {
					return 'hex.png'
				}
			} else {
				return 'hex.png'
			}
		},
		tabClicked(index) {
			if(index === 'logs') this.resetChats()
			else if(index === 'chat') this.resetLogs()
		},
		resetChats(){
			var container = this.$el.querySelector("#action-logs")
			container.scrollTop = container.scrollHeight
			this.newChats = 0
		},
		resetLogs() {
			var container = this.$el.querySelector("#chat-logs")
			container.scrollTop = container.scrollHeight
			this.newLogs = 0
		},
		openGameGuideModal() {
            this.$buefy.modal.open({
                component: GameGuide
            })
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
						message = 'Your unit was destroyed by the enemy\'s '  + this.capitalize(actionObj.fromPiece.type)
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
			try {
				audio.play()
			} catch(e) { console.log(e) }
		},
		playRandomRadioSfx() {
			var randRadioSfx = this.radioSfxes[Math.floor(Math.random() * this.radioSfxes.length)]
			var audio = new Audio(randRadioSfx)
			try {
				audio.play()
			} catch(e) { console.log(e) }
		},
	    endTurn() {
			this.playSound(this.turnSfx) 
            this.$store.commit('endTurn')
			this.$store.dispatch('enqueue', () => axios.get('/api/match/endTurn', {
				params:{
					signature:this.$store.state.signature,
					matchId: this.$store.state.matchId
				}
			}))
    	},
	    endEnemyTurn() {
            this.$store.commit('endTurn')
			this.$store.dispatch('enqueue', axios.get('/api/match/endEnemyTurn', {
				params:{
					signature:this.$store.state.signature,
					matchId: this.$store.state.matchId
				}
			}))
    	},
		async sendMessage() {
			if(this.chatMessage.length > 0) {
				this.tabsModel = 'chat'
				var container = this.$el.querySelector("#chat-logs")
				container.scrollTop = container.scrollHeight
				this.$store.commit('sendMessage', this.chatMessage)
				axios.get('/api/chat/sendMessage', {
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
		  if(this.$store.getters.isMobile) {
			if(piece.type) {
				this.tabsModel = undefined
				this.hovered = {x,y}
			}
		  }
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
							// this.playSound(this.turnSfx)
							this.$store.commit('endTurn')
						}
						const from = {...this.selected}
						this.$store.dispatch('enqueue', () => axios.get('/api/match/boardAction', {
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
					// this.playSound(this.turnSfx)
					this.$store.commit('endTurn')
				}
				const from = {...this.selected}
				this.$store.dispatch('enqueue', () => axios.get('/api/match/boardAction', {
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
					// this.playSound(this.turnSfx)
					this.$store.commit('endTurn')
				}
				this.$store.commit('setBoard', newState)
				const from = {...this.selected}
				this.$store.dispatch('enqueue', () => axios.get('/api/match/boardAction', {
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
		sortedLogs (newLogs, oldLogs) {
			var container = this.$el.querySelector("#action-logs")
			container.scrollTop = container.scrollHeight
			this.newLogs += newLogs.length - oldLogs.length
		},
		sortedChats (newChats, oldChats) {
			var container = this.$el.querySelector("#chat-logs")
			container.scrollTop = container.scrollHeight
			this.newChats += newChats.length - oldChats.length
			if(newChats.length > oldChats.length) this.playRandomRadioSfx()
		},
	  "$store.state.matchState" (newState, oldState) {
		if(newState.log.length !== oldState.log.length) {
			if(newState.log[newState.log.length - 1].action === 'attack') {
				this.playSound(this.shotSfx)
			} else if(newState.log[newState.log.length - 1].action === 'repair') {
				this.playSound(this.repairSfx)
			}
		}
		if(oldState.playerTurn !== newState.playerTurn) {
			this.selected = undefined
			this.playSound(this.turnSfx)
		}
	}
  },
  async created() {
	// this.boardLoading = true
	// try {
	await Promise.all([
		this.fetchProfile(this.$store.state.address, false),
		this.fetchProfile(this.enemyAddress, true)
	])
	// } finally {
	// 	this.boardLoading = false
	// }
  }
}
</script>

<style>
:root {
	--factor: calc(0.9 * var(--scale));
	--board-to-window-ratio: 0.575;
	--parcel-height: 120px;
	--parcel-number: 9;
	--parcel-width: calc(0.85 * var(--parcel-height));
	--parcel-pyramid-height: calc((var(--parcel-height) - 46px) / 2); 
}
h1 {
	margin: 0;
}
#hex-grid {
    width: calc(var(--parcel-width) * var(--parcel-number));
    margin: auto;
}
.hex-grid-container {
	transform: translate(calc(((var(--factor) * (var(--parcel-width))) / 2.2)));
	width: calc(var(--parcel-width) * var(--parcel-number));
}
.row {
	display: block;
}
.row:nth-child(even) {
	transform:translateX(calc((var(--parcel-width) / 2) * var(--factor) + ((0.7px * var(--scale)) / var(--factor)) ));
	margin-top: calc((var(--parcel-pyramid-height) * var(--factor) * -1) - ((1.8px * var(--scale)) / var(--factor))  );
	margin-bottom: calc((var(--parcel-pyramid-height) * var(--factor) * -1) - ((1.5px * var(--scale)) / var(--factor))  );
}
.col {
	display: inline;
	position: relative;
	cursor: pointer;
}
.hex-parcel {
	/* filter:invert(); */
	opacity: 0.65;
	height: calc(var(--parcel-height) * var(--factor));
	cursor: pointer;
}
.hoverable-movable:hover .hex-parcel {
	filter: invert();
	opacity: 1;
}
/* .hoverable-attackable {
	filter:invert();
	opacity: 1;
}
*/
.hoverable-repairable {
	filter:invert();
	opacity: 1;
}
.hoverable-approachable {
	filter: brightness(2);
	opacity: 1;
}
.spaceship-stats {
	/* margin: 0 auto; */
	padding: 10px;
	height: 46%;
}
.spaceship-type {
	color: #416BFF;
	font-family: 'ClashDisplay-Variable';
	font-size: 21px;
	text-transform: capitalize;
}
.spaceship-img {
	width: var(--parcel-height);
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
.progressbar-outer-text {
	font-size: 10px; 
	font-weight: 500;
	margin-left: 3px;
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
/* Show the tooltip text when you mouse over the tooltip container */
.col:hover .tooltip {
  visibility: visible;
}
.col-piece {
	position: absolute;
	opacity: 1 !important;
	left: calc(20px * var(--factor));
	bottom: calc(32.25px * var(--factor));
	height: calc(60.5px * var(--factor));
}
.move-circle {
	position: absolute;
	left: calc(30px * var(--factor));
	bottom: calc(40px * var(--factor));
	height: calc(45px * var(--factor));
	opacity: 0.3 !important;
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
	cursor:url(/attack-cursor.png), auto;
}
.isRepairable {
	cursor:url(/repair-cursor.png), auto;
}
.attribute {
	display: block;
}
.main-wrapper {
	border: 1px solid #303030;

}
.middle {
	padding: 40px 0;
}
.left {
	border-right: 1px solid #303030;
}
.right {
	border-left: 1px solid #303030;
}
.chat-wrapper {
	height: 47.4%;
}
.chat-input {
	height: 55px;
}
.chat-btn {
	background: black !important;
	border-radius: 0px !important;
    border-top: 1px solid #303030 !important;
	border-right: 1px solid black !important;
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
#chat-logs {
    height: 90%;
    padding-bottom: 10px;
	overflow: scroll;
}
#action-logs {
    height: 90%;
    padding-bottom: 10px;
	overflow: scroll;
}
.logs-tabs {
	height: 100%;
	padding: 10px;
}
.b-tabs .tab-content {
	height: 100% !important;
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
.newEle-right {
	background: rgba(249, 143, 9, .2);
    padding: 5px;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
}
.newEle-left {
	background: rgba(249, 143, 9, .2);
    padding: 5px;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
}
.loading-wrapper {
  background: black;
  height: 100vh;
  width: 100vw;
}
.no-right-border {
	border-right: none;
}
.mobile-tabs {
	padding-top: 2px;
}



/* tabs customization */
.tabs ul {
	border-bottom-color: #303030 !important;
}
.tabs a {
	border-bottom-color: #303030 !important;
}
.tabs li.is-active a {
    border-bottom-color: #416BFF !important;
    color: #416BFF !important;
}
.tabs a:hover {
    border-bottom-color: #474747 !important;
    color: #474747 !important;
}
/* a#\32 3-label {
	border-bottom-color: #303030 !important;
}
a#\32 1-label {
	border-bottom-color: #303030 !important;
} */
a#\32 3-label:active {
	border-bottom-color: #416BFF !important;
}
a#\32 1-label:active {
	border-bottom-color: #416BFF !important;
}
</style>
