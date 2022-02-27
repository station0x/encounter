<template>
    <div class="hero">
        <div class="hero-body">
            <div class="container has-text-centered">
                <center class="loader-wrapper">
                    <div class="elementToFadeInAndOut loader-text">loading</div>
                    <h1 class="loader-text minor" style="border-color: white;">{{ text + '...' }}</h1>
                </center>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    props: ['text'],
    computed: {
        routeDestination() {
            return this.$route.name
        }
    },
    methods: {
        getRandomQoute() {
            return this.randSentences[Math.floor(Math.random()*this.randSentences.length)] + this.routeDestination + '”.'
        }
    }
}
</script>

<style scoped>
.loader-wrapper {
    transition: 400ms ease-in-out;
}
.loader-text {
    text-transform: uppercase;
    letter-spacing: 4px;
    font-weight: 100;
    font-size: 25px;
    color: rgba(250,250,250, 0.3);
}
.loader-text.minor {
    text-transform: capitalize;
    letter-spacing: 3px;
    font-weight: 100;
    font-size: 14px;
    color: rgba(250,250,250, 0.5);
}
</style>
