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
                        <div>
                            <div class="major-text">Station ZeroX: Encounter</div>
                            <div class="minor-text">Use your access key to get access to the closed beta version</div>
                        </div>
                        <div class="divider-light"></div>
                        <b-field>
                            <b-input @focus="accessKey = ''" v-model="accessKey" custom-class="access-field" size="is-small" expanded></b-input>
                        </b-field>
                        <b-button class="primary-btn" :loading="matchLoader" @click="registerAddress">Get Access</b-button>
                        <div @click="openGameGuideModal" class="clickable-text-light">Game Guide <b-icon icon="alert-circle" size="is-small" style="margin-left: 5pxSend match link to challenge a friend"></b-icon></div>
                        <div class="info-text">This game is in alpha version and may contain bugs</div>
                    </div>
                </div>
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
            matchLoader: false,
            accessKey: 'Enter access key here'
        }
    },
    methods:{
        async registerAddress() {
            try {
                this.matchLoader = true
                let res = await axios.get("/api/access/registerAddress", {
                    params: {
                        signature: this.$store.state.signature,
                        key: this.accessKey
                    }
                })
                this.$store.commit('registerAddress', true)
                this.$buefy.toast.open({
                    duration: 5000,
                    message: `ACCESS GRANTED`,
                    position: 'is-bottom',
                    type: 'is-success'
                })
            } catch(err) {
                this.$buefy.toast.open({
                    duration: 5000,
                    message: `Access key is not valid or may be expired`,
                    position: 'is-bottom',
                    type: 'is-danger'
                })
            } finally {
                this.matchLoader = false
            }
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

<style>
.primary-btn {
    background: #F88C09 !important;
    color: black !important;
    border: none !important;
    width: 230px!important;
    height: 60px !important;
    margin: 15px!important;
    padding: 15px!important;
    font-size: 19px!important;
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
.access-field {
	background: black;
}
input.input.is-small.access-field {
    background: black;
	border: 1px solid #303030;
	font-size: 19px;
	height: 65px;
	padding: 14px;
	color: white;
}
input.input.is-small.access-field:focus {
	box-shadow: none;
}
input[placeholder], [placeholder], *[placeholder] {
    color: white;
}
.clickable-text-light {
    color: #416BFF;
    font-size: 19px;
    font-weight: 400;
    cursor: pointer;
    margin: 20px 20px 0px 20px;
}
.divider-light {
    margin: 25px 0px 35px 0px;
    border-top: 1px solid rgba(255,255,255,.4);
    height: 1px;
    background: transparent;
    width: 80%;
}
</style>