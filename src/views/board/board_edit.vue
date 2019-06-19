<template>
    <div class="board_edit">
         <el-dialog  :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal='false' :close-on-press-escape='false' :modal-append-to-body="false"  >
          <el-form :model="editData" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
               <el-form-item label="Board ID">
                <el-input v-model="editData.board_uri" disabled></el-input>
              </el-form-item>
               <el-form-item label="Board Name" prop="name" class="board_name">
                <el-input v-model="editData.name"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('form')">Submit</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: "board_edit",
    props: {
      dialog: Object,
      formData: Object
    },
    data() {
      return {
        editData:{
          board_uri: '',
          description: '',
          id: '',
          name: '',
          pinterest_account_id: ''
        },
        rules: {
          name: [{required: true, message: 'Please enter the account name.', trigger: 'blur'}], 
          description: [{required: true, message: 'Please enter the account description.', trigger: 'blur'}],
        }
      };
    },
    watch: {
        dialog: function() {
            this.init();
        }
    },
    methods: {
      init(){
          this.$axios(`/api/v1/board_manage/${this.formData.board_id}/`)
          .then(res => {
            if(res.data.code == 1){
              this.editData.board_uri = res.data.data.uuid;
              this.editData.name = res.data.data.name;
              this.editData.description = res.data.data.description;
            }else{
              this.$message({
                message: "Failure to obtain data",
                type: 'warning',
                center: true
              });
            }
          });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
                this.$axios.put(`/api/v1/board_manage/${this.formData.board_id}/`,this.editData)
                .then(res => {
                    if(res.data.code == 1){
                      this.dialog.show = false;
                      this.$message({message: res.data.msg,type: 'success'});
                      this.$parent.init();
                    }else{
                      this.dialog.show = false; 
                      this.$message("Modification failed!");
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
.board_edit .el-form-item__label{padding-right: 5px!important;}

</style>
