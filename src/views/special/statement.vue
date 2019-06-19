
<template>
    <div class="statement">
         <el-dialog  :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal='false' :close-on-press-escape='false' :modal-append-to-body="false"  >
          <el-form ref="form" label-width="300px" class="demo-ruleForm">
              <p class="title">Tracking Visitors From Pinbooster By Using Google Analytics</p>
              <p>You are currently try to license your google analytic account to pinbooster system. Connecting Google Analytics to your pinbooster program pages is extremely easy. Please see below:</p>
              <p>Step1. Sign up for a Google Analytics account, if you haven't already done so.</p>
              <p>Step2. Add <a>test123@eternal-argon-241002.iam.gserviceaccount.com</a> as a user in your GA view user management. Give us data read & Analyze permissions.</p>
              <p>Step2. Add your Google Analytics Tracking Code to Pinbooster pages.</p>
              <p>Step3. Click the Save Button.</p>
              <p>Page views from your pinbooster program may take up to 24 hours to appear on your GA dashboard. You can check Pinbooster data performance on your GA Dashboard follow these step.</p>
              <p>Step1. Login to your Google Analytics account, if you haven't already done so.</p>
              <p>Step2. Click Acquisition → All traffic → Source/medium → Input "pinbooster" in the advanced search blank → Search</p>
              <el-button type="primary" @click="clickFun">Ok</el-button>
              <el-form-item>
            </el-form-item>
          </el-form>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: "statement",
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
      }
    }
  }
</script>
<style>
.statement p{width: 61%;margin-left: 20%;color: #000; word-break: keep-all;}
.statement p.title{font-size: 20px;font-weight: 600;text-align: center;text-indent: 0;}
.statement p a{color: #0f8fcf;}
.statement p span{padding-left: 180px;}
.statement .el-button{margin-left: 400px;}
</style>
