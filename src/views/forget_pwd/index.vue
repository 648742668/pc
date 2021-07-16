<template>
  <div class="container">
    <div class="form">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="邮箱校验"></el-step>
        <el-step title="更改密码"></el-step>
      </el-steps>
      <div class="check_info">
        <el-form :model="checkForm">
          <el-form-item label="用户名">
            <el-input v-model="checkForm.username" size="small" placeholder="请输入用户名"></el-input>
            <el-button size="small" style="float: right" type="primary" v-if="sendEmail" @click="getCode">发送
            </el-button>
            <el-button size="small" style="float: right" type="primary" v-else disabled>{{countDown+'s'}}</el-button>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="checkForm.username" size="small"></el-input>
            <el-button size="small" style="float: right" type="primary">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ForgetPassword",
    data() {
      return {
        sendEmail: true,
        countDown: 60,
        timer: null,
        checkForm: {
          username: "",
          code: ""
        },
        active: 0
      };
    },

    methods: {
      getCode() {
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.sendEmail = false;
          this.timer = setInterval(() => {
            if (this.countDown > 0 && this.countDown <= TIME_COUNT) {
              this.countDown--;
            } else {
              this.sendEmail = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        }
      },
      next() {
        if (this.active++ > 2) this.active = 0;
      }
    }
  }
</script>

<style scoped>
  .container {
    height: 100vh;
    display: flex;
    background: #2d3a4b;
  }

  .check_info {
    padding-top: 20px;
  }

  .form {
    border-radius: 5px;
    padding: 20px 40px;
    background: #fff;
    width: 400px;
    height: 250px;
    position: relative;
    margin: auto;
    transition: 1s;
    transform-style: preserve-3d;
  }

  .el-input {
    width: auto;
  }

  .el-form-item__label {
    padding-bottom: 0;
  }
</style>
