<template>
    <div class="section onboarding">
        <center>
            <img
                src="/logo.png"
                alt="Station0x Encounter Logo"
                class="main-logo"
            />
            <div class="art-wrap">
                <div class="art-wrap-overlay">
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
                        <b-button type="is-light" :disabled="findingMatchLoader" v-if="!invitationLink" :loading="createMatchLoader" class="primary-btn" @click="createMatch">Create Match</b-button>
                        <b-tooltip 
                            type="is-dark"
                            :triggers="['hover']"
                            auto-close>
                            <template v-slot:content>
                                Matchmake with available players
                            </template>
                            <b-button :loading="checkMatchLoader" type="is-light" v-if="!invitationLink" class="primary-btn" @click="triggerMatchmaking">{{ findingMatchLoader ? 'Leave Queue' : 'Find Match' }}</b-button>
                        </b-tooltip>
                        <b-tooltip 
                            type="is-dark"
                            :triggers="['click']"
                            auto-close>
                            <template v-slot:content>
                                Link Copied!
                            </template>
                            <b-button v-if="invitationLink" v-clipboard:copy="linkPrefix + invitationLink" class="primary-btn">Copy Link</b-button>
                        </b-tooltip>
                        <div @click="openGameGuideModal" class="clickable-text" style="margin-top: 20 !important">Game Guide  <b-icon icon="alert-circle" size="is-small" style="margin-left: 5px; margin-top: -40px"></b-icon></div>
                        <div class="info-text">This game is in alpha version and may contain bugs</div>
                    </div>
                </div>
            </div>
            <b-progress class="mmr-progressbar" v-if="findingMatchLoader" type="is-dark" :rounded="false" size="is-small"></b-progress>
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
            linkPrefix: '',
            createMatchLoader: false,
            findingMatchLoader: false,
            checkMatchLoader: true
        }
    },
    methods: {
        async createMatch() {
            this.createMatchLoader = true
            try {
                const res = await axios.get('/api/match/createMatch', {
                    params:{
                        signature:this.$store.state.signature
                    }
                })
                this.linkPrefix = window.location.host.split(':')[0] === 'localhost' ? 'http://' : 'https://'
                this.invitationLink = window.location.host + '/play/' + res.data.inviteLink
            } finally {
                this.createMatchLoader = false
            }
        },
        openGameGuideModal() {
            this.$buefy.modal.open({
                component: GameGuide
            })
        },
        async triggerMatchmaking() { 
            if(this.findingMatchLoader) {
                try {
                    this.findingMatchLoader = false
                    const res = await axios.get('/api/matchmaker/leaveMatchmaking', {
                        params:{
                            signature:this.$store.state.signature
                        }
                    })
                } finally {
                    this.createMatchLoader = false
                }
            } else {
                this.findingMatchLoader = true
                try {
                    const res = await axios.get('/api/matchmaker/joinMatchmaking', {
                        params:{
                            signature:this.$store.state.signature
                        }
                    })

                } finally {
                    this.createMatchLoader = false
                }
            }
        },
        async checkMatchmaking() {
            try {
                const res = await axios.get('/api/matchmaker/checkMatchmaking', {
                    params:{
                        signature:this.$store.state.signature
                    }
                })
                if(res.data.enqueued) this.findingMatchLoader = true
            } finally {
                this.checkMatchLoader = false
            }
        }
    },
    created() {
        this.checkMatchmaking()
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
</style>