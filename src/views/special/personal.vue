<template>
    <div class="personal">
        <section class="form_container">
                  <div class="tableTitle"><span>Profile Settings</span></div>
                  <el-form :model="personalUser" :rules="rules" ref="personalForm" label-width="110px">
                    <!-- 名 -->
                    <el-form-item label="FirstName" prop="first_name">
                      <el-input v-model="personalUser.first_name" placeholder="Daisy"></el-input>
                    </el-form-item>
                    <!-- 姓 -->
                    <el-form-item label="LastName" prop="last_name">
                      <el-input v-model="personalUser.last_name" placeholder="zhang"></el-input>
                    </el-form-item>
                    <!-- 邮箱 -->
                    <el-form-item label="EmailAddress" prop="email">
                      <el-input v-model="personalUser.email" disabled placeholder="请输入email"></el-input>
                    </el-form-item>
                    <!-- 点击 -->
                    <el-form-item>
                      <el-button type="primary" class="submit_btn" @click="submitForm('personalForm')" >Update</el-button>
                    </el-form-item>
                  </el-form>
        </section>
    </div>
</template>

<script>
import * as base from '../../assets/js/base'
import router from '../../router'
export default {
    name: "personal",
    components:{},
    created(){  
          this.init();
      },
    data(){    
      return {
        personalUser:{
          first_name:"",
          last_name:"",
          email:"",
          password:"",
          personalID:"",
        },
        rules: {
          first_name: [
            { required: true, message: "用户名不能为空", trigger: "change" },
            { min: 1, max: 30, message: "长度在 1 到 30 个字符", trigger: "blur",left:"100px"}  
        ],
          last_name: [
            { required: true, message: "用户名不能为空", trigger: "change" },
            { min: 1, max: 30, message: "长度在 1 到 30 个字符", trigger: "blur" }  
        ],
          email: [
            { required: true, message: "邮箱格式不正确", trigger: "change",type:"email"},
        ],
        }        
      }
    },
     
      methods: {
        init() {
          this.personalUser.personalID = JSON.parse(window.localStorage.getItem('user')).id;
          this.$axios(`/api/v1/account/users/${this.personalUser.personalID}/`).then(res => {
              if(res.data.code == 1){
                  this.personalUser.first_name = res.data.data.first_name;
                  this.personalUser.last_name = res.data.data.last_name;
                  this.personalUser.email = res.data.data.email;
              }else{
                  this.$message({
                    message: "code 异常!",
                    type: 'warning',
                    center: true
                  });
              }                                                   
          })
        },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$axios
              .put(`/api/v1/account/users/${this.personalUser.personalID}/`, this.personalUser)
              .then(res => {
                if (res.data.code == 1) {
                  this.$message({message: res.data.msg,type: 'success'});
                } else {
                  this.$message("修改成功!");
                }
              })
            
            }
        });
      }
  }
};
</script>

<style scoped>
.personal{
    width: 100%;
    height: 100%;
}
.personal .form_container {
    width: 100%;
    height: 100%;
    padding-left: 10px;
}
.personal .el-input{
    width: 500px;
}
.personal .tableTitle{
    margin-bottom:50px;
}
.personal .submit_btn{
    background: #0f8fcf;
    color: #fff;
    padding: 15px 55px;
    font-size: 16px;
    margin-top: 10px;
    margin-left: -100px;
}
.personal .newpass{
    padding-left: 17px;
    color: #0f8fcf;
}
</style>
