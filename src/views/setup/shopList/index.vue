<template>
  <div class="app-container shopListIndex">
    <el-card>
      <div style="display:flex;justify-content:space-between">
        <el-input
          placeholder="按编号,名称,联系人,电话..."
          v-model="keywords"
          size="mini"
          style="width: 360px;"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="primary" size="mini" @click="dialogVisible = true">
          新增门店
        </el-button>
      </div>
    </el-card>
    <vxe-table
      :data="tableData"
      border
      size="mini"
      highlight-hover-row
      :edit-config="{ trigger: 'click', mode: 'row' }"
      @edit-closed="handleEditClosed"
    >
      <vxe-table-column type="expand" width="50px">
        <template #content="{row}">
          <div>{{ row.name }}编号:{{ row.code }}</div>
          <el-divider></el-divider>
          <div>
            <el-row>
              <el-col :span="8">管辖仓库:{{ row.storeName }}</el-col>
              <el-col :span="8">联系电话:{{ row.phone }}</el-col>
              <el-col :span="8">邮编:{{ row.postalCode }}</el-col>
              <el-col :span="8">联系人:{{ row.contacter }}</el-col>
              <el-col :span="8">邮箱:{{ row.email }}</el-col>
              <el-col :span="8">地址:{{ row.address }}</el-col>
            </el-row>
          </div>
        </template>
      </vxe-table-column>
      <vxe-table-column title="操作" width="100px">
        <template #default>
          <el-button
            circle
            size="mini"
            type="primary"
            icon="el-icon-edit"
          ></el-button>
          <el-button
            circle
            size="mini"
            icon="el-icon-delete"
            type="danger"
          ></el-button>
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="code"
        title="编号"
        :edit-render="{ name: 'input', attrs: { type: 'text' } }"
      ></vxe-table-column>
      <vxe-table-column
        field="name"
        title="名称"
        :edit-render="{ name: 'input', attrs: { type: 'text' } }"
      ></vxe-table-column>
      <vxe-table-column field="storeName" title="管辖仓库"></vxe-table-column>
      <vxe-table-column
        field="contacter"
        title="联系人"
        :edit-render="{ name: 'input', attrs: { type: 'text' } }"
      ></vxe-table-column>
      <vxe-table-column
        field="phone"
        title="联系电话"
        :edit-render="{ name: 'input', attrs: { type: 'text' } }"
      ></vxe-table-column>
    </vxe-table>
    <el-pagination
      :total="total"
      :current-page="pageInfo.page"
      :page-size="pageInfo.size"
      :page-sizes="[20, 30, 40]"
      @current-change="handleCurrentChange"
      layout="->,total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <el-dialog title="新增门店" :visible.sync="dialogVisible">
      <div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form
              :model="addForm"
              label-position="right"
              label-width="80px"
              size="mini"
            >
              <el-form-item label="门店名称" size="mini">
                <el-input size="mini"></el-input>
              </el-form-item>
              <el-form-item label="门店编号" size="mini">
                <el-input size="mini"></el-input>
              </el-form-item>
              <el-form-item label="联系人" size="mini">
                <el-input size="mini"></el-input>
              </el-form-item>
              <el-form-item label="电话" size="mini">
                <el-input size="mini"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" size="mini">
                <el-input size="mini"></el-input>
              </el-form-item>
              <el-form-item label="邮编" size="mini">
                <el-input size="mini"></el-input>
              </el-form-item>
              <el-form-item label="地址" size="mini">
                <el-input size="mini"></el-input>
              </el-form-item>
              <el-form-item label="备注" size="mini">
                <el-input size="mini"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12">
            <el-form
              :model="addForm"
              label-position="right"
              label-width="80px"
              size="mini"
            >
              <el-form-item label="仓库名称" size="mini">
                <el-input size="mini"></el-input>
              </el-form-item>
              <el-form-item label="仓库编号" size="mini">
                <el-input size="mini"></el-input>
              </el-form-item>
              <el-form-item label="联系人" size="mini">
                <el-input size="mini"></el-input>
              </el-form-item>
              <el-form-item label="电话" size="mini">
                <el-input size="mini"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" size="mini">
                <el-input size="mini"></el-input>
              </el-form-item>
              <el-form-item label="邮编" size="mini">
                <el-input size="mini"></el-input>
              </el-form-item>
              <el-form-item label="地址" size="mini">
                <el-input size="mini"></el-input>
              </el-form-item>
              <el-form-item label="备注" size="mini">
                <el-input size="mini"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listPage, upData } from '@/api/shop'
export default {
  name: 'shopList',
  data() {
    return {
      dialogVisible: false,
      keywords: '',
      tableData: [],
      pageInfo: {
        current: 1,
        size: 20,
        sort: '',
        order: 'desc',
        total: 0,
        page: 1
      },
      total: 0,
      addForm: {}
    }
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      const { data } = await listPage({
        data: { keywords: this.keywords },
        page: this.pageInfo
      })
      this.tableData = data.records
      this.total = data.total
    },
    handleCurrentChange() {},
    async handleEditClosed({ row }) {
      // console.log(row)
      // const {data} = await upData()
      // console.log(data);
      this.$notify({
        title: '保存成功',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-card .el-card__body {
  padding: 10px;
}
.el-col {
  margin-bottom: 10px;
}
</style>
