<template>
  <div style="padding:30px">
    <el-input v-model="query.id" placeholder="请输入要查询的商品id" size="small" />
    <el-button type="primary" plain icon="el-icon-search" size="small" @click="search">查询</el-button>
    <el-table :data="tableData.records" max-height="500px">
      <el-table-column label="库存商品id" prop="id" />
      <el-table-column label="库存数量" prop="stock" />
      <el-table-column label="价格" prop="price" />
      <el-table-column label="所属商品id" prop="productId" />

    </el-table>
    <div class="block" style="float: right;position: absolute;right: 30px;bottom: 30px">

    <el-pagination
        background
        :current-page.sync="query.pageNo"
        layout="prev, pager, next"
        :page-count="tableData.pages"
        @current-change="getTableData"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LxdStockList',
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
			  this.get('/lxd-stock/show', this.query, obj => {
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
