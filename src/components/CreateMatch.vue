<template>
    <div class="section onboarding">
        <center>
            <img
                src="/logo.png"
                alt="Station0x Encounter Logo"
                class="main-logo"
            />
            <div class="onboarding-wrapper">
                <div v-if="!invitationLink">
                    <div class="minor-text">Welcome to</div>
                    <div class="major-text">Station ZeroX: Encounter</div>
                </div>
                <div v-else>
                    <div class="major-text">Send match link to challenge a friend</div>
                    <div class="minor-text">The game will start as soon as your friend joins</div>
                </div>
                <h1 class="invitation-link" v-if="invitationLink">{{ invitationLink }}</h1>
                <div class="divider"></div>
                <b-button type="is-light" v-if="!invitationLink" :loading="matchLoader" class="primary-btn" @click="createMatch">Create Match</b-button>

                <b-tooltip 
                    type="is-dark"
                    :triggers="['click']"
                    auto-close>
                    <template v-slot:content>
                        Link Copied!
                    </template>
                    <b-button v-if="invitationLink" v-clipboard:copy="linkPrefix + invitationLink" class="primary-btn">Copy Link</b-button>
                </b-tooltip>
                <div @click="openGameGuideModal" class="clickable-text">Game Guide  <b-icon icon="alert-circle" size="is-small" style="margin-left: 5px"></b-icon></div>
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
            invitationLink: undefined,
            matchLoader: false,
            linkPrefix: ''
        }
    },
    methods: {
        async createMatch() {
            this.matchLoader = true
            try {
                const res = await axios.get('/api/createMatch', {
                    params:{
                        signature:this.$store.state.signature
                    }
                })
                this.linkPrefix = window.location.host.split(':')[0] === 'localhost' ? 'http://' : 'https://'
                this.invitationLink = window.location.host + '/play/' + res.data.inviteLink
            } finally {
                this.matchLoader = false
            }
        },
        openGameGuideModal() {
            this.$buefy.modal.open({
                component: GameGuide
            })
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
.secondary-btn {
    background: rgba(248, 140, 9, 0.1);
    border: 1px solid #F88C09;
    color: #F88C09;
    width: 230px;
    height: 60px;
    margin: 15px;
    padding: 15px;
    font-size: 19px;
    font-weight: 500;
    transition: 250ms ease-in-out;
}
.secondary-btn:hover {
    color: black;
    background: #F88C09;
    border: #F88C09;
}
.invitation-link {
    margin-bottom: -40px;
    font-size: 19px;
    color: white;
    margin-top: 60px;
}
</style>