<template>
  <div>
    <el-alert title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改" type="info" show-icon :closable="false" />
    <el-form label-width="120px" style="margin-top:50px">
      <el-form-item label="公司名称">
        <el-input disabled style="width:400px" v-model="dataForm.name" />
      </el-form-item>
      <el-form-item label="公司地址">
        <el-input disabled style="width:400px" v-model="dataForm.companyAddress" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input disabled style="width:400px" v-model="dataForm.mailbox" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" :rows="3" disabled style="width:400px" v-model="dataForm.remarks" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCompanyInfoAPI } from '@/api/setting'
import store from '@/store'
export default {
  name: 'companyInfo',
  data() {
    return {
      dataForm: {}
    }
  },
  created() {
    this.getCompanyInfo()
  },
  methods: {
    async getCompanyInfo() {
      this.dataForm = await getCompanyInfoAPI(store.getters.companyId)
    }
  }
}
</script>

<style>

</style>