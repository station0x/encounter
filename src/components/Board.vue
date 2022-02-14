<template>
	<div class="main-wrapper">
		<div class="columns m-0 board-grid">
			<div class="column left p-0" :class="{'no-right-border': $store.getters.isMobile}">
				<EnemyCard @endEnemyTurn="endEnemyTurn" :playerAddress="enemyAddress" :fuel="enemyFuel" :lastTurnTimestamp="lastTurnTimestamp" :isEnemyTurn="!isMyTurn" :playerAlias="enemyAlias" :playerElo="enemyElo"/>
				<div v-if="!$store.getters.isMobile" class="chat-wrapper">					
					<div class="logs-tab-wrapper">
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
				</div>
				<div v-if="tabsModel === 'chat'" class="chat-input">
					<b-field>
						<b-input v-on:keyup.native.enter="sendMessage" v-model="chatMessage" custom-class="chat-textarea" size="is-small" expanded></b-input>
						<p class="control">
							<b-button class="chat-btn" @click="sendMessage" label="Send"></b-button>
						</p>
					</b-field>
				</div>
			</div>
			<div class="column is-narrow middle p-0">
				<div class="hex-grid-container">
					<div id="hex-grid" :style="gridProps" :class="{rotate: playerIs === 1}">
						<div class="row" v-for="(row, y) in ourState" :key="y">
							<div @mouseover="hoverPiece(x,y)" @click="confirmFriendlyFire(col, x, y)" :class="{
								'col': true, 
								'hoverable-movable': col.type !== 'base' && col.owner === playerIs && !isLegalRepair(x,y),
								'hoverable-attackable': isLegalAttack(x,y),
								'hoverable-repairable': isLegalRepair(x,y),
								'hoverable-approachable': isLegalMove(x,y)
								}" v-for="(col, x) in row" :key="x" :style="gridProps">
								<img :ref="parseHexID(x,y)" :class="hexClasses(x,y)" :src="hexImg(x,y)" height="80px" :style="gridProps"/> 
								<img :class="pieceClasses(col.owner, x, y)" :src="col.img" :style="gridProps"/>
								<img v-if="isLegalMove(x,y)" class="move-circle" src="circle.png"/>
							</div>
						</div>
					</div>
				</div>
				<div v-if="!$store.getters.isMobile" @click="openGameGuideModal" class="clickable-text" style="text-align: center; color: #F98F09; width: fit-content; margin: 0 auto; margin-top: 30px;">Game Guide  <b-icon icon="alert-circle" size="is-small" style="margin-left: 5px; margin-top: -40px"></b-icon></div>
			</div>
			<div class="column right p-0" style="min-width: 289px">
				<div v-if="!$store.getters.isMobile" class="spaceship-stats">
					<center v-if="spaceshipStats.type === 'base'" style="margin-top: 20%">
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
					<p class="spaceships-desc">{{ spaceshipStats.desc }}</p>
					<h1 v-if="spaceshipStats.type !== 'base'" style="color: white; font-size: 17px; text-align: left; margin: 0px 20px 10px 20px;font-family: 'Roboto';">Abilities</h1>
					<div v-if="spaceshipStats.type !== 'base'" class="info-card">
							<img class="info-card-icon" :src="moveInfoIcon" />
							<p class="info-card-move-number">1</p>
							<h1 class="info-card-text"> Move </h1>
							<span :myTurn="!isMyTurn" class="info-card-energy">-{{spaceshipStats.moveCost}}</span>
							<img :myTurn="!isMyTurn" class="info-card-energy-icon" src="/energy.svg" width="23px"/>
					</div>
					<div v-if="spaceshipStats.type !== 'salvation' && spaceshipStats.type !== 'base'" class="info-card">
							<img class="info-card-icon" :src="attackInfoIcon" />
							<p class="info-card-attack-number">{{ spaceshipStats.attack }}</p>
							<h1 class="info-card-text"> Attack </h1>
							<span :myTurn="!isMyTurn" class="info-card-energy">-{{spaceshipStats.attackCost}}</span>
							<img :myTurn="!isMyTurn" class="info-card-energy-icon" src="/energy.svg" width="23px"/>
					</div>
					<div v-if="spaceshipStats.type === 'salvation' && spaceshipStats.type !== 'base'" class="info-card">
							<img class="info-card-icon" :src="repairInfoIcon" />
							<p class="info-card-repair-number">25%</p>
							<h1 class="info-card-text"> Repair </h1>
							<span :myTurn="!isMyTurn" class="info-card-energy">-{{spaceshipStats.repairCost}}</span>
							<img :myTurn="!isMyTurn" class="info-card-energy-icon" src="/energy.svg" width="23px"/>
					</div>
					<div v-if="spaceshipStats.type === 'orkocraft'" class="info-card">
						<img class="info-card-icon" :src="shockInfoIcon" />
						<p class="info-card-shock-number">{{spaceshipStats.attack}}</p>
						<h1 class="info-card-text"> Shock </h1>
						<span class="info-card-energy">-{{spaceshipStats.attackCost}}</span>
						<img class="info-card-energy-icon" src="/energy.svg" width="23px"/>
					</div>
				</div>
				<PlayerCard @endTurn="endTurn" @surrender="surrender" :playerAddress="$store.state.address" :fuel="myFuel" :lastTurnTimestamp="lastTurnTimestamp" :isMyTurn="isMyTurn" :playerAlias="playerAlias" :playerElo="playerElo"/>
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
													<h1 class="info-card-text"> Move </h1>
													<span :myTurn="!isMyTurn" class="info-card-energy">-{{spaceshipStats.moveCost}}</span>
													<img :myTurn="!isMyTurn" class="info-card-energy-icon" src="/energy.svg" width="23px"/>
												</center>
											</div>
											<div v-if="spaceshipStats.type !== 'salvation' && spaceshipStats.type !== 'base'" class="info-card">
												<center>
													<img class="info-card-icon" :src="attackInfoIcon" />
													<p class="info-card-attack-number">{{ spaceshipStats.attack }}</p>
													<h1 class="info-card-text"> Attack </h1>
													<span :myTurn="!isMyTurn" class="info-card-energy">-{{spaceshipStats.attackCost}}</span>
													<img :myTurn="!isMyTurn" class="info-card-energy-icon" src="/energy.svg" width="23px"/>
												</center>
											</div>
											<div v-if="spaceshipStats.type === 'salvation' && spaceshipStats.type !== 'base'" class="info-card">
												<center>
													<img class="info-card-icon" :src="repairInfoIcon" />
													<p class="info-card-repair-number">25%</p>
													<h1 class="info-card-text"> Repair </h1>
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

