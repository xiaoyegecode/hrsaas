<template>
  <div class="app-container">
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-row :gutter="10">
            <el-button type="primary" size="small" icon="el-icon-plus" style="margin-left:10px" @click="addrole">
              新增角色
            </el-button>
          </el-row>
          <!-- 表格 -->
          <el-table width="100%" :data="tableData" v-loading="loading">
            <el-table-column label="序号" width="120" type="index" />
            <el-table-column label="角色名称" prop="name" width="240" />
            <el-table-column label="描述" prop="description" />
            <el-table-column label="操作" width="240">
              <el-button size="small" type="success">分配权限</el-button>
              <el-button size="small" type="primary">编辑</el-button>
              <el-button size="small" type="danger">删除</el-button>
            </el-table-column>
          </el-table>
          <!-- 分页器 -->
          <el-row type="flex" justify="end" align="middle" style="height:60px">
            <el-pagination 
              background
              v-if="total>0"
              :total="total"
              :current-page.sync="page.page"
              :page-size.sync= "page.pagesize"
              :page-sizes="[2,5,10,15]"
              layout="prev, pager, next, sizes, total"
              @current-change="getRoleList"
              @size-change="getRoleList"
            />
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <addRole :dialog-visible.sync="dialogVisible" @refreshList="getRoleList"></addRole>
  </div>
</template>

<script>
import { getRoleListAPI } from '@/api/setting'
import addRole from './cnps/addRole.vue'
export default {
  name: 'setting',
  components: { addRole },
  data() {
    return {
      activeName: 'first',
      page: {
        page: 1,
        pagesize: 10
      },
      tableData: [],
      total: 0,
      loading: false,
      dialogVisible: false
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      try {
        this.loading = true
        const { rows, total } = await getRoleListAPI(this.page)
        this.total = total
        this.tableData = rows
      } catch (error) {
        console.log(errr)
      } finally {
        this.loading = false
      }
    },
    addrole() {
      this.dialogVisible = true
    }
  }
}
</script>

<style>

</style>