<template>
  <div class="departments-container">
    <el-card>
      <TreeTools :treeNode="company" :isRoot="false" @addDept="handleDept"></TreeTools>
    </el-card>
    <!-- 树形结构 -->
    <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
      <TreeTools slot-scope="{ data }" :treeNode="data" @addDept="handleDept"></TreeTools>
    </el-tree>
    <AddDepartments :showDialog.sync="dialogVisible" :treeNode="currentNode" />
  </div>
</template>

<script>
import { getDepartmentsAPI } from '@/api'
import TreeTools from './cnps/TreeTools.vue'
import { tranListToTreeData } from '@/utils'
import AddDepartments from './cnps/AddDepartments.vue'
export default {
  name: 'departments',
  components: { TreeTools, AddDepartments },
  data() {
    return {
      company: {},
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      dialogVisible: false,
      currentNode: {}
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const  { depts, companyName }  = await getDepartmentsAPI()
      this.departs = tranListToTreeData(depts, '')
      this.company = { name: companyName, manager: '负责人', id: ''}
    },
    handleDept(node) {
      this.dialogVisible = true
      this.currentNode = node
    }
  }
}
</script>

<style lang="scss">
.departments-container {
  width: 900px;
  margin: 20px auto;
  .el-card__body {
    padding-right: 0px;
  }
}
</style>