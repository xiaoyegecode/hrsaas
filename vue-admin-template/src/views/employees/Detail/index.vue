<template>
  <div class="app-container">
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane lazy label="登录账户设置" name="first">
          <!-- 放置表单 -->
          <el-form ref="form" :model="userInfo" :rules="rules" label-width="120px" style="margin-left: 120px; margin-top:30px">
            <el-form-item label="姓名:" prop="username">
              <el-input v-model="userInfo.username" style="width:300px" />
            </el-form-item>
            <el-form-item label="密码:" prop="password">
              <el-input v-model="userInfo.password" style="width:300px" type="password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updataUser">更新</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane lazy label="个人详情" name="second">
          <UserInfo />
        </el-tab-pane>
        <el-tab-pane lazy label="岗位信息" name="third">
          <JobInfo />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getUserDetailById, saveUserDetailById } from '@/api'
import UserInfo from '../UserInfo'
import JobInfo from '../JobInfo'
import Cookies from 'js-cookie'
export default {
  name: 'Detail',
  components: { UserInfo, JobInfo },
  data() {
    return {
      activeName: Cookies.get('activeName') || 'first',
      userInfo: {},
      rules: {
        username: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, message: '密码长度最少6位', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getUserDetail()
  },
  methods: {
    async getUserDetail() {
      const res = await getUserDetailById(this.$route.params.id)
      this.userInfo = res
    },
    async updataUser() {
      try {
        await this.$refs.form.validate()
        await saveUserDetailById(this.userInfo)
        this.$message.success('更新成功')
        console.log('校验成功')
      } catch (error) {
        console.log(error)
      }
    },
    handleClick() {
      Cookies.set('activeName', this.activeName)
    }
  }
}
</script>

<style>

</style>