<template>
    <div>
        <div class="loader-wrapper" v-if="sortedData === false">
            <Loader/>
        </div>
    <b-table v-if="sortedData" :data="sortedData">
        <b-table-column field="rank" label="Rank" width="30" numeric v-slot="props">
            {{ props.index + 1 > 3 ? props.index + 1 : "" }}
            <img v-if="props.index + 1 === 1" src="/top1.png"/>
            <img v-if="props.index + 1 === 2" src="/top2.png"/>
            <img v-if="props.index + 1 === 3" src="/top3.png"/>
        </b-table-column>

        <b-table-column field="rank" width="50" numeric v-slot="props">
           <img v-if="props.row.gm" src="/gm.png"/>
        </b-table-column>

        <b-table-column field="player" label="Player" v-slot="props">
            {{ props.row.player }}
        </b-table-column>

        <b-table-column field="elo" label="Elo" v-slot="props">
            {{ props.row.elo }}
        </b-table-column>
    </b-table>
    </div>
</template>

<script>
import Loader from '@/components/Loader'
import axios from 'axios'
import arraySort from 'array-sort'
export default {
    data() {
        return {
            data: undefined
        }
    },
    components: {
        Loader
    },
    computed: {
        sortedData() {
            if(this.data) {
                return arraySort([...this.data], 'elo', {reverse: true})
            } else {
                return false
            }
        }
    },
    methods: {
        async fetchLeaderboard () {
            try {
                const res = await axios.get('/api/player/getLeaderboard')
                this.data = res.data.leaderboard
            } catch {
                this.fetchLeaderboard()
            }
        }
    },
    async created() {
        this.fetchLeaderboard()
    } 
}
</script>

<style>
table.table {
    background-color: black;
    color: white;
    max-width: 1300px;
    margin: 0 auto;
    margin-top: 40px;
}
table.table * {
    color: white !important;
}

</style>