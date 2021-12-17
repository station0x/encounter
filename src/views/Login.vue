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
                        <div class="minor-text">Welcome to</div>
                        <div class="major-text">Station ZeroX: Encounter</div>
                        <div class="divider"></div>
                        
                        <b-button class="primary-btn" @click="connectMetamask">Connect Metamask</b-button>
                        <!-- <b-button disabled class="secondary-btn">Play as a guest</b-button> -->

                        <div @click="openGameGuideModal" class="clickable-text">Game Guide  <b-icon icon="alert-circle" size="is-small" style="margin-left: 5px"></b-icon></div>
                        <div class="info-text">This game is in alpha version and may contain bugs</div>
                    </div>
                </div>
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
            if(this.$hj){
                this.$hj('identify', this.$store.state.address, {})
            }
        },
        async connectAsGuest() {
            const signer = ethers.Wallet.createRandom()
            const signature = await signer.signMessage("Station Labs Login")
            this.reload()
            this.$store.dispatch('connect', {signature, address: await signer.getAddress()})
            if(this.$hj){
                this.$hj('identify', this.$store.state.address, {})
            }
            
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
    width: 280px !important;
    height: 60px;
    margin: 15px;
    padding: 15px;
    font-size: 19px;
    font-weight: 500;
    background: #0E1739 !important;
    color: white !important;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23416BFF' stroke-width='2' stroke-dasharray='3%2c 56%2c 16' stroke-dashoffset='22' stroke-linecap='square'/%3e%3c/svg%3e") !important;
    border: none !important;
    border-radius: 0px !important;
    font-family: 'ClashDisplay-Variable';
    transition: 200ms ease-in;
}
.primary-btn:hover {
    width: 320px !important;
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
.art-wrap {
    width: 950px;
    height: 650px;
    background-image: url('/art.png');
}
.art-wrap-overlay {
    height: 100%;
    width: 100%;
    background: radial-gradient(54.1% 54.1% at 50% 50%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);
    padding: 100px;
}
</style>