<template>
  <div style="padding:30px">
    <el-input v-model="query.id" placeholder="请输入要查询的订单id" size="small"/>
    <el-button type="primary" plain icon="el-icon-search" size="small" @click="search">查询</el-button>
    <el-table :data="tableData.records" max-height="500px">
      <el-table-column label="订单id" prop="id"/>
      <el-table-column label="订单创建时间" prop="createTime"/>
      <el-table-column label="最后更新时间" prop="updateTime"/>
      <el-table-column label="订单总价值" prop="total"/>
      <el-table-column label="订单状态">
        <template
          slot-scope="scope"
        >{{ scope.row.status|orderstatus }}
        </template>
      </el-table-column>

      <el-table-column label="交易单号id" prop="paymentId"/>

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
    name: 'LxdOrderList',
    filters: {
      orderstatus(status) {
        if (status === 1) {
          return '未支付'
        } else if (status === 2) {
          return '已支付'
        } else if (status === 3) {
          return '已发货'
        } else if (status === 4) {
          return '已签收未评价'
        } else if (status === 5) {
          return '已完成'
        } else if (status === 6) return '已取消'
        return '状态错误'
      }
    },
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
        this.get('/lxd-order/show', this.query, obj => {
            console.log(obj)
            this.tableData = obj
          }
        )
      },
      search() {
        this.query.pageNo = 1
        this.getTableData()
      }

    }
  }
</script>

<style>
  .el-input {
    width: auto;
    margin-right: 10px;
  }

</style>
