<template>
    <div class="store_manager">
        <div class="tableTitle"><span>产品列表</span></div>
        <el-form :inline="true" ref="add_data">
              <el-form-item class="btnRight">
                <el-button  type="primary" @click='addFun()'>增加商户</el-button>
            </el-form-item>
        </el-form>  
        <!-- 表单部分 -->
        <div class="table_right">
          <el-table :data="tableData" border ref="topictable"  :height="tableHeight">
            <el-table-column type="selection" align="center" width="55" ></el-table-column>
            <el-table-column type="index" align="center" label="ID" width="50"></el-table-column>
            <el-table-column  prop="name" align="center" label="店铺名称"  width="150">
              <template slot-scope="scope">
                 {{scope.row.name}}
              </template>
            </el-table-column>
            <el-table-column  prop="user" align="center" label="管理员"  width="150">
              <template slot-scope="scope">
                 {{scope.row.user}}
              </template>
            </el-table-column>
            <el-table-column  prop="email" align="center" label="注册邮箱"  width="200">
              <template slot-scope="scope">
                 {{scope.row.email}}
              </template>
            </el-table-column>
            <el-table-column  prop="visitors" align="center" label="访问量"  width="150">
              <template slot-scope="scope">
                 {{scope.row.visitors}}
              </template>
            </el-table-column>
            <el-table-column  prop="scan" align="center" label="流量"  width="150">
              <template slot-scope="scope">
                 {{scope.row.scan}}
              </template>
            </el-table-column>
            <el-table-column  prop="sale" align="center" label="营收($)"  width="150">
              <template slot-scope="scope">
                 {{scope.row.sale}}
              </template>
            </el-table-column>
            <el-table-column  prop="authorized" align="center" label="是否认证"  width="150">
              <template slot-scope="scope">
                 {{scope.row.authorized}}
              </template>
            </el-table-column>
            <el-table-column  prop="create_time" align="center" label="创建时间"  width="150">
              <template slot-scope="scope">
                 {{scope.row.create_time}}
              </template>
            </el-table-column>
            <el-table-column prop="account_authorized" align="center" label="授权" width="150">
              <template slot-scope="scope">
                <el-button v-if="scope.row.account_authorized == 1"  type="primary"  size="small">已授权</el-button>
                <el-button v-else type="primary" icon="edit" size="small" @click="AutFun(scope.row)">授权</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="operation" align="center" label="operation" width="150" fixed="right" >
              <template slot-scope="scope">
                  <el-button type="primary" icon="edit" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                  <el-button type="danger" icon="delete" size="small" @click="handleDelete(scope.row,scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="paging">
          <el-pagination :page-sizes="pagesizes" :page-size="pagesize" @size-change="handleSizeChange" @current-change="current_change" layout="total, sizes, prev, pager, next, jumper" :total=total></el-pagination>
        </div>

        <!-- 弹窗 -->
        <DialogFound :dialog='dialog' ></DialogFound>

    </div>
</template>

<script>

import DialogFound from "./store_add";

export default {
  name: "store_manager",
  data() {
    return {

      currentPage:1,//默认开始页面
      total:1,//默认数据总数
      pagesize:10,//每页的数据条数
      pagesizes:[10, 20, 30, 40],//分组数量
      tableHeight:"100",
      tableData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      form: {
        name:'',
        url:'',
        eamil:'',
      }
    };
  },
  components: {
      DialogFound
  },
  created() {
    this.init();
  },
  mounted() {
      setTimeout(() => {
        this.tableHeight = window.innerHeight - this.$refs.topictable.$el.offsetTop - 150;
      }, 50);
  },
  methods: {
    init() {
      this.$axios(`/api/v1/store/?page=${this.currentPage}&page_size=${this.pagesize}`).then(res => {
         console.log("123")
       this.tableData = res.data.data.results;
        this.total = res.data.data.count;
      });
    },
    addFun() {
      // 添加
      this.dialog = {
        show: true,
        title: "添加店铺",
        option: "post"
      };
      this.form = {
        name:'',
        url:'',
        eamil:'',
      };
    },
    handleEdit(row) {
      // 编辑
      this.dialog = {
        show: true,
        title: "修改资金信息",
        option: "put"
      };
      this.form = {
        name:'',
        url:'',
        eamil:'',
      };
    },
    handleDelete(row, index) {
      // 删除
      this.$axios.delete(`/api/v1/account/users/${row.id}/`).then(res => {
        this.$message("删除成功");
        this.getProfile();
      });
    },
    AutFun(row) {
      // 获取授权
      this.$axios.post(`/api/v1/store_auth/${row.id}/`).then(res => {
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
                message: "接口超时!",
                type: 'warning',
                center: true
              });
          });
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
