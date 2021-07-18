<template>
	<div>
		<el-form label-width="100px">
			<el-form-item  v-for="item in skus" :key="item.id" :label="item.name">
				<template v-if="item.addType ===1">
					<el-input v-model="item.addval" style="width: auto;margin-right: 20px;"></el-input> <el-button @click="addItem(item)">添加</el-button>
				</template>
				<el-checkbox-group v-model="item.value">
					<!--label表示这个checkbox展示的值是啥。key表示，选中这个checkbox之后，把什么东西添加到value数组中-->
					<el-checkbox v-for="opt in item.skuItems" :key="opt.id" :label="opt.value" :value="opt.id"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item>
				<el-button @click="prev">上一步</el-button>
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
		prev() {
			this.$emit('prev')
		},
		//点击“下一步”触发的函数
		next() {
			//首先判断是否有sku的值被选择。如果任何一个sku属性，都没有一个值被选择，那么不允许下一步。
			for(let i = 0; i < this.skus.length; i++) {
				if(this.skus[i].value.length === 0) {
					this.$message.error(this.skus[i].name + '必须选择值')
					return
				}
			}
			//然后根据选中的label，将具体的value数组计算得到。
			//遍历skus数组。
			// for(let i = 0;i<this.skus.length;i++){
			// 	//遍历每个sku下的value，添加对应的label
			// 	for(let j = 0;j<this.skus[i].value.length;j++){
			// 		//遍历每个sku下的skuItems数组，如果有value和上面的相等，就把label添加。
			// 		for(let k = 0;k<this.skus[i].skuItems.length;k++){
			// 			console.log(this.skus[i].value[j])
			// 			console.log()
			// 			if(this.skus[i].value[j]===this.skus[i].skuItems[k].value){
			// 				var temp = {"label":this.skus[i].skuItems[k].id}
			// 				this.skus[i].label.push(temp)
			// 				}
			// 		}
			// 	}
			// }
			//然后根据选择的值，计算笛卡尔积。
			let arrayall = []
			
			//如果skus只有一个元素。比如说只有尺码或者只有颜色，那么不需要计算笛卡尔积。
			
			//这个循环是找一个sku元素下的value数组。比如sku是颜色，value是[黄色、绿色、蓝色]
			for(let i = 0; i < this.skus[0].value.length; i++) {
				const arr = []
				//这个是把id加入，和value对应。
				for(let k = 0;k<this.skus[0].skuItems.length;k++){
					if(this.skus[0].value[i]===this.skus[0].skuItems[k].value){   
						arr.push({name: this.skus[0].name,value: this.skus[0].value[i],id: this.skus[0].skuItems[k].id})
						arrayall.push(arr)
						console.log(arr)
					}
				}
			}
			 //这时候的arrayall是[[{name:颜色 value:黄色}] ,[{name:颜色 value:绿色}]，[{name:颜色 value:蓝色}]]一个二维数组
			//如果skys有多个元素。比如说有尺码和颜色
			if(this.skus.length > 1) {
				const array = arrayall   //array：[[{name:颜色 value:黄色}] ,[{name:颜色 value:绿色}]，[{name:颜色 value:蓝色}]]
				arrayall = []
				//第一个for，遍历第一个sku下的value数组大小。比如value是[黄色、绿色、蓝色]，就遍历3次。
				for(let i = 0; i < array.length; i++) {
					//第二个for，遍历第二个sku下的value数组大小。比如value是[S,M,L,XL,XXL]
					for(let j = 0; j < this.skus[1].value.length; j++) {
						const arr = []
						for(let k = 0; k < array[i].length; k++) {
							arr.push(array[i][k])
						}
						//这个是把id加入，和value对应。
						for(let k = 0;k<this.skus[1].skuItems.length;k++){
							if(this.skus[1].value[j]===this.skus[1].skuItems[k].value){   
						arr.push({name: this.skus[1].name, value: this.skus[1].value[j], id: this.skus[1].skuItems[k].id})
					}
					}
					arrayall.push({skuList: arr, stock: 0, price: 0})
					}
				}
			}
			//先把笛卡尔积之后的数组传递给父组件
			this.$emit('setStock',arrayall)
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
		},
		addItem(item){
			//动态添加值。把新的属性值添加到item.inputList中。由于item的是属于skus的，skus又会通过$把自身传给父控件。
			//addval双向绑定输入框，首先把输入框的内容放到inputList中。
			item.inputList += '\n' + item.addval
			//然后把addval置为‘’，即清空输入框。
			item.addval = ''
		}
  }
}
</script>
<style scoped lang="less">
</style>
