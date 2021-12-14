<template>
  <div>
      <div class="loader-wrapper" v-if="loading">
        <Loader v-model="loading"/>
      </div>
      <div v-if="!loading">
        <div class="logout-btn" @click="logout">Logout</div>
        <div v-if="$store.state.matchState" @click="openGameGuideModal" class="upper-btn in-game-btn">Game Guide  <b-icon icon="alert-circle" size="is-small" style="margin-left: 5px"></b-icon></div>
        <GetAccess v-if="!$store.state.registered && !$store.state.matchState"/>
        <CreateMatch v-if="$store.state.registered && !$store.state.matchState"/>
        <Match v-if="$store.state.matchState"/>
      </div>
	</div>
</template>

<script>
import CreateMatch from '@/components/CreateMatch.vue'
import Match from '@/components/Match.vue'
import GameGuide from '@/components/GameGuide.vue'
import GetAccess from '@/components/GetAccess.vue'
import Loader from '@/components/Loader.vue'
import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return {
    }
  },
  components: {
    CreateMatch,
    Match,
    Loader,
    GetAccess
  },
  methods: {
    logout() {
      this.$store.dispatch('disconnect')
      this.$router.push({name: 'Login'})
    },
    openGameGuideModal() {
      this.$buefy.modal.open({
        component: GameGuide
      })
    },
    async checkAddressAccess() {
      try {
        let res = await axios.get("/api/access/checkPlayerAccess", {
            params: {
              signature: this.$store.state.signature,
              key: this.accessKey
            }
          })
          if(res.data.response.success) {
            this.$store.commit('registerAddress', true)
          } else {
            this.$store.commit('registerAddress', false)
          }
        } catch(err) {
          this.$store.commit('registerAddress', false)
        }
    }
  },
  computed: {
    loading () {
      return !this.$store.state.loaded
    }
  },
  created() {
    this.checkAddressAccess()
    if(this.$store.state.matchState && (this.$store.state.matchState.winner === 0 || this.$store.state.matchState.winner === 1) && !this.$store.state.interval) {
      this.$store.dispatch("startPolling")
    }
  }
}
</script>

<style scoped>
.logout-btn {
  font-family: 'ClashDisplay-Variable';
  font-size: 19px;
  color: white;
  cursor: pointer;
  position: absolute;
  top: 4.5vh;
  right: 3vw;
  text-transform: uppercase;
}
.upper-btn {
  font-family: 'ClashDisplay-Variable';
  font-size: 19px;
  color: white;
  cursor: pointer;
  position: absolute;
  top: 4.5vh;
  right: 10vw;
  text-transform: uppercase;
}
.logout-btn:hover {
  opacity: 0.9;
  border-bottom: 1px solid white;
}
.loading-wrapper {
  background: black;
  height: 100vh;
  width: 100vw;
}
.loading-background {
  background-color: black !important;
}
body {
  background: black !important;
}
</style>