<template>
	<div>
	  <div v-if="$store.state.profile && $store.state.profile.banned" id="banned-message">
		  Your account is banned from playing. <span v-if="$store.state.profile.reason">Reason: {{$store.state.profile.reason}}</span>
	  </div>
  <div id="app">
	  <!-- <Navbar v-show="!$store.getters.isMobile && !$store.getters.isPicking"/> -->
	  <HUD v-if="isConnected && $store.getters.isPicking === false && isMatch === false"/>
		<router-view></router-view>
  </div>
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
        return this.$store.state.address && this.$store.state.address.length > 0 ? true : false
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
  },
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
	margin: 0px;
	height: 100%;
	max-width: 1680px;
	/* min-width: 1680px; */
	margin: 0 auto;
}
#banned-message {
	position:absolute;
	top:0;
	z-index:2;
	width:100%;
	background: rgb(233, 48, 48);
	padding: 4px;
	text-align: center;
}
::-webkit-scrollbar {
  width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: none; 
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #FBC115;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #ffd452;;
    border-radius: 16px;
    cursor: pointer;
}
</style>
