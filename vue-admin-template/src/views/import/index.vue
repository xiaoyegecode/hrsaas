<template>
  <div>
    <UploadExcel :on-success="handleSuccess" :before-upload="beforeUpload" />
  </div>
</template>

<script>
import { importEmployee } from '@/api'
export default {
  name: 'import',
  methods: {
    beforeUpload(file) {
      if (file.size/1024 > 1024) {
        this.$message.error('to big')
        return false
      }
      return true
    },
    async handleSuccess({ header, results }) {
      console.log(results);
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const arr = []
      results.forEach(item => {
        const userinfo = {}
        Object.keys(item).forEach(key => {
          userinfo[userRelations[key]] = item[key]
        })
        arr.push(userinfo)
      })
      await importEmployee(arr)
      this.$message.success('批量导入成功')
      this.$router.back()
    }
  }
}
</script>

<style>

</style>