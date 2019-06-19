<template>
    <div class="board_report">
        <div class="tableTitle"><span>BoardReport</span></div>
        <el-form  :inline="true" :model="searchData" class="demo-form-inline">

            <el-form-item label="Filter" prop="dep">
                <el-select v-model="searchData.pinterest_account_id" placeholder="Pinterest Account 1" class="Filter_week W200"  @change="getBodFun">
                   <el-option v-for="item in searchData.PinterestArray" :key="item.name" :label="item.nickname" :value="item.id"></el-option>
                </el-select>
                <el-select v-model="searchData.board_id" placeholder="All Boards" class="Filter_week W200" @change="getPinFun">
                    <el-option   :label="'All'" :value="''"></el-option>    
                        <el-option
                        v-for="item in searchData.BoardArray"
                        :key="item.id"
                        :label="item.name "
                        :value="item.id ">
                        </el-option>
                </el-select>
                <el-select v-model="searchData.pin_id" placeholder="All Pins" class="Filter_week W200">
                    <el-option   :label="'All'" :value="''"></el-option>    
                        <el-option
                        v-for="item in searchData.PinsArray"
                        :key="item.id"
                        :label="item.note"
                        :value="item.id">
                        </el-option>
                </el-select>
                <el-date-picker
                    v-model="searchData.timeArray"
                    type="daterange" :picker-options="pickerOptions"
                    range-separator="--"
                    start-placeholder="start time"
                    end-placeholder="End time"
                    class="W300"
                  >
                </el-date-picker>
                <el-input v-model="searchData.search" @keyup.enter.native="init()"  class="W200"></el-input>
                <el-button type="primary" size="small" icon="view" @click="init()">Search</el-button>
            </el-form-item>
        </el-form>  
        <!-- 表单部分 -->
        <div class="table_right">
          <el-table :data="tableData" border ref="topictable"  :height="tableHeight">
            <el-table-column align="center" type="index"  label="ID" width="50"></el-table-column>
            <el-table-column  align="center"  prop="board_id" label="Board ID"  width="100"></el-table-column>
            <el-table-column  align="center"  prop="board_name" label="Board Name"  width="150"></el-table-column>
            <el-table-column  align="center"  prop="boards" label="Boards"  width="100"></el-table-column>
            <el-table-column  align="center"  prop="board_followers" label="Followers"  width="100"></el-table-column>
            <el-table-column  align="center"  prop="pins" label="Pins"  width="100"></el-table-column>
            <el-table-column  align="center"  prop="pin_saves" label="Saves"  width="100"></el-table-column>
            <!-- <el-table-column  align="center"  prop="pin_likes" label="Like"  width="100"></el-table-column> -->
            <el-table-column  align="center"  prop="pin_comments" label="Comments"  width="100"></el-table-column>
            <el-table-column  align="center"  prop="product_visitors" label="Visitors"  width="100"></el-table-column>
            <el-table-column  align="center"  prop="product_new_visitors" label="New Vistors"  width="150"></el-table-column>
            <el-table-column  align="center"  prop="account_views" label="View"  width="100"></el-table-column>
            <el-table-column  align="center"  prop="product_clicks" label="Clicks"  width="100"></el-table-column>
            <el-table-column  align="center"  prop="product_sales" label="Sales"  width="100"></el-table-column>
            <el-table-column  align="center"  prop="product_revenue" label="Revenue" ></el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="paging">
          <el-pagination :page-sizes="pagesizes" :page-size="pagesize" @size-change="handleSizeChange" @current-change="current_change" layout="total, sizes, prev, pager, next, jumper" :total=total></el-pagination>
        </div>
    </div>
</template>

