<template>
    <div class="player-card" :style="cardProps">
        <center class="container" v-if="!$store.getters.isMobile">
            <div class="hex" :style="cssProps">
                <div class="hex-background">
                    <img class="gravatar" :src="gravatar">
                </div>
            </div>
            <h1 class="you">{{ playerAlias }}</h1>
            <h1 @click="$router.push({ name: 'Player Profile', params: { playerAddress: playerAddress } })" class="your-address">{{ formattedAddress }}</h1>
            <img class="energy-icon" src="/energy.svg" width="23px"/>
            <span class="energy">{{fuel}}</span>
            <div class="btn-group">
                <b-button @click="endTurn" :disabled="!isMyTurn" class="end-turn" icon-right="swap-horizontal-bold" type="is-danger">End Turn<strong v-if="isMyTurn" style="margin-left: 10px">{{ lastTurnTimestamp === undefined ? turnTimeout : countdown }}</strong></b-button>
            </div>
            <b-button @click="confirmSurrender" class="surrender">Surrender</b-button>
        </center>
        <div class="mobile-card-wrapper" v-else>
            <div class="mobile-hex" :style="cssProps">
                <div class="mobile-hex-background">
                    <img class="mobile-gravatar" :src="gravatar">
                </div>
            </div>
            <div class="mobile-data-wrapper">
                <h1 class="mobile-you">{{ playerAlias }}</h1>
                <h1 @click="$router.push({ name: 'Player Profile', params: { playerAddress: playerAddress } })"  class="mobile-your-address">{{ formattedAddress }}</h1>
            </div>
            <div class="mobile-data-wrapper-right">
                <span class="mobile-energy">{{fuel}}</span>
                <img class="mobile-energy-icon" src="/energy.svg" width="23px"/>
                <div class="mobile-btn-group">
                    <b-button @click="endTurn" :disabled="!isMyTurn" class="mobile-end-turn" icon-right="swap-horizontal-bold" type="is-danger">End Turn<strong v-if="isMyTurn" style="margin-left: 10px">{{ lastTurnTimestamp === undefined ? turnTimeout : countdown }}</strong></b-button>
                </div>            </div>
        </div>
        <v-gravatar style="display: none" ref="gravatar" :email="playerAddress" alt="Nobody" :size="530"/>
    </div>
</template>

<script>
import CONSTANTS from '../../constants'
import axios from 'axios'
export default {
    props:['playerAddress', 'fuel', 'lastTurnTimestamp', 'isMyTurn', 'playerAlias'],
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
            if(this.$store.state.matchState.playerTurn === this.$store.state.matchState.playerIs) {
                styles['--border'] = 'white'
            } else {
                styles['--border'] = 'black'
            }
            return styles
        },
        cardProps() {
            let cardStyles = {}
            if(this.$store.state.matchState.playerTurn === this.$store.state.matchState.playerIs) {
                cardStyles['--card-background'] = 'radial-gradient(50% 50% at 50% 50%, rgba(65, 107, 255, 0) 0%, rgba(65, 107, 255, 0.12) 100%)'
            } else {
                cardStyles['--card-background'] = 'black'
            }
            cardStyles['border-bottom'] = '1px solid #303030'
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
        endTurn() {
            this.$emit('endTurn')
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
            this.$emit('surrender')
        }
    },
    watch: {
        countdown(newCountdown) {
            if(newCountdown === 0 && this.isMyTurn) this.endTurn()
        }
    },
    mounted () {
        this.gravatar = this.$refs.gravatar.url
    },
    async created () {
        const self = this
        this.dateInterval = setInterval(function () {
            self.date = Date.now()
        }, 1000)

        if(this.countdown === 0 && this.isMyTurn) {
            this.endTurn()
        }
    },
    beforeDestroy () {
        clearInterval(this.dateInterval)
    }
}
</script>


