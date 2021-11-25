<template>
    <div>
        {{ $route.params.link }}
        <b-button @click="joinMatch">Join Match</b-button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    methods:{
        async joinMatch() {
            await axios.get("/api/joinMatch", {
                params: {
                    signature: this.$store.state.signature,
                    inviteLink: this.$route.params.link
                }
            })
            this.$router.push('/')
        }
    }
}
</script>