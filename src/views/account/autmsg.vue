
<template>
    <div class="autmsg">
         <el-dialog  :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal='false' :close-on-press-escape='false' :modal-append-to-body="false"  >
          <el-form ref="form" label-width="380px" class="demo-ruleForm">
              <p class="title">Pinterest Account Authorization Guide</p>
              <p>You are currently trying to license your Pinterest account to the Pinbooster system. To ensure that pinbooster is successfully authorized by your designated Pinterest account, please follow these tips:</p>
              <p>1. If you are already logged into your Pinterest account in your current browser, please check to make sure that the account you are currently logged into is an account that will be licensed to pinbooster.</p>
              <p>2. If your current browser is not logged in to any Pinterest account, please log in to the Pinterest account you are about to authorize to pinbooster.</p>
              <el-form-item>
                <el-button type="primary" @click="clickFun()">Confirm</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: "autmsg",
    props: {
      dialog: Object
    },
    data() {
      return {
      };
    },
    methods: {
      clickFun() {
        this.dialog.show = false;
        this.$parent.AutFun();
      }
      
    }
  }
</script>
<style>
.autmsg p{width: 60%;margin-left: 20%;color: #000;text-indent: 2em;word-break: keep-all;}
.autmsg p.title{font-size: 20px;font-weight: 600;text-align: center;text-indent: 0;}
</style>
