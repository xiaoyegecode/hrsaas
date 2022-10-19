<template>
  <el-dialog title="分配角色" :visible="assignRoleVisible" :before-close="handleClose">
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="saveEmployeeRole">确定</el-button>
        <el-button size="small" @click="handleClose">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleListAPI } from '@/api/setting'
import { getUserDetailByIdAPI, assignRoles } from '@/api'
export default {
  name: 'AssignRole',
  props: {
    userId: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      roleIds: [],
      list: [], // 角色列表
      assignRoleVisible: false
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 弹层显示
    dialogFormV() {
      this.assignRoleVisible = true
    },
    // 弹层隐藏
    dialogFormH() {
      this.assignRoleVisible = false
    },
    handleClose() {
      this.dialogFormH()
    },
    async getRoleList() {
      try {
        const { rows } = await getRoleListAPI()
        this.list = rows
      } catch (e) {
        console.log(e)
      }
    },
    async getUserDetailById() {
      try {
        const { roleIds } = await getUserDetailByIdAPI(this.userId)
        this.roleIds = roleIds || []
      } catch (error) {
        console.log(error)
      }
    },
    async saveEmployeeRole() {
      if (this.roleIds.length ===0 ) return this.$message.error('请勾选角色')
      try {
        await assignRoles({ id: this.userId, roleIds: this.roleIds })
        this.handleClose()
        this.$message.success('角色分配成功')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
