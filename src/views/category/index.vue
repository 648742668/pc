<template>
	<div style="padding: 30px">
		<div class="wy_filter" style="margin-bottom: 30px">
			<el-button type="primary" size="small"  style="float: right;" @click="add(0,1)">
        增加
      </el-button>
		</div>
		<el-table
      max-height="500px"
			:data="tableData"
			row-key="id"
			>
			<el-table-column label="编号" prop="id" align="center"></el-table-column>
			<el-table-column label="分类名称" prop="name" align="center"></el-table-column>
      <el-table-column label="分类图片" align="center">
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.image"
            style="width: 80px; height: 80px"
            :src="img(scope.row.image)"
            fit="contain"></el-image>
        </template>
      </el-table-column>
			<el-table-column label="层级" prop="level" align="center"></el-table-column>
			<el-table-column label="是否有效" align="center">
				<template slot-scope="scope">
					<span v-if="scope.row.isActive === 1">有效</span>
					<span v-else>失效</span>
				</template>
			</el-table-column>
			<el-table-column label="类别属性" width="200px" align="center">
							<template slot-scope="scope">
								<template v-if="scope.row.isActive === 1">
									<el-button type="primary" plain @click="gospu(scope.row.id)" size="mini">spu列表</el-button>
									<el-button type="primary" plain @click="gosku(scope.row.id)" size="mini">sku列表</el-button>
								</template>
							</template>
						</el-table-column>
			<el-table-column width="235px" align="center" prop="操作">
				<template slot-scope="scope">
					<template v-if="scope.row.isActive === 1">
						<el-button type="primary" v-if="scope.row.level < 3" plain @click="add(scope.row.id, scope.row.level + 1)" size="mini">添加下级</el-button>
						<el-button type="primary" plain @click="update(scope.row.id)" size="mini">修改</el-button>
						<el-button type="danger" plain @click="del(scope.row.id,0)" size="mini">删除</el-button>
					</template>
					<template v-else>
						<el-button type="danger" plain @click="del(scope.row.id,1)" size="mini">恢复到有效</el-button>
					</template>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog
			width="450px"
			:title="dialog.title"
			:visible.sync="dialog.show"
			:close-on-click-modal="false">
			<component
				v-if="dialog.show"
				:is="dialog.component"
				:show.sync="dialog.show"
				:id="dialog.id"
				:parentId="dialog.parentId"
				:level="dialog.level"
				@getTableData="getTableData"></component>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'CategoryList',
		data() {
			const module = '/ums-category'
			return {
				tableData: [],
				url:{
					list: module + '/list',
					del: module + '/del'
				},
				dialog: {
					show: false,
					title: '',
					component: () => import('./edit'),
					id: null,
					parentId: null,
					level: null
				}
			}
		},
		created() {
			this.getTableData()
		},
		methods: {
			getTableData() {
				this.get(this.url.list,this.query, response => {
					this.tableData = response
				})
			},
			add(parentId,level) {
				this.dialog.parentId = parentId
				this.dialog.level = level
				this.dialog.id = null
				this.dialog.title = '添加分类'
				this.dialog.show = true
			},
			update(id) {
				console.log("test")
				this.dialog.parentId = null
				this.dialog.level = null
				this.dialog.id = id
				this.dialog.title = '修改分类'
				this.dialog.show = true
			},
			del(id,active) {
				const txt = active === 0 ? '确定真的要删除该数据吗?' : '确定真的要将数据恢复到有效吗?'
				this.$confirm(txt,'提示',{type: 'warning'}).then(()=>{
					this.post(this.url.del,{id: id, isActive: active}, () => {
						this.getTableData()
					})
				})
			},
			gospu(categoryId) {
							this.$router.push({
								path: '/product/spu',
								query: {
									categoryId: categoryId
								}
							})
						},
			gosku(categoryId) {
				this.$router.push({
					path: '/product/sku',
					query: {
						categoryId: categoryId
					}
				})
			}
		}
	}
</script>

<style>
</style>
