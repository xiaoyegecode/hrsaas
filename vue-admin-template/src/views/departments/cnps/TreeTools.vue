<template>
  <el-row slot-scope="{ treeNode }" type="flex" justify="space-around" align="middle" style="height:40px; width: 100%;" >
        <el-col>
          <span>{{ treeNode.name }}</span>
        </el-col>
        <el-col :span="4">
          <el-row type="flex">
            <el-col>
              <span>{{ treeNode.manager }}</span>
            </el-col>
            <el-col>
              <el-dropdown @command="handleCommand">
                <span>
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item v-if="isRoot" command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item v-if="isRoot" command="del">删除部门</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
</template>

<script>
import { delDepartmentsAPI } from '@/api'
export default {
  name: 'TreeTools',
  props: {
    treeNode: {
      type: Object, // 对象类型
      required: true
    },
    isRoot: {
      type: Boolean,
      default: true // 默认显示
    }
  },
  methods: {
    handleCommand(type) {
      // console.log(type)
      if (type === 'add') {
        this.$emit('addDept', this.treeNode)
      } else if (type === 'edit') {
        this.$emit('editDept', this.treeNode)
      } else {
        this.$confirm('是否确认删除该部门', '提示', {
          type: 'warning'
        }).then(async res => {
          return delDepartmentsAPI(this.treeNode.id)
        }).then(res => {
          this.$emit('refreshDepts') // 触发自定义事件
          this.$message.success('删除部门成功')
        })
      }
    }
  }
}
</script>

<style>

</style>