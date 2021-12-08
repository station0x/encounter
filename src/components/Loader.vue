<template>
    <div class="loader-wrapper">
        <center class="loader-wrapper">
            <img class="elementToFadeInAndOut" :src="loader" width="120px"/>
        </center>
    </div>
</template>

<script>
export default {
    data () {
        return {
            loader: require('../assets/img/loader.gif')
        }
    },

}
</script>

<style scoped>
.loader-wrapper {
    height: 100vh;
    width: 100vw;
    line-height: 100vh;
    vertical-align: middle;
    transition: 400ms ease-in-out;
}
.elementToFadeInAndOut {
    /* width:200px;
    height: 200px; */
    background: black;
    -webkit-animation: fadeinout 1.5s linear forwards;
    animation: fadeinout 1.5s linear forwards;
    animation-iteration-count: infinite;
}

@-webkit-keyframes fadeinout {
  0%,100% { opacity: 0; }
  50% { opacity: 1; }
}

@keyframes fadeinout {
  0%,100% { opacity: 0; }
  50% { opacity: 1; }
}
</style>
