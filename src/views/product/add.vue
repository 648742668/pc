<template>
	<div style="height: 400px">
    <el-scrollbar style="height: 100%;">
		<el-steps :active="flag" align-center>
			<el-step v-for="item in tabs" :title="item.title" :key="item.title"></el-step>
		</el-steps>
		<div style="margin-top: 30px;">
			<component
				v-for="(item,index) in tabs"
				v-show="index === flag"
				:is="item.component"
				:params="params"
				:skus="skus"
				:stocks="stocks"
				:idd = "idd"
				@prev="prev"
				@setStock="setStock"
				@next="next"
				@setSkus="setSkus"
				@setForm="setForm"
				@save="save"
				:key="item.title"></component>
		</div>
    </el-scrollbar>
	</div>
</template>

<script>
	export default {
		name: 'SpuEdit',
		props: {
			id: {//接收id参数
				type: Number,
				default: null
			}
		},
		created() {

			if(this.id) {//有id，说明是更新。
				this.url.save = '/product/update',
				this.idd = this.id
				this.getone()
				this.getData()
			} else {//无id，说明是新增。
				this.getData()
				this.url.save = '/product/add'
			}
		},
		data() {
			const module = '/product'
			return {
				url: {
					add: module + '/add',
					getone: module + '/getone',
					getData: module + '/getData'
				},
				flag: 0,
				tabs: [
					{ title: '基本资料', component: () => import('./components/base')},
					{ title: '商品图片', component: () => import('./components/img')},
					{ title: '商品属性', component: () => import('./components/spu')},
					{ title: '关联SKU', component: () => import('./components/sku')},
					{ title: 'SKU库存', component: () => import('./components/stock')},
					{ title: '商品详情', component: () => import('./components/detail')}
				],
				params: {},//这里面存储1.分类数据  2.品牌数据  用于在商品添加时选择分类和品牌
				skus: [],//这里面存的是sku的数组。
				stocks: [],
				product:{
					name: '',
					price: '',
					img: null,
					brandId:null,
					keywords:'',
					img:'',
					pics:''

				},//这里存储的是从后端的product读上来的数据。
				form: {

				},
				idd:-1
			}
		},
		methods: {
			//这个方法是从数据库中拿到所有的分类数据和品牌数据
			getData() {
				this.get(this.url.getData,{},response => {
					this.delchildren(response.categorys)
					this.params = response
				})
			},
			//这个方法是，拿到所有的分类数据(List<Category>)之后，用递归的方法，把
			//数据中儿子结点的children删掉，避免展示的时候最后有一个空列。
			delchildren(items) {
				for(let i = 0; i < items.length; i++) {
					if(items[i].children.length == 0) {
						delete items[i].children
					} else {
						this.delchildren(items[i].children)
					}
				}
			},
			//最终的提交按钮触发的函数
			save() {
				//手动添加id
				//this.form.id = this.idd
				console.log(this.stocks,'stockssssss')
				this.post(this.url.save,this.form,(response) => {
					console.log(this.url.save)
					this.$emit('aftersave')
				})
			},
			next() {
				this.flag ++
			},
			prev() {
				this.flag --
			},
			query() {
				console.log(this.wydata)
			},
			//spu子组件调用这个方法，将skus放到父组件中。
			setSkus(value) {
				this.skus = value
			},
			setStock(value) {
				this.stocks = value
			},
			setForm(item) {
				for(let key in item) {
					this.form[key] = item[key]
				}
			},
			//这个函数是从数据库读取到一个特定的product信息。
			getone(){
				this.get(this.url.getone,{id: this.id},response => {
					for(let key in this.product) {
						this.product[key] = response[key]
					}
					this.product.id = response.id

					// this.filelist.push({
					// 	name: response.logo,
					// 	url: this.img(response.logo)
					// })
				})
			}
		}
	}
</script>

<style>
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>
