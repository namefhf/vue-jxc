<template>
  <div class="app-container">
    <vxe-table
      :data="tableData"
      size="mini"
      :edit-config="{ trigger: 'click', mode: 'row' }"
      border
    >
      <vxe-table-column title="操作" width="150px">
        <template #default="{row}">
          <div style="text-align:center">
            <el-button
              type="primary"
              size="mini"
              circle
              icon="el-icon-s-tools"
              title="权限设置"
              @click="
                $router.push({
                  name: 'role_permissions',
                  query: { id: row.id, roleName: row.roleName }
                })
              "
            ></el-button>

            <el-button
              type="danger"
              size="mini"
              circle
              icon="el-icon-delete"
              title="删除"
            ></el-button>
          </div>
        </template>
      </vxe-table-column>
      <vxe-table-column
        title="角色名称"
        width="150px"
        field="roleName"
        :edit-render="{ name: 'input' }"
      ></vxe-table-column>
      <vxe-table-column
        title="角色描述"
        width="700px"
        field="remark"
        :edit-render="{ name: 'input' }"
      ></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
import { listPage } from '@/api/role'
export default {
  name: 'roleList',
  data() {
    return {
      tableData: [],
      data: {},
      pageInfo: {
        current: 1,
        size: 20,
        sort: '',
        order: 'desc',
        total: 0,
        page: 1
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      const { data } = await listPage({ data: this.data, page: this.pageInfo })
      console.log(data)
      this.tableData = data.records
    }
  }
}
</script>

<style lang="scss" scoped>
.el-button--mini.is-circle {
  padding: 3px;
}
</style>
