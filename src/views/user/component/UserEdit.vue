<template>
  <div>
    <el-form
      ref="formName"
      label-position="top"
      label-width="80px"
      :rules="rules"
      :model="formData"
    >

      <el-form-item label="用户名" class="dialog-item inline" prop="nickname">
        <el-input v-model="formData.nickname" size="small" />
      </el-form-item>
      <el-form-item label="密码" class="dialog-item inline" style="float: right" prop="rawPassword">
        <el-input v-model="formData.rawPassword" show-password size="small" />
      </el-form-item>
      <el-form-item label="邮箱" class="dialog-item inline" prop="email">
        <el-input v-model="formData.email" size="small" />
      </el-form-item>
      <el-form-item label="电话" class="dialog-item inline" style="float: right" prop="phone">
        <el-input v-model="formData.phone" size="small" />
      </el-form-item>
      <el-form-item label="生日" class="dialog-item" style="width: 100%" prop="birthday">
        <el-date-picker
          v-model="formData.birthday"
          size="small"
          type="date"
          placeholder="选择日期"
        />
        <span style="position: absolute;right: 100px">
          <el-button size="small" type="primary" @click="resetForm('formName')">取消</el-button>

        </span>
        <span style="position: absolute;right: 0">
          <el-button size="small" type="primary" @click="submitForm('formName')">提交</el-button>
        </span>
      </el-form-item>

      <el-form-item>
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
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { getDate } from '@/utils/convert'
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
      submitUrl: 'user/add',
      operation: -1, // 0 增加 1 修改
      formData: {
        id: -1,
        nickname: '',
        rawPassword: '',
        email: '',
        phone: '',
        birthday: null,
        file: null
      },
      rules: {
        nickname: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        rawPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入电话', trigger: 'change' },
          {
            pattern: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
            message: '电话格式不正确',
            trigger: 'blur'
          }
        ], birthday: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
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
      this.$get(basePrefix + '/get_one', { id: this.id }, obj => {
        this.id = obj.id
        this.formData = obj
        this.formData.birthday = getDate(obj.birthday)
        this.fileList.push({
          name: obj.img, url: this.$img(obj.img)
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
          this.$post(this.submitUrl, this.formData, resp => {
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
