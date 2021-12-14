<template>
  <div id="app">
	  <Navbar/>
		<router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'App',
  components: {
	  Navbar
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
	background-color: black;
	margin: 0px;
	min-height: 100vh;
	max-width: 1680px;
	min-width: 1680px;
	margin: 0 auto;
}
</style>
