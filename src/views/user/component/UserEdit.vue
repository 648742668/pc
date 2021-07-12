<template>
  <div>
    <el-form
      ref="formName"
      label-position="top"
      label-width="80px"
      :rules="rules"
      :model="formData"
    >

      <el-form-item label="用户名" class="dialog-item inline" prop="username">
        <el-input v-model="formData.username" size="small" />
      </el-form-item>
      <el-form-item label="昵称" class="dialog-item inline" style="float: right" prop="nickname">
        <el-input v-model="formData.nickname" size="small" />
      </el-form-item>
      <el-form-item label="密码" class="dialog-item inline" prop="rawPassword">
        <el-input v-model="formData.rawPassword" size="small" />
      </el-form-item>

        <el-form-item label="头像" prop="file">
          <el-upload
            :file-list="fileList"
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :limit="1"
            :on-change="changeFile"
            :on-remove="removeFile"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>
      <el-form-item  class="dialog-item" style="width: 100%" >

        <span style="position: absolute;right: 100px">
          <el-button size="small" type="primary" @click="resetForm('formName')">取消</el-button>

        </span>
        <span style="position: absolute;right: 0">
          <el-button size="small" type="primary" @click="submitForm('formName')">提交</el-button>
        </span>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { getDate } from '@/utils/convert'
import {IMG_URL} from "@/config/config";
const basePrefix = '/ums-user'
export default {
  name: 'UserEdit',
  props: {
    id: {
      type: Number,
      default: null
    }
  },

  data() {
    return {
      fileList: [],
      submitUrl: basePrefix+'/add',
      operation: -1, // 0 增加 1 修改
      formData: {
        id: -1,
        nickname: '',
        rawPassword: '',
        username:"",
        file: null
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        rawPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ], file: []

      }
    }
  },
  created() {
    if (this.id !== null && this.id !== undefined) {
      this.updateEdit()
    } else {
      this.addEdit()
      this.rules.file.push({ required: true, message: '请上传头像', trigger: 'change' })
    }
  },
  methods: {
    addEdit() {
      this.submitUrl = basePrefix + '/add'
    },
    updateEdit() {
      this.submitUrl = basePrefix + '/update'
      this.get(basePrefix + '/get_one', { id: this.id }, obj => {
        this.formData.id=obj.id
        this.formData.username = obj.username
        this.formData.nickname = obj.nickname
        this.formData.rawPassword = ""
        this.fileList.push({
          name: obj.img, url: IMG_URL+obj.img
        })
      })
    },
    changeFile(file) {
      if (file !== undefined && file !== null) {
        this.formData.file = file.raw
      }
    },
    removeFile() {
      this.formData.file = null
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.post(this.submitUrl, this.formData, resp => {
            this.$emit('closeMyDialog', true)
          })
          this.$refs[formName].resetFields()
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$emit('closeMyDialog', false)
    }
  }
}
</script>

<style lang="less">
    .inline {
        display: inline-block;
        width: 200px;
    }

    .el-form-item {
        margin-bottom: 10px;

        .el-form-item__label {
            padding-bottom: 0;
        }
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
