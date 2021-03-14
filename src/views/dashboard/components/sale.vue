<template>
  <div class="sale-index" ref="sale"></div>
</template>

<script>
import * as echarts from 'echarts'
import moment from 'moment'
import { getLast7DaysRange } from '@/libs/date'
import { listDataGroupByDay } from '@/api/charts'
export default {
  name: 'sale',
  data() {
    return {
      serieOptions: {
        smooth: true,
        type: 'line',
        animationDuration: 1000,
        animationEasing: 'cubicInOut'
      }
    }
  },
  mounted() {
    this.initChartData()
  },
  methods: {
    async initChartData() {
      const params = getLast7DaysRange()
      console.log(params)
      try {
        const { data } = await listDataGroupByDay(params)
        // console.log(data)
        const reportData = this.saleData2reportData(params, data)
        console.log(reportData)
        this.initChart(reportData)
      } catch (error) {
        console.log(error)
      }
    },
    saleData2reportData(dateRange, saleData) {
      const { beginTime } = dateRange
      const dates = []
      const amounts = []
      const billCounts = []
      for (let i = 0; i < 7; i++) {
        const day = moment(beginTime)
          .add(i, 'days')
          .format('MM-DD')
        dates.push(day)
        const saleObj = saleData.find(item => {
          return item.time === day
        })
        if (saleObj) {
          amounts.push(saleObj.amountPayable)
          billCounts.push(saleObj.billCount)
        } else {
          amounts.push(0)
          billCounts.push(0)
        }
      }
      return { dates, amounts, billCounts }
    },
    initChart({ dates, amounts, billCounts }) {
      var myChart = echarts.init(this.$refs.sale)
      const xData = dates
      const series = [
        { name: '销售额', data: amounts },
        { name: '销售笔数', data: billCounts }
      ]
      const _series = series.map(item => {
        const serieOptions = this.serieOptions
        return Object.assign(item, serieOptions)
      })
      myChart.setOption({
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        xAxis: {
          axisTick: {
            show: false
          },
          boundaryGap: false,
          data: xData
        },
        yAxis: { type: 'value' },
        legend: {
          data: series.map(item => {
            return item.name
          })
        },
        series: _series
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.sale-index {
  width: 100%;
  height: 500px;
}
</style>
