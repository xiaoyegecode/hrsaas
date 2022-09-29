<template>
  <div>
    <el-dialog :title="title" width="40%" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="roleDialogForm" label-width="80px" :model="formData" :rules="rules">
        <el-form-item prop="name" label="角色">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item prop="description" label="描述">
          <el-input v-model="formData.description" type="textarea" row="3" />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button v-loading="loading" type="primary" @click="submit">确 定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { addRoleAPI, updateRole } from '@/api/setting'
export default {
  name: 'addRole',
  data() {
    return {
      loading: false,
      formData: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      }
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑角色' : '新增角色'
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialog-visible', false)
      this.$refs.roleDialogForm.resetFields()
      this.formData = { }
    },
    // 新增功能
    async submit() {
      try {
        this.$refs.roleDialogForm.validate()
        this.loading = true
        this.formData.id ? await updateRole(this.formData) : await addRoleAPI(this.formData)
        this.$emit('refreshList')
        this.$message.success(this.formData.id ?'编辑成功' : '新增成功')
        this.handleClose()
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false
      }
    },
    // 删除功能  删除前需要二次确认  Message Box 组件
  }
}
</script>

<style>

</style>