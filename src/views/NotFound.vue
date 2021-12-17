<template>
    <div class="page-container">
        <div class="loader-wrapper">
            <img src="/404.svg"/>
            <h1 class="message">{{ formattedMessage }}</h1>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
        }
    },
    props: { message: { default: 'Page' } },
    computed: {
        formattedMessage() {
            return this.message + ' not found!'
        }
    }
}
</script>

<style scoped>
.page-container {
    width:100%;
    margin:0 auto;
}
.loader-wrapper {
    max-width:1200px;
    margin:0 auto;
    position: relative;
}
.message {
    position: absolute;
    font-size: 50px;
    bottom:120px;
    background:transparent;
    width:1200px;
    text-align: center;
}
</style>
