<template>
  <div class="app-container">
    <PageTools>
      <template #before>
        <span slot="before">共166条记录</span>
      </template>
      <template #after>
        <el-button size="small" type="warning" @click="$router.push('/import')">导入</el-button>
        <el-button size="small" type="danger" @click="exportExcel">导出</el-button>
        <el-button size="small" type="primary"  @click="handleAdd">新增员工</el-button>
      </template>
    </PageTools>
    <!-- 放置表格和分页 -->
    <el-card>
      <el-table border :data="list" v-loading="loading">
        <el-table-column label="序号" sortable="" width="80" type="index" />
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="工号" prop="workNumber" />
        <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="formatterFn" />
        <el-table-column label="部门" prop="departmentName" />
        <el-table-column label="入职时间" sortable="" >
          <template slot-scope="{ row }">{{ row.timeOfEntry | formatDate }}</template>
        </el-table-column>
        <el-table-column label="账户状态" >
          <template slot-scope="{ row }">
            <el-switch :value="row.enableState ===1 "></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="280" >
          <template slot-scope="{ row }">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
        <el-pagination
          background
          layout="prev, pager, next, sizes, total"
          :current-page.sync="page.page"
          :page-size.sync="page.size"
          :page-sizes="[5,10,15,20]"
          :total="total"
          @current-change="getEmployeeList"
          @size-change="getEmployeeList"
        />
      </el-row>
    </el-card>
    <AddEmployee :dialogVisible.sync="showDialog" />
  </div>
</template>

<script>
import EmployeeEnum from '@/api/constant/employees'
import AddEmployee from './AddEmployee'
import { getEmployeeListAPI, delEmployeeAPI } from '@/api'
export default {
  name: 'Employees',
  components: { AddEmployee },
  data() {
    return {
      page: {
        page: 1,
        size: 10
      },
      list: [], // 接数据的
      total: 0, // 总数,
      loading: false,
      hireType: EmployeeEnum.hireType,
      showDialog:false
    }
  },
  mounted() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      try {
        this.loading = true
        const { rows, total } = await getEmployeeListAPI(this.page)
        this.list = rows
        // this.list = rows.map(item => {
        //   if (item.formOfEmployment === 1) {
        //     item.formOfEmployment = '正式'
        //   } else if (item.formOfEmployment === 2) {
        //     item.formOfEmployment = '非正式'
        //   }
        //   return item
        // })
        this.total = total
      } catch (error) {
        
      } finally {
        this.loading = false
      } 
    },
    formatterFn(row, column, cellValue) {
      const res = this.hireType.find(ele => ele.id === cellValue)
      return res&&res.value || '非正式'
    },
    handleAdd() {
      this.showDialog = true
    },
    // 删除员工
    async del(id) {
      try {
        await this.$confirm('确认删除吗', '提示', {
          type: 'warning'
        })
        await delEmployeeAPI(id)
        this.getEmployeeList()
        this.$message.success('删除员工成功')
      } catch (error) {
        console.log(error);
      }
    },
    // 导出excel
    async exportExcel() {
      const { rows } = await getEmployeeListAPI({
        page: 1,
        size: this.total
      })
      const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const header = Object.keys(headers)
      const data = rows.map(item=>{
        return header.map(h => {
          if (h === '聘用形式') {
            const find = this.hireType.find(hire =>hire.id === item[headers[h]])
            return find ? find.value : '未知'
          }
          return item[headers[h]]
        })
      })
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header, //表头 必填
          data,//具体数据 必填
          filename: 'excel-list', //非必填
          autoWidth: true, //非必填
          bookType: 'xlsx' //非必填
        })
      })
    }
  }
}
</script>

<style>

</style>