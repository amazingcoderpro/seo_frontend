
<template>
    <div class="record_manager">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span> Home</a></li>
            <li><a><span class="el-icon-right"> </span> Record Manager</a></li>
        </ul>
        <el-form :inline="true" ref="add_data">
            <!-- 批量删除 -->
            <el-button type="primary" round class="Bulk_right" @click="cancelAll()">Bulk Cancel</el-button>
            <!-- 时间范围 -->
            <el-button  type="primary" class="button_left" @click='init()'>Search</el-button>
            <el-form-item class="Publish_right" label="Publish time">
              <el-date-picker type="daterange" v-model="search.creatTime" :picker-options="pickerOptions" range-separator="--" start-placeholder="start time" end-placeholder="End time" :default-time="['12:00:00']" :class="'W300'">
              </el-date-picker>
            </el-form-item>
            <!-- SKU -->
            <el-form-item class="btnRight">
                <el-input v-model="search.query_key"  placeholder="SKU / Pin / Board"></el-input>
            </el-form-item>
             <!-- 下拉框 -->
            <el-select v-model="search.state" filterable class="btnLeft W200">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form>
        
        <!-- 表单部分 -->
        <div class="table_right">
          <el-table :data="tableData" border ref="topictable" class="topictable" :height="tableHeight" @selection-change="handleSelectionChange">
            <el-table-column type="selection" label="批量操作" align="center"  width="55" ></el-table-column>
            <el-table-column type="index"  label="ID" align="center"  width="55"></el-table-column>
            <el-table-column prop="product.sku" label="SKU" align="center" width="110"></el-table-column>
            <el-table-column prop="product.image_url" label="Product Image" align="center" width="130">
                <template slot-scope="scope"> 
                  <el-popover
                    placement="right"
                    title=""
                    trigger="hover">
                    <img :src="scope.row.product.image_url"  :style="'width: 500px;'" width="100"/>
                    <img slot="reference" :src="scope.row.product.image_url" :alt="scope.row.product.image_url" style="height: 70px;width: 70px">
                  </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="product.name"  label="Description" align="center" width="150">
            </el-table-column>
            <el-table-column prop="product.url" label="Product URL" align="center" width="180">
                <template slot-scope="scope"> 
                   <a :href="scope.row.product.url" target="_blank" alt="123">{{scope.row.product.url}}</a>      
                </template>
            </el-table-column>
            <el-table-column  class="parentNodeColumn" prop="product.price" label="Price" align="center"  width="120">
            </el-table-column>
            <el-table-column prop="rule.tag" label="Tag" align="center" width="120">
                <template slot-scope="scope"> {{scope.row.rule.tag}}</template>
            </el-table-column>
            <el-table-column prop="board.pinterest_account.nickname" label="Pinterest Account Name" align="center" width="200"></el-table-column>
            <el-table-column prop="board.name" label="Board Name" align="center" width="120"></el-table-column>
            <!-- Publish Time -->
            <el-table-column label="Publish Time" align="center" width="170">
                <template slot-scope="scope">
                  <template v-if="scope.state == 1||scope.state == 3">
                    <span>{{scope.row.finished_time}}</span>
                  </template>
                  <template v-else>
                    <span>{{scope.row.execute_time}}</span>
                  </template>
                </template>
            </el-table-column>            
            <el-table-column prop="state" label="State" align="center" width="110">
              <template  slot-scope="scope">
                <template v-if="scope.row.state == 0">
                    <el-button type="primary" icon="edit" size="small" disabled="">Unpublic</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" icon="edit" size="small" @click="recordHead(scope.row)">Failed</el-button>
                </template>
              </template>
            </el-table-column>
            <el-table-column align="center" label="Edit" width="110" fixed="right" >
              <template  slot-scope="scope">
                <el-button type="danger" icon="edit" size="small" @click="cancelFun(scope.row)" >Cancel</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="paging">
          <el-pagination :page-sizes="pagesizes" :page-size="pagesize" @size-change="handleSizeChange" @current-change="current_change" layout="total, sizes, prev, pager, next, jumper" :total=total></el-pagination>
        </div>
        <!-- 展示请求权限的弹窗 -->
        <!-- <DialogFound :dialog='dialog'  ref="dailog" ></DialogFound> -->
    </div>

</template>

<script>

