<template>
    <div class="player-card" :style="cardProps">
        <center>
            <div class="hex" :style="cssProps">
                <div class="hex-background">
                    <img class="gravatar" :src="gravatar">
                </div>
            </div>
            <h1 class="you">{{ playerAlias }}</h1>
            <h1 @click="$router.push({ name: 'Player Profile', params: { playerAddress: playerAddress } })"  class="your-address">{{ formattedAddress }}</h1>
            <img class="energy-icon" src="/energy.svg" width="23px"/>
            <span class="energy">{{fuel}}</span>
            <div :disabled="!isEnemyTurn" class="turn-timer">Ends in: <strong style="color: #F88C09; margin-left: 10px">{{ lastTurnTimestamp === undefined ? turnTimeout : countdown }}</strong></div>
        </center>
        <v-gravatar style="display: none" ref="gravatar" :email="playerAddress" alt="Nobody" :size="530"/>
    </div>
</template>

<script>
import CONSTANTS from '../../constants'
export default {
    props:['playerAddress', 'fuel', 'isEnemyTurn', 'lastTurnTimestamp', 'playerAlias'],
    data () {
        return {
            gravatar: null,
            date: Date.now(),
            dateInterval: undefined,
            turnTimeout: CONSTANTS.turnTimeout
        }
    },
    computed: {
        cssProps() {
            let styles = {}
            if(this.$store.state.matchState.playerTurn !== this.$store.state.matchState.playerIs) {
                styles['--border'] = 'white'
            } else {
                styles['--border'] = 'black'
            }
            return styles
        },
        cardProps() {
            let cardStyles = {}
            if(this.$store.state.matchState.playerTurn !== this.$store.state.matchState.playerIs) {
                cardStyles['--card-background'] = 'radial-gradient(50% 50% at 50% 50%, rgba(255, 73, 73, 0) 0%, rgba(255, 73, 73, 0.12) 100%)'
            } else {
                cardStyles['--card-background'] = 'black'
            }
            return cardStyles
        },
        formattedAddress() {
            return this.playerAddress.slice(0, 5) + '...' + this.playerAddress.slice(-5)
        },
        countdown () {
            return Math.max(Math.floor((this.lastTurnTimestamp + (this.turnTimeout * 1000) - this.date) / 1000), 0)
        }
    },
    methods: {
        endEnemyTurn() {
            this.$emit('endEnemyTurn')
        },
    },
    mounted: function() {
        this.gravatar = this.$refs.gravatar.url
    },
    watch: {
        countdown(newCountdown) {
            if(newCountdown === 0 && this.isEnemyTurn) {
                setTimeout(() => {
                    if(this.countdown === 0 && this.isEnemyTurn) this.endEnemyTurn()
                }, 5000)
            }
        }
    },
    created () {
        const self = this
        this.dateInterval = setInterval(function () {
            self.date = Date.now()
        }, 1000)

        if(this.countdown === 0  && this.isEnemyTurn) {
            this.endEnemyTurn()
        }
    },
    beforeDestroy () {
        clearInterval(this.dateInterval)
    }
}
</script>

<style scoped>
.player-card {
    padding-top: 5%;
    height: 48%;
    width: 100%;
    top: 0;
    position: absolute;
    border-bottom: 1px solid #303030;
    background: var(--card-background);
    transition: 1000ms ease-in-out;
}
.energy {
    font-family: 'Roboto';
    font-size: 38px;
    color: #F98F09;
}
.energy-icon {
    margin-bottom: -1px;
    margin-right: 5px;
    width: 25px;
}
.surrender {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    border-radius: 0px;
    background: transparent;
    color: #FF4949;
    text-transform: capitalize;
    font-size: 19px;
    height: 80px;
    line-height: 80px;
    transition: 400ms ease-in-out;
}
.surrender:hover {
    background: #FF4949;
    color: white;
}
.you {
    font-size: 27px;
    color: #C72929;
    padding-top: 10px;
}
.your-address {
    color: white;
    margin-bottom: 20px;
    cursor: pointer;
}
.your-address:hover {
    text-decoration: underline;
}
.hex {
    background: var(--border);
    display: block;
    margin: 20px auto;
    position: relative;
    width: 120px;
    height: 130px;
    clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
    -webkit-clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
    -moz-clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
}
.hex-background {
    display: block;
    margin: 0 auto;
    position: absolute;
    top: 5px; /* equal to border thickness */
    right: 5px;
    width: 110px; /* container height - (border thickness * 2) */
    height: 120px; /* container height - (border thickness * 2) */
    clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
    -webkit-clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
    -moz-clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
}
.gravatar {
    height: 120px;
}
.turn-timer {
background: rgba(248, 140, 9, 0.1);
    color: #F88C09;
    height: 45px;
    margin: 0px;
    margin-right: 5px;
    padding: 11px 17px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 5px;
    transition: 500ms ease-in-out;
    max-width: fit-content;
}
.turn-timer[disabled] {
    opacity: 0;
}
</style>