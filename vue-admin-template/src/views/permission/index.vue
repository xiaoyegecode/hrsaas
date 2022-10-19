<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools :show-before="false">
        <template #after>
          <el-button type="primary" size="small" @click="addPermission('0', 1)">添加权限</el-button>
        </template>
      </page-tools>
      <!-- 表格 -->
      <el-table ref="table" :data="list" border v-loading="loading" row-key="id" default-expand-all>
        <el-table-column align="left" label="名称" prop="name" >
            <template slot-scope="{ row }">
                <template v-if="row.type===1">
                  <i class="el-icon-folder-opened" @click="expandColumn(row)"></i>
                  {{ row.name}}
                </template>
                <template v-if="row.type===2">
                  <i class="el-icon-folder" style="margin-left:20px"></i>
                  {{ row.name}}
                </template>
            </template>
        </el-table-column>
        <el-table-column align="center" label="标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template slot-scope="{ row }">
            <el-button v-if="row.type === 1" type="text" icon="el-icon-circle-plus-outline" @click=addPermission(row.id,2)>添加</el-button>
            <el-button type="text" icon="el-icon-edit" @click="editPermissin(row)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" style="color: #f56c6c">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹出层 -->
    <AddPermission ref="addPermissionRef" @refresh="getPermissionList" />
  </div>
</template>

<script>
import { getPermissionListAPI } from '@/api/permission'
import { tranListToTreeData } from '@/utils'
import AddPermission from './cnps/add-permission.vue'
export default {
  name: 'Permission',
  components: { AddPermission },
  data() {
    return {
      loading:false,
      list: []
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      try {
        this.loading = true
        const res = await getPermissionListAPI()
        this.list = tranListToTreeData(res, '0')
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    expandColumn(row) {
      row.isExpand = !row.isExpand
      this.$refs.table.toggleRowExpansion(row,row.isExpand)
    },
    addPermission(id,type) {
      this.$refs.addPermissionRef.dialogFormV()
      this.$refs.addPermissionRef.formData.type = type
      this.$refs.addPermissionRef.formData.pid = id
    },
    editPermissin(row) {
      this.$refs.addPermissionRef.dialogFormV()
      this.$refs.addPermissionRef.formData = row
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-table__expand-icon {
  display: none !important;
}
</style>