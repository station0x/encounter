<template>
  <div>
      <div class="loader-wrapper" v-if="loading">
        <Loader v-model="loading"/>
      </div>
      <div v-if="!loading">
        <GetAccess v-if="!$store.state.registered && !$store.state.matchState"/>
        <CreateMatch v-if="$store.state.registered && !$store.state.matchState"/>
        <Match v-if="$store.state.matchState"/>
      </div>
      <v-gravatar style="display: none" ref="gravatar" :email="$store.state.address" alt="Nobody" :size="82"/>
	</div>
</template>

<script>
import CreateMatch from '@/components/CreateMatch.vue'
import Match from '@/components/Match.vue'
import GetAccess from '@/components/GetAccess.vue'
import Loader from '@/components/Loader.vue'
import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return {
      gravatar: null
    }
  },
  components: {
    CreateMatch,
    Match,
    Loader,
    GetAccess
  },
  methods: {
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
  },
  mounted: function() {
    this.gravatar = this.$refs.gravatar.url
    this.$store.commit('setGravatar', this.$refs.gravatar.url)
  },
}
</script>

<style scoped>
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