<template>
	<div>
		<el-form ref="form" :rules="rules" :model="form" label-width="100px">
			<el-form-item label="商品分类" prop="categoryId" size="small">
				<el-cascader
          placeholder="请选择分类"
					v-model="form.categoryId"
					:options="params.categorys"
					:props="{label: 'name', value: 'id'}"
					@change="change"></el-cascader>
			</el-form-item>
			<el-form-item
				v-for="item in form.spus"
				:key="item.name"
				:label="item.name">
				<el-input v-model="item.value" size="small"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="prev" size="small">上一步</el-button>
				<el-button type="primary" size="small" @click="next">下一步</el-button>
			</el-form-item>
		</el-form>

	</div>
</template>

<script>
	//el-cascader 控件可以实现一个级联下拉列表框，props实现是显示什么字段，然后这个字段的value是什么。
export default {
  name: 'SpuForm',
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
	data() {
		  const module = '/product'
	  return {
			url: {
				getCategoryId: module + '/getCategoryId'
			},
				form: {
					categoryId: [],
					spus: []
				},
				rules: {
					categoryId: [
						{required: true, message: '请选择商品分类', trigger: 'blur'}
					]
				}
	  }
	},
	created() {
		if(this.idd===-1){

		}else{//如果idd不是-1，说明是修改操作，需要接收数据。
		//this.form.categoryId = [1,2,3]
		this.getCategoryId()
		}

	},
  methods: {
	   //点击上一步触发的函数。
		prev() {
			this.$emit('prev')
		},
		getCategoryId(){
			this.get(this.url.getCategoryId,{id: this.idd},response => {
					this.form.categoryId = response
					this.change(this.form.categoryId)

			})
		},
		//点击“下一步”触发的函数。需要进行表单验证。
		next() {
			//验证表单
			this.$refs['form'].validate(valid => {
				if(valid) {
					for(let i = 0; i < this.form.spus.length; i++) {
						if(!this.form.spus[i].value) {
							this.$message.error('必须输入所有属性值')
							return
						}
					}
					//先把json数据转成字符串，然后再放到父组件中。这样是为了父组件和后端通信的时候，后端收到的是字符串。
					const spus = []
					for(let i = 0; i < this.form.spus.length; i++) {
						spus.push(JSON.stringify(this.form.spus[i]))
					}
					console.log(spus)
					this.$emit('setForm',{categoryId: this.form.categoryId, spus: spus})
					this.$emit('next')
				}
			})
		},
		query() {

		},
		//选择完种类之后触发的函数。需要根据种类得到具体的SPU和SKU。
		change(categoryId) {
			//每次修改前，先把原先数组置为空。不然每选择一次种类都是append。
			this.form.spus = []
			this.get('/product/getAttr',{categoryIds: categoryId,id:this.idd},response => {
				//这一步是干嘛呢？是把从后端得到的spus数组，赋值给前端的spus数组。
				for(let i = 0; i < response.spus.length; i++) {
					this.form.spus.push({name: response.spus[i].name,value: response.spus[i].value,id: response.spus[i].id})
				}
				console.log('asdwdax')
				console.log(this.form.spus)
				//下面这一步相当于把从后端得到的skus数组，添加三个属性：value、addval和label。前者是一个数组，表示下一步sku中具体选择哪些元素(如黄色、绿色等)，后者表示一个临时值，表示下一步可以添加哪些元素。
				for(let i = 0; i < response.skus.length; i++) {
					response.skus[i].value = []
					response.skus[i].addval = ''
					//response.skus[i].valueid = []
				}
				//这一步是干嘛呢？是把从后端得到的sku数组，放到父组件中。然后父组件再传给具体的sku组件。妙啊~
				this.$emit('setSkus',response.skus)
			})
		}
  }
}
</script>
<style scoped lang="less">
	.el-input {
		width: 40%;
	}
</style>
