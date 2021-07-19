<template>
  <div style="height: 500px">
    <el-scrollbar style="height: 100%;">
      <el-form :model="form" label-width="80px" label-position="top" >
        <el-form-item label="订单号" prop="orderId" class="inline">
          <span>{{form.orderId}}</span>
          <!--        <el-input v-model="form.orderId" disabled />-->
        </el-form-item>
        <el-form-item label="顾客昵称" prop="nickName" class="inline">
          <span>{{form.nickName}}</span>
          <!--        <el-input v-model="form.nickName" disabled />-->
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime" class="inline">
          <span>{{form.createTime}}</span>
        </el-form-item>
        <el-form-item label="支付时间" prop="payTime" class="inline">
          <span>{{form.payTime}}</span>
        </el-form-item>
        <el-form-item label="订单总价" prop="total" >
          <span>{{form.total}}</span>
        </el-form-item>
        <el-form-item label="地址-省份" prop="province" class="inline">
          <span>{{form.province}}</span>
        </el-form-item>
        <el-form-item label="地址-城市" prop="city" class="inline">
          <span>{{form.city}}</span>
        </el-form-item>
        <el-form-item label="地址-县城" prop="county"  class="inline">
          <span>{{form.county}}</span>
        </el-form-item>
        <el-form-item label="地址详情" prop="address" class="inline">
          <span>{{form.address}}</span>
        </el-form-item>
        <el-form-item label="收件人" prop="recv_name" class="inline">
          <span>{{form.recv_name}}</span>
        </el-form-item>
        <el-form-item label="收件号码" prop="recv_phone" class="inline">
          <span>{{form.recv_name}}</span>
        </el-form-item>
        <el-form-item label="订单项" prop="recv_phone">
          <el-table :data="form.items" border>
            <el-table-column prop="name" label="商品名" align="center"></el-table-column>
            <el-table-column prop="count" label="数量" align="center" width="50px"></el-table-column>
            <el-table-column prop="price" label="价格" align="center" width="100px"></el-table-column>
            <el-table-column label="列表" align="center">
              <template slot-scope="scope">
                <el-tag size="mini" :key="index" v-for="(item,index) in scope.row.items" style="margin-right: 5px">{{item.value}}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>

    </el-scrollbar>

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
    margin-bottom: 0;

    .el-form-item__label {
      padding-bottom: 0;
    }
  }
.el-dialog__body{
  padding-top: 15px;
  padding-bottom: 15px;
}
.el-form-item__content{
  height: 30px;
  line-height: 30px;
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
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>
