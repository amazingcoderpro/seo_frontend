<template>
    <div class="RuleList">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span> Home</a></li>
            <li><a><span class="el-icon-right"> </span> Rule Manager</a></li>
        </ul>
        <el-form :inline="true" :model="searchData" class="demo-form-inline" v-if="account_id == null" label-width="100px">
          <el-form-item label="Pinterest">
            <el-select v-model="searchData.pinterest" placeholder="Pinterest"  @change="pinterestChange" :class="'W200'">
              <el-option :label="'All'" :value="''"></el-option>
              <el-option v-for="(item,index) in pinterestArray" :key="index" :label="item.account" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Board">
            <el-select v-model="searchData.board" placeholder="Board" :class="'W200'">
              <el-option :label="'All'" :value="'-1'"> </el-option>
              <template v-for="item in pinterestArray">
                <template v-if="item.id == searchData.pinterest">
                    <el-option v-for="(items,index) in item.board_pinterest_account" :key="index" :label="items.name" :value="items.id"> </el-option>
                </template>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="Tag">
            <el-input placeholder="Tag" v-model="searchData.tag" :class="'W200'"></el-input>
          </el-form-item>
          <el-form-item label="CreatTime">
              <el-date-picker type="daterange" v-model="searchData.creatTime" :picker-options="pickerOptions" range-separator="--" start-placeholder="start time" end-placeholder="End time" :default-time="['12:00:00']" :class="'W300'">
              </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="init">Search</el-button>
          </el-form-item>
          <el-form-item :class="'FR'">
            <el-button type="primary" @click="addFun">Add</el-button>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="searchData" class="demo-form-inline" v-if="account_id != null">
          <el-form-item :class="'FR'">
            <el-button type="primary" @click="addFun">Add</el-button>
          </el-form-item>
        </el-form>
      
        <!-- 表单部分 -->
        <div class="table_right">
          <el-table :data="tableData" border ref="topictable" class="topictable"  :height="tableHeight">
            <el-table-column align="center" type="index"  label="ID" width="50"></el-table-column>
            <el-table-column  align="center"  class="parentNodeColumn" prop="tag" label="Tag"  width="155">
              <template slot-scope="scope"> {{scope.row.tag}}</template>
            </el-table-column>
            <el-table-column  align="center" class="parentNodeColumn" prop="create_time" label="Create Time"  width="180">
              <template slot-scope="scope"> {{scope.row.create_time}}</template>
            </el-table-column>
            <el-table-column  align="center" class="parentNodeColumn" prop="start_time,end_time" label="Date Of Validity"  width="180">
              <template slot-scope="scope"> {{scope.row.start_time}}<br/>{{scope.row.end_time}}  </template>
            </el-table-column>
            <el-table-column  align="center" class="parentNodeColumn" prop="schedule_rule" label="Time Of Validity"  width="348">
            <template slot-scope="scope" >
                <div  v-for="item in scope.row.schedule_rule" :key="item.id">
                    <template>
                        <span :class="'spanClass'" v-if="item.weekday == 0">Monday</span>
                        <span :class="'spanClass'" v-else-if="item.weekday == 1">Tuesday</span>
                        <span :class="'spanClass'" v-else-if="item.weekday == 2">Wednesday</span>
                        <span :class="'spanClass'" v-else-if="item.weekday == 3">Thursday</span>
                        <span :class="'spanClass'" v-else-if="item.weekday == 4">Friday</span>
                        <span :class="'spanClass'" v-else-if="item.weekday == 5">Saturday </span>
                        <span :class="'spanClass'" v-else>Sunday</span>
                    </template>
                    |{{item.start_time}}|{{item.end_time}}|发布频率{{item.interval_time}}
                    <br/>
                </div>
            </template>
            </el-table-column>
            <el-table-column  align="center" class="parentNodeColumn" prop="product_list" label="Products"  width="155">
              <template slot-scope="scope"> {{JSON.parse(scope.row.product_list).length }}</template>
            </el-table-column>
            <el-table-column  align="center" class="parentNodeColumn" prop="account_name" label="Account Name"  width="155">
              <template slot-scope="scope"> {{scope.row.account_name}}</template>
            </el-table-column>
            <el-table-column  align="center" class="parentNodeColumn" prop="board_name" label="Board Name"  width="155">
              <template slot-scope="scope"> {{scope.row.board_name}}</template>
            </el-table-column>
            <el-table-column prop="operation" align="center" label="Operation" width="260" fixed="right">
              <template slot-scope="scope">
                <template v-if="scope.row.state == -1 || scope.row.state == 0 || scope.row.state == 1">
                  <el-button type="primary" icon="edit" size="small" @click="stopFun(scope.row)">Stop</el-button>
                </template>
                <template v-else>
                  <el-button type="primary" icon="edit" size="small" @click="stopFun(scope.row)" disabled="">Stop</el-button>
                </template>
                <el-button type="primary" icon="edit" size="small" @click="cloneFun(scope.row)">Clone</el-button>
               
                <el-button type="danger" icon="edit" size="small" @click="deteleFun(scope.row)">Detele</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="paging">
          <el-pagination :page-sizes="pagesizes" :page-size="pagesize" @size-change="handleSizeChange" @current-change="current_change" layout="total, sizes, prev, pager, next, jumper" :total=total></el-pagination>
        </div>
        <!-- 展示请求权限的弹窗 -->
        <DialogFound :dialog='dialog'></DialogFound>
        <DialogFound2 :dialog='dialog2' :cloneData='cloneData'></DialogFound2>
        
    </div>
