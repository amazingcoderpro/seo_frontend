
<template>
    <div class="store_add">
         <el-dialog  :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal='false' :close-on-press-escape='false' :modal-append-to-body="false"  >
          <el-form :model="objForm" :rules="rules" ref="objForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="店铺名称" prop="name">
                <el-input v-model="objForm.name"></el-input>
              </el-form-item>
              <el-form-item label="店铺域名" prop="url">
                <el-input v-model="objForm.url"></el-input>
              </el-form-item>
              <el-form-item label="Email" prop="email">
                <el-input v-model="objForm.email"></el-input>
              </el-form-item>
              <el-form-item>
              <el-button type="primary" @click="submitForm('objForm')">立即创建</el-button>
              <el-button @click="resetForm('objForm')">Reset</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: "store_add",
    props: {
      dialog: Object,
      form: Object
    },
    data() {
      return {
        objForm:{
          name:'zjytest',
          url:'www.baidu.com',
          email:'mark.zhang@orderplus.com',
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          url: [{
              required: true, message: '域名不能为空', trigger: 'blur'
            }
          ],
          email:[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
                this.$axios.post(`/api/v1/store/`,this.objForm)
                .then(res => {
                    if(res.data.code == 1){
                      this.dialog.show = false;
                      this.$message({
                        message: res.data.msg,
                        type: 'success'
                      });
                      this.$parent.init();
                    }else{
                      this.dialog.show = false; 
                      this.$message(res.data.msg);
                    }
                })
                .catch(error => {
                  this.$message("接口超时!");
                });
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style>


</style>
