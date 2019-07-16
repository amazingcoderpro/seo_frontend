<template>
    <header class="shadowBox head-nav" style="position:fixed!important;z-index:999">
        <div class="headContent">
            <div class="headTitle MB30">
              <span>SEO META EDIT</span>
            </div>
            <p class="headSTitle">Choose Conditions</p>
            <el-form :model="searchData" class="demo-form-inline" label-width="0">
              <el-form-item>
                <el-select v-model="searchData.pagVal" placeholder="Pinterest"  :class="'W400'" @change="pagValchange">
                  <el-option v-for="(item,title) in pagArray" :key="title" :label="item.title" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="searchData.productVal" filterable :class="'W400'" @change="productValFun">
                  <el-option :label="'All Products'" :value="''" v-if="searchData.pagVal == '/ProductShow'"></el-option>
                  <el-option :label="'All Collections'" :value="''" v-if="searchData.pagVal == '/Collections'"></el-option>
                  <el-option v-for="(item,title) in productArray" :key="title" :label="item.meta_title" :value="item.meta_title"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="searchTitleState">
                <el-input v-model="searchData.searchTitle" placeholder="Title" :class="'W400'"></el-input>
              </el-form-item>
              <el-form-item class="W980">
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
        {title:'Page Categore',value:'/Categore'},
        {title:'Collections Page',value:'/Collections'},
        {title:'Products Page',value:'/ProductShow'},
      ],
      productArray:[],
      CollectionArray:[],
      searchData:{
        pagVal:'/ProductShow',
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
    this.init();
  },
  methods: {
    init(){
        this.productArray = [];
        this.CollectionArray = [];
        let urlStr = `/api/v1/collection/`;
        this.$axios(urlStr).then(res => {
            if(res.data.code == 1){
                this.CollectionArray = res.data.data;
            }else{
                this.$message({message: "code Abnormal!",type: 'warning',center: true});
            }
        })
        .catch(error => {
            this.$message({message: error.message,type: 'warning',center: true});
        }); 

    },
    searchFun(){
      window.localStorage.setItem("CollectionVal", this.searchData.productVal);
      if(location.href.indexOf(this.searchData.pagVal)<0){
        this.$router.push(this.searchData.pagVal);
      }
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
    },
    pagValchange(){
      if(this.searchData.pagVal == '/Collections'){
         this.productArray = this.CollectionArray;
      }else{
         this.productArray = [];
      }
    },
    LoginOut(){
       base.LoginOut();
    }
  }
};
</script>
