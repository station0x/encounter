<template>
    <div>
        <Board
            v-if="$store.state.matchState.winner !== 0 && $store.state.matchState.winner !== 1"
            :state="$store.state.matchState.state"
            :playerIs="$store.state.matchState.playerIs"
            :playerTurn="$store.state.matchState.playerTurn"
            :fuel0="$store.state.matchState.fuel0"    
            :fuel1="$store.state.matchState.fuel1"    
            :turnNum="$store.state.matchState.turnNum"
        />
        <h1 v-else-if="$store.state.matchState.playerIs === $store.state.matchState.winner">You Won <b-button @click="continueBtn">Continue</b-button></h1>
        <h1 v-else-if="$store.state.matchState.playerIs !== $store.state.matchState.winner">You Lost <b-button @click="continueBtn">Continue</b-button></h1>
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
    },
    methods: {
        async continueBtn () {
            await this.$store.dispatch("startPolling")
        }
    }
}
</script>

<style lang="scss" scoped>

</style>