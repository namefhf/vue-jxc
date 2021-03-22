<template>
  <div class="app-container">
    <el-container>
      <el-aside width="300px">
        <div class="option">
          <div style="font-size:.8rem">商品分类:</div>
          <div>
            <el-button
              size="mini"
              circle
              icon="el-icon-plus"
              @click="append"
            ></el-button>
            <el-button
              type="success"
              size="mini"
              circle
              icon="el-icon-edit"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              circle
              icon="el-icon-delete"
            ></el-button>
            <el-button size="mini" circle icon="el-icon-refresh"></el-button>
          </div>
        </div>
        <div class="cate-tree">
          <el-tree
            :data="treeData"
            :props="{ children: 'children', label: 'name' }"
            default-expand-all
            :highlight-current="true"
            node-key="id"
            @node-click="handleNodeClick"
          ></el-tree>
        </div>
      </el-aside>
      <el-main>2</el-main>
    </el-container>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import { listAllData } from '@/api/goodcat'
export default {
  name: 'goodsList',
  data() {
    return {
      treeData: [],
      selectedNode: {}
    }
  },
  created() {
    this.getCateData()
  },
  methods: {
    async getCateData() {
      const { data } = await listAllData()
      console.log(data)
      this.generateTreeData(data)
    },
    generateTreeData(data) {
      this.treeData = XEUtils.toArrayTree(data, { parentKey: 'pid' })
      console.dir(this.treeData)
    },
    handleNodeClick(data) {
      console.log(data)
      this.selectedNode = data
    },
    append() {
      const obj = {
        id: Math.random(),
        name: 'test',
        pid: this.selectedNode.id,
        children: []
      }
      this.selectedNode.children.push(obj)
    }
  }
}
</script>

<style lang="scss" scoped>
.option {
  display: flex;
  justify-content: space-between;
  .el-button--mini.is-circle {
    padding: 3px;
  }
}
</style>
