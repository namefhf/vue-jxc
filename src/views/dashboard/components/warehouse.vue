<template>
  <div class="warehouse-index" ref="warehouse"></div>
</template>

<script>
import { listStockDataGroupByStore } from '@/api/charts'
import * as echarts from 'echarts'
export default {
  name: 'warehouse',
  mounted() {
    this.initChartData()
  },
  methods: {
    async initChartData() {
      try {
        const { data } = await listStockDataGroupByStore()
        console.log(data)
        this.initChart(data)
      } catch (error) {
        console.log(error)
      }
    },
    initChart(data) {
      const eChart = echarts.init(this.$refs.warehouse)
      const _data = []
      data.forEach(item => {
        _data.push({
          value: item.quantity,
          name: item.name
        })
      })
      eChart.setOption({
        tooltip: {
          trigger: 'item',
          padding: [5, 10]
        },
        legend: {
          data: data.map(i => i.name)
        },
        series: [
          {
            name: '仓库存货',
            type: 'pie',
            radius: '55%',
            data: _data,
            label: {
              formatter: '{b}: {c}'
            }
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.warehouse-index {
  width: 800px;
  height: 500px;
}
</style>
