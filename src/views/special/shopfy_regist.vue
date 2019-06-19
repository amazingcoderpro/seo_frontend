<template>
  <div class="shopfy_regist">
    <section class="form_container">
      <span class="title">PinBooster</span>
      <el-form
        :model="registUser"
        :rules="rules"
        ref="loginForm"
        label-width="160px"
        class="loginForm"
      >
        <!-- 账号 -->
        <el-form-item label="Shop Url :" prop="username">
          <el-input v-model="registUser.username" disabled></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="Email :" prop="emailstr">
          <el-input v-model="registUser.emailstr" disabled></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="Password :" prop="password">
          <el-input type="password" v-model="registUser.password"></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item label="Comfirm Password :" prop="password2">
          <el-input type="password" v-model="registUser.password2"></el-input>
        </el-form-item>
      </el-form>
      <div class="text">
        <div class="button">
          <el-button type="primary" @click="submitForm('loginForm')" :disabled="isDisable">Regist</el-button>
        </div>
        <div class="clause">
          <p>
            By signing up,you agree to our
            <a href="/privacy">Privacy Policy</a>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import * as base from "../../assets/js/base";
import router from "../../router";
import Menufilter from "../../components/menufilter.js";
export default {
  name: "shopfy_regist",
  components: {},
  // 判断两次输入密码
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registUser.password) {
        callback(new Error("Inconsistent password input!"));
      } else {
        callback();
      }
    };
    return {
      isDisable: false,  //表单重复提交
      registUser: {
        password: "",
        username: "", //商铺名
        emailstr: "",
        id: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "Account cannot be empty",
            trigger: "change"
          }
        ],
        emailstr: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "change"
          }
        ],
        password: [
          {
            required: true,
            message: "Password cannot be empty",
            trigger: "blur"
          },
          {
            min: 6,
            max: 30,
            message: "Length of 6 to 30 characters",
            trigger: "blur"
          }
        ],
        password2: [
          {
            required: true,
            message: "Confirmation password cannot be empty",
            trigger: "blur"
          },
          {
            min: 6,
            max: 30,
            message: "Length of 6 to 30 characters",
            trigger: "blur"
          },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.registUser.username = base.getQueryString("shop");
      this.registUser.emailstr = base.getQueryString("email");
      this.registUser.id = base.getQueryString("id");
      //  this.showEmail();
    },
    submitForm(formName) {
      this.isDisable = true // 可以点击
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.put(`/api/v1/account/set_password/${this.registUser.id}/`,this.registUser)
            .then(res => {
              this.isDisable = false;   //执行请求后就不能点击了
              if (res.data.code == 1) {
                // router.push("/login");
                this.showEmail();
              } else {
                this.$message("Interface timeout!");
              }
            })
            .catch(error => {
              this.$message("Interface timeout!");
            });
         }
      });
    },
    showEmail(){
      if (this.registUser.emailstr){
        let title = "registered successfully,"
            title += "Please go to "+ this.registUser.emailstr +" activate your account!"
            this.$alert(title, 'Tips', {
            confirmButtonText: 'Confirm',
            callback: action => {
            let address = this.registUser.emailstr.split()[1];
              window.open(address, "_blank"); 
              router.push("/login");
            }
          });
      }else{
              this.$message("Data deficiencies!");
      }
    }
  }
};
</script>

<style scoped>
.shopfy_regist{position:relative;width:100%;height:100%;background:url(../../assets/img/bg.jpg) no-repeat center center;background-size:100% 100%;}
.shopfy_regist .form_container{width:470px;height:400px;position:absolute;left:50%;top:50%;border-radius:5px;margin-left:-220px;margin-top:-300px;text-align:center;}
.shopfy_regist .loginForm{background-color:#fff;padding:20px 40px 20px 20px;border-radius:5px;box-shadow:0px 5px 10px #cccc;margin-top:20px;}
.shopfy_regist .text{width:470px;height:172px;border-radius:5px;background:#f9f9f9;}
.shopfy_regist .text .text_hint{text-align:center;color:#277fc2;font-size:13px;padding-top:25px;}
.shopfy_regist .button{text-align:center;padding-top:22px;}
.shopfy_regist .el-button{padding:15px 55px;font-size:16px;background:#409eff;}
.shopfy_regist .clause p{text-align:center;padding-top:22px;font-size:13px;color:#65635d;}
.shopfy_regist .clause p a{color:#0f8fcf;}
.shopfy_regist .form_container .title{font-family:"Microsoft YaHei";font-size:25px;}
</style>
