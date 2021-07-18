<template>
  <div class="container">
    <div class="form">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="邮箱校验"></el-step>
        <el-step title="更改密码"></el-step>
      </el-steps>
      <div class="check_info" v-show="active===0">
        <el-form :model="checkForm" :rules="checkRules" label-position="top" ref="formName">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="checkForm.username" size="small" placeholder="请输入用户名"></el-input>
            <el-button size="small" style="float: right" type="primary" v-if="sendEmail" @click="getCode">发送
            </el-button>
            <el-button size="small" style="float: right" type="primary" v-else disabled>{{countDown+'s'}}</el-button>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="checkForm.code" size="small"></el-input>
            <el-button size="small" style="float: right" type="primary" @click="next">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="pwd_info" v-show="active===1">
        <el-form :model="pwdForm" :rules="pwdRules" label-position="top" ref="formName2">
          <el-form-item label="新密码" prop="srcPassword">
            <el-input v-model="pwdForm.srcPassword" size="small" placeholder="请输入新密码" type="password"></el-input>
          </el-form-item>
          <el-form-item label="密码确认" prop="targetPassword">
            <el-input v-model="pwdForm.targetPassword" size="small" type="password"></el-input>
            <el-button size="small" style="float: right" type="primary" @click="updatePassword">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {Notification} from "element-ui";

  const basePrefix = "/ums-user"
  export default {
    name: "ForgetPassword",
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.pwdForm.targetPassword !== '') {
            this.$refs.formName2.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.pwdForm.srcPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        sendEmail: true,
        countDown: 60,
        timer: null,
        checkForm: {
          username: "",
          code: ""
        },
        pwdForm: {
          srcPassword: "",
          targetPassword: "",
        },
        active: 0,
        checkRules: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}]
        },
        pwdRules: {
          srcPassword: [
            {validator: validatePass, trigger: 'blur'}
          ],
          targetPassword: [
            {validator: validatePass2, trigger: 'blur'}
          ],
        }
      };
    },

    methods: {
      updatePassword() {
        this.$refs['formName2'].validate((valid) => {
            if (valid) {
              this.post(basePrefix + "/update_pass", {
                username: this.checkForm.username,
                password: this.pwdForm.srcPassword
              }, obj => {
                if (obj){
                  this.$router.push("/login")
                }
              })

              this.$refs['formName2'].resetFields()
            } else {
              return false
            }
          }
        )
      },
      getCode() {
        this.$refs['formName'].validate((valid) => {
          if (valid) {
            this.get(basePrefix + "/gen_code", {username: this.checkForm.username}, resp => {
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
            })
          } else {
            return false
          }
        })

      },
      next() {
        if (!this.checkForm.code) {
          Notification.error({
            title: '错误',
            message: '请输入验证码'
          })
        } else {
          this.get(basePrefix + "/check_code", {username: this.checkForm.username, code: this.checkForm.code}, obj => {
            if (obj) {
              this.active++
            }
          })
        }
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

  .pwd_info {
    padding-top: 20px;
  }

  .el-form-item {
    margin-bottom: 15px;
  }

  .form {
    border-radius: 5px;
    padding: 20px 40px;
    background: #fff;
    width: 400px;
    height: 300px;
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
