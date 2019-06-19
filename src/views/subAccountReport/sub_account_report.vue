<template>
    <div class="sub_account_report">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span> Home</a></li>
            <li><a><span class="el-icon-right"> </span> Sub-Account Report</a></li>
        </ul>
        <el-form  :inline="true" :model="searchData" class="demo-form-inline"  label-width="91px">
            <el-form-item label="Pinterest">
                <el-select v-model="searchData.pinterest_account_id" placeholder="Pinterest Account 1" class="Filter_week W200" @change="getBodFun">
                   <el-option :label="'All'" :value="''"></el-option>    
                   <el-option v-for="item in searchData.PinterestArray" :key="item.name" :label="item.nickname" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Boards">
                <el-select v-model="searchData.board_id" placeholder="All Boards" class="Filter_week W200" @change="getPinFun">
                        <el-option   :label="'All'" :value="''"></el-option>    
                        <el-option v-for="item in searchData.BoardArray" :key="item.id" :label="item.name " :value="item.id "></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Pins">
                <el-select v-model="searchData.pin_id" placeholder="All Pins" class="Filter_week W200">
                        <el-option   :label="'All'" :value="''"></el-option>    
                        <el-option v-for="item in searchData.PinsArray" :key="item.id" :label="item.note" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Date Range">
              <el-select v-model="searchData.dataType" placeholder="Yesterday" @change="dataSelect" :class="'W200'">
                  <el-option
                  v-for="item in dataArray"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Time">
                <el-date-picker v-model="searchData.timeArray" type="daterange" :picker-options="pickerOptions" range-separator="--" start-placeholder="start time" end-placeholder="End time" class="W250"></el-date-picker>
            </el-form-item>
            <el-form-item class="report_search" prop="dep" label=" ">
                <template>
                        <template v-if="tableState == 1">
                                <el-input v-model="searchData.search" @keyup.enter.native="init()" placeholder="Pinterest Account Name"  class="W200"></el-input>
                        </template>
                        <template  v-else-if="tableState == 2">
                                <el-input v-model="searchData.search" @keyup.enter.native="init()" placeholder="Board Name"  class="W200"></el-input>
                        </template>
                        <template  v-else-if="tableState == 3">
                                <el-input v-model="searchData.search" @keyup.enter.native="init()" placeholder="Pin Title"  class="W200"></el-input>
                        </template>
                </template>
                <el-button type="primary" icon="view" @click="init()">Search</el-button>
            </el-form-item>
        </el-form>  
        <template>
            <div class="table_right" :style="tableState == 1?'display:block;':'display:none;'">
              <p>Accounts:{{searchData.PinterestArray.length}}</p>
              <el-table :data="tableData" border ref="topictable" class="topictable"  :height="tableHeight">
                <el-table-column  align="center"  prop="account_name" label="Account Name"  width="140"></el-table-column>
                <el-table-column  align="center"  prop="boards" label="Boards"  width="140"></el-table-column>
                <el-table-column  align="center"  prop="account_followings" label="Followings"  width="140"></el-table-column>
                <el-table-column  align="center"  prop="account_followers" label="Followers"  width="140"></el-table-column>
                <el-table-column  align="center"  prop="pins" label="Pins"  width="140"></el-table-column>
                <el-table-column  align="center"  prop="pin_saves" label="Saves"  width="140"></el-table-column>
                <el-table-column  align="center"  prop="pin_comments" label="Comments"  width="140"></el-table-column>
                <el-table-column  align="center"  prop="product_visitors" label="Visitors"  width="140"></el-table-column>
                <el-table-column  align="center"  prop="product_new_visitors" label="New Vistors"  width="140"></el-table-column>
                <el-table-column  align="center"  prop="product_clicks" label="Clicks"  width="140"></el-table-column>
                <el-table-column  align="center"  prop="product_sales" label="Sales"  width="120"></el-table-column>
                <el-table-column  align="center"  prop="product_revenue" label="Revenue" width="120"></el-table-column>
              </el-table>
            </div>
            <!-- 分页 -->
        </template>
        <template>
            <div class="table_right" :style="tableState == 2?'display:block;':'display:none;'">
              <el-table :data="tableData" border ref="topictable"  :height="tableHeight">
            <el-table-column  align="center"  prop="board_id" label="Board ID"  width="100"></el-table-column>
            <el-table-column  align="center"  prop="board_name" label="Board Name"  width="150"></el-table-column>
            <el-table-column  align="center"  prop="board_followers" label="Followers"  width="100"></el-table-column>
            <el-table-column  align="center"  prop="pins" label="Pins"  width="100"></el-table-column>
            <el-table-column  align="center"  prop="pin_saves" label="Saves"  width="100"></el-table-column>
            <el-table-column  align="center"  prop="pin_comments" label="Comments"  width="100"></el-table-column>
            <el-table-column  align="center"  prop="product_visitors" label="Visitors"  width="100"></el-table-column>
            <el-table-column  align="center"  prop="product_new_visitors" label="New Vistors"  width="150"></el-table-column>
            <el-table-column  align="center"  prop="product_clicks" label="Clicks"  width="100"></el-table-column>
            <el-table-column  align="center"  prop="product_sales" label="Sales"  width="100"></el-table-column>
            <el-table-column  align="center"  prop="product_revenue" label="Revenue" ></el-table-column>
              </el-table>
            </div>
        </template>
        <template>
            <div class="table_right" :style="tableState == 3?'display:block;':'display:none;'">
              <el-table :data="tableData" border ref="topictable"  :height="tableHeight">
                  <el-table-column  align="center"  prop="pin_uri" label="Pin ID"  width="200"></el-table-column>
                  <el-table-column  align="center"  prop="pin_thumbnail" label="Image"  width="200">
                      <template slot-scope="scope"> 
                          <img :src="'data:image/jpeg;base64,' + scope.row.pin_thumbnail"  width="70" height="70" />    
                      </template>
                  </el-table-column>
                  <el-table-column  align="center"  prop="product_sales" label="Sales"  width="200"></el-table-column>
                  <el-table-column  align="center"  prop="pin_comments" label="Comments"  width="200"></el-table-column>
                  <el-table-column  align="center"  prop="product_visitors" label="Visitors"  width="200"></el-table-column>
                  <el-table-column  align="center"  prop="product_new_visitors" label="New Vistors"  width="150"></el-table-column>
                  <el-table-column  align="center"  prop="product_clicks" label="Clicks"  width="200"></el-table-column>
                  <el-table-column  align="center"  prop="product_sales" label="Sales"  width="200"></el-table-column>
                  <el-table-column  align="center"  prop="product_revenue" label="Revenue"></el-table-column>
              </el-table>
            </div>
        </template>
        <div class="paging">
          <el-pagination :page-sizes="pagesizes" :page-size="pagesize" @size-change="handleSizeChange" @current-change="current_change" layout="total, sizes, prev, pager, next, jumper" :total=total></el-pagination>
        </div>
    </div>
