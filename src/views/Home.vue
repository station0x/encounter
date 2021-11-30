<template>
  <div>
      <div class="loader-wrapper" v-if="loading">
        <b-loading :is-full-page="false" v-model="loading" :can-cancel="false"></b-loading>
      </div>
      <div v-if="!loading">
        <div class="logout-btn" @click="logout">Logout</div>
        <CreateMatch v-if="!$store.state.matchState"/>
        <Match v-else/>
      </div>
	</div>
</template>

<script>
import CreateMatch from '@/components/CreateMatch.vue'
import Match from '@/components/Match.vue'
export default {
  name: 'Home',
  components: {
    CreateMatch,
    Match
  },
  methods: {
    logout() {
      this.$store.dispatch('disconnect')
    }
  },
  computed: {
    loading () {
      return !this.$store.state.loaded;
    }
  },
  created() {
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