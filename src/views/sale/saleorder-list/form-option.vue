<template>
  <div>
    <el-card style="margin:5px 0">
      <el-form size="mini" inline>
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
          <el-button>展开筛选</el-button>
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

      <div class="filter-container">
        <el-button size="mini">重置所有条件</el-button>
        <div style="margin-top:10px">
          <el-form size="mini">
            <el-form-item label="业务日期:">
              <div class="content">
                <div
                  class="item"
                  @click="changeTab(0)"
                  :class="{ active: currentTab === 0 }"
                >
                  <span>不限</span>
                </div>
                <div
                  class="item"
                  @click="changeTab(1)"
                  :class="{ active: currentTab === 1 }"
                >
                  <span>今天</span>
                </div>
                <div
                  class="item"
                  @click="changeTab(2)"
                  :class="{ active: currentTab === 2 }"
                >
                  <span>本周</span>
                </div>
                <div
                  class="item"
                  @click="changeTab(3)"
                  :class="{ active: currentTab === 3 }"
                >
                  <span>本月</span>
                </div>
                <div
                  class="item"
                  @click="changeTab(4)"
                  :class="{ active: currentTab === 4 }"
                >
                  <span>过去三个月</span>
                </div>
                <div class="item">
                  自定义时间:
                  <el-date-picker
                    type="daterange"
                    v-model="dateValue"
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
                <el-radio-group v-model="radio">
                  <el-radio-button label="不限"></el-radio-button>
                  <el-radio-button label="未审核"></el-radio-button>
                  <el-radio-button label="已审核"></el-radio-button>
                </el-radio-group>
              </div>
            </el-form-item>
            <el-form-item label="经手人">
              <el-select
                clearable
                v-model="selectValue"
                placeholder=""
                @change="handleSelectChange"
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
import qs from 'qs'
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
      currentTab: 3,
      dateValue: '',
      radio: '不限',
      selectValue: '',
      guideList: [],
      data: {
        auditStatus: '-1',
        isClose: 0,
        dateTab: 3,
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
        handUserId: this.selectValue
      })
      // this.$set(
      //   this.data,
      //   'keywords',
      //   this.keywords,
      //   'handUserId',
      //   this.selectValue
      // )
      // this.$emit('update', this.data)
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
    changeTab(index) {
      this.currentTab = index
    },
    handleDateChange(date) {
      console.log(date)
    },
    async getListOptionsIncludeGuide() {
      const { data } = await listOptionsIncludeGuide(1286193815601938400)
      this.guideList = data
      // console.log(data)
    },
    handleSelectChange(value) {
      console.log(this.selectValue)
      // this.$set(this.data.data,'handUserId',value)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-container {
  .content {
    display: flex;
    .item {
      font-size: 12px;
      box-sizing: border-box;
      padding: 3px 8px;
      cursor: pointer;
      margin-right: 5px;
      &.active {
        border: 1px solid blue;
      }
    }
  }
}
</style>