</template>
<script>
import * as base from '../../assets/js/base'
export default {
  name: "sub_account_report",
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
        tableState:'1', //展示哪个表格？1 所有信息 2 只有Board的 3 PIn的
        searchData:{
          dataType:'2',    //显示几天 
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
        tableData: [],
        dataArray:[//时间区间的星期几
          {"label":"Custom","value":"0"},
          {"label":"Yesterday","value":"1"},
          {"label":"Today","value":"2"},
          {"label":"Last 7 Day","value":"3"},
          {"label":"Current Month","value":"4"},
          {"label":"This Years","value":"5"},
        ],
    };
  },
  created() {
      this.dataSelect();
      this.getPinterestFun();
  },
  mounted() {
      setTimeout(() => {
        this.tableHeight = window.innerHeight - this.$refs.topictable.$el.offsetTop - 130;
      }, 50);
      window.addEventListener('resize', () => {
        if(document.getElementsByClassName("topictable").length>0){
            this.tableHeight = window.innerHeight - document.getElementsByClassName("topictable")[0].offsetTop - 150;
        }
      });
  },
  methods: {
    init() {
        this.searchData.start_time = base.dateFormat(this.searchData.timeArray[0]);
        this.searchData.end_time =  base.dateFormat(new Date(this.searchData.timeArray[1]).getTime() + 1000 * 24 * 60 * 60);
        var urlString = `/api/v1/subaccount_report/subaccount/`;
            if(this.searchData.pinterest_account_id){
                urlString = `/api/v1/subaccount_report/board/`;
              if(this.searchData.board_id){
                urlString = `/api/v1/subaccount_report/pins/`;
              }
            }
          urlString +=`?page=${this.currentPage}&page_size=${this.pagesize}`;
          if(this.searchData.pinterest_account_id != ''){
              urlString +=`&pinterest_account_id=${this.searchData.pinterest_account_id}`;
          }
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
              if(this.searchData.pinterest_account_id){
                this.tableState = 2;
                if(this.searchData.board_id){
                  this.tableState = 3;
                }
              }else{
                  this.tableState = 1;
              }
          }else{
            this.$message("Acquisition failure!");
          }
        })
        .catch(error => {
          this.$message("Interface timeout!");
        });
    },
    getPinterestFun:function(){
        this.$axios.get("/api/v1/select/account/")
        .then(res=> {
            if(res.data.code == 1){
              this.searchData.PinterestArray = res.data.data;
              if(res.data.data.length>0){
                this.searchData.pinterest_account_id = '';
                this.getBodFun();
              }else{
                this.searchData.pinterest_account_id = '';
                this.searchData.board_id = '';
                this.searchData.pin_id = '';
              }
              this.init();
            }else{
              this.$message("Acquisition failure!");
            }
        }).catch(function(errof){
          this.$message("Interface timeout!");
        });
    },
    getBodFun:function(){
      if(this.searchData.pinterest_account_id != ''){
        this.$axios.get(`/api/v1/select/board/?pinterest_account_id=${this.searchData.pinterest_account_id}`)
        .then(res=> {
            if(res.data.code == 1){
              this.searchData.BoardArray = res.data.data;
                if(res.data.data.length>0){
                  this.searchData.board_id = '';
                  this.getPinFun();
                }else{
                  this.searchData.board_id = '';
                  this.searchData.pin_id = '';
                }
                this.init();
            }else{
              this.$message("Acquisition failure!");
            }
        }).catch(function(errof){
            this.$message("Interface timeout!");
        });
      }else{
        this.searchData.board_id = '';
        this.searchData.pin_id = '';
        this.searchData.BoardArray = [];
        this.searchData.PinsArray = [];
        this.tableState = 1;
      }
    },
    getPinFun:function(){
      if(this.searchData.board_id!=''){
        this.$axios.get(`/api/v1/select/pin/?board=${this.searchData.board_id}`)
        .then(res=> {
            if(res.data.code == 1){
              this.searchData.PinsArray = res.data.data;
                this.searchData.pin_id = '';
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
        this.tableState = 2;

      }

    },
    dataSelect(){
        if(this.searchData.dataType == 0){
            this.disabledType = 0;
        }else{
            this.disabledType = 1;
            var _star;
            var _end;
            if(this.searchData.dataType == 1){
                // 昨天
                  _star = new Date(base.dateFormat(new Date(new Date().getTime()-1000*24*60*60),"day") + " 00:00:00");
                  _end = new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 00:00:00");
            }else if(this.searchData.dataType == 2){
                // 今天
                  _star = new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 00:00:00");
                  _end =  new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 00:00:00");
            }else if(this.searchData.dataType == 3){
                // 近七天
                  _star = new Date(base.dateFormat(new Date(new Date().getTime()-6*1000*24*60*60),"day") + " 00:00:00");
                  _end = new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 00:00:00");
            }else if(this.searchData.dataType == 4){
                // 本月
                var time = new Date();
                  _star = new Date(base.dateFormat(time.getFullYear()+"-"+ (time.getMonth()+1) +"-1"+ " 00:00:00"));
                  _end = new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 00:00:00");
            }else if(this.searchData.dataType == 5){
                //本年度
                var time = new Date();
                  _star = new Date(base.dateFormat(time.getFullYear()+"-1-1"+ " 00:00:00"));
                  _end = new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 00:00:00");
            }
            this.searchData.timeArray = [_star,_end]
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
<style scoped>
.sub_account_report .paging{margin-bottom: 20px;}
</style>

