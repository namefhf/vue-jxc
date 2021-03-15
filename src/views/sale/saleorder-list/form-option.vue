<template>
  <div>
    <el-card style="margin:5px 0">
      <div class="form-wrap">
        <el-form size="mini">
          <el-form-item>
            <el-input
              v-model="keywords"
              placeholder="按单据号,商品名,客户,备注"
              style="width:360px"
            ></el-input>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-checkbox
              label="不显示已关闭"
              border
              v-model="isClose"
              @change="handleCheckboxChange"
            ></el-checkbox>
            <el-button @click="handleAuditCgange">
              {{ auditFlag === false ? '展开筛选' : '收起筛选' }}
            </el-button>
            <el-dropdown>
              <el-button>
                <span @click="passAudit">审核</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>

              <el-dropdown-menu>
                <el-dropdown-item @click.native="antiAudit">
                  反审核
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          size="mini"
          @click="$router.push({ name: 'saleorder_add' })"
        >
          新增订单
        </el-button>
      </div>

      <div class="filter-container" v-if="auditFlag">
        <el-button size="mini" @click="handleReset">
          重置所有条件
        </el-button>
        <div style="margin-top:10px">
          <el-form size="mini" ref="filterForm" :model="filterModel">
            <el-form-item label="业务日期:">
              <div class="content">
                <div
                  class="item"
                  @click="changeTab(0)"
                  :class="{ active: filterModel.currentTab === 0 }"
                >
                  <span>不限</span>
                </div>
                <div
                  class="item"
                  @click="changeTab(1)"
                  :class="{ active: filterModel.currentTab === 1 }"
                >
                  <span>今天</span>
                </div>
                <div
                  class="item"
                  @click="changeTab(2)"
                  :class="{ active: filterModel.currentTab === 2 }"
                >
                  <span>本周</span>
                </div>
                <div
                  class="item"
                  @click="changeTab(3)"
                  :class="{ active: filterModel.currentTab === 3 }"
                >
                  <span>本月</span>
                </div>
                <div
                  class="item"
                  @click="changeTab(4)"
                  :class="{ active: filterModel.currentTab === 4 }"
                >
                  <span>过去三个月</span>
                </div>
                <div class="item">
                  自定义时间:
                  <el-date-picker
                    type="daterange"
                    v-model="filterModel.dateValue"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    @change="handleDateChange"
                  ></el-date-picker>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="审核状态:">
              <div>
                <el-radio-group
                  v-model="filterModel.radio"
                  @change="handleRadioChange"
                >
                  <el-radio-button label="不限"></el-radio-button>
                  <el-radio-button label="未审核"></el-radio-button>
                  <el-radio-button label="已审核"></el-radio-button>
                </el-radio-group>
              </div>
            </el-form-item>
            <el-form-item label="经手人">
              <el-select
                clearable
                v-model="filterModel.selectValue"
                placeholder=""
              >
                <el-option
                  :value="item.value"
                  :label="item.label"
                  v-for="item in guideList"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { assAudit } from '@/api/sale/saleOrder'
import { antiAudit } from '@/api/sale/saleOrder'
import { listOptionsIncludeGuide } from '@/api/employee'
export default {
  name: 'formOption',
  props: {
    selectedId: {
      type: Array
    }
  },
  data() {
    return {
      auditFlag: false,
      guideList: [], //经手人列表
      filterModel: {
        radio: '不限',
        currentTab: 3,
        auditStatus: '-1',
        dateValue: '',
        selectValue: '' //经手人
      },
      data: {
        auditStatus: '-1', //审核状态
        isClose: 0,
        dateTab: 3, //业务日期
        bBeginTime: '2021-03-01',
        bEndTime: '2021-03-31'
      },
      keywords: '',
      isClose: true
    }
  },
  watch: {
    data: {
      handler: function() {
        this.$emit('update', this.data)
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.getListOptionsIncludeGuide()
  },
  methods: {
    handleSearch() {
      this.data = Object.assign({}, this.data, {
        keywords: this.keywords,
        handUserId: this.filterModel.selectValue,
        dateTab: this.filterModel.currentTab,
        auditStatus: this.filterModel.auditStatus,
        bBeginTime: this.filterModel.dateValue[0],
        bEndTime: this.filterModel.dateValue[1]
      })
    },
    handleAuditCgange() {
      this.auditFlag = !this.auditFlag
    },
    // 审核操作
    async passAudit() {
      this.$emit('passAudit')
      console.log(this.selectedId)
      if (this.selectedId.length === 0) {
        this.$message({
          message: '请选择要处理的数据',
          type: 'error'
        })
      } else {
        try {
          await assAudit(this.selectedId)
          this.$emit('update', this.data)
        } catch (error) {
          console.log(error)
        }
      }
    },
    handleCheckboxChange() {
      this.data.isClose = this.data.isClose === 0 ? 1 : 0
      // this.$emit('update', this.data)
    },
    async antiAudit() {
      console.log(1)
      if (this.selectedId.length === 0) {
        this.$message({
          message: '请选择要处理的数据',
          type: 'error'
        })
      } else {
        try {
          await antiAudit(this.selectedId)
          this.$emit('update', this.data)
        } catch (error) {
          console.log(error)
        }
      }
    },
    handleReset() {
      this.$refs['filterForm'].resetFields()
      this.filterModel.currentTab = 3
      this.filterModel.selectValue = ''
      this.filterModel.radio = '不限'
      this.filterModel.auditStatus = '-1'
    },
    changeTab(index) {
      this.filterModel.currentTab = index
    },
    handleRadioChange(value) {
      switch (value) {
        case '不限':
          this.filterModel.auditStatus = -1
          break
        case '未审核':
          this.filterModel.auditStatus = 0
          break
        case '已审核':
          this.filterModel.auditStatus = 1
        default:
          break
      }
    },
    handleDateChange(date) {
      console.log(date)
    },
    async getListOptionsIncludeGuide() {
      const { data } = await listOptionsIncludeGuide(1286193815601938400)
      this.guideList = data
      // console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-form-item {
    margin-bottom: 0px;
  }
}
.filter-container {
  margin-top: 10px;
  .content {
    display: flex;
    .item {
      font-size: 12px;
      box-sizing: border-box;
      padding: 3px 8px;
      cursor: pointer;
      margin-right: 5px;
      &.active {
        border: 2px solid #1890ff;
      }
    }
  }
}
</style>
