<template>
    <div>
        <el-form
                ref="formName"
                label-position="top"
                label-width="80px"
                :rules="rules"
                :model="formData">

            <el-form-item label="角色名" class="dialog-item inline" prop="name">
                <el-input v-model="formData.name" size="small"></el-input>
            </el-form-item>


            <el-form-item>
                <span style="position: absolute;right: 100px">
                    <el-button size="small" type="primary" @click="resetForm('formName')">取消</el-button>

                </span>
                <span style="position: absolute;right: 0">
                    <el-button size="small" type="primary" @click="submitForm('formName')">提交</el-button>
                </span>
            </el-form-item>

        </el-form>

    </div>
</template>

<script>
    const basePrefix = "ums-role"
    export default {
        name: "RoleEdit",

        data() {
            return {
                submitUrl: basePrefix + "/add",
                operation: -1, // 0 增加 1 修改
                formData: {
                    id: -1,
                    name: "",
                },
                rules: {
                    name: [
                        {required: true, message: '请输入角色名', trigger: 'blur'},
                        {min: 3, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur'}
                    ],

                }
            }
        },
        props: {
            id: {
                type: Number,
                default: null
            }
        },
        created() {
            if (this.id !== null && this.id !== undefined) {
                this.updateEdit()
            } else {
                this.addEdit()
            }
        },
        methods: {
            addEdit() {
                this.submitUrl = basePrefix + "/add"
            },
            updateEdit() {
                this.submitUrl = basePrefix + "/update"
                this.get(basePrefix + "/get_one", {id: this.id}, obj => {

                    this.id = obj.id
                    this.formData = obj;
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.post(this.submitUrl, this.formData, resp => {
                            this.$emit('closeMyDialog', true)
                        })
                        this.$refs[formName].resetFields();

                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.$emit('closeMyDialog', false)
            }
        }
    }
</script>

<style lang="less">
    .inline {
        display: inline-block;
    }


    .el-form-item {
        margin-bottom: 10px;

        .el-form-item__label {
            padding-bottom: 0;
        }
    }

</style>
