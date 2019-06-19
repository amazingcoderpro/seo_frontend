<template>
    <div class="logFund">
         <el-dialog 
            :title="dialog.title" 
            :visible.sync="dialog.show"
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
                    <el-form-item label="用户名" prop="username">
                      <el-input v-model="form.username" placeholder="admin"></el-input>
                    </el-form-item>
                    <el-form-item label="选择" prop="">
                      <el-tree
                        :data="data2"
                        show-checkbox
                        node-key="id"
                        :default-expanded-keys="[2, 3]"
                        :default-checked-keys="[5]"
                        :props="defaultProps">
                      </el-tree>
                    </el-form-item>
                    <!-- 取消，提交 -->
                    <el-form-item  class="text_right">
                        <el-button @click="dialog.show = false">取 消</el-button>
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
    dialog: Object,
    form: Object,
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
         data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
       roleArray:'',
       userArray:[                           //下拉框数据
            {"label":"区域三","value":'选项一'},
            {"label":"区域二","value":'选项二'}
          ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
          input10: '',
      form_rules: {
          username: [
            { required: true, message: "用户名不能为空", trigger: "change" },
            { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
          ]
      }
    };
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          //表单数据验证完成之后，提交数据;
          if (this.dialog.option == "post"){
            this.$axios.post(`/api/v1/account/users/`, this.form).then(res => {
              // 操作成功
              this.$message({
                message: "保存成功！",
                type: "success"
              });
              this.dialog.show = false;
              this.$emit("update");
            });
          }else{
            const id = this.form.id
            this.$axios.put(`/api/account/users/${id}/`, this.form).then(res => {
              // 操作成功
              this.$message({
                message: "保存成功！",
                type: "success"
              });
              this.dialog.show = false;
              this.$emit("update");
            });
          }
        }
      });
    }
  }

};
</script>
<style scoped>
.role_name{
  width: 771px;
}
</style>
