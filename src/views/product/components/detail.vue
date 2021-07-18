<template>
	<div>
		<WyEditor v-model="content"></WyEditor>
		<div style="margin-top: 20px;">
			<el-button @click="prev" size="small">上一步</el-button>
			<el-button type="primary" size="small" @click="save">保存</el-button>
		</div>
	</div>
</template>

<script>
export default {
  name: 'DetailForm',
  props: {
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
			content: ''
    }
  },
  methods: {
		prev() {
			this.$emit('prev')
		},
		save() {
			this.$emit('setForm',{detailHtml: this.content})
			this.$emit('save')
		},
		getone(){
			this.get(this.url.getone,{id: this.idd},response => {
				console.log('w132s')
					this.content = response['detailHtml']
					console.log(this.content)
			})
		}
  }
}
</script>
<style scoped lang="less">
</style>
