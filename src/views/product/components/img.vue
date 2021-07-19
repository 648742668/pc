<template>
	<div>
		<el-form ref="form" :rules="rules" :model="form" label-width="100px">
			<el-form-item label="商品图片" prop="file" >
				<uploadone v-model="form.file" :fileList="filelist "></uploadone>
			</el-form-item>
			<el-form-item label="商品相册" prop="files">
				<uploadmore v-model="form.files" :fileList="filelists "></uploadmore>
			</el-form-item>
			<el-form-item>
				<el-button @click="prev">上一步</el-button>
				<el-button type="primary" size="small" @click="next">下一步</el-button>
			</el-form-item>
		</el-form>

	</div>
</template>

<script>
  import uploadone from '@/components/Upload/uploadone'
  import uploadmore from '@/components/Upload/uploadmore'

  export default {
  name: 'ImgForm',
  components:{
    uploadone,uploadmore
  },
  props: {
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
			getone: module + '/getone'
		},
			form: {
				file: null,
				files: []
			},
			rules: {
				file: [
				],
				files: [
				]
			},
			filelist: [],
			filelists:[]
    }
  },
  created() {
	//如果idd是-1，说明是add操作，不用接收数据。但是需要有表单验证
	if(this.idd===-1){
		this.rules.file.push({required: true, message: '请上传图片', trigger: 'blur'})
		this.rules.files.push({required: true, message: '请上传相册', trigger: 'blur'})
	}else{//如果idd不是-1，说明是修改操作，需要接收数据。
		this.getone()

	}
  },
  methods: {
		next() {
			this.$refs['form'].validate(valid => {
				if(valid) {
					this.$emit('setForm',this.form)
					console.log(this.form)
					this.$emit('next')
				}
			})
		},
		prev() {
			this.$emit('prev')
		},
		getone(){
			this.get(this.url.getone,{id: this.idd},response => {
				this.filelist.push({
					name: response.img,
					url: this.img(response.img)
				})
				const temp = response.pics.split(', ')
				for(var i = 0; i <temp.length; i++){
					this.filelists.push({
						name: temp[i],
						url: this.img(temp[i])
					})
				}
			})
		}
  }
}
</script>
<style scoped lang="less">
</style>