<script>
import * as base from '../../assets/js/base'
export default {
  name: "board_report",
  data() {
    return {
        pickerOptions: {
            disabledDate(time) {
                return time.getTime() > Date.now();//设置选择明天之前的日期
            }
        },  
        total:0,//默认数据总数
        pagesize:10,//每页的数据条数
        pagesizes:[10, 20, 30, 40],//分组数量
        currentPage:1,//默认开始页面
        tableHeight:'100',
        searchData:{
          start_time:'',
          end_time:'',
          search:'',
          pin_id:'',
          board_id:'',
          pinterest_account_id:'',
          store_id:'',

          PinterestArray:[],        //Pinterest的下拉框数据源
          BoardArray:[],            //Board的下拉框数据源
          PinsArray:[],             //Pins的下拉框数据源
          timeArray:[new Date(2019, 3, 1, 0, 0), new Date(2019, 5, 1, 0, 0)],             //日期数据源
        },
        tableData: []
    };
  },
  created() {
      this.getPinterestFun();
  },
  mounted() {
      setTimeout(() => {
        this.tableHeight = window.innerHeight - this.$refs.topictable.$el.offsetTop - 150;
      }, 50);
  },
  methods: {
    init() {
        this.searchData.start_time = base.dateFormat(this.searchData.timeArray[0]);
        this.searchData.end_time =  base.dateFormat(new Date(this.searchData.timeArray[1]).getTime()+ 1000 * 24 * 60 * 60);
        var urlString = `/api/v1/subaccount_report/board/?index=10`;
          urlString +=`&pinterest_account_id=${this.searchData.pinterest_account_id}`;
          if(this.searchData.board_id != ''){
              urlString +=`&board_id=${this.searchData.board_id}`;
          }
          if(this.searchData.pin_id != ''){
              urlString +=`&pin_id=${this.searchData.pin_id}`;
          }
        if(this.searchData.search != ''){
            urlString +=`&search=${this.searchData.search}`;
        }
        if(this.searchData.timeArray.length == 2){
            urlString +=`&start_time=${this.searchData.start_time}`;
            urlString +=`&end_time=${this.searchData.end_time}`;
        }

        this.$axios.get(urlString).then(res => {
          if(res.data.code==1){ 
              this.tableData = res.data.data.results;
              this.total = res.data.data.count;
          }else{
            this.$message("获取失败!");
          }
        })
        .catch(error => {
          this.$message("接口超时!");
        });
    },
    getPinterestFun:function(){
        this.$axios.get("/api/v1/select/account/")
        .then(res=> {
            if(res.data.code == 1){
              this.searchData.PinterestArray = res.data.data;
              if(res.data.data.length>0){
                this.searchData.pinterest_account_id = res.data.data[0].id;
                this.getBodFun();
              }else{
                this.searchData.pinterest_account_id = '';
                this.searchData.board_id = '';
                this.searchData.pin_id = '';
                this.init();
              }
            }else{
              this.$message("Acquisition failure!");
            }
        }).catch(function(errof){
          this.$message("Interface timeout!");
        });
    },
    getBodFun:function(){
      this.$axios.get(`/api/v1/select/board/?pinterest_account_id=${this.searchData.pinterest_account_id}`)
      .then(res=> {
          if(res.data.code == 1){
            this.searchData.BoardArray = res.data.data;
              if(res.data.data.length>0){
                this.searchData.board_id = res.data.data[0].id;
                this.getPinFun();
              }else{
                this.searchData.board_id = '';
                this.searchData.pin_id = '';
                this.init();
              }
          }else{
            this.$message("Acquisition failure!");
          }
      }).catch(function(errof){
          this.$message("Interface timeout!");
      });
    },
    getPinFun:function(){
      if(this.searchData.board_id!=''){
        this.$axios.get(`/api/v1/select/pin/?board=${this.searchData.board_id}`)
        .then(res=> {
            if(res.data.code == 1){
              this.searchData.PinsArray = res.data.data;
                if(res.data.data.length>0){
                  this.searchData.pin_id = res.data.data[0].id;
                }else{
                  this.searchData.pin_id = '';
                }
                this.init();
            }else{
              this.$message("Acquisition failure!");
            }
        }).catch(function(errof){
            this.$message("Interface timeout!");
        })
      }else{
        //如果board_id == '' pin的数组为空 ，值为空
        this.searchData.pin_id = '';
        this.searchData.PinsArray = [];
      }
    },
    current_change(val){
        //点击数字时触发
        this.currentPage = val;
        this.init();
        this.$refs.topictable.bodyWrapper.scrollTop = 0;
    },
    handleSizeChange(val){
        //修改每页显示多少条时触发
        this.pagesize = val;
        this.init();
        this.$refs.topictable.bodyWrapper.scrollTop = 0;
    }
  }
};



</script>

<style>

</style>
