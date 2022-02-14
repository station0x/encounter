<template>
    <div class="match-wrapper">
        <PickingView v-if="$store.state.matchState.picking && !$store.state.matchState.dodged"
            :state="$store.state.matchState.state"
            :playerIs="$store.state.matchState.playerIs"
            :playerTurn="$store.state.matchState.playerTurn"
            :lastTurnTimestamp="$store.state.matchState.lastTurnTimestamp"
            :pickingRound="$store.state.matchState.pickingRound"
            :player0PickingInsertions="$store.state.matchState.player0PickingInsertions"
            :player1PickingInsertions="$store.state.matchState.player1PickingInsertions"
        />
        <div v-else-if="$store.state.matchState.picking && $store.state.matchState.dodged">
            <div class="afk-dialog">
                <svg viewBox="0 0 531 207" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M361.467 7.26565H359.045V3.02734H361.463L361.467 7.26565Z" fill="#DB0000"/>
                    <path d="M365.1 7.26565H363.283V3.02734H365.096L365.1 7.26565Z" fill="#DB0000" fill-opacity="0.9"/>
                    <path d="M369.338 7.26565H366.916V3.02734H369.334L369.338 7.26565Z" fill="#DB0000" fill-opacity="0.8"/>
                    <path d="M372.971 7.26565H371.154V3.02734H372.968L372.971 7.26565Z" fill="#DB0000" fill-opacity="0.7"/>
                    <path d="M377.209 7.26565H374.787V3.02734H377.205L377.209 7.26565Z" fill="#DB0000" fill-opacity="0.6"/>
                    <path d="M380.842 7.26565H379.025V3.02734H380.839L380.842 7.26565Z" fill="#DB0000" fill-opacity="0.5"/>
                    <path d="M385.081 7.26565H382.659V3.02734H385.076L385.081 7.26565Z" fill="#DB0000" fill-opacity="0.4"/>
                    <path d="M388.713 7.26565H386.897V3.02734H388.71L388.713 7.26565Z" fill="#DB0000" fill-opacity="0.3"/>
                    <path d="M392.952 7.26565H390.53V3.02734H392.947L392.952 7.26565Z" fill="#DB0000" fill-opacity="0.2"/>
                    <path d="M396.584 7.26565H394.768V3.02734H396.581L396.584 7.26565Z" fill="#DB0000" fill-opacity="0.1"/>
                    <path d="M170.137 3.0278L172.559 3.0278L172.559 7.26611L170.141 7.26611L170.137 3.0278Z" fill="#DB0000"/>
                    <path d="M166.504 3.0278L168.321 3.0278L168.321 7.26611L166.508 7.26611L166.504 3.0278Z" fill="#DB0000" fill-opacity="0.9"/>
                    <path d="M162.266 3.0278L164.688 3.0278L164.688 7.26611L162.27 7.26611L162.266 3.0278Z" fill="#DB0000" fill-opacity="0.8"/>
                    <path d="M158.633 3.0278L160.45 3.0278L160.45 7.26611L158.636 7.26611L158.633 3.0278Z" fill="#DB0000" fill-opacity="0.7"/>
                    <path d="M154.395 3.0278L156.817 3.0278L156.817 7.26611L154.399 7.26611L154.395 3.0278Z" fill="#DB0000" fill-opacity="0.6"/>
                    <path d="M150.762 3.0278L152.579 3.0278L152.579 7.26611L150.765 7.26611L150.762 3.0278Z" fill="#DB0000" fill-opacity="0.5"/>
                    <path d="M146.523 3.0278L148.945 3.0278L148.945 7.26611L146.528 7.26611L146.523 3.0278Z" fill="#DB0000" fill-opacity="0.4"/>
                    <path d="M142.891 3.0278L144.707 3.0278L144.707 7.26611L142.894 7.26611L142.891 3.0278Z" fill="#DB0000" fill-opacity="0.3"/>
                    <path d="M138.652 3.0278L141.074 3.0278L141.074 7.26611L138.657 7.26611L138.652 3.0278Z" fill="#DB0000" fill-opacity="0.2"/>
                    <path d="M135.02 3.0278L136.836 3.0278L136.836 7.26611L135.023 7.26611L135.02 3.0278Z" fill="#DB0000" fill-opacity="0.1"/>
                    <path d="M17.1044 118.275V107.37V51.731H15.8251V108.652L10.644 113.842V124.99L17.1044 118.519V118.275Z" fill="url(#paint0_linear_289_23253)"/>
                    <path d="M28.9495 0L15.8242 13.1474V36.5846H17.1035V22.0149L29.5508 9.54663V1.28142H96.495L105.731 10.5333H425.971L434.657 1.84525L435.233 1.28142H501.448V9.54663L513.895 22.0277V36.5846H515.175V13.1474L502.049 0H28.9495ZM424.922 9.18141H106.793L100.115 1.28142H431.6L424.922 9.18141Z" fill="url(#paint1_linear_289_23253)"/>
                    <path d="M502.05 206.708L515.175 193.561V170.136H513.896V184.68L501.449 197.161V205.427H434.492L425.256 196.175H105.016L96.3038 204.863L95.7537 205.427H29.5259V197.161L17.0786 184.68V170.136H15.7993V193.561L28.9246 206.708H502.05ZM99.3868 205.427L106.077 198.738H424.194L430.884 205.427H99.3868Z" fill="url(#paint2_linear_289_23253)"/>
                    <path d="M17.1044 166.989V149.35V138.445V138.202L10.644 131.73V142.879L15.8251 148.069V166.989H17.1044Z" fill="url(#paint3_linear_289_23253)"/>
                    <path d="M520.356 113.842L515.175 108.652V51.731H513.896V107.37V118.275V118.519L520.356 124.99V113.842Z" fill="url(#paint4_linear_289_23253)"/>
                    <path d="M520.356 142.879V131.73L513.896 138.202V138.445V149.35V165.989H515.175V148.069L520.356 142.879Z" fill="url(#paint5_linear_289_23253)"/>
                    <path d="M2.55854 90.4044L10.49 82.4596L10.4516 78.8716L0 89.3408V166.649L11.2064 177.874V174.261L2.55854 165.598V90.4044Z" fill="url(#paint6_linear_289_23253)"/>
                    <path d="M520.51 82.4593L528.442 90.4042V165.598L519.794 174.261L519.768 177.913L531 166.649V89.3406L520.523 78.8457L520.51 82.4593Z" fill="url(#paint7_linear_289_23253)"/>
                    <path d="M193.25 167.896L193.25 139.25L339.75 139.25L339.75 169.566L334.767 174.75L200.103 174.75L193.25 167.896Z" fill="url(#paint8_linear_289_23253)" stroke="#FBC115" stroke-width="0.5"/>
                    <path d="M245.894 161.98H243.554L243.986 149.938H246.326L245.894 161.98ZM250.7 161.98H248.378L248.63 149.938H250.97L250.7 161.98ZM244.922 159.856L244.04 158.74L249.908 156.22V158.65L245.714 160.45L244.922 159.856ZM245.102 149.938H249.674V152.278H245.102V149.938ZM254.009 161.836H251.687L252.083 149.794H254.423L254.009 161.836ZM252.605 161.836L251.723 160.72L257.573 158.2V160.63L254.783 161.836H252.605ZM253.109 152.116V149.794H258.149L257.915 152.116H253.109ZM260.917 161.836H258.595L258.991 149.794H261.331L260.917 161.836ZM259.513 161.836L258.631 160.72L264.481 158.2V160.63L261.691 161.836H259.513ZM260.017 152.116V149.794H265.057L264.823 152.116H260.017ZM266.421 161.818L266.493 159.352H271.389L271.263 161.818H266.421ZM266.601 156.76V154.42H271.641L271.533 156.76H266.601ZM266.799 152.116V149.776H271.929L271.803 152.116H266.799ZM267.753 161.818H265.413L265.809 149.794H268.149L267.753 161.818ZM280.026 149.794L279.792 157.174L278.964 157.534L278.478 157.75L277.416 158.218V158.2L276.156 158.722H274.824L274.698 161.818H272.412L272.862 149.794H274.086H275.202H277.686H279.126H280.026ZM276.156 156.31L277.488 155.734L277.596 152.098H275.112L274.932 156.31H276.156ZM283.375 161.836L283.753 152.116H286.075L285.661 161.836H283.375ZM280.963 152.116L281.053 149.794H288.667L288.595 152.116H280.963Z" fill="#FBC115"/>
                    <defs>
                    <linearGradient id="paint0_linear_289_23253" x1="13.8742" y1="51.731" x2="13.8742" y2="124.99" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#494949"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_289_23253" x1="265.499" y1="0" x2="265.499" y2="36.5846" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#494949"/>
                    </linearGradient>
                    <linearGradient id="paint2_linear_289_23253" x1="265.487" y1="170.136" x2="265.487" y2="206.708" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#494949"/>
                    </linearGradient>
                    <linearGradient id="paint3_linear_289_23253" x1="13.8742" y1="131.73" x2="13.8742" y2="204.989" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#494949"/>
                    </linearGradient>
                    <linearGradient id="paint4_linear_289_23253" x1="517.126" y1="51.731" x2="517.126" y2="124.99" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#494949"/>
                    </linearGradient>
                    <linearGradient id="paint5_linear_289_23253" x1="517.126" y1="131.73" x2="517.126" y2="204.989" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#494949"/>
                    </linearGradient>
                    <linearGradient id="paint6_linear_289_23253" x1="5.60321" y1="78.8716" x2="5.60321" y2="177.874" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#494949"/>
                    </linearGradient>
                    <linearGradient id="paint7_linear_289_23253" x1="525.384" y1="78.8457" x2="525.384" y2="177.913" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#494949"/>
                    </linearGradient>
                    <linearGradient id="paint8_linear_289_23253" x1="246.5" y1="175" x2="246.5" y2="139" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FBC115" stop-opacity="0"/>
                    <stop offset="1" stop-color="#FBC115" stop-opacity="0.12"/>
                    </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
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
            logo: 'https://res.cloudinary.com/station0x/image/upload/v1644538655/encouter/widelogo_nog5zl.png',
            victory: 'https://res.cloudinary.com/station0x/image/upload/v1644538830/encouter/victory_dsfqjx.png',
            defeat: 'https://res.cloudinary.com/station0x/image/upload/v1644538829/encouter/defeat_zhhnus.png',
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
        }
    },
    // watch: {
    //     "$store.state.matchState" (newState, oldState) {
    //         if(newState.picking !== oldState.picking ) {
    //         }
    //     }
    // },
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
    top: 2.6vh;
    right: 29vw;
    z-index: 30;
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
    font-family: 'Roboto';
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
    font-family: 'Roboto';
    font-size: 21px;
    color: rgba(255,255,255,.3);
    cursor: pointer;
    text-transform: uppercase;
}
.skip-btn:hover {
    color: white;
}
.afk-dialog {
    max-width: 700px;
    width: 500px;
    height: 100px;
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
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