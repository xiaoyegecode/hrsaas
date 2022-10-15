<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="上传中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      action="#"
      class="uploadImage"
      list-type="picture-card"
      :file-list="fileList"
      :on-change="onChange"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :http-request="httpRequest"
      :before-upload="beforeUpload"
      :limit="1"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <!-- 预览图片弹层 -->
    <el-dialog title="图片预览" :visible.sync="priviewDiaog" width="50%">
      <img style="width:100%" :src="priviewUrl">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKID22ta8RWWQAgx2vcRG3tGUksvx0Phw1xk', //实际开发中 发请求获取
  SecretKey: 'oS0Tm3Mhw1ufQ9j6Ko9NTAnKrXFzfWI3'
})
export default {
  name: 'ImageUpload',
  data() {
    return {
      fileList: [],
      priviewDiaog: false,
      priviewUrl: '',
      loading: false
    }
  },
  // props: {
  //   defaultUrl: {
  //     type: String,
  //     default: ''
  //   }
  // },
  // watch: {
  //   defaultUrl() {
  //     this.fileList.push({
  //       name: 'default',
  //       url: this.defaultUrl
  //     })
  //   }
  // },
  methods: {
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file) {
      this.priviewDiaog = true
      this.priviewUrl = file.url
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    httpRequest({ file }) {
      this.loading = true
      cos.putObject({
        Bucket: 'useravatar-1314348561', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-nanjing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file, /* 上传文件对象 */
        onProgress: function (progressData) {
          /* console.log(JSON.stringify(progressData))
            这个就是上传的百分比
            params.percent 表示当前上传的进度 */
        }
      }, (err, data) => {
        if (err) return this.$message.error('上传图片失败')
        this.loading = false
        this.$emit('on-success', { imgUrl: 'http://' + data.Location }) /* 上传成功的逻辑不能写死 */
      })
    },
    beforeUpload(file) {
      const allowType = ['image/jpeg', 'image/gif', 'image/png']
      const ishas = allowType.includes(file.type)
      if (!ishas) {
        this.$message.error('只能上传' + allowType.join(',') + '类型文件')
        return false
      }
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片大小最大不能超过1M')
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.uploadImage {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>