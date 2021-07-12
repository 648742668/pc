<template>
    <div style="padding: 30px;width: 650px;">
        <el-transfer
                v-model="value"
                :data="data"
                :props="{
                            key: 'id',
                            label: 'nickname'
                        }"
        ></el-transfer>
      <div style="margin-top: 20px;float: right;padding-right: 10px">
        <el-button type="primary" size="small" @click="$router.back()">返回</el-button>
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
                this.$router.back()
            }
        }
    }
</script>

<style scoped>

</style>
