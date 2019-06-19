
<template>
    <div class="account_add">
         <el-dialog  :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal='false' :close-on-press-escape='false' :modal-append-to-body="false"  >
          <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
              <el-form-item label="Account" prop="account">
                <el-input v-model="form.account"></el-input>
              </el-form-item>
              <el-form-item label="User Name" prop="nickname">
                <el-input v-model="form.nickname" placeholder="Optional Filling"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('form')">Go Authorize</el-button>
                <el-button @click="resetForm('form')">Reset</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: "account_add",
    props: {
      dialog: Object,
      form: Object
    },
    data() {
      return {
        rules: {
          // account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
          account:[
            { required: true, message: 'Please enter your account', trigger: 'blur' },
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
                this.form.email = this.form.account
                this.form.nickname = this.form.nickname
                this.$axios.post(`/api/v1/pinterest_account/`,this.form)
                .then(res => {
                    if(res.data.code == 1){
                      this.dialog.show = false;
                      this.$parent.confirmFunTwo(res.data.data.url);
                    }else{
                      this.dialog.show = false; 
                      this.$message("Failure to add!");
                    }
                })
                .catch(error => {
                  this.$message("Interface timeout!");
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
.account_add .el-form-item__label{width:115px!important;}
.account_add .el-form-item__content{margin-left:115px!important;}
.account_add .el-input{width: 300px;}
</style> 
