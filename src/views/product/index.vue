<template>
	<div style="padding: 30px">
		<div class="wy_filter">
			<el-button type="primary" size="small" style="float: right;" @click="add">增加</el-button>
			<div class="clear"></div>
		</div>
		<el-table
			:data="tableData.records"
      max-height="500px"
			>
			<el-table-column label="编号" prop="id" align="center"></el-table-column>
			<el-table-column label="名称" prop="name" align="center"></el-table-column>
			<el-table-column label="价格" prop="price" align="center"></el-table-column>
			<el-table-column label="产品图片" align="center">
				<template slot-scope="scope">
					<el-image
						style="width: 80px; height: 80px"
						:src="img(scope.row.img)"
						fit="contain"></el-image>
				</template>
			</el-table-column>


			<el-table-column width="150px" label="热卖状态" align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.isHot === 1">
					<el-button type="primary" plain @click="hot(scope.row.id,0)" size="mini">取消热卖</el-button>
					</template>
					<template v-else>
						<el-button type="danger" plain @click="hot(scope.row.id,1)" size="mini">置为热卖</el-button>
					</template>
				</template>
			</el-table-column>

			<el-table-column width="150px" label="新品状态" align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.isNew === 1">
					<el-button type="primary" plain @click="neww(scope.row.id,0)" size="mini">取消新品</el-button>
					</template>
					<template v-else>
						<el-button type="danger" plain @click="neww(scope.row.id,1)" size="mini">置为新品</el-button>
					</template>
				</template>
			</el-table-column>

			<el-table-column width="150px" label="上架状态" align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.isOn === 1">
					<el-button type="primary" plain @click="on(scope.row.id,0)" size="mini">下架</el-button>
					</template>
					<template v-else>
						<el-button type="danger" plain @click="on(scope.row.id,1)" size="mini">上架</el-button>
					</template>
				</template>
			</el-table-column>


			<el-table-column width="150px" align="center" label="操作">
				<template slot-scope="scope">
					<template v-if="scope.row.isActive === 1">
					<el-button type="primary" plain @click="update(scope.row.id)" size="mini">修改</el-button>
					<el-button type="danger" plain @click="del(scope.row.id,0)" size="mini">删除</el-button>
					</template>
					<template v-else>
						<el-button type="danger" plain @click="del(scope.row.id,1)" size="mini">恢复到有效</el-button>
					</template>
				</template>
			</el-table-column>
		</el-table>
    <div class="block" style="float: right;position: absolute;right: 30px;bottom: 30px">
		<el-pagination
					background
					:current-page.sync="query.pageNo"
					layout="prev, pager, next"
					:page-count="tableData.pages"
					@current-change="getTableData">
				</el-pagination>
    </div>
		<el-dialog
			width="750px"
			:title="userDialog.title"
			:visible.sync="userDialog.show"
			:close-on-click-modal="false">
			<component
				v-if="userDialog.show"
				:is="userDialog.component"
				:show.sync="userDialog.show"
				:id="userDialog.id"
				:categoryId="query.categoryId"
				@aftersave="aftersave"
				@getTableData="getTableData"></component>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'ProductList',
		data() {
			const module = '/product'
			return {
				tableData: [],
				url:{
					list: module + '/list',
					del: module +'/del',
					neww:module+'/new',
					hot:module+'/hot',
					on:module+'/on'
				},
				query: {
					pageNo: 1,
					pageSize: 8
				},
				userDialog: {
					show: false,
					title: '',
					component: () => import('./add'),
					id: null
				}
			}
		},
		created() {
			this.query.categoryId = parseInt(this.$route.query.categoryId)
			this.getTableData()
		},
		methods: {
			getTableData() {
				this.get(this.url.list,this.query, response => {
					this.tableData = response
				})
			},
			add() {
				this.userDialog.id = null
				this.userDialog.show = true
				this.userDialog.title = '添加商品'
			},
			update(id) {
				this.userDialog.id = id
				this.userDialog.show = true
				this.userDialog.title = '修改spu'
			},
			aftersave(){
				this.userDialog.show = false
				this.getTableData()
			},
			del(id,active) {
				const txt = active === 0 ? '确定真的要删除该数据吗?' : '确定真的要将数据恢复到有效吗?'
				this.$confirm(txt,'提示',{type: 'warning'}).then(()=>{
					this.post(this.url.del,{id: id, isActive: active}, () => {
						this.getTableData()
					})
				})
			},
			search(){
				this.query.pageNo = 1
				this.getTableData()
			},
			users(roleId) {
				this.$router.push({
					path: '/roleusers',
					query: {
						roleId: roleId
					}
				})
			},
			resources(roleId) {
				this.$router.push({
					path: '/roleresource',
					query: {
						roleId: roleId
					}
				})
			},
			neww(id,neww) {
				const txt = neww === 0 ? '确定真的要取消新品吗?' : '确定真的要置该产品为新品吗?'
				this.$confirm(txt,'提示',{type: 'warning'}).then(()=>{
					this.post(this.url.neww,{id: id, isNew: neww}, () => {
						this.getTableData()
					})
				})
			},
			on(id,on) {
				const txt = on === 0 ? '确定真的要下架该产品吗?' : '确定真的要上架该产品吗?'
				this.$confirm(txt,'提示',{type: 'warning'}).then(()=>{
					this.post(this.url.on,{id: id, isOn: on}, () => {
						this.getTableData()
					})
				})
			},
			hot(id,hot) {
				const txt = hot === 0 ? '确定真的要取消热卖该产品吗?' : '确定真的要置该产品状态为热卖吗?'
				this.$confirm(txt,'提示',{type: 'warning'}).then(()=>{
					this.post(this.url.hot,{id: id, isHot: hot}, () => {
						this.getTableData()
					})
				})
			},
		}
	}
</script>

<style>
</style>
