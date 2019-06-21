<template>
    <header class="shadowBox head-nav">
        <div class="headContent">
            <div class="headTitle MB30">
              <span>SEO META EDIT</span>
            </div>
            <p class="headSTitle">Choose Conditions</p>
            <el-form :model="searchData" class="demo-form-inline" label-width="0">
              <el-form-item>
                <el-select v-model="searchData.pagVal" placeholder="Pinterest"  :class="'W400'">
                  <el-option v-for="(item,title) in pagArray" :key="title" :label="item.title" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="searchData.productVal" placeholder="Pinterest"  :class="'W400'">
                  <el-option v-for="(item,title) in pagArray" :key="title" :label="item.title" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-input v-model="searchData.name" placeholder="Name" :class="'W400'"></el-input>
              </el-form-item>
              <el-form-item class="W768">
                <el-button type="primary" icon="view" @click="searchFun()" class="FR">Load Products</el-button>
              </el-form-item>
            </el-form>
        </div>
    </header>
</template>
<script>

import * as base from '../assets/js/base'

export default {
  name: "head_nav",
  data() {
    return {
      pagArray:[
        {title:'Page Categore',value:0},
        {title:'Home Page',value:1},
        {title:'Collections Page',value:2},
        {title:'Products Page',value:3},
      ],
      productArray:[
        {title:'All Products',value:0},
        {title:'New In',value:1},
        {title:'Hot Sale',value:2},
      ],
      searchData:{
        pagVal:0,
        productVal:0,
        name:''
      },
    };
  },
  computed: {
    user() {
      if(window.localStorage.getItem('user') == undefined){
       base.LoginOut();
      }else{
        return window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : this.$store.getters.user
      }
    }
  },
  components: {
  },
  methods: {
    setDialogInfo(cmditem) {
      if (!cmditem) {
        this.$message("菜单选项缺少command属性");
        return;
      }
      switch (cmditem) {
        case "modify_password":
          this.changeMsg();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    modifyPassword() {
      // 修改密码
      this.$router.push("/modifyPassword");
    },
    changeMsg(){
      this.dialog = {
        show: true,
        title: "Modify Password",
        option: "put"
      };

    },
    searchFun(){
         this.$emit('parentMethod',this.searchData.name);
    }
  }
};
</script>
