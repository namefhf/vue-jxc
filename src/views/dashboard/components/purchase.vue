<template>
  <div class="puschase-index">
    <vxe-table :data="tableData" highlight-hover-row size="medium">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column
        field="code"
        title="商品编号"
        width="200"
      ></vxe-table-column>
      <vxe-table-column
        field="name"
        title="Name"
        width="200"
      ></vxe-table-column>

      <vxe-table-column
        field="amountPayable"
        title="进货额"
        width="200"
      ></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
import { listDataGroupByGoods } from '@/api/report/purchase'
import { getLast7DaysRange } from '@/libs/date.js'
export default {
  name: 'puschase',
  data() {
    return {
      allAlign: null,
      pageInfo: {
        current: 1, // 当前页
        size: 20, // 每页数据条数
        sort: '', // 排序字段
        order: 'desc', // 排序方向
        total: 0 // 总数居量
      },
      tableData: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const params = {
        data: getLast7DaysRange(),
        page: this.pageInfo
      }
      const { data } = await listDataGroupByGoods(params)
      // console.log(data)
      this.tableData = data.records
    }
  }
}
</script>

<style lang="scss" scoped>
.puschase-index {
  width: 50%;
}
</style>
