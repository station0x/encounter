<template>
    <div>
        <Board
            v-if="!$store.state.matchState.winner"
            :state="$store.state.matchState.state"
            :playerIs="$store.state.matchState.playerIs"
            :playerTurn="$store.state.matchState.playerTurn"
            :fuel0="$store.state.matchState.fuel0"    
            :fuel1="$store.state.matchState.fuel1"    
        />
        <h1 v-else-if="$store.state.matchState.playerIs == $store.state.matchState.winner">You Won</h1>
        <h1 v-else-if="$store.state.matchState.playerIs != $store.state.matchState.winner">You Lost</h1>
    </div>
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