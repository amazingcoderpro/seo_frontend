<template>
  <div class="store_personal">
    <div class="personal">
      <section class="form_container">
        <ul id="breadcrumb">
          <li>
            <a href="/dashboard">
              <span class="el-icon-house"></span> Home
            </a>
          </li>
          <li>
            <a>
              <span class="el-icon-right"></span> Personal Center
            </a>
          </li>
        </ul>
        <el-form :model="personalUser" :rules="rules" ref="personalForm" label-width="130px">
          <!-- 名 -->
          <el-form-item label="First Name" prop="first_name">
            <el-input v-model="personalUser.first_name" placeholder="Please enter your name. "></el-input>
          </el-form-item>
          <!-- 姓 -->
          <el-form-item label="Last Name" prop="last_name">
            <el-input v-model="personalUser.last_name" placeholder="Please enter your last name."></el-input>
          </el-form-item>
          <!-- 邮箱 -->
          <el-form-item label="Email Address" prop="email">
            <el-input v-model="personalUser.email" disabled></el-input>
          </el-form-item>
          <!-- 点击 -->
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('personalForm')">Update</el-button>
          </el-form-item>
        </el-form>
      </section>
    </div>
    <div class="storeSetting">
      <section class="form_container">
        <el-form :model="storeUser" label-width="180px" class="personalForm">
          <!-- Store Name -->
          <div class="storename">
            <span>Store Name</span>
            <el-input v-model="storeUser.name"  disabled class="input_name"></el-input>
          </div>
          <!-- Store URL -->
          <div class="storeurl">
            <span>Store URL</span>
            <el-input v-model="storeUser.url" disabled></el-input>
          </div>
          <!-- Link Parameter -->
          <div class="storeurl url_format_box">
            <span :class="'url_format_son'">{{storeUser.url_format}}</span>
            <span>Link Parameter</span>
            <el-input v-model="storeUser.url_format" disabled></el-input>
          </div>
          <!-- Store Timezone -->
          <div class="storeurl">
            <span>Store Timezone</span>
            <el-input v-model="storeUser.timezone" disabled></el-input>
          </div>
          <!-- store_view_id -->
          <div class="storeurl">
            <div>
              <span>Google Analytics View ID</span>
            </div>
            <el-input v-model="storeUser.store_view_id" placeholder="" class="btn_input"></el-input>
            <el-button
              type="primary"
              size="small"
              @click="showStatement()"
              class="btn_stat"
            >Statement</el-button>
          </div>
          <!-- 点击 -->
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitwo()">Save Changes</el-button>
          </el-form-item>
        </el-form>
        <div class="primary_time">
          <span>UTC/GMT+08:00</span>
        </div>
        <!-- 展示请求权限的弹窗 -->
        <DialogFound :dialog="dialog" ref="dailog"></DialogFound>
      </section>
    </div>
  </div>
</template>

<script>
import * as base from "../../assets/js/base";
import router from "../../router";
import DialogFound from "./statement";
export default {
  name: "storeSetting",
  name: "personal",
  components: {
    DialogFound
  },
  created() {
    this.init();
  },
  data() {
    return {
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      storeUser: {
        url: "",
        id: "",
        name: "",
        timezone: "",
        url_format: "",
        // storeID: "",
        store_view_id: ""
      },
      personalUser: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        personalID: ""
      },
      rules: {
        first_name: [
            { required: true,message: "The user name cannot be empty",trigger: "change"},
            { min: 1, max: 30, message: "Length of 1 To 30 characters",trigger: "blur",left: "100px"}
          ],
        last_name: [
            { required: true,message: "The user name cannot be empty",trigger: "change"},
            { min: 1, max: 30, message: "Length of 1 To 30 characters",trigger: "blur",left: "100px"}
        ],
        email: [
          {
            required: true,
            message: "The mailbox format is incorrect",
            trigger: "change",
            type: "email"
          }
        ]
      }
    };
  },
  methods: {
    init() {
      this.$axios(`/api/v1/store/`).then(res => {
        if (res.data.code == 1) {
          this.storeUser.id = res.data.data[0].id;
          this.storeUser.name = res.data.data[0].name;
          this.storeUser.url = res.data.data[0].url;
          this.storeUser.timezone = res.data.data[0].timezone;
          this.storeUser.url_format = res.data.data[0].url_format;
          this.storeUser.store_view_id = res.data.data[0].store_view_id;
        } else {
          this.$message({
            message: "code Abnormal!",
            type: "warning",
            center: true
          });
        }
      });
      this.personalUser.personalID = JSON.parse(window.localStorage.getItem("user")).id;
      this.$axios(
        `/api/v1/account/users/${this.personalUser.personalID}/`
      ).then(res => {
        if (res.data.code == 1) {
          this.personalUser.first_name = res.data.data.first_name;
          this.personalUser.last_name = res.data.data.last_name;
          this.personalUser.email = res.data.data.email;
        } else {
          this.$message({
            message: "code Abnormal!",
            type: "warning",
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
                  this.$message("Successful revision!");
                }
              })
            }
        });
      },
    submitwo() {
      this.$axios
        .put(`/api/v1/store/${this.storeUser.id}/`, this.storeUser)
        .then(res => {
          if (res.data.code == 1) {
            this.$message({
              message: "Successful revision!",
              type: "success"
            });
          } else {
            this.$message("Interface timeout!");
          }
        })
        .catch(error => {
          this.$message("Interface timeout!");
        });
    },
    showStatement() {
      this.dialog = {
        show: true,
        title: "",
        option: "post"
      };
    }
  }
};
</script>

<style scope>
.store_personal{width:100%;height:100%;}
.store_personal .storeSetting{padding-left: 20px;}
.storeSetting .el-input{width:400px;display:block;margin-top:10px;}
.storeSetting .el-select{display:block;width:400px;}
.storeSetting .submit_btn{background:#0f8fcf;color:#fff;padding:15px 55px;font-size:16px;margin-left:-180px;margin-top:30px;}
.storeSetting .newpass{padding-left:17px;color:#0f8fcf;}
.storeSetting .storename{margin-top:30px;}
.storeSetting .storeurl{margin-top:15px;}
.personal{margin-bottom:50px;}
.personal .el-input{width:500px;}
.personal .tableTitle{margin-bottom:50px;}
.personal .submit_btn{background:#0f8fcf;color:#fff;padding:15px 55px;font-size:16px;margin-top:10px;margin-left:-100px;}
.personal .newpass{padding-left:17px;color:#0f8fcf;}
.storeurl .btn_input{display:inline-block;}
.storeurl .btn_stat{margin-left:20px; background: #0f8fcf;}
.storeSetting .url_format_box{position:relative;}
.storeSetting .url_format_son{display:none;position:absolute;left:170px;font-size:14px;color:black;top:8px;}
.storeSetting .url_format_box:hover .url_format_son{display:block;}
.primary_time {margin-bottom: 20px; text-align: center;}
.primary_time span {color: gray; font-size: 18px;}

</style>
