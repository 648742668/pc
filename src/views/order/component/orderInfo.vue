<template>
  <div>
    <el-form :model="form" label-width="80px">
      <el-form-item label="订单号" prop="orderId">
        <el-input v-model="form.orderId" disabled />
      </el-form-item>
      <el-form-item label="顾客昵称" prop="nickName">
        <el-input v-model="form.nickName" disabled />
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-input v-model="form.createTime" disabled />
      </el-form-item>
      <el-form-item label="支付时间" prop="payTime">
        <el-input v-model="form.payTime" disabled />
      </el-form-item>
      <!--        <el-form-item label="订单状态" prop="status">-->
      <!--          <el-input v-model="form.status"></el-input>-->
      <!--        </el-form-item>-->
      <el-form-item label="订单总价" prop="total">
        <el-input v-model="form.total" disabled />
      </el-form-item>
      <el-form-item label="地址-省份" prop="province">
        <el-input v-model="form.province" disabled />
      </el-form-item>
      <el-form-item label="地址-城市" prop="city">
        <el-input v-model="form.city" disabled />
      </el-form-item>
      <el-form-item label="地址-县城" prop="county">
        <el-input v-model="form.county" disabled />
      </el-form-item>
      <el-form-item label="地址详情" prop="address">
        <el-input v-model="form.address" disabled />
      </el-form-item>
      <el-form-item label="收件人" prop="recv_name">
        <el-input v-model="form.recv_name" disabled />
      </el-form-item>
      <el-form-item label="收件号码" prop="recv_phone">
        <el-input v-model="form.recv_phone" disabled />
      </el-form-item>
      <el-form-item v-for="(o,index) in form.items" :key="index" label="订单项">
        <el-input disabled :value="getValue(o)" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'OrderInfo',
  props: {
    orderId: {
      type: Number
    }
  },
  data() {
    const module = '/order'
    return {
      url: {
        detail: module + '/detail'
      },
      form: {
        orderId: '',
        // createTime: null,
        payTime: null,
        // status: null,
        total: null,
        province: null,
        city: null,
        county: null,
        address: null,
        recv_name: null,
        recv_phone: null,
        nickName: null,
        createTime: null,
        items: []
      }
    }
  },
  created() {
    console.log('orderInfo-orderId', this.orderId)
    if (this.orderId) {
      console.log('orderInfo-orderId', this.orderId)
      this.showInfo()
    }
  },
  methods: {
    getValue(p) {
      let n = p.name + ': '
      for (const item of p.items) {
        n = n + item.value + '/'
      }
      return n.substring(0, n.length - 1)
    },
    showInfo() {
      console.log('已实现方法showInfo()')
      this.get(this.url.detail, { orderId: this.orderId }, response => {
        console.log('response', response)
        for (const key in this.form) {
          this.form[key] = response[key]
        }
        this.form.orderId = response.orderId
      })
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
