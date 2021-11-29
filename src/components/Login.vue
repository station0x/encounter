<template>
    <section class="onboarding">
        <b-button @click="connectMetamask">Connect Metamask</b-button>
        <b-button @click="connectAsGuest">What? Play as Guest</b-button>
        
    </section>
</template>

<script>
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
            this.$store.dispatch('connect', {signature, address: await signer.getAddress()})
        },
        async connectAsGuest() {
            const signer = ethers.Wallet.createRandom()
            const signature = await signer.signMessage("Station Labs Login")
            this.$store.dispatch('connect', {signature, address: await signer.getAddress()})
        }
    },
    computed: {

    }
}
</script>

<style scoped>
.onboarding {
    background: red;
}
</style>