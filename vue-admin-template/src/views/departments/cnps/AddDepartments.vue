<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="title" :visible="showDialog" @close="handleClose">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="addDeptForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimple">
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="submit" v-loading="loading">确定</el-button>
        <el-button size="small" @click="handleClose">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartmentsAPI, getEmployeeSimpleAPI, addDepartments, updateDepartments } from '@/api'
export default {
  name: 'AddDepartments',
  data() {
    const checkCodeRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartmentsAPI()
      let isRepeat = true
      if (this.formData.id) {
        isRepeat = depts.some(item =>item.id !==this.formData.id && item.code === value)
      } else {
        isRepeat = depts.some(item =>item.code === value)
      }
      isRepeat ? callback(new Error(`模块下已经存在${value}编码`)) : callback()
      // 编辑模式下，对比过程中，把自己排除掉，然后再对比
    }
    const nameCheck = async (rule, value, callback) => {
      const { depts } = await getDepartmentsAPI()
      let isRepeat = true
      if (this.formData.id) {
        const deptstj = depts.filter(item => item.pid === this.treeNode.pid && item.id !== this.treeNode.id)
        isRepeat = deptstj.some(item => item.name === value)
      } else {
        const deptstj1 = depts.filter(item => item.pid === this.treeNode.pid)
        isRepeat = deptstj1.some(item => item.name === value)
      }
      isRepeat ? callback(new Error(`该部门下已经存在${value}部门名称`)) : callback()
    }

    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {
        name: [
          { required: true, message: '部门名称必填', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称1-50个字符', trigger: 'blur' },
          { validator: nameCheck, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码必填', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码1-50个字符', trigger: 'blur' },
          { validator: checkCodeRepeat, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人必填' }
        ],
        introduce: [
          { required: true, message: '部门介绍必填', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍1-300个字符', trigger: 'blur' }
        ]
      },
      peoples: [], // 接收获取的员工简单列表的数据
      loading: false

    }
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:showDialog', false)
      this.$refs.addDeptForm.resetFields()
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 
      }
    },
    async getEmployeeSimple() {
      const res = await getEmployeeSimpleAPI()
      this.peoples = res
    },
    async submit() {
      try {
        await this.$refs.addDeptForm.validate()
        this.loading = true
        if (this.formData.id) {
          await updateDepartments(this.formData)
        } else {
          await addDepartments({ ...this.formData, pid: this.treeNode.id })
        }
        this.$message.success(`${this.formData.id ? '编辑' : '新增'}成功`)
        this.$emit('refreshDepts')
        this.handleClose()
      } catch (error) {
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>