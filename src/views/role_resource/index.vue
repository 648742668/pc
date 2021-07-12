<template>
<div
    style="padding: 30px;width: 500px" >
    <el-tree
            ref="tree"
            :data="treeData"
            show-checkbox
            node-key="id"
            :default-checked-keys="checkedKeys"
            default-expand-all
            :props="defaultProps">
    </el-tree>
  <div style="float: right;margin-top: 30px">
    <el-button size="small" @click="$router.back()" type="primary">返回</el-button>
    <el-button size="small" @click="submit" type="primary">提交</el-button>
  </div>

</div>
</template>

<script>
    const basePrefix = "/ums-resource"
    export default {
        name: "RoleResource",
        data(){
            return{
                checkedKeys:[],
                roleId:-1,
                treeData:[],
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
        methods:{
            getTableData() {
                this.get(basePrefix+"/list", null, data => {
                    this.treeData = data
                })
            },
            getCheckedIds(){
                this.get("/ums-role-resource/getByRid",{roleId:this.roleId},data=>{
                    console.log(data)
                    let checkedKeysTemp = []
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].isLeaf === 0){
                            checkedKeysTemp.push(data[i].id)
                        }
                    }
                    this.checkedKeys = checkedKeysTemp
                })
            },
            submit(){
                // update_resource
                // console.log(this.$refs['tree'].getCheckedKeys(true,false))
                // console.log(this.checkedKeys,"-------")

                let resourceId = []
                let nodes = this.$refs['tree'].getCheckedNodes(false,true)
                // console.log(nodes)
                for(let i=0;i<nodes.length;i++){
                    resourceId.push(nodes[i].id)
                }
                this.post("/ums-role-resource/update_resource",{roleId:this.roleId,resourceId:resourceId},data=>{
                })
                // this.$refs['tree'].getCheckedNodes(false,true).for
                this.$router.back()
            }
        }
    }
</script>

<style scoped>

</style>
