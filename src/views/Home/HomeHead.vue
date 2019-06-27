<template>
    <header class="shadowBox head-nav">
        <div class="headContent">
            <div class="headTitle MB30">
              <span>SEO META EDIT</span>
            </div>
            <p class="headSTitle">Choose Conditions</p>
            <!-- <el-button type="primary" icon="view" @click="LoginOut" class="LoginOutBtn FR">Sign out</el-button> -->
            <el-form :model="searchData" class="demo-form-inline" label-width="0">
              <el-form-item>
                <el-select v-model="searchData.pagVal" placeholder="Pinterest"  :class="'W400'">
                  <el-option v-for="(item,title) in pagArray" :key="title" :label="item.title" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="W768">
                <el-button type="primary" icon="view" @click="searchFun()" class="FR" disable="">Load Products</el-button>
              </el-form-item>
            </el-form>
        </div>
    </header>
</template>
<script>

import * as base from '../../assets/js/base'

export default {
  name: "HomeHead",
  data() {
    return {
      pagArray:[
        {title:'Page Categore',value:'/Categore'},
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
        pagVal:'/Home',
        productVal:0,
        title:''
      },
    };
  },
  watch:{
      // 'searchData.pagVal': {
      //     handler: function() {
      //       console.log(this.searchData.pagVal)
      //       this.$router.push(this.searchData.pagVal);
      //     },
      // }
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
    searchFun(){
      this.$router.push(this.searchData.pagVal);
    },
    LoginOut(){
       base.LoginOut();
    }
  }
};
</script>
