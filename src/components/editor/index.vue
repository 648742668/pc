<template>
	<VueEditor useCustomImageHandler @image-added="handleImageAdded" v-model="content"></VueEditor>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  name: 'WyEditor',
	props: {
		value: {
			type: String,
			default: ''
		}
	},
	created() {
		this.content = this.value
	},
	components: {
		VueEditor 
	},
	watch: {
		content: {
			handler(newval) {
				this.$emit('input',newval)
			}
		}
	},
  data() {
    return {
			content: ''
    }
  },
  methods: {
	  //自定义图片上传的方法
		handleImageAdded(file, Editor, cursorLocation, resetUploader) {
			const formData = new FormData()
			formData.append('file',file)
			//由于img/upload的返回值是string，所以不能用封装的post。
			this.axios.request('/product/upload',{
				method: 'post',
				data: formData
			}).then(response => {
				//把图片上传之后，要在相应的位置创建一个image标签，url值就是路径
				Editor.insertEmbed(cursorLocation, "image", this.img(response.data));
				//将数据写回富文本编辑器
				resetUploader()
			})
		}
  }
}
</script>
<style scoped lang="less">
</style>
