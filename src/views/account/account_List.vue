<template>
    <div class="account_List">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span> Home</a></li>
            <li><a><span class="el-icon-right"> </span> Account Manager</a></li>
        </ul>
        <el-form :inline="true" ref="add_data">
              <el-form-item class="btnRight">
                <!-- <el-button  type="primary" @click='addFun()'>Add</el-button> -->
                <el-button  type="primary" @click='AuthorizedFun()'>Authorized</el-button>
            </el-form-item>
        </el-form>
        <div class="table_right">
          <el-table :data="tableData" border ref="topictable" class="topictable"  :height="tableHeight">
            <el-table-column align="center" type="index"  label="ID" width="50" fixed="left"></el-table-column>
            <el-table-column label="Photo" align="center" width="150" fixed="left">
              <template slot-scope="scope">
                <template v-if="scope.row.account_thumbnail != null">
                    <img :src="'data:image/jpeg;base64,'+scope.row.account_thumbnail"  width="70" height="70"/>
                </template>
                <template v-else>
                    <img src=""  width="70" height="70"/>
                </template>
              </template> 
            </el-table-column>
            <el-table-column  class="parentNodeColumn" prop="account_name,account_email,account_create_time,account_type" label="Account Basic Info" align="center" fixed="left" width="350">
              <template slot-scope="scope"> 
                User Name : {{scope.row.account_name}}<br/>
                Create Time : {{scope.row.account_create_time}}<br/> 
                Account Type : <span v-if='scope.row.account_type == 0'>Individual</span><span v-else>business</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="account_authorized" align="center" label="Authorization" width="150">
              <template slot-scope="scope">
                <template v-if="scope.row.account_authorized == 1">
                    <span>Authorized</span>
                    <el-button  type="danger"  size="small" @click="cancelAut(scope.row)">Cancel</el-button>
                </template>
                <template v-else>
                  <el-button  type="primary"  size="small" @click="confirmFun(scope.row)">Go Authorize</el-button>
                </template>
              </template>
            </el-table-column> -->
            <el-table-column  class="parentNodeColumn" prop="pins,pins_increment" align="center" label="Pins"  width="120">
              <template slot-scope="scope"> Total : {{scope.row.pins}}<br/> New: {{scope.row.pins_increment}}</template>
            </el-table-column>
            <el-table-column  prop="repin,repin_increment" label="Saves" align="center"  width="120">
              <template slot-scope="scope"> Total : {{scope.row.saves}}<br/>New : {{scope.row.saves_increment}}</template>
            </el-table-column>
            <el-table-column  prop="comment,comment_increment" label="Comments" align="center"  width="150">
              <template slot-scope="scope"> Total : {{scope.row.comments}}<br/>New : {{scope.row.comments_increment}}</template>
            </el-table-column>
            <el-table-column prop="update_person" label="Board Details" align="center" width="150">
               <template slot-scope="scope">
                <el-button icon="edit"  type="primary"  size="small" @click="BoardManagerFun(scope.row)">View Board List</el-button>
              </template>
            </el-table-column>
            <el-table-column  prop="update_person,account_state,account_publish_time,account_crawl_time" label="Updates" align="center"  width="400">
              <template slot-scope="scope">
                 Updated By : {{scope.row.update_person}}<br/>
                 Latest Account Status : <span v-if='scope.row.account_state==0'>normal</span><span v-else>forbidden</span><br/>
                 Latest Publish Time : {{scope.row.account_publish_time}}<br/>
                 Latest Data Latch Time : {{scope.row.account_crawl_time}}
              </template>
            </el-table-column>
            <el-table-column prop="role_name" label="Rules" align="center" width="150" v-if="ruleListState">
              <template slot-scope="scope">
                <el-button icon="edit" size="small"  type="primary"  @click="ListManagerFun(scope.row)">View Rule List</el-button>
              </template>
            </el-table-column>
            <el-table-column  prop="finished,pending" align="center" label="Publish History"  width="200">
              <template slot-scope="scope">
                 Published Today : {{scope.row.finished}}<br/>
                 Unpublished Today : {{scope.row.pending}}<br/>
              </template>
            </el-table-column>
            <el-table-column prop="operation" align="center" label="Edit" width="100">
              <template slot-scope="scope">
                <el-button icon="edit" type="danger" size="small" @click="deteleFun(scope.row)">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="paging">
          <el-pagination :page-sizes="pagesizes" :page-size="pagesize" @size-change="handleSizeChange" @current-change="current_change" layout="total, sizes, prev, pager, next, jumper" :total=total></el-pagination>
        </div>
        <!-- 展示请求权限的弹窗 -->
        <DialogFound :dialog='dialog' :form='form'  ref="dailog" ></DialogFound>
        <DialogFound2 :dialog='dialog2'  ref="dailog2" ></DialogFound2>
    </div>
</template>

<script>
 import DialogFound from "./account_add";
 import DialogFound2 from "./autmsg";
