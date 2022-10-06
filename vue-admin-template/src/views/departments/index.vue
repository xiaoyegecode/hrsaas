<template>
  <div class="departments-container" v-loading="loading">
    <el-card>
      <TreeTools :treeNode="company" :isRoot="false" @addDept="handleDept" @editDept="editDept"></TreeTools>
    </el-card>
    <!-- 树形结构 -->
    <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
      <TreeTools slot-scope="{ data }" :treeNode="data" @addDept="handleDept" @editDept="editDept" @refreshDepts="getDepartments"></TreeTools>
    </el-tree>
    <AddDepartments ref="addDept" :showDialog.sync="dialogVisible" :treeNode="currentNode" @refreshDepts="getDepartments" />
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
      currentNode: {},
      loading: false
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      try {
        this.loading = true
        const  { depts, companyName }  = await getDepartmentsAPI()
        this.departs = tranListToTreeData(depts, '')
        this.company = { name: companyName, manager: '负责人', id: ''}
      } finally {
        this.loading = false
      }
    },
    handleDept(node) {
      this.dialogVisible = true
      this.currentNode = node
    },
    editDept(node) {
      this.dialogVisible = true
      this.currentNode = { ...node }
      this.$refs.addDept.formData = { ...node }
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