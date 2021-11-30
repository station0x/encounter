<template>
    <div>
        <div v-if="onboarding && this.$store.state.matchState.turnNum === 1" class="onboarding-animation">
            <center>
                <div class="wrapper">
                    <div class="paragraph para-1">The year is 2{{getRandomInt(100,999)}}</div>
                    <div class="paragraph para-2">Location: Vorc industrial region</div>
                    <div class="paragraph para-3">Juperian fleet #{{getRandomInt(100,999)}} is securing nearby Plutonium miners</div>
                    <div class="paragraph para-4">Unidentified hostiles are approaching at high speed</div>
                    <div class="skip-btn" @click="onboarding=false">Skip</div>
                </div>
            </center>
        </div>
        <div class="match-wrapper">
            <Board
                v-if="$store.state.matchState.winner !== 0 && $store.state.matchState.winner !== 1"
                :state="$store.state.matchState.state"
                :playerIs="$store.state.matchState.playerIs"
                :playerTurn="$store.state.matchState.playerTurn"
                :fuel0="$store.state.matchState.fuel0"    
                :fuel1="$store.state.matchState.fuel1"    
                :turnNum="$store.state.matchState.turnNum"
            />
            <h1 v-else-if="$store.state.matchState.playerIs === $store.state.matchState.winner">You Won <b-button @click="continueBtn">Continue</b-button></h1>
            <h1 v-else-if="$store.state.matchState.playerIs !== $store.state.matchState.winner">You Lost <b-button @click="continueBtn">Continue</b-button></h1>
        </div>
    </div>
</template>

<script>
import Board from '@/components/Board.vue'
export default {
    data() {
        return {
            onboarding: true
        }
    },
    components: {
        Board
    },
    methods: {
        async continueBtn () {
            await this.$store.dispatch("startPolling")
        },
        getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    },
    created () {
        setTimeout(()=> this.onboarding = false ,22000)
    }
}
</script>

<style scoped>
.match-wrapper {
    padding: 11.5vh 3vw 11.5vh 3vw;

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
    position: absolute;
    bottom: 5vh;
    right: 10vh;
    text-transform: uppercase;
}
.skip-btn:hover {
    color: white;
    border-bottom: 1px solid white;
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