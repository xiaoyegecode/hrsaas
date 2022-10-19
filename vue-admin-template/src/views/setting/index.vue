<template>
  <div class="app-container">
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-row :gutter="10">
            <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" style="margin-left:10px" @click="addrole">
              新增角色
            </el-button>
          </el-row>
          <!-- 表格 -->
          <el-table v-loading="loading" width="100%" :data="tableData">
            <el-table-column label="序号" width="120" type="index" />
            <el-table-column label="角色名称" prop="name" width="240" />
            <el-table-column label="描述" prop="description" />
            <el-table-column label="操作" width="240">
              <template slot-scope="{ row }">
                <el-button v-ishasPermission="'role-assign'" size="small" type="success" @click="setPermission(row.id)">分配权限</el-button>
                <el-button v-ishasPermission="'role-edit'" size="small" type="primary" @click="editRole(row)">编辑</el-button>
                <el-button v-ishasPermission="'role-delete'" size="small" type="danger" @click="delRole(row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页器 -->
          <el-row type="flex" justify="end" align="middle" style="height:60px">
            <el-pagination
              v-if="total>0"
              background
              :total="total"
              :current-page.sync="page.page"
              :page-size.sync="page.pagesize"
              :page-sizes="[2,5,10,15]"
              layout="prev, pager, next, sizes, total"
              @current-change="getRoleList"
              @size-change="getRoleList"
            />
          </el-row>
        </el-tab-pane>

        <!-- 公司信息tab -->
        <el-tab-pane label="公司信息" name="second">
          <companyInfo />
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <addRole ref="addRole" :dialog-visible.sync="dialogVisible" @refreshList="getRoleList" />
    <!-- 分配权限弹出层 -->
    <setPermission ref="setPermissionRef" />
  </div>
</template>

<script>
import { getRoleListAPI, deleteRole } from '@/api/setting'
import addRole from './cnps/addRole.vue'
import companyInfo from './cnps/companyInfo.vue'
import setPermission from './cnps/setPermission.vue'
export default {
  name: 'Setting',
  components: { addRole, companyInfo, setPermission },
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
    // 明明有数据，却是最后一页没有数据
    // 解决方案：total 大于0 并且 rows的length === 0 这种情况并不是没有数据 是有的，
    // 要重新发起请求 然后page要减一
    async getRoleList() {
      try {
        this.loading = true
        const { rows, total } = await getRoleListAPI(this.page)
        this.total = total
        this.tableData = rows
        if (this.total > 0 && this.tableData.length === 0) {
          this.page.page--
          this.getRoleList()
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    addrole() {
      this.dialogVisible = true
    },
    editRole(row) {
      // 优化 数据引用类型 带来的问题
      this.$refs.addRole.formData = { ...row }
      this.dialogVisible = true
    },
    async delRole(id) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await deleteRole(id)
        this.getRoleList()
        this.$message.success('删除角色成功')
        console.log('success')
      } catch (error) {
        console.log('error')
      }
    },
    setPermission(id) {
      this.$refs.setPermissionRef.dialogFormV()
      this.$refs.setPermissionRef.roleId = id
    }
  }
}
</script>

<style>

</style>
