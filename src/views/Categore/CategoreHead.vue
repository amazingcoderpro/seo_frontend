<template>
    <header class="shadowBox head-nav">
        <div class="headContent FirstHead">
            <div class="headTitle MB30">
              <span>SEO META EDIT</span>
            </div>
            <!-- <el-button type="primary" icon="view" @click="LoginOut" class="LoginOutBtn FR">Sign out</el-button> -->
            <p class="headSTitle">Choose Conditions</p>
            <el-form :model="searchData" class="demo-form-inline" label-width="0">
              <el-form-item>
                <el-select v-model="searchData.pagVal" placeholder="Pinterest"  :class="'W400'">
                  <el-option v-for="(item,title) in pagArray" :key="title" :label="item.title" :value="item.value"></el-option>
                </el-select>
                <!-- <span style="color: #606266;">Please select the page you want to edit</span> -->
              </el-form-item>
              <!-- <el-form-item>
                <el-select v-model="searchData.productVal" filterable :class="'W400'" @change="productValFun">
                  <el-option :label="'Vague Search'" :value="-1"></el-option>
                  <el-option :label="'All Products'" :value="''"></el-option>
                  <el-option v-for="(item,meta_title) in productArray" :key="meta_title" :label="item.meta_title" :value="item.meta_title"></el-option>
                </el-select>
              </el-form-item> -->
              <!-- <el-form-item v-if="searchTitleState">
                <el-input v-model="searchData.searchTitle" placeholder="Title" :class="'W400'"></el-input>
              </el-form-item> -->
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
  name: "CategoreHead",
  data() {
    return {
      pagArray:[
        {title:'Page Categore',value:'/Categore'},
        // {title:'Home Page',value:'/Home'},
        {title:'Collections Page',value:'/Collections'},
        {title:'Products Page',value:'/ProductShow'},
      ],
      productArray:[],
      searchData:{
        pagVal:'/Categore',
        productVal:'',
        searchTitle:''
      },
      searchTitleState:false,
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
      // 'searchData.pagVal': {
      //     handler: function() {
      //       this.$router.push(this.searchData.pagVal);
      //     },
      // }
  },
  components: {
  },
  mounted() {
    //  this.init();
  },
  methods: {
    init(){

    },
    LoginOut(){
       base.LoginOut();
    },
    searchFun(){
      this.$router.push(this.searchData.pagVal);
      if(this.searchTitleState){
        //模糊搜索
         this.$emit('parentMethod',this.searchData.searchTitle);
      }else{
          //指定搜索
         this.$emit('parentMethod',this.searchData.productVal);
      }
    },
    productValFun(){
        if(this.searchData.productVal == -1){
            this.searchTitleState = true;
            this.searchData.searchTitle = '';
        }else{
            this.searchTitleState = false;
        }
    }
  }
};
</script>
