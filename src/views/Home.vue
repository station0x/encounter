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
  

}
</script>