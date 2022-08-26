<template>
  <div>
      <div class="loader-wrapper" v-if="loading">
        <Loader v-model="loading"/>
      </div>
      <div v-if="!loading">
        <CreateMatch v-show="$store.state.registered && !$store.state.matchState"/>
        <Match v-if="$store.state.matchState"/>
      </div>
	</div>
</template>

<script>
import CreateMatch from '@/components/CreateMatch.vue'
import Match from '@/components/Match.vue'
import Loader from '@/components/Loader.vue'
import axios from 'axios'

export default {
  name: 'Lobby',
  data() {
    return {
      
    }
  },
  components: {
    CreateMatch,
    Match,
    Loader  
  },
  methods: {
    async checkAddressAccess() {
      try {
        let res = await axios.get("/api/access/checkPlayerRegistered", {
            params: {
              signature: this.$store.state.signature,
            }
          })
          if(res.data.response.success) {
            this.$store.commit('registerAddress', true)
          } else {
            this.registerAddress()
          }
        } catch(err) {
          this.$store.commit('registerAddress', false)
        }
    },
    async registerAddress() {
      this.loading = true
      try {
          let res = await axios.get("/api/access/registerAddress", {
              params: {
                  signature: this.$store.state.signature,
              }
          })
          this.$store.commit('registerAddress', true)
      } catch(err) {
          this.$buefy.toast.open({
              duration: 5000,
              message: err,
              position: 'is-bottom',
              type: 'is-danger'
          })
      } finally {
          this.loading = false
      }
    }
  },
  computed: {
    loading () {
      return !this.$store.state.loaded
    }
  },
  async beforeMount() {
    await this.checkAddressAccess()
    if(this.$store.state.matchState && (this.$store.state.matchState.winner === 0 || this.$store.state.matchState.winner === 1) && !this.$store.state.interval) {
      this.$store.dispatch("startPolling")
    }
  }
}
</script>

<style scoped>
.upper-btn {
  font-family: 'Roboto';
  font-size: 19px;
  color: white;
  cursor: pointer;
  position: absolute;
  top: 4.5vh;
  right: 10vw;
  text-transform: uppercase;
}
.loading-wrapper {
  background: black;
  height: 100vh;
  width: 100vw;
}
.loading-background {
  background-color: black !important;
}
</style>