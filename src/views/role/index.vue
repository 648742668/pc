<template>
  <div style="padding: 30px">
    <div>
      <el-input
        v-model="query.name"
        size="small"
        class="nickname-search"
        placeholder="请输入角色名"/>
      <el-button
        type="primary"
        size="small"
        @click="getNameLike">查询
      </el-button>
    </div>
    <div style="float: right">
      <el-button
        @click="dialog.show=true"
        type="primary"
        size="small"
      >增加
      </el-button>
    </div>
    <el-table
      :data="tableData.records"
      style="width: 100%">
      <el-table-column
        align="center"
        prop="name"
        label="角色名"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        label="关联用户">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="addUser(scope.row.id)">关联用户</el-button>
          <el-button size="small" type="primary" @click="addResource(scope.row.id)">关联权限</el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="isActive"
        label="状态">
        <template slot-scope="scope">
          {{scope.row.isActive | active}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <template v-if="scope.row.isActive===1">
            <el-button size="small" @click="delActive(scope.row.id,0)" type="danger" style="margin-right: 20px">禁用
            </el-button>
            <el-button size="small" type="warn" @click="openUpdateDialog(scope.row.id)">修改</el-button>
          </template>
          <template v-else>
            <el-button size="small" type="success" slot="reference" @click="delActive(scope.row.id,1)">启用</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="float: right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.pageNum"
        :page-sizes="[10, 15, 25, 30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total">
      </el-pagination>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      width="450px"
      @close="closeDialog"
      :title="dialog.title"
      :visible.sync="dialog.show"
    >
      <component
        v-if="dialog.show"
        :is="dialog.component"
        :show.sync="dialog.show"
        :id="dialog.id"
        @closeMyDialog="closeDialog"></component>
    </el-dialog>
  </div>
</template>

<script>

  const basePrefix = "/ums-role"
  export default {
    name: "RoleList",
    components: {},
    data() {
      return {
        tableData: [],
        query: {
          name: "",
          pageSize: 10,
          pageNum: 1
        },
        dialog: {
          id: null,
          title: "增加角色",
          show: false,
          component: () => import("./component/RoleEdit")
        }
      }
    },
    created() {
      this.getTableData()
    },
    filters: {
      active(state) {
        if (state === 1) return "启用"
        return "禁用"
      }
    },
    methods: {
      addResource(id) {
        this.$router.push({path: "/user/role_resource", query: {roleId: id}})

      },
      addUser(id) {
        this.$router.push({path: "/user/role_user", query: {roleId: id}})
      },
      getNameLike() {
        this.query.pageNum = 1
        this.get(basePrefix + "/list", this.query, obj => {
          this.tableData = obj
        })
      },
      openUpdateDialog(id) {
        this.dialog.id = id
        this.dialog.title = "更新角色"
        this.dialog.show = true
      },
      closeDialog(ok) {
        this.dialog.id = null
        this.dialog.show = false
        this.dialog.title = "增加角色"
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
        this.get(basePrefix + "/list", this.query, data => {
          this.tableData = data
        })
      },
      delActive(id, active) {
        let msg;
        if (active === 0) {
          msg = "确定要禁用该角色"
        } else {
          msg = "确定要启用该角色"
        }
        this.$confirm(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.post(basePrefix + "/del", {id: id, isActive: active}, data => {
            this.getTableData()
          })
        }).catch(() => {

        });

      }
    }
  }
</script>

<style lang="less">

  .container {
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
