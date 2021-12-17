<template>
    <div class="section onboarding">
        <center>
            <img
            src="/logo.png"
            alt="Station0x Encounter Logo"
            class="main-logo"
            />
            <div class="onboarding-wrapper">
                <div>
                    <div class="minor-text">Your friend challenges you in</div>
                    <div class="major-text">Station ZeroX: Encounter</div>
                </div>
                <div class="divider"></div>
                <b-button class="primary-btn" :loading="matchLoader" @click="joinMatch">Join Match</b-button>
                <div @click="openGameGuideModal" class="clickable-text">Game Guide <b-icon icon="alert-circle" size="is-small" style="margin-left: 5pxSend match link to challenge a friend"></b-icon></div>
                <div class="info-text">This game is in alpha version and may contain bugs</div>
            </div>
        </center>
    </div>
</template>

<script>
import GameGuide from '@/components/GameGuide.vue'
import axios from 'axios'
export default {
    data() {
        return {
            matchLoader: false
        }
    },
    methods:{
        async joinMatch() {
            try {
                this.matchLoader = true
                await axios.get("/api/match/joinMatch", {
                    params: {
                        signature: this.$store.state.signature,
                        inviteLink: this.$route.params.link
                    }
                })
            } finally {}
        },
        openGameGuideModal() {
            this.$buefy.modal.open({
                component: GameGuide
            })
        }
    },
    watch: {
        '$store.state.matchState' () {
            if(this.$store.state.matchId) {
                this.matchLoader = false
                this.$router.push('/')
            }
        }
    }
}
</script>

<style scoped>
.primary-btn {
    background: #F88C09 !important;
    color: black;
    border: none;
    width: 230px;
    height: 60px;
    margin: 15px;
    padding: 15px;
    font-size: 19px;
    font-weight: 500;
    transition: 250ms ease-in-out;
}
.primary-btn:hover {
    background: #f39a2d;
}
.info-text {
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 16px;
    color: white;
    margin: 0px 20px 0px 20px;
}
</style>