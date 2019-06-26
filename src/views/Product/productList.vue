<template>
    <div class="shadowBox productList">
        <p class="headSTitle">Product List</p>
        
        <el-table :data="tableData" style="width: 100%" height="1060" @expand-change="expandSelect" @cell-click="clickTable" ref="refTable">
            <el-table-column label="ID" type="index" width="100" align="center"></el-table-column>
            <el-table-column label="Img" width="100" align="center">
              <template slot-scope="scope">
                  <el-popover
                    placement="right"
                    title=""
                    trigger="hover">
                    <img :src="'data:image/jpeg;base64,'+scope.row.thumbnail"  :style="'width: 500px;'" width="100"/>
                    <img slot="reference" :src="'data:image/jpeg;base64,'+scope.row.thumbnail" :alt="'data:image/jpeg;base64,'+scope.row.thumbnail" style="height: 70px;width: 70px">
                  </el-popover>
              </template> 
            </el-table-column>
            <el-table-column label="Product Title" prop="title" width="490"></el-table-column>
            <el-table-column label="SKU" prop="sku" width="200"></el-table-column>
            <el-table-column label="Type" prop="type" width="200"></el-table-column>
            <el-table-column label="Operation" type="expand" width="100">
                <template slot-scope="props">
                    <el-form class="demo-form-inline special" label-width="0">
                        <p class="headSTitle MB5">Title:</p>
                        <el-form-item>
                            <el-input type="textarea" v-model="allEditdata.remark_title" class="W600 titleTextarea"  placeholder="0 of 70 characters used"  prop="remark_title"></el-input>
                            <div class="el-form-item__error" v-if="titleState">Title cannot be empty</div>
                        </el-form-item>
                        <p><el-checkbox v-model="allEditdata.titleChecked">Don't change meta title</el-checkbox></p>
                        <p class="headSTitle MB5">Description:</p>
                        <el-form-item>
                            <el-input type="textarea" v-model="allEditdata.remark_description" class="W600"  placeholder="0 of 320 characters used"  prop="remark_description"></el-input>
                            <div class="el-form-item__error" v-if="desState">Description cannot be empty</div>
                        </el-form-item>
                        <p><el-checkbox v-model="allEditdata.desChecked">Don't change meta description</el-checkbox></p>
                        <el-form-item class="W600" >
                                <el-button type="primary" icon="view" @click="submitFun('productFrom')" class="FR">SUBMIT</el-button>
                        </el-form-item>
                    </el-form> 
                    <div class="showNow">
                        <p class="headSTitle">Search engine listing preview</p>
                        <p class="title">{{allEditdata.showTitle}}</p>
                        <p class="colorGreen">charrcter.myshopify.com/products/current_product_handle</p>
                        <p class="littleMsg description">{{allEditdata.showDescription}}</p>
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
import * as base from '../../assets/js/base'

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
            // {Title: '11111111',desVal:'1111111',SKU: '11111111',Type: '11111111',titleChecked:false,desChecked:true}
        ],
        allEditdata:{
            id:'',
            description:'',
            remark_title:'',        //带百分号的title
            remark_description:'',   //带百分号的description
            price: '',
            type: '',
            variants:'',     
            title:'',
            domain:'',
            product_list:null,
            titleChecked:false,
            desChecked:false,
            
            showTitle:"Here's an Example of Product Title for All of the Products",
            showDescription:"Here you can see the example of Meta Description that you will match will the relevant tag, it's will show you a snippet looks like in the google search results.",
        },
        rules: {
          title: [
            { required: true, message: "User title cannot be empty", trigger: "change" },
            { min: 2, max: 30, message: "Length of 2 to 30 characters", trigger: "blur" }  
          ],
          description: [
            { required: true, message: "description cannot be empty", trigger: "blur" },
            { min: 6, max: 30, message: "Length of 6 to 30 characters", trigger: "blur" }
          ]
        },
        titleState:false,
        desState:false,
      }
    },
    watch:{
        'allEditdata.remark_title': {
            handler: function() {
                let title = this.allEditdata.remark_title;
                if(title){
                    title = this.changString(title);
                }else{
                    title = '';
                }
                this.allEditdata.showTitle = title;
            },
        },
        'allEditdata.remark_description': {
            handler: function() {
                let title = this.allEditdata.remark_description;
                if(title){
                    title = this.changString(title);
                    if(title.length>130){
                        title = title.substring(0,130)+'...';
                    }
                }else{
                    title = '';
                }
                this.allEditdata.showDescription = title;
            },
        }

    },
    mounted() {
       // this.init();
    },
    methods:{
        //  echarts自适应
        init(title) {
            let url = `/api/v1/product/?is_paging=1&page=${this.page.currentPage}&page_size=${this.page.pagesize}`;
            if(title){
                url+=`&title=`+title;
            }
           this.$axios(url).then(res => {
                if(res.data.code == 1){
                    this.tableData = res.data.data.results;
                    this.page.total = res.data.data.count;
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
                    message: error.message,
                    type: 'warning',
                    center: true
                });
            });
        },
        submitFun(formName){
            this.allEditdata.remark_title == ''?this.titleState = true:this.titleState = false;
            this.allEditdata.remark_description == ''?this.desState = true:this.desState = false;
            if(!this.titleState && !this.desState){
                this.allEditdata.product_list = JSON.stringify(this.allEditdata.product_list); 
                this.$axios.post('/api/v1/product_motify/',this.allEditdata)
                .then(res => {
                    if(res.data.code == 1){
                        this.$message({message: res.data.msg,type: 'success',center: true});
                        this.init();
                    }else{
                        this.$message({message: res.data.msg,type: 'warning',center: true});
                    }
                })
                .catch(error => {
                    this.$message("Interface timeout!");
                });
            }
        },
        clickTable:function(row, column, cell, event){//展开事件日志列表
            if(cell.cellIndex!=3 && cell.cellIndex!=10){
                this.$refs.refTable.toggleRowExpansion(row);
            }
        },
        expandSelect:function (row, expandedRows) {
            this.allEditdata.id = row.id;
            this.allEditdata.title = row.title;
            this.allEditdata.remark_title = row.remark_title;
            this.allEditdata.description = row.description;
            this.allEditdata.remark_description = row.remark_description;
            this.allEditdata.price = row.price;
            this.allEditdata.type = row.type;
            this.allEditdata.variants = row.variants;
            this.allEditdata.domain = row.domain;
            this.allEditdata.product_list = [];
            this.allEditdata.product_list.push(row.id);

            // this.allEditdata.titleChecked = row.titleChecked;
            // this.allEditdata.desChecked = row.desChecked;
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
        changString:function(title){
            
            if(title.indexOf('%Product Type%')>=0){
                title = title.replace(/%Product Type%/g,this.allEditdata.type);
            }
            if(title.indexOf('%Product Title%')>=0){
                title = title.replace(/%Product Title%/g,this.allEditdata.title);
            }
            if(title.indexOf('%Variants%')>=0){
                title = title.replace(/%Variants%/g,this.allEditdata.variants);
            }
            if(title.indexOf('%Product Price%')>=0){
                title = title.replace(/%Product Price%/g,this.allEditdata.price);
            }
            if(title.indexOf('%Domain%')>=0){
                let _thisDom = this.allEditdata.domain.split("https://")[1].split(".")[0]+".com"
                title = title.replace(/%Domain%/g,_thisDom);
            }
            // if(title.indexOf('%Product Description%')>=0){
            //     title = title.replace(/%Product Description%/g,this.allEditdata.domain);
            // }
            return title;
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