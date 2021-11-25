<template>
    <section>
        <b-button @click="createMatch">Create Match</b-button>
        <h1 v-if="invitationLink">{{ invitationLink }}</h1>
    </section>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            invitationLink: undefined
        }
    },
    methods: {
        async createMatch() {
            const res = await axios.get('/api/createMatch', {
                params:{
                    signature:this.$store.state.signature
                }
            })
            this.invitationLink = window.location.origin + '/play/' + res.data.inviteLink
            console.log(res.data, this.$store.state.address)
        }
    }
}
</script>


<style scoped>

</style>