<template>
  <div v-loading.fullscreen.lock="fullscreenLoading" class="container">
    <div>
      <el-input

        v-model="query.orderId"
        size="small"
        class="id-search"
        placeholder="请输入查询订单号"
      />
      <el-button
        type="primary"
        size="small"
        @click="getIdLike"
      >查询
      </el-button>
    </div>
    <el-table
      max-height="500px"
      :data="tableData.records"
      style="width: 100%"
    >
      <el-table-column
        align="center"
        prop="id"
        label="订单编号"
        width="180"
      />
      <el-table-column
        align="center"
        prop="consumerId"
        label="顾客ID"
        width="180"
      />
      <el-table-column
        align="center"
        prop="total"
        label="订单价格"
        width="180"
      />
      <el-table-column
        align="center"
        prop="status"
        label="订单状态"
      >
        <template slot-scope="scope">
          {{ scope.row.status | orderstatus }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <template v-if="scope.row.status===1">
            <el-button disabled size="small" type="warning" style="margin-right: 20px;width:65px">未支付
            </el-button>
            <el-button size="small" type="info" style="margin-right: 20px" @click="detail(scope.row.id)">订单详情
            </el-button>
          </template>
          <template v-else-if="scope.row.status===2">
            <el-button size="small" type="primary" style="margin-right: 20px;width:65px" @click="update(scope.row.id,3)">发货
            </el-button>
            <el-button size="small" type="info" style="margin-right: 20px" @click="detail(scope.row.id)">订单详情
            </el-button>
          </template>
          <template v-else-if="scope.row.status===3">
            <el-button size="small" type="danger" style="margin-right: 20px;width:65px" @click="update(scope.row.id,6)">取消
            </el-button>
            <el-button size="small" type="info" style="margin-right: 20px" @click="detail(scope.row.id)">订单详情
            </el-button>
          </template>
          <template v-else>
            <el-button size="small" type="info" style="margin-right: 20px;width:65px" @click="del(scope.row.id)">删除
            </el-button>
            <el-button size="small" type="info" style="margin-right: 20px" @click="detail(scope.row.id)">订单详情
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="float: right;position: absolute;right: 30px;bottom: 30px">
      <el-pagination
        :current-page="query.pageNum"
        :page-sizes="[10, 15, 25, 30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog
      :close-on-click-modal="false"
      width="500px"
      :title="dialog.title"
      :visible.sync="dialog.show"
      @close="closeDialog"
    >
      <component
        :is="dialog.component"
        v-if="dialog.show"
        :order-id="dialog.orderId"
        :show.sync="dialog.show"
        @closeMyDialog="closeDialog"
      />
    </el-dialog>
  </div>
</template>

<script>
  import orderInfo from './component/orderInfo'

  export default {
  name: 'OrderList',
  components: {
    orderInfo
  },
  filters: {
    orderstatus(status) {
      if (status === 1) return '未支付'
      else if (status === 2) return '已支付'
      else if (status === 3) return '已发货'
      else if (status === 4) return '已签收未评价'
      else if (status === 5) return '已完成'
      else if (status === 6) return '已取消'
      return '状态错误'
    }
  },
  data() {
    const module = '/order'
    return {
      tableData: [],
      url: {
        list: module + '/list',
        del: module + '/del',
        update: module + '/update'
      },
      query: {
        orderId: '',
        pageSize: 10,
        pageNum: 1
      },
      dialog: {
        show: false,
        title: '',
        component: () => import('./component/orderInfo'),
        orderId: null
      },
      fullscreenLoading: false
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    getIdLike() {
      this.fullscreenLoading = true
      setTimeout(() => {
        this.fullscreenLoading = false
      }, 2000)
      this.query.pageNum = 1
      this.get(this.url.list, this.query, obj => {
        this.tableData.records = obj.records
      })
      // 消息提示过快
      // let len = this.tableData.records.length
      // if(len <= 0){
      //   console.log('---')
      //   Message.warning({
      //     message: '未找到相似订单号！',
      //     duration: 2000
      //   })
      // }else{
      //   console.log('!!!')
      //   Message.success({
      //     message: '查询单号成功！',
      //     duration: 2000
      //   })
      // }
    },
    getTableData() {
      this.fullscreenLoading = true
      setTimeout(() => {
        this.fullscreenLoading = false
      }, 2000)
      this.get(this.url.list, this.query, data => {
        console.log(data)
        console.log(data)
        this.tableData = data

        // console.log(this.tableData)
      })
    },
    handleSizeChange(val) {
      this.query.pageSize = val
      this.getTableData()
    },
    handleCurrentChange(val) {
      this.query.pageNum = val
      this.getTableData()
    },
    del(id) {
      const txt = '确定要删除该订单记录吗？'
      this.$confirm(txt, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.post(this.url.del, { id: id }, data => {
          this.getTableData()
        })
      })
    },
    update(id, status) {
      const txt = status === 3 ? '确定要给该订单发货吗？' : '确定要取消该订单吗？'
      this.$confirm(txt, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.post(this.url.update, { id: id, status: status }, data => {
          this.getTableData()
        })
      })
    },
    detail(orderId) {
      console.log('order/index-orderId  ', orderId)
      this.dialog.orderId = orderId
      this.dialog.title = '订单详情'
      this.dialog.show = true
      console.log('order/index-dialog.orderId  ', this.dialog.orderId)
    },
    closeDialog(ok) {
      this.dialog.id = null
      this.dialog.show = false
      this.dialog.title = '增加用户'
      if (ok) {
        this.getTableData()
      }
    }
  }

}
</script>

<style scoped>
  .container{
    padding: 30px;
  }
  .id-search {
    width: 400px;
    margin-right: 20px;
  }

</style>
