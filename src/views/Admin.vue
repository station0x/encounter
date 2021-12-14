<template>
    <div class="admin-container">
        
        <b-button @click="makeKey(20)">Generate</b-button>
        <br/>
        <span>Key</span>
        <b-input v-model="accessKey"></b-input>
        <span>Number of uses</span>
        <b-input v-model="numUses"></b-input>
        <span>Password</span>
        <b-input v-model="password"></b-input>
        <b-button :disabled="!password || !numUses || !accessKey || accessKey.length < 8" @click="submit">Submit</b-button>
        <br/>
        <span v-if="lastKey">Server says {{lastKey}} was created</span>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data () {
        return {
            password:"",
            accessKey:"",
            numUses:"",
            lastKey:""
        }
    },
    methods:{
        async submit () {
            try {
                const res = await axios.get('/api/access/createAccessKey', {
                    params:{
                        password: this.password,
                        key: this.accessKey,
                        timesLeft: this.numUses
                    }
                })

                this.lastKey = res.data.key
            } catch (e) {
                alert(e)
            }
        },
        makeKey(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            this.accessKey = result;
        }

    }
}
</script>

<style scoped>
.admin-container {
    width: 500px;
    margin:auto;
    padding-top:25vh;
}
</style>