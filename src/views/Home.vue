<template>
  <div>
        <b-button @click="logout">Logout</b-button>
        <CreateMatch v-if="!$store.state.matchState"/>
        <Match v-else/>
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
  created() {
    if(this.$store.state.matchState && (this.$store.state.matchState.winner === 0 || this.$store.state.matchState.winner === 1) && !this.$store.state.interval) {
      this.$store.dispatch("startPolling")
    }
  }

}
</script>