<style scoped>
header.modal-card-head {
    background: black !important;
}
section.modal-card-body.is-flex {
    background: black !important;
}
.player-card {
    /* height: 53.7%; */
    /* width: 100%; */
    /* bottom: 0;
    position: absolute; */
    border-top: 1px solid #4d4d4d;
    background: var(--card-background);
    transition: 1000ms ease-in-out;
}
.energy {
    font-family: 'Roboto';
    font-size: 35px;
    color: #F98F09;
}
.energy-icon {
    margin-bottom: -7px;
    margin-right: 5px;
    width: 18px;
}
.surrender {
    margin-top: 2.2rem !important;
    bottom: 0;
    width: 100%;
    border-radius: 0px;
    background: transparent;
    color: #FF4949;
    text-transform: capitalize;
    font-size: 17px;
    height: 60px;
    line-height: 80px;
    transition: 400ms ease-in-out;
    border-top: 1px solid #303030;
    border-bottom: none;
    border-right: none;
    border-left: none;
}
.surrender:hover {
    background: #FF4949;
    color: white;
    border: 1px solid white;
}
.you {
    font-size: 27px;
    color: #416BFF;
    padding-top: -10px;
}
.your-address {
    color: white;
    margin-bottom: 20px;
    cursor: pointer;
}
.your-address:hover {
    text-decoration: underline;
}
.btn-group {
    display: inline-block;
    width: 100%;
    margin-top: 20px;
}
.end-turn {
    background: #416BFF !important;
    border: 1px solid #6787fa;
    color: white;
    height: 45px;
    margin: 0px;
    margin-left: 5px;
    padding: 9px 20px;
    font-size: 17px;
    font-weight: 500;
    transition: 250ms ease-in-out;
    display: inline-block;
    border-radius: 5px;
}
.end-turn[disabled] {
    background: grey !important;
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
.player-slot {
    bottom: 101px;
    position: absolute;
}

/* Mobile support */
.mobile-energy {
    font-family: 'Roboto';
    font-size: 26px;
    margin-top: 3px;
    color: #F98F09;
    float: right;
}
.mobile-energy-icon {
    float: right;
    width: 15px;
    margin-top: 5px;
    margin-right: 7px;
}
.mobile-you {
    font-size: 1em;
    color: #416BFF;
    margin-top: 0.5em;
    width: fit-content;
}
.mobile-your-address {
    color: white;
    margin-bottom: 20px;
    cursor: pointer;
    font-size: 15px;
    width: fit-content;
}
.mobile-hex {
    background: var(--border);
    position: relative;
    float: left;
    margin-right: 30px;
    width: 60px;
    height: 65px;
    clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
    -webkit-clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
    -moz-clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
}
.mobile-hex-background {
    display: block;
    margin: 0 auto;
    position: absolute;
    top: 2.5px; /* equal to border thickness */
    right: 2.5px;
    width: 55px; /* container height - (border thickness * 2) */
    height: 60px; /* container height - (border thickness * 2) */
    clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
    -webkit-clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
    -moz-clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
}
.mobile-gravatar {
    height: 60px;
}
.mobile-card-wrapper {
    padding: 2.1rem;
    display: inline-block;
    width: 100%;
    height: 120px;
}
.mobile-btn-group {
    float: right;
    margin-right: 20px;
}
.mobile-end-turn {
    background: #416BFF !important;
    border: 1px solid #6787fa;
    color: white;
    height: 45px;
    margin-right: 10px;
    padding: 11px 17px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 5px;
    transition: 500ms ease-in-out;
    max-width: fit-content;
    float: right;
}
.mobile-end-turn[disabled] {
    opacity: 0;
}
.mobile-data-wrapper {
    float: left;
}
.mobile-data-wrapper-right {
    float: right;
    width: 55%;
    padding: 1rem;
    margin-right: -2vw;
    margin-top: -3px;
    min-width: fit-content;
}
@media screen and (max-width: 500px) {
    .mobile-card-wrapper {
        padding: 25px 20px;
        display: inline-block;
        width: 100%;
        height: 110px;
        position: relative;
    }
    .mobile-hex {
        margin-right: 10px;
    }
    .mobile-energy {
    font-family: 'Roboto';
    font-size: 19px;
    margin-top: 3px;
    color: #F98F09;
    float: right;
    }
    .mobile-energy-icon {
        float: right;
        width: 10px;
        margin-top: 5px;
        margin-right: 4px;
    }
    .mobile-end-turn {
        margin-right: 10px;
        padding: 10px 15px;
        font-size: 11px;
        margin-right: -40px;
        margin-top: 35px;
        height: 35px;
    }
    .mobile-data-wrapper-right {
        position: absolute;
        bottom: 0;
        right: 10px;
        padding: 1rem;
        height: 100%;
    }
    .mobile-btn-group {
        margin-right: 0px;
        float: none;
        position: absolute;
        right: 10px;
        margin-top: 35px;
    }
}
</style>