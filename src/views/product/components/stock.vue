<template>
	<div >
		<el-table
			:data="stocks">
			<el-table-column label="库存数">
				<template slot-scope="scope">
					<el-input v-model="scope.row.stock" size="small"></el-input>
				</template>
			</el-table-column>
			<el-table-column label="单价">
				<template slot-scope="scope">
					<el-input v-model="scope.row.price" size="small"></el-input>
				</template>
			</el-table-column>
			<el-table-column v-for="item in skus" :key="item.id" :label="item.name">
				<template slot-scope="scope">
					<template v-for="(entry,index) in scope.row.skuList">
						<span :key="index" v-if="entry.name === item.name">{{entry.value}}</span>
					</template>
				</template>
			</el-table-column>
		</el-table>
		<div style="margin-top: 20px;">
			<el-button @click="prev"  size="small">上一步</el-button>
			<el-button type="primary" size="small" @click="next">下一步</el-button>
		</div>
    </el-scrollbar>
	</div>
</template>

<script>
export default {
  name: 'Stock',
	props: {
		stocks: {
			type: Array,
			default: () => {return []}
		},
		skus: {
			type: Array,
			default: () => {return []}
		}
	},

  data() {
    return {
    }
  },
  methods: {
		prev() {
			this.$emit('prev')
		},
		next() {
			const pattern1 = /^[0-9]*$/
			const pattern2 = /^[0-9]+(\.[0-9]{1,2})?$/
			for(let i = 0; i < this.stocks.length; i++) {
				if(!pattern1.test(this.stocks[i].stock)) {
					this.$message.error('库存数必须是整数')
					return
				}
				if(!pattern2.test(this.stocks[i].price) || this.stocks[i].price === 0) {
					this.$message.error('价格必须是整数或两位小数,并且不能是0')
					return
				}
			}
			const stocks = []
			console.log(this.stocks,'stocks')
			for(let i = 0; i < this.stocks.length; i++) {
				stocks.push(JSON.stringify(this.stocks[i]))
			}
			this.$emit('setForm',{stocks: stocks})
			this.$emit('next')
		}
  }
}
</script>
<style scoped lang="less">
</style>
