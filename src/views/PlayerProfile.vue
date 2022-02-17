<template>
    <div class="page-container">
        <div class="loader-wrapper" v-if="fetchingProfileLoader">
            <Loader v-model="fetchingProfileLoader"/>
        </div>
        <h1 class="page-title">Captain Profile</h1>
        <div class="profile-wrapper">
            <div class="hex">
                <div class="hex-background">
                    <img class="gravatar" :src="gravatar">
                </div>
            </div>
            <center>
                <div style="width: fit-content">
                    <b-taglist attached>
                        <b-tag type="is-light-gray">Elo</b-tag>
                        <b-tag v-if="playerInfo" type="is-info">{{ playerInfo.elo }}</b-tag>
                    </b-taglist>
                </div>
            </center>
            <div class="name">{{playerInfo? playerInfo.playerAlias: ""}}</div>
            <div class="address">{{ playerAddress }}</div>
            <b-field v-if="playerAddress === $store.state.address">
                <b-input v-model="newName" custom-class="name-textarea" size="is-small" expanded></b-input>
                <p class="control">
                    <b-button :loading="loading" @click="submitName" class="submit-btn">Change Name</b-button>
                </p>
            </b-field>
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
            newName: "",
            loading: false
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
            this.playerInfo = res.data.playerDoc
            this.fetchingProfileLoader = false
        },
        async submitName () {
            if(this.newName.length > 0) {
                this.loading = true
                try {
                    const res = await axios.get('/api/player/changePlayerAlias', {
                        params:{
                            signature: this.$store.state.signature, 
                            alias: this.newName
                        }
                    })
                    const success = res.data.success
                    if(success) {
                        this.$buefy.toast.open({
                            duration: 5000,
                            message: `Name saved`,
                            position: 'is-bottom',
                            type: 'is-success'
                        })
                        this.newName = ""
                        this.fetchProfile()
                    } else {
                        this.$buefy.toast.open({
                            duration: 5000,
                            message: res.data.error,
                            position: 'is-bottom',
                            type: 'is-danger'
                        })
                    }
                } finally {
                    this.loading = false
                }
            }
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

<style>
.page-container {
    padding-top: 190px;
}
.profile-wrapper {
    height: 700px;
    max-width: 600px;
    padding: 50px;
    background: black;
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
    font-size: 2rem;
    color: white;
    font-family: 'Roboto';
    font-weight: 500;
    letter-spacing: 2px;
    padding: 25px 30px;
}
.address {
    height: fit-content;
    width: fit-content;
    margin: 0 auto;
    margin-top: -40px;
    margin-bottom: 20px;
    font-size: 17px;
    font-family: 'Roboto';
    font-weight: 300;
    letter-spacing: 1.1px;
    color: rgba(255,255,255,.7);
    padding: 20px 25px;
    overflow-wrap: anywhere;
}
.submit-btn {
  height: 50px !important;
  width: 170px !important;
  font-size: 15px !important;
  background: #0E1739 !important;
  color: white !important;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23416BFF' stroke-width='2' stroke-dasharray='3%2c 56%2c 16' stroke-dashoffset='22' stroke-linecap='square'/%3e%3c/svg%3e") !important;
  border: none !important;
  border-radius: 0px !important;
  font-family: 'Roboto';
  color: white;
  transition: 200ms ease-in;
}
.name-textarea {
	background: black;
}
input.input.is-small.name-textarea {
    background: black;
    border-top: 1px solid #416BFF;
	border-left: 1px solid #416BFF;
	border-bottom: 1px solid #416BFF;
	border-right: none;
	font-size: 15px;
	height: 50px;
	padding: 14px;
	color: white;
}
input.input.is-small.name-textarea:focus {
	box-shadow: none;
}
input[placeholder], [placeholder], *[placeholder] {
    color: white;
}
</style>