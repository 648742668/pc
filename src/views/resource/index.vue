<template>
    <div style="padding: 30px">
            <el-table
                    max-height="550px"
                    :data="tableData"
                    row-key="id"
                    style="width: 100%;margin-bottom: 20px;"
                    :tree-props="{children: 'children'}">
                    border>
                <el-table-column label="编号" prop="id"></el-table-column>
                <el-table-column label="资源名" prop="name"></el-table-column>
                <el-table-column label="后端地址" prop="backPath"></el-table-column>
                <el-table-column label="是否有下级" prop="isLeaf">
                  <template slot-scope="scope">
                    {{scope.row.isLeaf|isLeaf}}
                  </template>
                </el-table-column>
            </el-table>


    </div>
</template>

<script>

    const basePrefix = "/ums-resource"
    export default {
        name: "ResourceList",
        data() {
            return {
                tableData: [],
            }
        },
        created() {
            this.getTableData()
        },

        methods: {


            getTableData() {
                this.get(basePrefix+"/list", null, data => {
                    console.log(data)
                    this.tableData = data
                })
            },
        },filters:{
          isLeaf(value){
            if (value === 0){
              return "非子节点"
            }else {
              return "是子节点"
            }
          }
      }
    }
</script>

<style lang="less">


    .el-dialog__body {
        padding-top: 0;

    }

    .nickname-search {
        width: auto;
        margin-right: 20px;
    }

</style>
