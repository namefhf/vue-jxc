<template>
  <div class="app-container">
    <el-tree
      :data="treeData"
      show-checkbox
      node-key="perId"
      :props="{ children: 'children', label: 'perName' }"
      :default-checked-keys="checkedKeys"
    ></el-tree>
    <!-- <vxe-table
      :span-method="rowspanMethod"
      :data="tableData"
      border
      height="600"
      :scroll-y="{ enabled: false }"
    >
      <vxe-table-column field="name1" title="功能模块">
        <template #default="{ row }">
          <vxe-checkbox
            v-model="row.check1"
            @change="check1ChangeEvent(row, row.check1)"
          >
            {{ row.name1 }}
          </vxe-checkbox>
        </template>
      </vxe-table-column>
    </vxe-table> -->
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import { listAllData, listData } from '@/api/permission'
export default {
  name: 'rolePermission',
  data() {
    return {
      allPermissions: [],
      tableData: [],
      treeData: [],
      checkedKeys: []
    }
  },
  created() {
    this.getAllPermissions()
    this.getCurrentPermissions()
  },
  methods: {
    async getAllPermissions() {
      const { data } = await listAllData()
      this.allPermissions = data
      const treeData = XEUtils.toArrayTree(this.allPermissions, {
        parentKey: 'perParent',
        key: 'perId'
      })
      console.log(treeData)
      this.treeData = treeData
    },
    async getCurrentPermissions() {
      const { id } = this.$route.query
      const { data } = await listData(id)
      console.log('current', data)
      data.forEach(item => {
        this.checkedKeys.push(item.perId)
      })
      console.log(this.checkedKeys)
    }
  }
}
</script>

<style lang="scss" scoped></style>
