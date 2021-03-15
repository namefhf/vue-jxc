<template>
  <div class="app-container saleorder-list">
    <formOption @update="update" :selectedId="selectedId" />
    <vxe-table
      :data="tableData"
      size="mini"
      highlight-hover-row
      border
      :cell-style="cellStyle"
      @checkbox-change="selectChangeEvent"
    >
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column field="" title="操作" width="180">
        <template #default>
          <el-button circle size="mini" icon="el-icon-more"></el-button>
          <el-button
            circle
            size="mini"
            icon="el-icon-document-copy"
          ></el-button>
          <el-button type="primary" size="mini" circle>转</el-button>
          <el-button
            circle
            size="mini"
            icon="el-icon-delete"
            type="danger"
          ></el-button>
        </template>
      </vxe-table-column>
      <vxe-table-column field="billNo" title="编号" width=""></vxe-table-column>
      <vxe-table-column
        field="createTime"
        title="业务日期"
        width=""
      ></vxe-table-column>
      <vxe-table-column field="auditStatus" title="处理状态" width="100">
        <template #default="{row}">
          <!-- {{ row.auditStatus }} -->
          <el-tag type="danger" v-if="row.auditStatus === '0'">未审核</el-tag>
          <el-tag type="primary" v-if="row.auditStatus === '1'">已审核</el-tag>
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="auditUserName"
        title="审核人"
        width=""
      ></vxe-table-column>
      <vxe-table-column
        field="comegoName"
        title="客户名称"
        width=""
      ></vxe-table-column>
      <vxe-table-column
        field="goodsNameStr"
        title="订单商品"
        show-overflow="tooltip"
        width=""
      ></vxe-table-column>
      <vxe-table-column
        field="goodsQuantity"
        title="商品数量"
        width=""
      ></vxe-table-column>
      <vxe-table-column
        field="amountPayable"
        title="应付金额"
        width=""
      ></vxe-table-column>
    </vxe-table>
    <div class="pagination-wrap">
      <el-pagination
        :total="pageInfo.total"
        :current-page="pageInfo.current"
        :page-size="pageInfo.size"
        :page-sizes="[20, 30, 40]"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { listPage } from '@/api/sale/saleOrder'
import formOption from './form-option'
export default {
  name: 'saleorderList',
  components: {
    formOption
  },
  data() {
    return {
      pageInfo: {
        current: 1,
        size: 20,
        sort: '',
        order: 'desc',
        total: 0,
        page: 1
      },
      formOption: {},
      tableData: [],
      selectedId: []
    }
  },
  created() {},
  methods: {
    async getListPage(dataInfo) {
      const { data } = await listPage({ data: dataInfo, page: this.pageInfo })
      this.tableData = data.records
      this.pageInfo.total = data.total
    },
    handleCurrentChange(currentPage) {
      this.pageInfo.current = currentPage
      this.getListPage(this.formOption)
    },
    handleSizeChange(size) {
      this.pageInfo.size = size
      this.getListPage(this.formOption)
    },
    update(data) {
      this.formOption = data
      this.getListPage(data)
    },
    cellStyle({ row }) {
      if (row.isClose === '1') {
        return {
          backgroundColor: '#e8eaec',
          color: '#adadad'
        }
      }
    },
    selectChangeEvent(column) {
      this.selectedId = []
      column.records.forEach(item => {
        if (!this.selectedId.includes(item.id)) {
          this.selectedId.push(item.id)
        }
      })
      // console.log(this.selectedId)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-wrap {
  float: right;
}
</style>
