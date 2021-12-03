<template>
    <center>
        <img :src="guide" width="950px"/>
    </center>
</template>

<script>
export default {
    data() {
        return {
            guide: require('../assets/img/guide.png')
        }
    }
}
</script>
