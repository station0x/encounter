<template>
  <div id="app">
	  <Navbar v-if="!$store.getters.isMobile"/>
		<router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'App',
  components: {
	Navbar
  },
  methods: {
	  	responsify() {
			this.$store.commit('changeWindowWidth', window.innerWidth)
		}
  },
  created() {
  	this.$store.commit('changeWindowWidth', window.innerWidth)
	window.addEventListener("resize", this.responsify)
  },
  destroyed() {
	window.removeEventListener("resize", this.responsify)
  }
}
</script>

<style>
@import "./assets/styles.css";
body, html {
	margin: 0;
	padding: 0;
	font-family: 'Roboto';
	background-color: #090F15;
}
#app {
	background-color: #090F15;
	margin: 0px;
	height: 100vh;
	max-width: 1680px;
	/* min-width: 1680px; */
	margin: 0 auto;
}
</style>