// import DialogFound from "./dialog/board_manager_dialog";
import * as base from '../../assets/js/base'
export default {
  name: "record_manager",
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
      tableHeight:"100",
      multipleSelection: [],//选中显示的值
      options: [
        {
          value: '[0,3]', 
          label: 'All'
        },
        {
          value: '[0]', 
          label: 'Published'
        },
        {
          value: '[3]',
          label: 'Failed'
        }
      ],
      search:{
        state:'[0,3]',
        query_key:'',
        creatTime:[],
      },

      recordID:'',  
      account_data:{},
      board_data:{},
      thisId:'-1',
      tableData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      }

    };
  },
  mounted() {
      setTimeout(() => {
        this.tableHeight = window.innerHeight - this.$refs.topictable.$el.offsetTop - 150;
      }, 50);
      window.addEventListener('resize', () => {
        if(document.getElementsByClassName("topictable").length>0){
            this.tableHeight = window.innerHeight - document.getElementsByClassName("topictable")[0].offsetTop - 150;
        }
      });
  },
 
  components: {
    //  DialogFound
  },
  created() {
    this.init();
  },
  
  methods: {
    init() {
      // 获取表格数据
        this.account_data =JSON.parse(localStorage.getItem("account_data"));
        this.board_data =JSON.parse(localStorage.getItem("board_data"));
        var urlString = `/api/v1/rule/report/?page=${this.currentPage}&page_size=${this.pagesize}&record_manager=1`;
            urlString +=`&state=${this.search.state}`;
        if(this.search.query_key !=''){
            urlString +=`&query_key=${this.search.query_key}`;
        }
        if(this.search.creatTime.length == 2){
        urlString += `&publish_time_start=${base.dateFormat(this.search.creatTime[0])}`;
        }
        if(this.search.creatTime.length == 2){
          urlString += `&publish_time_end=${base.dateFormat(new Date(this.search.creatTime[1]).getTime()+ 1000 * 24 * 60 * 60)}`;
        }
        this.$axios.get(urlString).then(res => {
          if(res.data.code == 1){
            this.tableData = res.data.data.results;
            this.tableData.map(e => {
              e.execute_time = base.getLastTime(e.execute_time);
            }); 
            this.total = res.data.data.count;
          }
        })
        .catch(error => {
          this.$message("Interface timeout!");
        });   
           
    },
    cancelFun(row){
        let newArray = [];
            newArray.push(row.id);
            newArray = JSON.stringify(newArray);
        var statedata = {
            publish_record_list :newArray  
        }
        this.$confirm('Make sure to cancel?', 'Tips', {
              confirmButtonText: 'Determine',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
                this.$axios.post(`/api/v1/rule/publish_record/delete/`,statedata)
                  .then(res => {
                    if(res.data.code == 1){
                      this.$message({type: 'success',message: 'Cancellation Successful!'});
                      this.init();
                    }else{
                      this.$message.error('Cancellation failure!');
                    }
                  })
                }) 
    },
    recordHead(row){
        this.$confirm('Do you want to publish manually?', 'Tips', {
              confirmButtonText: 'Determine',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
            this.$axios.post(`/api/v1//rule/report/send_pin/${row.id}/`)
              .then(res => {
                if(res.data.code == 1){
                  this.$message({type: 'success',message: 'Successful release!'});
                  this.init();
                }else{
                  this.$message.error( res.data.msg.detail);
                }
              })
              .catch(error => {
                this.$message.error('Interface timeout!');
              }); 
            }) 
          },
    // 批量取消
    cancelAll(){
      var ids = [];
      if(this.multipleSelection.length>0){
        this.multipleSelection.forEach(element =>{
          ids.push(element.id)
        });
        var pin_list = JSON.stringify(ids);
        var statedata = {
            publish_record_list :pin_list  
        }
        this.$confirm('Are you sure you wanna delete these pins?', 'Warning', {
              confirmButtonText: 'Yes, I’m Sure',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
                  this.$axios.post(`/api/v1/rule/publish_record/delete/`,statedata)
                  .then(res => {
                    if(res.data.code == 1){
                      this.$message({type: 'success',message: 'Successful deletion!'});
                      this.init();
                    }else{
                      this.$message.error('Delete failed!');
                    }
                  })
                  .catch(error => {
                      this.$message.error('Interface timeout!');
                  }); 
            }) 
      }else{
        this.$message.error('Please choose at least one!');
      }
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },    
    current_change(val){
        //点击数字时触发
        this.currentPage = val;
        this.init();
        this.$refs.topictable.bodyWrapper.scrollTop =0;
    },
    handleSizeChange(val){
        //修改每页显示多少条时触发
        this.pagesize = val;
        this.init();
        this.$refs.topictable.bodyWrapper.scrollTop =0;
    }
  }
};

</script>

<style>
.record_manager .btnLeft{float:right;padding-right:20px;}
.record_manager .button_right{float:right;margin-right:0px;color: #fff;font-weight: 600;margin-left: 10px;}
.record_manager .button_left{color: #fff;font-weight: 600;float: right;margin-right: 60px;}
.record_manager .Bulk_right{float: right;margin-right: 10px;}
.record_manager .Publish_right{float:right;margin-right:0px;color: #fff;margin-left: 10px;}
@media screen and (max-width:1400px){ 
  .record_manager .btnLeft {float: left;width: auto;}
}
@media screen and (max-width:1180px){ 
  .record_manager .btnRight{float:left;width: auto;}
}
</style>