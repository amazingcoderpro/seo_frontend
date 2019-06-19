<template>
    <div class="logFund">
         <el-dialog 
            :title="dialogEdit.title" 
            :visible.sync="dialogEdit.show"
            :close-on-click-modal='false'
            :close-on-press-escape='false'
            :modal-append-to-body="false">
            <div class="form">
                <el-form 
                    ref="form" 
                    :model="form"
                    :rules="form_rules"
                    label-width="120px" 
                    style="margin:10px;width:auto;">
                    <!-- 用户名 -->
                    <el-form-item label="用户名" prop="nickname">
                      <el-input v-model="form.nickname" placeholder="Leslie"></el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <!-- <el-form-item label="密码" prop="password">
                      <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="password2">
                      <el-input type="password" v-model="form.password2" placeholder="请确认密码"></el-input>
                    </el-form-item> -->
                    <!-- 邮箱 -->
                    <el-form-item label="邮箱" prop="email">
                      <el-input v-model="form.email" placeholder="请输入email"></el-input>
                    </el-form-item>
                    <!-- 角色 -->
                    <el-form-item label="角色" prop="role">
                      <el-select v-model="form.role"  placeholder="请选择" class="role_name">
                        <el-option
                          v-for="item in userArray"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                          >
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <!-- 角色管理 -->
                    <el-form-item label="账户" prop="username">
                      <el-input v-model="form.username" placeholder="admin999"></el-input>
                    </el-form-item>
                    <!-- 取消，提交 -->
                    <el-form-item  class="text_right">
                        <el-button @click="dialogEdit.show = false">取 消</el-button>
                        <el-button type="primary" @click='onSubmit("form")'>提  交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: "logfound",
  props: {
    dialogEdit: Object,
    form: Object
  },
  watch:{
    dialogEdit(){
        console.log(this.form)
        this.$axios.get("/api/v1/role/?show_more=1").then(res => {
          this.userArray = res.data.data;
          console.log(this.userArray)
      });
    }
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
            roleArray:'',
            input: '',
            userArray:[],
            form_rules: {
          username: [
            { required: true, message: "用户名不能为空", trigger: "change" },
            { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
          ],
          nickname: [
            { required: true, message: "用户名不能为空", trigger: "change" },
            { min: 5, max: 30, message: "长度在 5 到 30 个字符", trigger: "blur" }
          ],
          // password: [
          //   { required: true, message: "密码不能为空", trigger: "blur" },
          //   { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
          // ],
          // password2: [
          //   { required: true, message: "确认密码不能为空", trigger: "blur" },
          //   {
          //     min: 6,
          //     max: 30,
          //     message: "长度在 6 到 30 个字符",
          //     trigger: "blur"
          //   },
          //   { validator: validatePass2, trigger: "blur" }
          // ],
          email: [
            {
              type: "email",
              required: true,
              message: "邮箱格式不正确",
              trigger: "blur"
            },
          ]
        }
      };
    },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
              //修改用户数据;
              this.$axios.put(`/api/v1/users/${this.form.id}/`, this.form).then(res => {
                  if(res.data.code == 1){
                      this.dialogEdit.show = false;
                      this.$message({message: res.data.msg,type: 'success'});
                      this.$parent.init();
                    }
                    else{
                      this.dialogEdit.show = false; 
                      this.$message("修改失败!");
                    }
              })
              .catch(error => {
                this.$message("接口超时!");
              });   
         }
      });
    },
  }
};
</script>
<style scoped>
.role_name{
   width: 771px;
}
</style>

