<template>
  <div class="saleorder-add app-container">
    <el-card>
      <h3>商品销售订单</h3>
      <div>
        <el-form
          :model="saleorderAddFrom"
          :rules="saleorderAddFromRules"
          inline
        >
          <el-form-item label="门店:" prop="shop" size="mini">
            <el-select v-model="saleorderAddFrom.shop" placeholder="请选择门店">
              <el-option label="test" value="test"></el-option>
              <!-- <el-option v-for="" :key=""></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="客户:" size="mini" prop="customer">
            <el-input
              v-model="saleorderAddFrom.customer"
              placeholder="按编号,名称,地址搜索..."
            ></el-input>
          </el-form-item>
          <el-form-item label="单据编号:" size="mini">
            <el-input v-model="saleorderAddFrom.number"></el-input>
          </el-form-item>

          <div style="display:flex;justify-content:space-between">
            <div>
              <el-form-item label="销售类型:" size="mini">
                <el-select
                  v-model="saleorderAddFrom.saleType"
                  size="mini"
                  style="width:100px"
                >
                  <el-option label="销售"></el-option>
                  <el-option label="批发"></el-option>
                </el-select>
                <el-checkbox label="送货" border></el-checkbox>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="经手人:" size="mini">
                <el-select v-model="saleorderAddFrom.guide" size="mini">
                  <!-- <el-option v-for="" :key=""></el-option> -->
                </el-select>
              </el-form-item>
              <el-form-item label="业务日期:" size="mini">
                <el-date-picker
                  v-model="saleorderAddFrom.date"
                  type="datetime"
                  placeholder="选择日期时间"
                  size="mini"
                ></el-date-picker>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>

      <vxe-table
        :data="tableData"
        keep-source
        border
        :edit-config="{
          trigger: 'click',
          mode: 'cell',
          icon: 'fa fa-pencil',
          showStatus: true
        }"
      >
        <vxe-table-column type="seq"></vxe-table-column>
        <vxe-table-column
          field="name"
          title="商品名称"
          :edit-render="{
            name: 'input',
            trigger: 'click',
            activeMethod: activeRowMethod
          }"
        ></vxe-table-column>
        <vxe-table-column field="number" title="商品编号"></vxe-table-column>
        <vxe-table-column field="count" title="数量"></vxe-table-column>
        <vxe-table-column field="unit" title="单位"></vxe-table-column>
        <vxe-table-column field="unitPrice" title="单价"></vxe-table-column>
        <vxe-table-column field="amount" title="金额"></vxe-table-column>
        <vxe-table-column field="taxRates" title="税率"></vxe-table-column>
        <vxe-table-column field="taxAmount" title="税额"></vxe-table-column>
        <vxe-table-column field="note" title="备注"></vxe-table-column>
      </vxe-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'saleorderAdd',
  data() {
    return {
      saleorderAddFrom: {
        shop: '',
        customer: '',
        number: 'XSDD202103150003',
        saleType: '批发',
        guide: '管理员',
        date: ''
      },
      saleorderAddFromRules: {
        shop: [{ required: true }],
        customer: [{ required: true }]
      },
      tableData: [
        {
          name: '',
          number: '',
          count: '',
          unit: '',
          unitPrice: '',
          amount: '',
          taxRates: '',
          taxAmount: '',
          note: ''
        },
        {
          name: '',
          number: '',
          count: '',
          unit: '',
          unitPrice: '',
          amount: '',
          taxRates: '',
          taxAmount: '',
          note: ''
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  h3 {
    text-align: center;
    margin-bottom: 10px;
  }
}
</style>
