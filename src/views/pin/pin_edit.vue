<template>
    <div class="pin_edit">
         <el-dialog  :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal='false' :close-on-press-escape='false' :modal-append-to-body="false"  >
          <el-form :model="editData" :rules="rules" ref="form" label-width="130px" class="demo-ruleForm">
               <el-form-item label="Pin ID">
                <el-input v-model="editData.pin_uri" disabled></el-input>
              </el-form-item>
               <el-form-item label="Board Name">
                <el-input v-model="editData.board" disabled></el-input>
              </el-form-item>
               <el-form-item label="Pin URL" prop="url">
                <el-input v-model="editData.url" disabled></el-input>
              </el-form-item>
               <el-form-item label="Pin Description" prop="note">
                <el-input v-model="editData.note"></el-input>
              </el-form-item>
              
              <el-form-item>
                <el-button type="primary" @click="submitForm('form')">Save</el-button>
                <el-button @click="resetForm('form')">Reset</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: "pin_edit",
    props: {
      dialog: Object,
      editData: Object
    },
    data() {
      return {
        rules: {
          url: [{required: true, message: '请输入url', trigger: 'blur'}],
          note: [{required: true, message: '请输入描述', trigger: 'blur'}],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.editData)
              this.$axios.put(`/api/v1/pin_manage/${this.editData.pin_id}/`,this.editData)
              .then(res => {
                if(res.data.code == 1){
                  this.dialog.show = false;
                  this.$message({message: res.data.msg,type: 'success'});
                  this.$parent.init();             
                }else{
                  this.$message({
                    message: res.data.msg.detail,
                    type: 'warning',
                    center: true
                  });
                }
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
/* .pin_edit  */

</style>
