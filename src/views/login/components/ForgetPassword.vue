<template>
  <div>
    <el-steps :active="active" finish-status="success">
      <el-step title="邮箱校验"></el-step>
      <el-step title="更改密码"></el-step>
    </el-steps>
    <div v-show="active===0">
      <el-form :model="checkForm" label-position="top">
        <el-form-item label="用户名">
          <el-input v-model="checkForm.username" size="small"/>
        </el-form-item>
      </el-form>
    </div>
    <el-button @click="next">下一步</el-button>
  </div>
</template>

<script>
  export default {
    name: "ForgetPassword",
    data() {
      return {
        active: 0,
        checkForm:{
          username:"",
          code:""
        }
      }
    }, methods: {
      next() {

        if (this.active++ > 2) this.active = 0;
      },
      pre() {
        if (this.active-- <= 1) this.active = 1;
      }
    }
  }
</script>

<style scoped>
  .el-form-item{
    background: white;
  }
  .el-input{
    border: black 1px solid;
    border-radius: 5px;
  }

</style>
