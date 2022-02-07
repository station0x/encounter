<template>
        <!-- <div v-if="onboarding && this.$store.state.matchState.turnNum === 1 && this.$store.state.matchState.winner === null" class="onboarding-animation">
            <div class="hero is-fullheight">
                <div class="hero-body">
                    <div class="container has-text-centered">
                        <center class="loader-wrapper">
                            <div class="paragraph para-1">The year is 2{{getRandomInt(100,999)}}</div>
                            <div class="paragraph para-2">Location: Skvorc industrial region</div>
                            <div class="paragraph para-3">Juperian fleet #{{getRandomInt(100,999)}} is securing nearby Plutonium miners</div>
                            <div class="paragraph para-4">Unidentified hostiles are approaching at high speed</div>
                            <div class="skip-btn" @click="onboarding=false">Skip</div>
                        </center>
                    </div>
                </div>
            </div>
        </div> -->
    <div class="match-wrapper">
        <!-- <b-button v-if="soundisOn" @click="soundOff" class="sound-btn" icon-right="volume-high"></b-button>
        <b-button v-else-if="!soundisOn" @click="soundOn" class="sound-btn" icon-right="volume-off"></b-button> -->
        <PickingView v-if="$store.state.matchState.picking"
            :state="$store.state.matchState.state"
            :playerIs="$store.state.matchState.playerIs"
            :playerTurn="$store.state.matchState.playerTurn"
            :lastTurnTimestamp="$store.state.matchState.lastTurnTimestamp"
        />
        <Board
            v-else
            :state="$store.state.matchState.state"
            :playerIs="$store.state.matchState.playerIs"
            :playerTurn="$store.state.matchState.playerTurn"
            :fuel0="$store.state.matchState.fuel0"    
            :fuel1="$store.state.matchState.fuel1"    
            :turnNum="$store.state.matchState.turnNum"
            :chat="$store.state.matchState.chat"
            :log="$store.state.matchState.log"
            :lastTurnTimestamp="$store.state.matchState.lastTurnTimestamp"
        />
        <div class="end-wrapper" v-if="$store.state.matchState.playerIs === $store.state.matchState.winner">
            <center>
                <img class="result-vector" :src="victory"/>
                <b-button class="primary-btn" @click="continueBtn" :loading="loading">Continue</b-button>
            </center>
        </div>
        <div class="end-wrapper" v-if="($store.state.matchState.playerIs === 0 ? 1 : 0) === $store.state.matchState.winner">
            <center>
                <img class="result-vector" :src="defeat"/>
                <b-button class="primary-btn" @click="continueBtn" :loading="loading">Continue</b-button>
            </center>
        </div>
    </div>
</template>

<script>
import Board from '@/components/Board.vue'
import PickingView from '@/components/PickingView.vue'
export default {
    data() {
        return {
            onboarding: false,
            logo: require('../assets/img/widelogo.png'),
            victory: require('../assets/img/victory.png'),
            defeat: require('../assets/img/defeat.png'),
            // audio: new Howl({src: [require('../assets/sfx/soundtrack.mp3')], loop: true}),
            soundisOn: undefined,
            loading: false
        }
    },
    components: {
        Board,
        PickingView
    },
    methods: {
        async continueBtn () {
            this.loading = true
            await this.$store.dispatch("startPolling")
        },
        getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        // soundOn() {
        //     this.audio.play()
        //     this.soundisOn = true
        // },
        // soundOff() {
        //     this.audio.pause()
        //     this.soundisOn = false
        // }
    },
    created () {
        setTimeout(()=> this.onboarding = false , 22000)
        // this.soundOn()
    },
    beforeDestroy() {
        // this.soundOff()
    }
}
</script>

<style scoped>
.end-wrapper {
    height: 100vh;
    width: 100vw;
    position: absolute;
    background: rgba(0,0,0,.7);
    z-index: 5;
    top: 0;
    left: 0;
    opacity: 1;
    animation-name: fadeInOpacity;
	animation-iteration-count: 1;
	animation-timing-function: ease-in;
	animation-duration: 3s;
    animation-fill-mode: backwards;
}
.in-game-btn {
    position: absolute;
    top: 2px;
    right: 8vw;
    color: white;
}
.in-game-btn:hover {
    border-bottom: 1px solid white;
}
.sound-btn {
    position: absolute;
    background: none;
    border: none;
    color: white;
    font-size: 25px;
    top: 2.8vh;
    right: 17vw;
}
.sound-btn:hover {
    color: rgba(255,255,255,0.8);
}
.sound-btn:focus:not(:active), .sound-btn.is-focused:not(:active) {
    color: white;
    box-shadow: none;
}
.result-vector {
    margin-top: 28vh;
    display: block;
}
.primary-btn {
    background: black;
    color: white;
    border: none;
    width: 230px;
    height: 60px;
    margin: 15px;
    padding: 15px;
    font-size: 19px;
    font-weight: 500;
    border: 1px solid white;
    transition: 250ms ease-in-out;
}
.primary-btn:hover {
    background: white;
    color: black;
}
.onboarding-animation {
    background: black;
    z-index: 5;
    height: 100vh;
    width: 100vw;
    padding: 0;
    position: absolute;
    top: 0;
    vertical-align: top;
    line-height: 10vh;
    padding-top: 25vh;
    animation-name: fadeOutOpacity;
	animation-iteration-count: 1;
	animation-timing-function: ease-in;
	animation-duration: 3s;
    animation-fill-mode: backwards;
    opacity: 0;
    animation-delay: 18s;
}
.wrapper {
    width: fit-content;
}
.paragraph {
    font-family: 'ClashDisplay-Variable';
    font-size: 38px;
    text-align: left;
    color: white;
    z-index: 100;
	animation-name: fadeInOpacity;
	animation-iteration-count: 1;
	animation-timing-function: ease-in;
	animation-duration: 5s;
    animation-fill-mode: backwards;
    opacity: 1;

}
.para-1 {
    animation-delay: 1s;

}
.para-2 {
    animation-delay: 4s;
}
.para-3 {
    animation-delay: 7s;
}
.para-4 {
    animation-delay: 11s;
}
.skip-btn {
    font-family: 'ClashDisplay-Variable';
    font-size: 21px;
    color: rgba(255,255,255,.3);
    cursor: pointer;
    text-transform: uppercase;
}
.skip-btn:hover {
    color: white;
}

@keyframes fadeInOpacity {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

@keyframes fadeOutOpacity {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}

</style>