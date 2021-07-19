<template>
    <div style="padding: 30px;width: 650px;">
        <el-transfer
          :titles="titles"
                v-model="value"
                :data="data"
                :props="{
                            key: 'id',
                            label: 'username'
                        }"
        ></el-transfer>
      <div style="margin-top: 20px;float: right;padding-right: 10px">
        <el-button type="primary" size="small" @click="goBack()">返回</el-button>
        <el-button type="primary" size="small" @click="save">保存</el-button>
      </div>

    </div>
</template>

<script>
    const basePrefix = "ums-role_user"
    export default {
        name: "RoleUser",
        data() {
            return {
              titles:['全部用户','已关联用户'],
                roleId: null,
                value: [],
                data: []
            }
        },
        created() {
            this.roleId = this.$route.query.roleId
            this.get(basePrefix + "/getByRoleId", {roleId: this.roleId}, obj => {
                this.data = obj.all
                this.value = obj.in
            })
        },
        methods:{

            save(){
                this.post(basePrefix+"/updateRoles",{roleId:this.roleId,userId:this.value},()=>{})
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
              path:this.$route.path,
              name:this.$route.name,
              title:this.$route.title,
              fullPath:this.$route.fullPath,
              params:this.$route.params,
              query:this.$route.params,
              matched:this.$route.matched,
              hash:this.$route.hash,
              meta:this.$route.meta
            }
            this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
              if (this.isActive(view)) {
                this.toLastView(visitedViews, view)
              }
            })
            this.$router.go(-1)
          },
        }
    }
</script>

<style scoped>

</style>
