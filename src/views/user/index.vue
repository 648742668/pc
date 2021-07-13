<template>
  <div class="container">
    <div>
      <el-input
        v-model="query.username"
        size="small"
        class="nickname-search"
        placeholder="请输入用户名"
      />
      <el-button
        type="primary"
        size="small"
        @click="getNameLike"
      >查询
      </el-button>
    </div>
    <div style="float: right">
      <el-button
        type="primary"
        size="small"
        @click="dialog.show=true"
      >增加
      </el-button>
    </div>
    <el-table
      :data="tableData.records"
      style="width: 100%"
    >
      <el-table-column
        align="center"
        prop="nickname"
        label="昵称"
        width="180"
      />
      <el-table-column
        align="center"
        prop="username"
        label="用户名"
        width="180"
      />
      <el-table-column
        align="center"
        prop="phone"
        label="手机号"
        width="180"
      />
      <el-table-column
        align="center"
        prop="file"
        label="头像"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <el-image
              style="width: 100px; height: 100px"
              :src="fullUrl(scope.row.img)"
              fit="scale-down"
            />
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" />
            </div>
          </el-popover>

        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="isActive"
        label="状态"
      >
        <template slot-scope="scope">
          {{ scope.row.isActive | active }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <template v-if="scope.row.isActive===1">

            <el-button @click="delActive(scope.row.id,0)" size="small" type="danger" style="margin-right: 20px">禁用
            </el-button>
            <el-button size="small" type="warn" @click="openUpdateDialog(scope.row.id)">修改</el-button>
          </template>
          <template v-else>
            <el-button @click="delActive(scope.row.id,1)" size="small" type="success" style="margin-right: 20px">启用
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="float: right">
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
      width="450px"
      :title="dialog.title"
      :visible.sync="dialog.show"
      @close="closeDialog"
    >
      <component
        :is="dialog.component"
        v-if="dialog.show"
        :id="dialog.id"
        :show.sync="dialog.show"
        @closeMyDialog="closeDialog"
      />
    </el-dialog>
  </div>
</template>

<script>
import UserEdit from './component/UserEdit'
import { IMG_URL } from '@/config/config'

const basePrefix = '/ums-user'
export default {
  name: 'UserList',
  components: {
    UserEdit
  },
  filters: {
    active(state) {
      if (state === 1) return '启用'
      return '禁用'
    }
  },
  data() {
    return {
      tableData: [],
      query: {
        username: '',
        pageSize: 10,
        pageNum: 1
      },
      dialog: {
        id: null,
        title: '增加用户',
        show: false,
        component: () => import('./component/UserEdit')
      }
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    getNameLike() {
      this.query.pageNum = 1
      this.get(basePrefix + '/list', this.query, obj => {
        this.tableData = obj
      })
    },
    openUpdateDialog(id) {
      console.log('id  ', id)
      this.dialog.id = id
      this.dialog.title = '更新用户'
      this.dialog.show = true
    },
    fullUrl(name) {
      return IMG_URL + name
    },
    closeDialog(ok) {
      this.dialog.id = null
      this.dialog.show = false
      this.dialog.title = '增加用户'
      if (ok) {
        this.getTableData()
      }
    },
    handleSizeChange(val) {
      this.query.pageSize = val
      this.getTableData()
    },
    handleCurrentChange(val) {
      this.query.pageNum = val
      this.getTableData()
    },
    getTableData() {
      this.get(basePrefix + '/list', this.query, data => {
        this.tableData = data
      })
    },
    delActive(id, active) {
      let msg;
      if (active ===0){
        msg = "确定要禁用该用户"
      }else {
        msg = "确定要启用该用户"
      }
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.post(basePrefix + '/del', { id: id, isActive: active }, data => {
          this.getTableData()
        })
      }).catch(() => {

      });

    }
  }
}
</script>

<style>
  .container{
    padding: 30px;
  }

  .el-dialog__body {
    padding-top: 0;

  }

  .nickname-search {
    width: auto;
    margin-right: 20px;
  }

</style>