</template>

<script>
import axios from 'axios'
import CONSTANTS from "../../constants.json"
import PlayerCard from "@/components/PlayerCard.vue"
import EnemyCard from "@/components/EnemyCard.vue"
import GameGuide from '@/components/GameGuide.vue'
import arraySort from 'array-sort'
import { isOccupied, legalAttacks, legalMoves, legalRepairs, legalShockable, parseHexID } from '../../common/board'

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
		moveIcon: require('../assets/img/moveIcon.svg'),
		attackIcon: require('../assets/img/attackIcon.svg'),
		repairIcon: require('../assets/img/repairIcon.svg'),
		blankImg: require('../assets/img/blank.gif'),
		attackInfoIcon: 'https://res.cloudinary.com/station0x/image/upload/v1644548304/encouter/elements/icons/attack_kwg82o.svg',
		moveInfoIcon: 'https://res.cloudinary.com/station0x/image/upload/v1644548304/encouter/elements/icons/move_hngi7m.svg',
		repairInfoIcon: 'https://res.cloudinary.com/station0x/image/upload/v1644549515/encouter/elements/icons/repair_lj60dt.svg',
		shockInfoIcon: 'https://res.cloudinary.com/station0x/image/upload/v1644548304/encouter/elements/icons/shock_fiygbi.svg'
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
				col.img = col.type ? require(`../assets/blue/${col.type}.png`) : this.blankImg
			} else if (col.owner !== this.playerIs) {
				col.img = col.type ? require(`../assets/red/${col.type}.png`) : this.blankImg
			}
			return col
			})
		})
	},
	sortedLogs() {
		return arraySort([...this.log], 'index').filter((log) => log.action !== 'move')
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
		if(this.enemyProfile !== undefined) {
			if (this.enemyProfile.playerAlias === undefined) return 'Enemy'
			else return this.enemyProfile.playerAlias.length > 0 ?  this.enemyProfile.playerAlias : 'Enemy'
		} else return 'Enemy'
	},
	playerElo() {
		if(this.playerProfile !== undefined) return this.playerProfile.elo
		else return 0
	},
	enemyElo() {
		if(this.enemyProfile !== undefined) return this.enemyProfile.elo
		else return 0
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
		  piece.attack = CONSTANTS.spaceshipsAttributes[piece.type].attack + (piece.bonusAttack || 0)
		  piece.moveCost = CONSTANTS.spaceshipsAttributes[piece.type].moveFuelCost
		  piece.desc = CONSTANTS.spaceshipsAttributes[piece.type].desc
		  if(piece.type === 'salvation') piece.repairCost = CONSTANTS.spaceshipsAttributes[piece.type].repairFuelCost
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
		const moveHpCost = attributes.moveHpCost || false
		if(moveHpCost) {
			const hp = [...this.state][this.selected.y][this.selected.x].hp
			const newHp = hp - moveHpCost;
			return newHp > 0
		} else {
			return this.myFuel >= attributes.moveFuelCost;
		}
	  },
	  canAttack() {
		if(!this.selected || !this.isMyTurn) return false
		const type = this.state[this.selected.y][this.selected.x].type
		if(!type) return false
		const attributes = CONSTANTS.spaceshipsAttributes[type]
		return this.myFuel >= attributes.attackFuelCost
	  },
	  canRepair() {
		if(!this.selected || !this.isMyTurn) return false
		const type = this.state[this.selected.y][this.selected.x].type
		if(!type) return false
		const attributes = CONSTANTS.spaceshipsAttributes[type]
		return this.myFuel >= attributes.repairFuelCost
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
		if(this.$store.getters.innerWidth > 1500) {
			styles['--scale'] = 1.03
		}
		else if(this.$store.getters.innerWidth < 1500 &&  this.$store.getters.innerWidth > 769) {
			styles['--scale'] = 0.8
		}
		else {
			styles['--scale'] = this.$store.getters.innerWidth / 895
		}
		styles['--factor'] = 0.9 * styles['--scale']
		return styles
	  },
	  shockablePieces () {
		  if(this.hovered !== undefined && this.selected !== undefined) {
			if(CONSTANTS.spaceshipsAttributes[this.state[this.selected.y][this.selected.x].type].shock) {
				if(this.isLegalAttack(this.hovered.x, this.hovered.y)) {
						let targets = new Set()
						let shockable = legalShockable(this.state, targets, parseHexID(this.selected.x, this.selected.y), parseHexID(this.hovered.x, this.hovered.y), this.playerIs)
						let legalTargets = [...shockable].map((target) => { return { x: parseInt(target[1]), y: parseInt(target[0]) } })
						return legalTargets
					} else return {}
				} else return {}
		   } else return {}
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
		confirmFriendlyFire(piece, x, y) {
			let state = this.state
			if(this.selected !== undefined && (this.selected.x !== x || this.selected.y !== y) && CONSTANTS.spaceshipsAttributes[state[this.selected.y][this.selected.x].type].shock && state[y][x].owner === this.playerIs) {
				this.$buefy.dialog.confirm({
					title: 'Friendly Fire!',
					message: `Are you sure you want to attack your own ${piece.type}?`,
					confirmText: 'Yes, attack!',
					type: 'is-danger',
					hasIcon: true,
					onConfirm: () => this.select(piece, x, y)
				})
			} else {
				this.select(piece, x, y)
			}
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
		hoverPiece(x,y) {
			this.hovered = { x,y }
		},
		hexImg(x, y) {
			if(this.shockablePieces.length > 0) {
				if(this.shockablePieces.some(target => target.x === x && target.y === y)) {
					if(this.hovered.x === x && this.hovered.y === y) return 'red-hex.png'
					else return 'electro.png'
				}
			}
			if(this.selected) {
				if(this.ourState[this.selected.y][this.selected.x].type === "salvation" && this.isLegalRepair(x, y)) {
					return 'green-hex.png'
				} else if(this.ourState[this.selected.y][this.selected.x].type !== "salvation" && this.isLegalAttack(x, y)) {
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
				message += 'Your '
			} else {
				message += "The enemy's "
			}

			message += this.capitalize(actionObj.fromPiece.type)

			if(actionObj.action === 'attack') {
				if(actionObj.toPiece.type) {
					message += " attacked "
				} else if(!actionObj.toPiece.type && actionObj.fromPiece.type){
					message += " destroyed "
				}
			} else if(actionObj.action === 'repair') {
				message += " repaired "
			}

			if(actionObj.action === 'attack') {
				if(actionObj.playerNo === this.playerIs) {
					message += "the enemy's "
				} else {
					message += "your "
				}
			} else if(actionObj.action === 'repair') {
				if(actionObj.playerNo === this.playerIs) {
					message += "your "
				} else {
					message += "his "
				}
			}
			message += actionObj.toPiece.type ? this.capitalize(actionObj.toPiece.type) : this.capitalize(actionObj.destroyed)
			return message
		},
		capitalize(str) {
			if(str) {
				const lower = str.toLowerCase()
				return str.charAt(0).toUpperCase() + lower.slice(1)
			}
			return str
		},
		// formASentence(words) {
		// 	if(words.length === 1) return `${this.capitalize(words[0])}.`
		// 	else {
		// 		let sentence = ''
		// 		for(let i=0; i<words.length; i++) {
		// 			if(i === words.length - 1) {
		// 				sentence += `and ${this.capitalize(words[i])}.`
		// 			} else {
		// 				sentence += `${this.capitalize(words[i])}, `
		// 			}
		// 		}
		// 		return sentence
		// 	}
		// },
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
			if(!this.selected || !this.isMyTurn || !this.canMove) return false
			return legalMoves(this.state, this.selected.x, this.selected.y, this.turnNum).filter(move => move.x === x && move.y === y).length > 0
	  },
	  isLegalAttack(x,y) {
		  	if(!this.selected || !this.isMyTurn || !this.canAttack) return false
			return legalAttacks(this.state, this.selected.x, this.selected.y, this.turnNum).filter(move => move.x === x && move.y === y).length > 0
	  },
	  isLegalRepair(x,y) {
			if(!this.selected || !this.isMyTurn || !this.canRepair) return false
			return legalRepairs(this.state, this.selected.x, this.selected.y, this.turnNum).filter(move => move.x === x && move.y === y).length > 0
	  },
	  isLegalShockable(x, y) {
		  	if(!this.selected || !this.isMyTurn || !this.canAttack) return false
			if(isOccupied(this.state, x, y)) {
				let targets = new Set()
				let shockable = legalShockable(this.state, targets, parseHexID(this.selected.x, this.selected.y), parseHexID(x, y), this.playerIs)
				return [...shockable].map((target) => { return { x: parseInt(target[1]), y: parseInt(target[0]) } }).filter(target => target.x === x && target.y === y).length > 0
			} else return false
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
	  parseHexID(x,y) {
		  return parseHexID(x, y)
	  },
	  select(piece, x, y) {
		  const newState = [...this.state]
		  if(this.$store.getters.isMobile) {
			if(piece.type) {
				this.tabsModel = undefined
				this.hovered = {x,y}
			}
		  }
		  if(!this.isMyTurn) return
		  if(piece.type) { // if column contains a piece
			if(this.selected && CONSTANTS.spaceshipsAttributes[newState[this.selected.y][this.selected.x].type].shock) {
				if(this.selected && this.selected.x === x && this.selected.y === y) { // if this is the selected piece
					this.selected = undefined // unselect
				} else {
					if(this.isLegalAttack(x,y)) {
						this.attackPiece(x, y)
					} else {	
						if(piece.type != "base" &&  this.isLegalAttack(x,y) || piece.owner === this.playerIs) { // if not base
							this.selected = { // select piece
								x,
								y
							}
						}
					}
				}
			} else {
				if(piece.owner === this.playerIs){ // if piece is mine
					if(this.selected && this.selected.x === x && this.selected.y === y) { // if this is the selected piece
						this.selected = undefined // unselect
					} else { // if piece is not selected
						if(this.isLegalRepair(x,y) && piece.type != "base") { // if piece is a legal repair (except base)
							this.repairPiece(x, y)
						} else if(piece.type != "base") { // if not base
							this.selected = { // select piece
								x,
								y
							}
						}
					}
				} else if(this.isLegalAttack(x,y)) { // if piece is not mine but is a legal attack
					this.attackPiece(x, y)
				}
			}
		} else {
			if(this.isLegalMove(x,y)) {
				this.movePiece(x, y)
			}
		}
	  },
	  movePiece(x, y) {
		const newState = [...this.state]
		const fuelCost = CONSTANTS.spaceshipsAttributes[newState[this.selected.y][this.selected.x].type].moveFuelCost || 0
		const hpCost = CONSTANTS.spaceshipsAttributes[newState[this.selected.y][this.selected.x].type].moveHpCost || false
        if((this.selected.x === 0 && x === 8) || (this.selected.x === 8 && x === 0)) newState[y][x].lastWarpTurn = this.turnNum
		this.$store.commit('setMyFuel', this.myFuel - fuelCost)
		if(hpCost) {
			const hp = newState[this.selected.y][this.selected.x].hp
			const newHp = hp - hpCost;
			if(newHp > 0) {
				newState[this.selected.y][this.selected.x].hp = newHp
				newState[y][x] = newState[this.selected.y][this.selected.x]
				newState[this.selected.y][this.selected.x] = {}
			} else return
		} else {
			newState[y][x] = newState[this.selected.y][this.selected.x]
			newState[this.selected.y][this.selected.x] = {}
		}
		if(this.myFuel - fuelCost === 0) {
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
	  },
	  attackPiece(x, y) {
		const newState = [...this.state]
		let attack = CONSTANTS.spaceshipsAttributes[newState[this.selected.y][this.selected.x].type].attack
		let shock = CONSTANTS.spaceshipsAttributes[newState[this.selected.y][this.selected.x].type].shock || false
		let vamp = CONSTANTS.spaceshipsAttributes[newState[this.selected.y][this.selected.x].type].vamp || false
		let onDestroyDamage = CONSTANTS.spaceshipsAttributes[newState[this.selected.y][this.selected.x].type].onDestroyDamage || false
		const bonusAttack = newState[this.selected.y][this.selected.x].bonusAttack || 0
		attack += bonusAttack;
		
		if(!attack) return
		if(shock) {
			let targets = new Set()
			;[...legalShockable(this.state, targets, parseHexID(this.selected.x, this.selected.y), parseHexID(x, y), this.playerIs)]
			.map((target) => { return { x: parseInt(target[1]), y: parseInt(target[0]) } })
			.forEach((target) => {
				const hp = newState[target.y][target.x].hp
				const newHp = hp - attack;
				if(newHp > 0) {
					newState[target.y][target.x].hp = newHp
				} else {
					if(newState[target.y][target.x].type === "base") {
						this.$store.commit('setWinner', this.playerIs)
					}
					if(onDestroyDamage) {
						[...legalAttacks(this.state, this.selected.x, this.selected.y, this.turnNum)]
						.forEach((target) => {
							const hp = newState[target.y][target.x].hp
							const newHp = hp - onDestroyDamage;
						})
					}
					newState[target.y][target.x] = {}
				}
			})
		} else {
			const hp = newState[y][x].hp
			attack += bonusAttack;
			const newHp = hp - attack;
			if(newHp > 0) {
				newState[y][x].hp = newHp
			} else {
				if(newState[y][x].type === "base") {
					this.$store.commit('setWinner', this.playerIs)
				}
				if(onDestroyDamage) {
					[...legalAttacks(this.state, this.selected.x, this.selected.y, this.turnNum)]
					.forEach((target) => {
						const hp = newState[target.y][target.x].hp
						const newHp = hp - onDestroyDamage;
					})
				}
				newState[y][x] = {}
			}
		}

		if(vamp) {
			let maxHp = CONSTANTS.spaceshipsAttributes[newState[this.selected.y][this.selected.x].type].hp
			let newHp = newState[this.selected.y][this.selected.x].hp + vamp
			newState[this.selected.y][this.selected.x].hp = Math.min(newHp, maxHp)
		}
		const fuelCost = CONSTANTS.spaceshipsAttributes[newState[this.selected.y][this.selected.x].type].attackFuelCost
		this.$store.commit('setMyFuel', this.myFuel - fuelCost)
		newState[this.selected.y][this.selected.x].lastAttackTurn = this.turnNum

		// Update Bonus Attack
    	newState[this.selected.y][this.selected.x].bonusAttack = (CONSTANTS.spaceshipsAttributes[newState[this.selected.y][this.selected.x].type].bonusAttackOnAttack || 0) + bonusAttack
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
		// this.playSound(this.shotSfx)
	  },
	  repairPiece(x,y) {
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
				signature: this.$store.state.signature,
				matchId: this.$store.state.matchId,
				action: 'repair',
				from,
				to: {x,y}
			}
		}))
		// this.playSound(this.repairSfx)
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
	  },
	  startAttackedFX(to) {
		this.playSound(this.shotSfx)
		// const targets = this.parseEleID(j,i)
		// const eleTarget = this.$refs[ele]
		// const eleHexTarget = this.$refs[eleHex]
		// this.$refs[ele].classList.value = this.$refs[ele].$el.classList.value + 'under-action'
		const eleHex = this.parseHexID(to.x, to.y)
		this.$refs[eleHex][0].src = "/red-hex.png"
		this.$refs[eleHex][0].classList.add('under-action','unhoverable')
		setTimeout(() => {
			this.$refs[eleHex][0].src = "/hex.png"
			this.$refs[eleHex][0].classList.remove('under-action','unhoverable')
		}, 2500)
	  },
	  startRepairedFX(to) {
		this.playSound(this.repairSfx)
		const eleHex = this.parseHexID(to.x, to.y)
		this.$refs[eleHex][0].src = "/green-hex.png"
		this.$refs[eleHex][0].classList.add('under-action','unhoverable')
		setTimeout(() => {
			this.$refs[eleHex][0].src = "/hex.png"
			this.$refs[eleHex][0].classList.remove('under-action','unhoverable')
		}, 2500)
	  },
	  startMovementFromFX(to) {
		console.log('Moved from ', to)
	  },
	  startMovementToFX(to) {
		console.log('Moved to ', to)
	  }
	//   checkBoardActions(newBoard, oldBoard) {
	// 	newBoard = newBoard.state
	// 	oldBoard = oldBoard.state
	// 	for(let i=0; i<oldBoard.length; i++) {
	// 		for(let j=0; j<oldBoard[i].length; j++) {
	// 			if(newBoard[i][j].hp < oldBoard[i][j].hp) {
	// 				console.log(newBoard[i][j].hp, oldBoard[i][j].hp)
	// 				this.startAttackedFX(i,j)
	// 				}
	// 			if(newBoard[i][j].hp > oldBoard[i][j].hp) this.startRepairedFX(i,j)
	// 			if(newBoard[i][j] !== {} && oldBoard[i][j] === {}) this.startMovementToFX(i,j)
	// 			if(newBoard[i][j] === {} && oldBoard[i][j] !== {}) this.startMovementFromFX(i,j)
	// 		}
	// 	}
	//   }
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
			for(let lastAction = newState.log.length - 1; lastAction >= oldState.log.length; lastAction--) {
				if(newState.log[lastAction].action === 'attack') {
					this.startAttackedFX(newState.log[lastAction].to)
				} else if(newState.log[lastAction].action === 'repair') {
					this.startRepairedFX(newState.log[lastAction].to)
				}
			}
		}
		// this.checkBoardActions(newState, oldState)
		if(oldState.playerTurn !== newState.playerTurn) {
			this.selected = undefined
			this.playSound(this.turnSfx)
		}
	}
  },
  async created() {
	await Promise.all([
		this.fetchProfile(this.$store.state.address, false),
		this.fetchProfile(this.enemyAddress, true)
	])
  }
}
</script>

