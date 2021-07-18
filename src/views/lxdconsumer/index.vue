<template>
  <div style="padding:30px">
    <el-input v-model="query.id" placeholder="请输入要查询的消费者id" size="small" />
    <el-button type="primary" plain icon="el-icon-search" size="small" @click="search">查询</el-button>
    <el-table :data="tableData.records" border="">
      <el-table-column label="操作信息编号" prop="id" />
      <el-table-column label="消费者id" prop="consumerId" />
      <el-table-column label="操作名称" prop="method" />
      <el-table-column label="参数列表" prop="args" />

    </el-table>
    <template>
      <el-pagination
        background
        :current-page.sync="query.pageNo"
        layout="prev, pager, next"
        :page-count="tableData.pages"
        @current-change="getTableData"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'LxdConsumerList',
  data() {
    return {
      tableData: [],
      query: {
        pageNo: 1,
        pageSize: 10,
        id: ''
      }
    }
  },
  created() {
    this.getTableData()
  },

  methods: {
    getTableData() {
      this.get('/lxd-consumer/show', this.query, obj => {
        this.tableData = obj
      })
    },
    search() {
      this.query.pageNo = 1
      this.getTableData()
    }

  }
}
</script>

<style>
	.el-input{
		width: auto;
		margin-right: 10px;
	}

</style>
