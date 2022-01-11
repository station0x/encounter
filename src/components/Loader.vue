<template>
    <div class="hero is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <center class="loader-wrapper">
                    <img class="elementToFadeInAndOut" :src="loader" width="120px"/>
                </center>
            </div>
        </div>
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
    transition: 400ms ease-in-out;
}
.elementToFadeInAndOut {
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
