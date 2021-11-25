<template>
  <div id="app">
	  	<Login v-if="!this.$store.state.address"/>
		<router-view v-else></router-view>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'
export default {
  name: 'App',
  components: {
    Login
  }
}
</script>

<style>
body, html {
	margin: 0;
	padding: 0;
}
#app {
	background-color: black;
	margin: 0px;
	min-height: 100vh;
}
</style>
