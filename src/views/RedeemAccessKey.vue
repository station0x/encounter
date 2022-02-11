<template>
    <div class="section onboarding">
        <div class="loader-wrapper" v-if="checkingBuyer">
            <Loader v-model="checkingBuyer"/>
        </div>
        <center>
            <img
                src="https://res.cloudinary.com/station0x/image/upload/v1644538254/encouter/logo_ivctff.png"
                alt="Station0x Encounter Logo"
                class="main-logo"
            />
            <div class="onboarding-wrapper">
                <div class="minor-text">Welcome to</div>
                <div class="major-text">Station ZeroX: Encounter</div>
                <div v-if="!buyer" class="minor-text" style="margin-top: 4px">You have no Callisto-6 mints linked to this address. Logout and make sure to connect the address you used to mint the skins.</div>
                <div v-else class="minor-text" style="margin-top: 4px">Below is your Station ZeroX: Encounter closed alpa release access key. Your access key can be redeemed by up to 2 users.</div>
                <div v-if="buyer" class="divider"></div>
                <b-tooltip 
                    type="is-dark"
                    :triggers="['click']"
                    auto-close>
                    <template v-slot:content>
                        Copied!
                    </template>
                    <b-button v-if="buyer" type="is-light" :loading="fetchingAccessKey" class="primary-btn" v-clipboard:copy="accessKey">Your Access Key: {{ accessKey }} </b-button>
                </b-tooltip>
                <div @click="openGameGuideModal" class="clickable-text" style="margin-top: 20 !important">Game Guide  <b-icon icon="alert-circle" size="is-small" style="margin-left: 5px; margin-top: -40px"></b-icon></div>
                <div class="info-text">This game is in alpha version and may contain bugs</div>
            </div>
        </center>
    </div>
</template>

<script>
import GameGuide from '@/components/GameGuide.vue'
import Loader from '@/components/Loader.vue'
import axios from 'axios'
export default {
    data() {
        return {
            buyer: false,
            checkingBuyer: true,
            checkMatchLoader: true,
            accessKey: undefined,
            fetchingAccessKey: false
        }
    },
    components: {
        Loader
    },
    methods: {
        openGameGuideModal() {
            this.$buefy.modal.open({
                component: GameGuide
            })
        },
        async fetchAccessKey() {
            this.fetchingAccessKey = true
            try {
                const res = await axios.get('/api/access/callistoAccessKey', {
                    params:{
                        signature:this.$store.state.signature
                    }
                })
                this.accessKey = res.data.key
                this.fetchingAccessKey = false
            } finally {
            }
        },
        async checkBuyer() {
            try {
                const res = await axios.get('/api/access/checkCallistoBuyer', {
                    params:{
                        signature:this.$store.state.signature
                    }
                })
                if(res.data.buyer) {
                    this.fetchAccessKey()
                    this.buyer = true
                }
            } finally {
                this.checkingBuyer = false 
            }
        }
    },
    created() {
        this.checkBuyer()
    }
}
</script>


<style scoped>
.primary-btn {
    background: #F88C09 !important;
    color: black;
    border: none;
    width: fit-content !important;
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
.clickable-text {
    margin: 30px 20px 0px 20px;
}
.loading-wrapper {
  background: black;
  height: 100vh;
  width: 100vw;
}
</style>