<style>
.row {
	display: block;
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
.unhoverable {
	filter: none;
}
.hoverable-attackable {
	cursor:url(/attack-cursor.png), auto;
}
.hoverable-attackable:hover .hex-parcel {
	opacity: .9;
	filter: none;
}
.hoverable-repairable:hover .hex-parcel  {
	opacity: .9;
	filter: none;
}
.hoverable-approachable {
	filter: brightness(2);
	opacity: 1;
}
.hoverable-approachable:hover .hex-parcel {
	opacity: 1;
	-webkit-filter: drop-shadow(0 0 7px rgb(90, 90, 90));
  	filter: drop-shadow(0 0 7px rgb(90, 90, 90));
}
.spaceship-stats {
	/* margin: 0 auto; */
	padding: 20px;
	height: 50%;
}
.spaceship-type {
	color: #416BFF;
	font-family: 'Roboto';
	font-size: 21px;
	text-transform: capitalize;
	margin-top: -10px;
}
.spaceship-img {
	width: 85px;
	margin-bottom: 2px;
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
	font-family: 'Roboto';
    margin-top: -18px;
    font-size: 16px;
    margin-left: 10px;
    display: inline-block;
    line-height: 42px;
    vertical-align: middle;
}
.energy-ability {
	font-family: 'Roboto';
	line-height: 42px;
    vertical-align: middle;
    display: inline-block;
    margin-top: -18px;
    font-size: 20px;
    margin-left: 35%;
	color: #EFC97F;
}
.attack-ability {
	font-family: 'Roboto';
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
	margin-top: 50px;
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
	max-width: 289px;
}
.chat-input {
	height: 55px;
	margin-top: -14px;
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
	padding-top: 10px;
	height: 390px;
}
.logs-tabs {
	height: 395px;
	padding: 10px;
}
section.tab-content {
	height: 395px !important;
    padding: 15px !important;
}
.b-tabs .tab-content {
	height: 100% !important;
	padding-top: 0px !important;
}
.chat-message {
	background: black;
	padding: 3px 0px;
	color: rgba(255,255,255,0.5);
	overflow-wrap: break-word;
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