export default {
  name: "account_List",
  data() {
    return {
      total:0,//默认数据总数
      pagesize:10,//每页的数据条数
      pagesizes:[10, 20, 30, 40],//分组数量
      currentPage:1,//默认开始页面

      tableHeight:"100",
      tableData: [],
      ruleListState:true,  //规则列表是否展示
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      dialog2: {
        show: false,
        title: "",
        option: "edit",
        type:0,   // 0默认是从列表进去，1从添加用户进入
      },
      pinterest_account_id:'',  //授权专用的
      pinterest_account_url:'',  //添加用户时授权，成功后返回的url
      form: {
        account: "",  //PinterestAccount唯一标识码
        nickname: "",     //账户名称
        email: "",        //登陆邮箱
        type: "",         //账号类型 (0, 'business'), (1, 'individual')
        description: "",    //账户描述
        create_time: "",    //账号创建时间
      }
    };
  },
  components: {
      DialogFound,
      DialogFound2
  },
  created() {
    this.userFun();
    this.init();
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
  methods: {
    init() {
      // 获取表格数据
      this.$axios(`/api/v1/account_list/?page=${this.currentPage}&page_size=${this.pagesize}`).then(res => {
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
    },
    addFun() {
      // 添加
      this.dialog = {
        show: true,
        title: "Add Account",
        option: "post"
      };
      this.form = {
        account: "",  //PinterestAccount唯一标识码
        nickname: "",     //账户名称
        email: "",        //登陆邮箱
      };
    },
    AuthorizedFun(){
      this.$axios.get(`/api/v1/auth/pinterest_account/`)
                      .then(res => {
                          if(res.data.code == 1){
                            window.open(res.data.data.message, 'newwindow', 'height=700, width=700, top=200, left=500, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')
                          }else{
                            this.$message("Failure to add!");
                          }
                      })
                      .catch(error => {
                        this.$message("Interface timeout!");
                      });       
    },
    EditFun(row) {
      // 添加
      this.dialog = {
        show: true,
        title: "添加账户",
        option: "post"
      };
      this.form = row;
    },
    deteleFun(row){
        var statedata = {
            state :'1'   //(0, '待执行'), (1, '删除'), (2, '过期'), (3, '运行'), (4, '暂停'), (5,"已完成")
        }
        this.$confirm('Are you sure you wanna delete this account?', 'Warning', {
              confirmButtonText: 'Confirm',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
                this.$axios.delete(`/api/v1/account_manage/${row.pinterest_account_id}/`,statedata)
                  .then(res => {
                    if(res.data.code == 1){
                      this.$message({type: 'success',message: 'Deleted successfully!'});
                      this.init();
                    }else{
                      this.$message.error('Delete failed!');
                    }
                  })
                  .catch(error => {
                     this.$message.error('Interface timeout!');
                  }); 
            }) 
    },
    AutFun() {
      if(this.pinterest_account_url ==''){
      // 获取授权
          this.$axios.post(`/api/v1/auth/pinterest_account/${this.pinterest_account_id}/`).then(res => {
              if(res.data.code == 1){
                window.open(res.data.data.message, 'newwindow', 'height=700, width=700, top=200, left=500, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')
              }else{
                  this.$message({
                    message: res.data.msg,
                    type: 'warning',
                    center: true
                  });
              }
          }).catch(error => {
                  this.$message({
                    message: "Interface timeout!",
                    type: 'warning',
                    center: true
                  });
              });
      }else{
        window.open(this.pinterest_account_url, 'newwindow', 'height=700, width=700, top=200, left=500, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')
      }
    },
    confirmFun(row){
      this.pinterest_account_id = row.pinterest_account_id;
      // 添加
      this.dialog2 = {
        show: true,
        title: "",
        option: "post"
      };
    },
    cancelAut(row){
      // 取消授权
      this.$confirm('Are you sure you wanna cancel this authorized?', 'Warning', {
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
              var data = {
                authorized:0,
                token:''
              }
              this.$axios.put(`/api/v1/auth/pinterest_account/cancel_auth/${row.pinterest_account_id}/`,data).then(res => {
                  if(res.data.code == 1){
                    this.$message({type: 'success',message: res.data.msg});
                    this.init();
                  }else{
                    this.$message.error('Delete failed!');
                  }
              })
          }) 
    },
    confirmFunTwo(url){
      this.pinterest_account_url = url;
      // 添加
      this.dialog2 = {
        show: true,
        title: "",
        option: "post",
        type:1,
      };
    },
    ListManagerFun(row) {
      // 去规则列表页面
      this.$router.push({path:"/rule_list", query: { account_id: row.pinterest_account_id }});
    },
    BoardManagerFun(row) {
      // 去board_manager页面
      localStorage.setItem("account_data",JSON.stringify( row ) );
      this.$router.push({path:"/board_manager"});
    },
    userFun(){
      const user = JSON.parse( localStorage.user);
      if(user.first_name == "test001"){
        this.ruleListState = false;
      }    
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

</style>
