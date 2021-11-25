<template>
    <Board :state="$store.state.matchState.state" :playerIs="$store.state.matchState.playerIs" />
</template>

<script>
import Board from '@/components/Board.vue'
export default {
    data() {
        return {

        }
    },
    components: {
        Board
    }
}
</script>

<style lang="scss" scoped>

</style>