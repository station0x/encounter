<template>
  <div id="app" :style="bodyStyle">
	  <!-- <Navbar v-show="!$store.getters.isMobile && !$store.getters.isPicking"/> -->
	  <HUD v-if="isConnected && !$store.getters.isMobile && $store.getters.isPicking === false && isMatch === false"/>
		<router-view></router-view>
  </div>
</template>

<script>
// import Navbar from '@/components/Navbar'
import HUD from '@/components/HUD'
import {mapGetters} from 'vuex';

export default {
  name: 'App',
  components: {
	// Navbar,
	HUD
  },
  methods: {
	responsify() {
		this.$store.commit('changeWindowWidth', window.innerWidth)
	},
  },
  computed: {
	bodyStyle() {
		let styles = {}
		if(this.isPicking) {
			styles['--bg'] = 'black'
		} else {
			styles['--bg'] = 'black'
		}
		return styles
	},
	...mapGetters({
        isPicking: 'isPicking'
    }),
	isConnected() {
        return this.$store.state.address && this.$store.state.address.length > 0? true : false
    },
	isMatch() {
		return this.$store.state.matchState === undefined ? false : true
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
}
#app {
	background-color: var(--bg);
	margin: 0px;
	height: 100%;
	max-width: 1680px;
	/* min-width: 1680px; */
	margin: 0 auto;
}
</style>
