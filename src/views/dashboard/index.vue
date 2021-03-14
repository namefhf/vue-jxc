<template>
  <div class="dashboard-container app-container">
    <el-card>
      <h3>最近七天走势</h3>
      <el-tabs v-model="activeName">
        <el-tab-pane label="销售" name="first">
          <sale />
        </el-tab-pane>
        <el-tab-pane label="进货" name="second">
          <purchase />
        </el-tab-pane>
        <el-tab-pane label="仓库" name="third">
          <warehouse />
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">roles:{{ roles }}</div> -->
  </div>
</template>

<script>
import sale from './components/sale'
import warehouse from './components/warehouse'
import purchase from './components/purchase'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    sale,
    warehouse,
    purchase
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  computed: {
    ...mapGetters(['name', 'roles'])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    // margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
