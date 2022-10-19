<template>
  <el-dialog
    title="分配权限"
    :visible="dialogVisible"
    width="40%"
    @close="handleClose"
    @open="getPermissions"
  >
  <!-- 树形结构 -->
  <el-tree
    ref="permissionRef"
    show-checkbox 
    :default-expand-all="true"
    node-key="id"
    :data="treeData" 
    :props="defaultProps"
    :default-checked-keys="checkArray"
  />
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="saveRolePermission">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
import { getPermissionListAPI, getUserRoleByIdAPI, setRolesPermissionAPI } from '@/api'
import { tranListToTreeData } from '@/utils'
export default {
  name: 'SetPermission',
  data() {
    return {
      dialogVisible: false,
      treeData: [],
      defaultProps: {
        label: 'name'
      },
      checkArray: [],
      roleId: ''
    }
  },
  methods: {
     // 弹层显示
    dialogFormV() {
      this.dialogVisible = true
    },
    // 弹层隐藏
    dialogFormH() {
      this.dialogVisible = false
    },
    handleClose() {
      this.dialogFormH()
    },
    async getPermissions() {
      try {
        const res = await getPermissionListAPI()
        this.treeData = tranListToTreeData(res, '0')
        const { permIds } = await getUserRoleByIdAPI(this.roleId)
        this.checkArray = permIds
      } catch (error) {
        console.log(error)
      }
    },
    async saveRolePermission() {
      const id = this.roleId
      const permIds = this.$refs.permissionRef.getCheckedKeys()
      await setRolesPermissionAPI({ id, permIds })
      this.$message.success('角色分配成功')
      this.handleClose()
    }
  }
}
</script>

<style>

</style>