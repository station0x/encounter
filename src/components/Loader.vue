<template>
    <div class="hero is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <center class="loader-wrapper">
                    <div class="elementToFadeInAndOut loader-text">loading</div>
                    <center style="display: inline-block">
                        <b-button class="loader-fake-btn" :loading="true" ></b-button>
                        <h1 class="loading-text" style="border-color: white;">{{ getRandomQoute() }}</h1>
                    </center>
                </center>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            loader: require('../assets/img/loader.gif'),
            randSentences: [
                `“That's one small step for a man, one giant leap for mankind. Navigation to `,
                `“In this single galaxy of ours there are eighty-seven thousand million suns and a `,
                `Space has the ability to produce a triple bottom line, or ROIII: Return on Investment, Innovation, and Inspiration  or `,
                `I see Earth, I mean `,
            ]
        }
    },
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
    color: rgba(250,250,250, 0.6);
}
</style>
