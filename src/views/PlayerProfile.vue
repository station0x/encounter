<template>
    <div class="page-container">
        <div class="loader-wrapper" v-if="fetchingProfileLoader">
            <Loader v-model="fetchingProfileLoader"/>
        </div>
        <h1 class="profile-title">Captain Profile</h1>
        <div class="profile-wrapper">
            <div class="hex">
                <div class="hex-background">
                    <img class="gravatar" :src="gravatar">
                </div>
            </div>
            <!-- <div v-if="playerInfo.playerAlias.length !== 0" class="name">Name</div> -->
            <div class="name">Name</div>
            <div class="address">{{ this.playerAddress }}</div>
        </div>
        <v-gravatar style="display: none" ref="gravatar" :email="playerAddress" alt="Nobody" :size="530"/>
    </div>
</template>

<script>
import { ethers } from 'ethers'
import Loader from '@/components/Loader.vue'
import axios from 'axios'
export default {
    data() {
        return {
            isAddress: false,
            fetchingProfileLoader: true,
            playerAddress: undefined,
            playerInfo: undefined,
            gravatar: null,
        }
    },
    components: {
        Loader
    },
    methods: {
        async fetchProfile(){
            const res = await axios.get('/api/player/fetchPlayerProfile', {
				params:{
					address: this.playerAddress
				}
            })
            console.log(res)
            this.playerInfo = res.data.playerDoc
            this.fetchingProfileLoader = false
        }
    },
    created() {
        if(ethers.utils.isAddress(this.$route.params.playerAddress)) {
            this.isAddress = true
            this.playerAddress = this.$route.params.playerAddress
            this.fetchProfile()
        } else {
            this.$router.push({ name: 'Not found', params: {message: 'Profile'} })
        }
    },
    mounted: function() {
        this.gravatar = this.$refs.gravatar.url
    },
}
</script>

<style scoped>
.page-container {
    height: 100vh;
    padding-top: 170px;
}
.profile-wrapper {
    height: 700px;
    width: 700px;
    padding: 50px;
    background: #01040D;
    backdrop-filter: blur(6px);
    display: block;
    margin: 0 auto;
}
.hex {
    background: white;
    display: block;
    margin: 20px auto;
    position: relative;
    width: 120px;
    height: 130px;
    clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
    -webkit-clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
    -moz-clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
    
}
.hex-background {
    display: block;
    margin: 0 auto;
    position: absolute;
    top: 5px; /* equal to border thickness */
    right: 5px;
    width: 110px; /* container height - (border thickness * 2) */
    height: 120px; /* container height - (border thickness * 2) */
    clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
    -webkit-clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
    -moz-clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
}
.gravatar {
    height: 120px;
}
.name {
    height: fit-content;
    width: fit-content;
    margin: 0 auto;
    font-size: 21px;
    color: white;
    font-family: 'ClashDisplay-Variable';
    font-weight: 500;
    letter-spacing: 2px;
    padding: 25px 30px;
}
.address {
    height: fit-content;
    width: fit-content;
    background: rgba(34, 34, 37, 0.11);
    margin: 0 auto;
    font-size: 17px;
    font-family: 'ClashDisplay-Variable';
    font-weight: 300;
    letter-spacing: 1.1px;
    color: rgba(255,255,255,.7);
    padding: 20px 25px;
}
.profile-title {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: bold;
    font-size: 34px;
    line-height: 40px;
    text-align: center;
    text-transform: capitalize;
    color: #FFFFFF;
    margin-bottom: 50px;
}
</style>