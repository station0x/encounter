<template>
  <div id="app" :style="bodyStyle">
	  <Navbar v-show="!$store.getters.isMobile && !$store.getters.isPicking"/>
		<router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import {mapGetters} from 'vuex';

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
  computed: {
	bodyStyle() {
		let styles = {}
		if(this.isPicking) {
			styles['--bg'] = '#090F15'
		} else {
			styles['--bg'] = 'black'
		}
		return styles
	},
	...mapGetters({
        isPicking: 'isPicking'
    })
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
	height: 100vh;
	max-width: 1680px;
	/* min-width: 1680px; */
	margin: 0 auto;
}
</style>
