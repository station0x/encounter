<template>
    <div class="section onboarding">
        <center>
            <img
            src="/logo.png"
            alt="Station0x Encounter Logo"
            class="main-logo"
            />
            <div class="onboarding-wrapper">
                <div class="minor-text">Welcome to</div>
                <div class="major-text">Station ZeroX: Encounter</div>
                <div class="divider"></div>
                
                <b-button class="primary-btn" @click="connectMetamask">Connect Metamask</b-button>
                <b-button class="secondary-btn" @click="connectAsGuest">Play as a guest</b-button>

                <div @click="openGameGuideModal" class="clickable-text">Game Guide  <b-icon icon="alert-circle" size="is-small" style="margin-left: 5px"></b-icon></div>
                <div class="info-text">This game is in alpha version and may contain bugs</div>
            </div>
        </center>
    </div>
</template>

<script>
import GameGuide from '@/components/GameGuide.vue'
import { ethers } from 'ethers'

export default {
    data() {
        return {

        }
    },
    methods: {
        async connectMetamask() {
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
            const signer = provider.getSigner()
            await provider.send("eth_requestAccounts", []);
            const accounts = await provider.listAccounts()
            const signature = await signer.signMessage("Station Labs Login")
            this.reload()
            this.$store.dispatch('connect', {signature, address: await signer.getAddress()})
            
        },
        async connectAsGuest() {
            const signer = ethers.Wallet.createRandom()
            const signature = await signer.signMessage("Station Labs Login")
            this.reload()
            this.$store.dispatch('connect', {signature, address: await signer.getAddress()})
            
        },
        openGameGuideModal() {
            this.$buefy.modal.open({
                component: GameGuide
            })
        },
        reload(){   
            this.$router.go(this.$router.currentRoute)
        }
    }
}
</script>

<style scoped>
.primary-btn {
    background: #F88C09;
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
button.button.secondary-btn[disabled] {
    color: rgba(0,0,0,0.3);
}
.secondary-btn:hover[disabled] {
    color: black;
    background: #dbdbdb;
    border: #dbdbdb;
}
</style>