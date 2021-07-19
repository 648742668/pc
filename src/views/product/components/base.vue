<template>
	<div>
		<el-form ref="form" :model="form" :rules="rules" label-width="100px">
			<el-form-item label="商品名称" prop="name">
				<el-input v-model="form.name" placeholder="请输入商品名称" size="small"></el-input>
			</el-form-item>
			<el-form-item label="标准价格" prop="price">
				<el-input v-model="form.price" placeholder="请输入标准价格" size="small"></el-input>
			</el-form-item>
			<el-form-item label="关联品牌" prop="brandId">
				<el-select v-model="form.brandId" placeholder="请选择品牌" filterable size="small">
					<el-option v-for="item in params.brands" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="关键词">
				<el-input v-model="form.keywords" placeholder="请输入关键词" size="small"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" size="small" @click="next">下一步</el-button>
			</el-form-item>
		</el-form>

	</div>
</template>

<script>
export default {
  name: 'BaseForm',
	props: {
		params: {
			type: Object,
			default: () => { return {}}
		},
		//从add.Vue中接收到idd参数。
		idd: {
			type: Number,
			default: () => {return []}
		}
	},
	created() {
		//如果idd是-1，说明是add操作，不用接收数据。
		if(this.idd===-1){

		}else{//如果idd不是-1，说明是修改操作，需要接收数据。
			this.getone()
		}
	},
  data() {
	  const module = '/product'
    return {
		url: {
			getone: module + '/getone'
		},
			form: {
				name: '',
				price: '',
				brandId: null,
				keywords: ''
			},
			brands: [],
			rules: {
				name: [
					{required: true, message: '请输入商品名称', trigger: 'blur'}
				],
				price: [
					{required: true, message: '请输入标准价格', trigger: 'blur'},
					{pattern: /^[0-9]+(\.[0-9]{1,2})?$/, message: '请输入正确的价格', trigger: 'blur'}
				],
				brandId: [
					{required: true, message: '请选择品牌', trigger: 'blur'}
				]
			}
    }
  },
  methods: {
		next() {
			this.$refs['form'].validate(valid=>{
				if(valid) {
					this.$emit('setForm',this.form)
					this.$emit('next')
				}
			})
		},
		getone(){
			this.get(this.url.getone,{id: this.idd},response => {
					this.form['name'] = response['name']
					this.form['price'] = response['price']
					this.form['brandId'] = response['brandId']
					this.form['keywords'] = response['keywords']
				this.form.id = response.id

				// this.filelist.push({
				// 	name: response.logo,
				// 	url: this.img(response.logo)
				// })
			})
		}
  }
}
</script>
<style scoped lang="less">
</style>
