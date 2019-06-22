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
                <el-input v-model="searchData.title" placeholder="Title" :class="'W400'"></el-input>
              </el-form-item>
              <el-form-item class="W768">
                <el-button type="primary" icon="view" @click="searchFun()" class="FR">Load Products</el-button>
              </el-form-item>
            </el-form>
        </div>
    </header>
</template>
<script>

import * as base from '../../assets/js/base'

export default {
  name: "productHead",
  data() {
    return {
      pagArray:[
        {title:'Page Categore',value:0},
        {title:'Home Page',value:'/Home'},
        {title:'Collections Page',value:'/Collections'},
        {title:'Products Page',value:'/ProductShow'},
      ],
      productArray:[
        {title:'All Products',value:0},
        {title:'New In',value:1},
        {title:'Hot Sale',value:2},
      ],
      searchData:{
        pagVal:'/ProductShow',
        productVal:0,
        title:''
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
  watch:{
      'searchData.pagVal': {
          handler: function() {
            this.$router.push(this.searchData.pagVal);
          },
      }
  },
  components: {
  },
  mounted() {
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
    },
    changeMsg(){
      this.dialog = {
        show: true,
        title: "Modify Password",
        option: "put"
      };

    },
    searchFun(){
         this.$emit('parentMethod',this.searchData.title);
    }
  }
};
</script>
