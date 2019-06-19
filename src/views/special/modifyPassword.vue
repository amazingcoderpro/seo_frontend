<template>
    <div class="modifyPassword">
         <el-dialog 
            :title="dialog.title" 
            :visible.sync="dialog.show"
            :close-on-click-modal='false'
            :close-on-press-escape='false'
            :modal-append-to-body="false"
            width="500px">
            <div class="form">
                <el-form 
                    ref="form" 
                    :model="form"
                    :rules="form_rules"
                    label-width="150px" >

                    <el-form-item label="password:" prop="password">
                      <el-input type="password" v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item label="Confirm password:" prop="password2">
                      <el-input type="password" v-model="form.password2"></el-input>
                    </el-form-item>
                    <el-form-item  class="text_right">
                        <el-button @click="dialog.show = false">Cancel</el-button>
                        <el-button type="primary" @click='submitForm("form")'>Submit</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
  
</template>

<script>
import * as base from '../../assets/js/base'
export default {
  name: "modifyPassword",
  props: {
    dialog: Object
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error("Inconsistent passwords!"));
      } else {
        callback();
      }
    };
    return {
      form:{
        password:'',
        password2:'',
        userID:'',
      },
      form_rules: {
        password: [
          { required: true, message: "Password cannot be empty", trigger: "blur" },
          { min: 6, max: 30, message: "Length of 6 to 30 characters", trigger: "blur" }
        ],
        password2: [
          { required: true, message: "Confirmation password cannot be empty", trigger: "blur" },
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
  methods: {
    submitForm(formName) {
      this.form.userID = JSON.parse(window.localStorage.getItem('user')).id;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .put(`/api/v1/account/set_passwords/${this.form.userID}/`, this.form)
            .then(res => {
              if (res.data.code == 1) {
                this.$message({message:res.data.msg,type: "success"});
                this.dialog.show = false;
                base.LoginOut();
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
    logout() {
      // 清除token
      this.$store.dispatch("clearCurrentState");
      base.LoginOut();
    }
  }
};
</script>
<style>
.modifyPassword .el-dialog__header{ text-align: center;padding: 40px 20px 10px;}
</style>
