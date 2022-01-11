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
            prevRouteName: null
        }
    },
    methods: {
        async connectMetamask() {
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
            const signer = provider.getSigner()
            await provider.send("eth_requestAccounts", []);
            const accounts = await provider.listAccounts()
            const signature = await signer.signMessage("Station Labs Login")
            this.$router.go()
            this.$store.dispatch('connect', {signature, address: await signer.getAddress()})
            if(this.$hj){
                this.$hj('identify', this.$store.state.address, {})
            }
        },
        async connectAsGuest() {
            const signer = ethers.Wallet.createRandom()
            const signature = await signer.signMessage("Station Labs Login")
            this.$router.go()
            this.$store.dispatch('connect', {signature, address: await signer.getAddress()})
            if(this.$hj){
                this.$hj('identify', this.$store.state.address, {})
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
