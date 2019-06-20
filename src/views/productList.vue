<template>
    <div class="shadowBox productList">
        <p class="headSTitle">Product List</p>
        
        <el-table :data="tableData" style="width: 100%" height="600" @expand-change="expandSelect" @cell-click="clickTable" ref="refTable">
            <el-table-column type="index"></el-table-column>
            <el-table-column label="Product Title" prop="Title"></el-table-column>
            <el-table-column label="SKU" prop="SKU"></el-table-column>
            <el-table-column label="Type" prop="Type"></el-table-column>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form class="demo-form-inline" label-width="0" ref="productFrom">
                        <p class="headSTitle MB5">Title:</p>
                        <el-form-item>
                            <el-input type="textarea" v-model="allEditdata.titleVal" class="W600"  placeholder="0 of 70 characters used"></el-input>
                        </el-form-item>
                        <p><el-checkbox v-model="allEditdata.titleChecked">Don't change meta title</el-checkbox></p>
                        <p class="headSTitle MB5">Description:</p>
                        <el-form-item>
                            <el-input type="textarea" v-model="allEditdata.desVal" class="W600"  placeholder="0 of 320 characters used"></el-input>
                        </el-form-item>
                        <p><el-checkbox v-model="allEditdata.desChecked">Don't change meta description</el-checkbox></p>
                        <el-form-item class="W600" >
                                <el-button type="primary" icon="view" @click="submitFun('productFrom')" style="float: right;">SUBMIT</el-button>
                        </el-form-item>
                    </el-form> 
                    <div class="showNow">
                        <p class="headSTitle">Search engine listing preview</p>
                        <p class="title">{{props.row.name}}</p>
                        <p class="colorGreen">charrcter.myshopify.com/products/current_product_handle</p>
                        <p class="littleMsg">{{props.row.shop}}</p>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="paging">
          <el-pagination :page-sizes="page.pagesizes" :page-size="page.pagesize" @size-change="handleSizeChange" @current-change="current_change" layout="total, sizes, prev, pager, next, jumper" :total="page.total"></el-pagination>
        </div>

    </div>
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
import * as base from '../assets/js/base'

  export default {
    name: "productList",
    data() {
      return {
        page:{
            total:0,//默认数据总数
            pagesize:10,//每页的数据条数
            pagesizes:[10, 20, 30, 40],//分组数量
            currentPage:1,//默认开始页面
        },
        tableData: [
            {Title: '11111111',desVal:'1111111',SKU: '11111111',Type: '11111111',titleChecked:false,desChecked:true},
            {Title: '2222222',desVal:'22222',SKU: '2222222',Type: '2222222',titleChecked:true,desChecked:true},
            {Title: '33333',desVal:'33333',SKU: '33333',Type: '33333',titleChecked:true,desChecked:true},
            {Title: '11111111',desVal:'1111111',SKU: '11111111',Type: '11111111',titleChecked:false,desChecked:true},
            {Title: '2222222',desVal:'22222',SKU: '2222222',Type: '2222222',titleChecked:true,desChecked:true},
            {Title: '33333',desVal:'33333',SKU: '33333',Type: '33333',titleChecked:true,desChecked:true},
            {Title: '11111111',desVal:'1111111',SKU: '11111111',Type: '11111111',titleChecked:false,desChecked:true},
            {Title: '2222222',desVal:'22222',SKU: '2222222',Type: '2222222',titleChecked:true,desChecked:true},
            {Title: '33333',desVal:'33333',SKU: '33333',Type: '33333',titleChecked:true,desChecked:true},
            {Title: '11111111',desVal:'1111111',SKU: '11111111',Type: '11111111',titleChecked:false,desChecked:true},
            {Title: '2222222',desVal:'22222',SKU: '2222222',Type: '2222222',titleChecked:true,desChecked:true},
            {Title: '33333',desVal:'33333',SKU: '33333',Type: '33333',titleChecked:true,desChecked:true},
            {Title: '11111111',desVal:'1111111',SKU: '11111111',Type: '11111111',titleChecked:false,desChecked:true},
            {Title: '2222222',desVal:'22222',SKU: '2222222',Type: '2222222',titleChecked:true,desChecked:true},
            {Title: '33333',desVal:'33333',SKU: '33333',Type: '33333',titleChecked:true,desChecked:true},
            {Title: '11111111',desVal:'1111111',SKU: '11111111',Type: '11111111',titleChecked:false,desChecked:true},
            {Title: '2222222',desVal:'22222',SKU: '2222222',Type: '2222222',titleChecked:true,desChecked:true},
            {Title: '33333',desVal:'33333',SKU: '33333',Type: '33333',titleChecked:true,desChecked:true},
            {Title: '44444',desVal:'4444',SKU: '44444',Type: '44444',titleChecked:true,desChecked:true}
        ],
        allEditdata:{
            titleVal:"Here's an Example of Product Title for All of the Products",
            desVal:"Here you can see the example of Meta Description that you will match will the relevant tag, it's will show you a snippet looks like in the google search results.",
            titleChecked:false,
            desChecked:false,
        }
      }
    },
    mounted() {
        this.init();
    },
    methods:{
        //  echarts自适应
        init() {
           // this.$axios(`/api/v1/product/?page=${this.page.currentPage}&page_size=${this.page.pagesize}`).then(res => {
            this.$axios(`/api/v1/product/`).then(res => {
                if(res.data.code == 1){
                    this.tableData = res.data.data.results;
                    this.total = res.data.data.count;
                }else{
                    this.$message({
                        message: "code Abnormal!",
                        type: 'warning',
                        center: true
                    });
                }
            })
            .catch(error => {
                this.$message({
                    message: "Interface timeout!",
                    type: 'warning',
                    center: true
                });
            });












            this.tableData = this.tableData;
            this.page.total = this.tableData.length;
        },
        submitFun(formName){
            console.log(this.allEditdata)
        this.$refs[formName].validate((valid) => {
          if (valid) {

            // this.$axios.post('/api/v1/account/login/',this.loginUser)
            // .then(res => {

            // })
            // .catch(error => {
            //     this.$message("Interface timeout!");
            // });
          }
        });

        },
        clickTable:function(row, column, cell, event){//展开事件日志列表
            if(cell.cellIndex!=3 && cell.cellIndex!=10){
                this.$refs.refTable.toggleRowExpansion(row);
            }
        },
        expandSelect:function (row, expandedRows) {
            this.allEditdata.titleVal = row.Title;
            this.allEditdata.desVal = row.desVal;
            this.allEditdata.titleChecked = row.titleChecked;
            this.allEditdata.desChecked = row.desChecked;
            var that = this
            if (expandedRows.length>1) {
                that.expands = []
                if (row) {
                    that.expands.push(row);
                }
                this.$refs.refTable.toggleRowExpansion(expandedRows[0]);
            } else {
                that.expands = [];
            }
        },
        current_change(val){
            //点击数字时触发
            this.page.currentPage = val;
            this.init();
            this.$refs.refTable.bodyWrapper.scrollTop = 0;
        },
        handleSizeChange(val){
            //修改每页显示多少条时触发
            this.page.pagesize = val;
            this.init();
            this.$refs.refTable.bodyWrapper.scrollTop = 0;
        }
        

    }
  }
</script>