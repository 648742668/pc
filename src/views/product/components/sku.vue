<template>
	<div>
		<el-form label-width="100px">
			<el-form-item  v-for="item in skus" :key="item.id" :label="item.name" size="small">
				<template v-if="item.addType ===1">
					<el-input v-model="item.addval" style="width: auto;margin-right: 20px;" size="small"></el-input> <el-button size="small" @click="addItem(item)">添加</el-button>
				</template>
				<el-checkbox-group v-model="item.value">
					<!--label表示这个checkbox展示的值是啥。key表示，选中这个checkbox之后，把什么东西添加到value数组中-->
					<el-checkbox v-for="opt in item.skuItems" :key="opt.id" :label="opt.value" :value="opt.id"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item>
				<el-button @click="prev" size="small">上一步</el-button>
				<el-button type="primary" size="small" @click="next">下一步</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
  name: 'SkuForm',
  //props是接收生成这个组件时接受的数据
	props: {
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
	   addItem(Item) {
	                  let curr = Item;
	                  if (curr.addval.trim().length > 0) {
	                      let item = {value: curr.addval, skuId: curr.id}
	                      this.post("sku-items/add", item, obj => {
	                          item.id = obj
	                          curr.skuItems.push(item)
	                          curr.addval = ""
	                      })
	                  } else {
	                      this.$message({
	                          message: '请输入新增的内容',
	                          type: 'warning'
	                      });
	                  }
					  },
		prev() {
			this.$emit('prev')
		},
		//点击“下一步”触发的函数
		dfs(deep, data) {
			console.log(this.skus,'skus')
                if (deep === this.skus.length) {
                    if (data.length > 0){
                        let temp = []
                        for (let i = 0; i < data.length; i++) {
                            temp.push(data[i])
                        }
                        this.matrix.push({skuList: temp,stock:0,price:0})
                    }
                } else {
                    if (this.skus[deep].value.length > 0) {
                        for (let i = 0; i < this.skus[deep].value.length; i++) {
                            let skuItemId;
                            for (let j = 0; j < this.skus[deep].skuItems.length; j++) {
                                if (this.skus[deep].skuItems[j].value === this.skus[deep].value[i]){
                                    skuItemId = this.skus[deep].skuItems[j].id
                                }
                            }
                            let temp = {skuItemId:skuItemId,name: this.skus[deep].name, value: this.skus[deep].value[i]}
                            data.push(temp)
                            this.dfs(deep + 1, data)
                            data.splice(data.length - 1, 1)
                        }
                    } else {
                        this.dfs(deep + 1, data)
                    }
                }

			},
		next() {
			//首先判断是否有sku的值被选择。如果任何一个sku属性，都没有一个值被选择，那么不允许下一步。
			for(let i = 0; i < this.skus.length; i++) {
				if(this.skus[i].value.length === 0) {
					this.$message.error(this.skus[i].name + '必须选择值')
					return
				}
			}
			 this.matrix = []
			 this.dfs(0, [])

			this.$emit('setStock',this.matrix)
			const skus = []
			//然后把
			for(let i = 0; i < this.skus.length; i++) {
				skus.push(JSON.stringify(this.skus[i]))
			}
			this.$emit('setForm',{skus: skus})
			this.$emit('next')
			console.log(this.skus)
		},
		query() {
			console.log(this.skus)
		}
		// addItem(item){
		// 	//动态添加值。把新的属性值添加到item.inputList中。由于item的是属于skus的，skus又会通过$把自身传给父控件。
		// 	//addval双向绑定输入框，首先把输入框的内容放到inputList中。
		// 	item.inputList += '\n' + item.addval
		// 	//然后把addval置为‘’，即清空输入框。
		// 	item.addval = ''
		// }
  }
}
</script>
<style scoped lang="less">
</style>
