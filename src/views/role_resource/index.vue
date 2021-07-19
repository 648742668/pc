<template>
  <div
    style="padding: 30px;width: 500px;">
    <div
     style="height: 500px">
      <el-scrollbar style="height: 100%;">
        <el-tree
          ref="tree"
          :data="treeData"
          show-checkbox
          node-key="id"
          :default-checked-keys="checkedKeys"
          default-expand-all
          :props="defaultProps">
        </el-tree>
      </el-scrollbar>

    </div>

    <div style="float: right;margin-top: 30px">
      <el-button size="small" @click="goBack()" type="primary">返回</el-button>
      <el-button size="small" @click="submit" type="primary">提交</el-button>
    </div>

  </div>
</template>

<script>
  const basePrefix = '/ums-resource'
  export default {
    name: 'RoleResource',
    data() {
      return {
        checkedKeys: [],
        roleId: -1,
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    created() {
      this.roleId = this.$route.query.roleId
      this.getTableData()
      this.getCheckedIds()
    },
    methods: {
      getTableData() {
        this.get(basePrefix + '/list', null, data => {
          this.treeData = data
        })
      },
      getCheckedIds() {
        this.get('/ums-role-resource/getByRid', { roleId: this.roleId }, data => {
          console.log(data)
          let checkedKeysTemp = []
          for (let i = 0; i < data.length; i++) {
            if (data[i].isLeaf === 0) {
              checkedKeysTemp.push(data[i].id)
            }
          }
          this.checkedKeys = checkedKeysTemp
        })
      },
      submit() {
        // update_resource
        // console.log(this.$refs['tree'].getCheckedKeys(true,false))
        // console.log(this.checkedKeys,"-------")

        let resourceId = []
        let nodes = this.$refs['tree'].getCheckedNodes(false, true)
        // console.log(nodes)
        for (let i = 0; i < nodes.length; i++) {
          resourceId.push(nodes[i].id)
        }
        this.post('/ums-role-resource/update_resource', { roleId: this.roleId, resourceId: resourceId }, data => {
        })
        // this.$refs['tree'].getCheckedNodes(false,true).for
        this.goBack()
      },
      isActive(route) {
        return route.path === this.$route.path
      },
      toLastView(visitedViews, view) {
        const latestView = visitedViews.slice(-1)[0]
        if (latestView) {
          this.$router.push(latestView.fullPath)
        } else {
          // now the default is to redirect to the home page if there is no tags-view,
          // you can adjust it according to your needs.
          if (view.name === 'Dashboard') {
            // to reload home page
            this.$router.replace({ path: '/redirect' + view.fullPath })
          } else {
            this.$router.push('/')
          }
        }
      },
      closeSelectedTag(view) {
        this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
          if (this.isActive(view)) {
            this.toLastView(visitedViews, view)
          }
        })
      },
      goBack() {
        let view = {
          path: this.$route.path,
          name: this.$route.name,
          title: this.$route.title,
          fullPath: this.$route.fullPath,
          params: this.$route.params,
          query: this.$route.params,
          matched: this.$route.matched,
          hash: this.$route.hash,
          meta: this.$route.meta
        }
        this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
          if (this.isActive(view)) {
            this.toLastView(visitedViews, view)
          }
        })
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>
