<template>
    <div>
        <div class="loader-wrapper" v-if="!firstMatchId">
            <Loader/>
        </div>
        <div v-else class="leaderboard">
            <h1 class="page-title">Admin Dashboard</h1>
            <h1 class="page-title" style="font-size: 18px; color: rgba(255,255,255,.7); font-weight: 300; margin-top: -20px">Spaceship Pick Rates and Stats <strong v-if="sortedData !== false" style="color:rgba(255,255,255,.8)">[ {{ matchesNo }} matches played ]</strong></h1>
            <div style="max-width: 350px; margin: 0 auto">
            <b-field label="Select Date/Time">
                <center>
                    <b-datetimepicker v-model="pickerData"
                        :min-datetime="minDatetime"
                        :max-datetime="maxDatetime"
                        @input="fetchPickRates()"
                        placeholder="Click to select a date...">
                        <template #left>
                            <b-button
                                label="Default Time"
                                type="is-primary"
                                icon-left="clock"
                                @click="pickerData = pickingStartDatetime" />
                        </template>
                    </b-datetimepicker>
                </center>
            </b-field>
            </div>
            <div v-if="sortedData !== false" class="dashboard-wrapper">
                <div class="columns p-20">
                    <div class="column">
                        <div style="max-width: 400px; margin-top: 100px; margin: 0 auto">
                            <chart v-if="this.data" :type="'doughnut'" :data="chartData"></chart>
                        </div>
                        <div class="chart-wrapper">
                        <chart v-if="this.data" :type="'bar'" :data="chartData" :options="options"></chart>
                        </div>
                    </div>
                    <div class="column p-20">
                        <b-table v-if="sortedData" :data="sortedData" hoverable style="max-width: 650px; margin: 0 auto">
                            <b-table-column cell-class="hoverable-cell" field="type" label="Spaceship Type" v-slot="props">
                                <span style="text-transform: capitalize;"> {{ props.row.type }} </span>
                            </b-table-column>

                            <b-table-column cell-class="hoverable-cell" field="percentage" label="Pick Rate" v-slot="props">
                                <span style="text-transform: capitalize;"> {{ Math.floor(((props.row.number / allPicks) * 100)).toString() + '%'}} </span>
                            </b-table-column>

                            <b-table-column cell-class="hoverable-cell" width="100px" field="pick" label="Pick Number" v-slot="props">
                                {{ props.row.number }}
                            </b-table-column>
                        </b-table>
                    </div>
                </div>
            </div>
            <div class="dashboard-wrapper" v-else>
                <MiniLoader :text="'Reading Matches Stats'"/>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from '@/components/Loader'
import MiniLoader from '@/components/MiniLoader'
import axios from 'axios'
import arraySort from 'array-sort'
import Chart from 'vue-bulma-chartjs'

let pickingStartDatetime = new Date(1645848000000) // timestamp of picking bug solved

export default {
    data() {
        return {
            data: undefined,
            selected: undefined,
            matchesNo: undefined,
            allPicks: undefined,
            firstMatchId: undefined,
            options: {
                segmentShowStroke: false,
                borderColor: '#000000'
            },
            maxDatetime: new Date(),
            pickerData: pickingStartDatetime
        }
    },
    components: {
        Loader,
        Chart,
        MiniLoader
        // PieChart
    },
    computed: {
        minDatetime() { // timestamp of picking bug solved
            if(this.firstMatchId) {
                return this.dateFromObjectId(this.firstMatchId)
            } else return new Date()
        },
        sortedData() {
            if(this.data) {
                return arraySort([...this.data], 'number', {reverse: true})
            } else {
                return false
            }
        },
        chartData() {
            if(this.data) {
                let data = {
                    labels: [],
                    datasets: [{
                        data: [],
                        backgroundColor: [
                            '#FFD400',
                            '#FFDD3C',
                            '#FFEA61',
                            '#FFF157',
                            '#FFF192',
                            '#FFFFB7',
                            '#FFFBC8',
                            '#FFF59E',
                            '#FFFEE9',
                            '#FFFFFF'
                        ],
                        borderColor: [
                            '#FFD400',
                            '#FFDD3C',
                            '#FFEA61',
                            '#FFF157',
                            '#FFF192',
                            '#FFFFB7',
                            '#FFFBC8',
                            '#FFF59E',
                            '#FFFEE9',
                            '#FFFFFF'
                        ],
                        borderWidth: 1
                    }]
                }
                this.sortedData.map(row => {
                    data.labels.push(row.type)
                    data.datasets[0].data.push((row.number/this.allPicks) * 100)
                })
                return data
            } else return false
        }
    },
    methods: {
        async fetchPickRates() {
            this.data = undefined
            let objectId = this.objectIdFromDate(this.pickerData)
            try {
                const res = await axios.get('/api/admin/getSpaceshipsPickRates', {
                    params: {
                        address: this.$store.state.address,
                        dateObjId: objectId
                    }
                })
                this.data = res.data.picks
                this.matchesNo = res.data.matchesNo
                this.allPicks = res.data.allPicks
            } catch {
                this.fetchPickRates()
            }
        },
        async getFirstMatchDoc() {
            try {
                const res = await axios.get('/api/admin/getFirstMatchDoc', {
                    params: {
                        address: this.$store.state.address
                    }
                })
                this.firstMatchId = res.data.firstMatchDocId
            } catch {
                this.getFirstMatchDoc()
            }
        },
        objectIdFromDate(date) {
	        return Math.floor(date.getTime() / 1000).toString(16) + "0000000000000000"
        },
        dateFromObjectId(objectId) {
            return new Date(parseInt(objectId.substring(0, 8), 16) * 1000)
        }
    },
    async created() {
        this.fetchPickRates()
        this.getFirstMatchDoc()
    } 
}
</script>

<style scoped>
.leaderboard {
    margin-top: 190px;
}
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
.hoverable-cell {
    cursor: pointer;
}
.chart-wrapper {
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
}
canvas.chartjs {
    margin: 0 auto;
}
.field {
    text-align: center;
}
label.label {
    width: 165px;
}
.datepicker.control {
    width: 172px !important;
}
.dashboard-wrapper {
    max-width: 900px;
    min-height: 500px;
    margin-top: 60px;
    margin: 0 auto;
}
</style>