</template>

<script>
import DialogFound from "./rule_add";
import DialogFound2 from "./rule_clone";
import * as base from '../../assets/js/base'
export default {
  name: "RuleList",
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

        searchData:{
          tag:'',  
          creatTime:[],
          pinterest:'',
          board:''
        },
        pinterestArray:[],
        boardArray:[],
        account_id:null,
        tableHeight:"100",
        tableData: [],
        dialog: {
            show: false,
            title: "",
            option: "edit"
        },
        dialog2: {
            show: false,
            title: "",
            option: "edit"
        },
        cloneData:null,
    };
  },
  components: {
      DialogFound,
      DialogFound2
  },
  created() {
    this.account_id = this.$route.query.account_id;
    if(this.account_id){
      this.searchData.creatTime = [];
      this.init();
    }else{
      this.searchInit();
    }
  },
  mounted() {
      setTimeout(() => {
        this.tableHeight = window.innerHeight - this.$refs.topictable.$el.offsetTop - 150;
      }, 50);
      window.addEventListener('resize', () => {
        if(document.getElementsByClassName("topictable").length>0){
          this.tableHeight = window.innerHeight - document.getElementsByClassName("topictable")[0].offsetTop - 150;
        }
     //   this.tableHeight = window.innerHeight - this.$refs.topictable.$el.offsetTop - 150;
      });
  },
  methods: {
    init() {
      // 获取表格数据
        var urlString = `/api/v1/rule/?page=${this.currentPage}&page_size=${this.pagesize}`;
        if(this.account_id != null || this.account_id != undefined ){
          urlString += `&account_id=${this.account_id}`;
        }
        if(this.searchData.tag != ''){
          urlString += `&tag=${this.searchData.tag}`;
        }
        if(this.searchData.creatTime.length == 2){
          urlString += `&begin_time=${base.dateFormat(this.searchData.creatTime[0])}`;
        }
        if(this.searchData.creatTime.length == 2){
          urlString += `&end_time=${base.dateFormat(new Date(this.searchData.creatTime[1]).getTime()+ 1000 * 24 * 60 * 60)}`;
        }
        if(this.searchData.board != ''){
          var _thisboardlist = new Array();

              if(this.searchData.board == -1){
                _thisboardlist = this.boardArray;
              }else{
                _thisboardlist.push(this.searchData.board);
              }
              if(_thisboardlist.length>0){
                _thisboardlist = JSON.stringify(_thisboardlist)
                urlString += `&board_list=`+_thisboardlist;
              }
        }
        this.$axios.get(urlString)
        .then(res => {
          if(res.data.code==1){
              res.data.data.results.map(e => {
                e.create_time = base.getLastTime(e.create_time);
                e.end_time = base.getLastTime(e.end_time);
                e.start_time = base.getLastTime(e.start_time);
              });   
              this.tableData = res.data.data.results;
              this.total = res.data.data.count;
          }else{
            this.$message("Acquisition failure!");
          }
        })
        .catch(error => {
            this.$message("Interface timeout!");
        });
    },
    searchInit(){
        var  _star = new Date(base.dateFormat(new Date(new Date().getTime()-6*1000*24*60*60),"day") + " 00:00:00");
        var  _end = new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 00:00:00");
        this.searchData.creatTime = [_star,_end]
        this.$axios.get("/api/v1/rule/pinterest_account_board/?authorized=[0,1]")
        .then(res => {
            if(res.data.code == 1){
              this.pinterestArray = res.data.data;
              this.searchData.pinterest = '';
              this.searchData.board = '-1';
              this.init();
            }
        })
        .catch(error => {
            this.$message("Interface timeout!");
        });
    },
    addFun() {
      // 添加
      this.dialog = {
        show: true,
        title: "Add Rule",
        option: "post"
      };
    },
    cloneFun(row) {
      // 克隆
      this.cloneData = row;
      this.dialog2 = {
        show: true,
        title: "Clone Rule",
        option: "post"
      };

    },
    
    stopFun(row){
        var statedata = {
            state :'2'   //((-1, "新建"), (0, '待执行'), (1, '运行中'), (2, '暂停中'), (3, '已完成'), (4, '已过期'), (5, '已删除'))
        }
        this.$confirm('Are you sure you wanna stop this rule?', 'Warning', {
              confirmButtonText: 'Confirm',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
                this.$axios.put(`/api/v1/rule/state/${row.id}/`,statedata)
                  .then(res => {
                    if(res.data.code == 1){
                      this.$message({type: 'success',message: 'stop successfully!'});
                      this.init();
                    }else{
                      this.$message.error('stop failed!');
                    }
                  })
                  .catch(error => {
                      this.$message("Interface timeout!");
                  });
            }) 
    },
    deteleFun(row){
        var statedata = {
            state :'5'   //((-1, "新建"), (0, '待执行'), (1, '运行中'), (2, '暂停中'), (3, '已完成'), (4, '已过期'), (5, '已删除'))
        }
        this.$confirm('Are you sure you wanna delete this rule?', 'Warning', {
              confirmButtonText: 'Confirm',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
                this.$axios.put(`/api/v1/rule/state/${row.id}/`,statedata)
                  .then(res => {
                    if(res.data.code == 1){
                      this.$message({type: 'success',message: 'Deleted successfully!'});
                      this.init();
                    }else{
                      this.$message.error('Delete failed!');
                    }
                  })
                  .catch(error => {
                      this.$message("Interface timeout!");
                  });
            }) 
    },
    pinterestChange(){
      //pinterest账户变更触发的事件
      if(this.searchData.pinterest == ''){
              this.searchData.board = '-1';
      }else{
        this.boardArray = [];
        this.pinterestArray.map(e => {
          if(e.id == this.searchData.pinterest){
            if(e.board_pinterest_account.length>0){
              this.searchData.board = e.board_pinterest_account[0].id;
              e.board_pinterest_account.map(s => {
                this.boardArray.push(s.id);
              });
            }else{
              this.searchData.board = '-1';
            }
          }
        });
      }   
    },
    ListManagerFun(row) {
      // 去规则详情页面
      this.$router.push({path:"/list_manager", query: { index: row.index }});
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
