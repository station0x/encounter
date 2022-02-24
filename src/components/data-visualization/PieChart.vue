<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: {
    chartdata: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.chartdata)
  }
}
</script>

<style>
</style>