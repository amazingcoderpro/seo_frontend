<template>
  <div class="user_manager">
    <div class="tableTitle"><span>用户管理</span></div>
    <!-- 搜索框 -->
    <div class="btnLeft">
        <el-input
          placeholder="请输入用户名"
          v-model="nickName"
          clearable size="small">
        </el-input>
      <el-button type="primary" icon="el-icon-search"  size="small" @click="init()">搜索</el-button>
    </div>
    <!-- 新增账户 -->
    <div class="btnRight">
        <el-button type="primary" size="small" icon="view" @click="handleAdd()">增加用户</el-button>
    </div>
    <!-- 表单部分 -->
    <div class="table_container">
      <el-table
        :data="tableData"
        ref="topictable"
        :height="tableHeight"
        border
      >
        <el-table-column prop="id" label="序号" align="center" width="70"></el-table-column>
        <el-table-column prop="nickname" label="用户名" align="center" width="150">
          <template slot-scope="scope">
            <span style="color:#00d053">{{ scope.row.nickname }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="role_name" label="角色" align="center" width="250"></el-table-column>
        <el-table-column prop="username" label="登录账号" align="center" width="250"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center" width="250"></el-table-column>
        <el-table-column prop="create_time" label="创建时间" align="center" width="250">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="update_time" label="更新时间" align="center" width="250">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.update_time }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operation" align="center" label="operation" fixed="right" width="190">
          <template slot-scope="scope">
            <el-button type="primary" icon="edit" size="small" @click="editFun(scope.row)">编辑</el-button>
            <el-button
              type="danger"
              icon="delete"
              size="small"
              @click="handleDelete(scope.row,scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页器 -->
      <div class="paging" style="text-align: right;  padding-right: 20px;padding-top: 20px;">
          <el-pagination
            :page-sizes="pagesizes"
            :page-size="pagesize"
            @current-change="current_change"
            layout="total, sizes, prev, pager, next, jumper"
            :total=total
          >
          </el-pagination>
      </div>
    <!-- 弹框页面 -->
    <DialogFound :dialog="dialog" :form="form" @update="init" ref="dialog"></DialogFound>
    <DialogFoundEdit :dialogEdit="dialogEdit" :form="form" @update="init" ref="dialog"></DialogFoundEdit>
  </div>
</template>

<script>
import DialogFound from "./user_add";
import DialogFoundEdit from "./user_edit";

export default {
  name: "user_manager",
  data() {

    return {
      total:1,//默认数据总数
      pagesize:10,//每页的数据条数
      pagesizes:[10, 20, 30, 40],//分组数量
      currentPage:1,//默认开始页面
      tableHeight:"100",
     
      nickName:'',
      tableData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      dialogEdit: {
        show: false,
        title: "",
        option: "edit"
      },
      form: {
        id: "",
        username: "",
        password: "",
        password2: "",
        email: "",
        nickname: ""
      }
    };
  },
  mounted() {
      setTimeout(() => {
        this.tableHeight = window.innerHeight - this.$refs.topictable.$el.offsetTop - 150;
      }, 50);
  },
  components: {
    DialogFound,
    DialogFoundEdit
  },
  created() {
    this.init();
  },
  methods: {
      current_change(currentPage){
      this.currentPage = currentPage;
    },
    init() {
      // 获取表格数据
          this.$axios(`/api/v1/users/?page=${this.currentPage}&page_size=${this.pagesize}&nickname=${this.nickName}&`).then(res => {
            this.tableData = res.data.data.results;
            this.total = res.data.data.count;
          });
    },
    editFun(row) {
      // 编辑
      this.dialogEdit = {
        show: true,
        title: "编辑信息",
        option: "put"
      };
      this.form = {
        id: row.id,
        nickname:row.nickname,
        role:row.role,
        username: row.username,
        password: row.password,
        password2: row.password2,
        email: row.email,
        last_name: row.last_name
      };
    },
    handleAdd() {
      // 添加
      this.dialog = {
        show: true,
        title: "增加用户",
        option: "post"
      };
      this.form = {
        nickname:"",
        username: "",
        password: "",
        password2: "",
        email: "",
        role_name:"",
      };
    }
  }
};
</script>
<style scoped>
.user_manager .btnLeft{
  width:500px;
  display: inline-block;
}
.user_manager .btnLeft .el-input {
    width: 220px;
    margin-right: 10px;
}
.user_manager .btnRight{
    float: right;
    margin-bottom: 10px;
    margin-right: 16px;
}

</style>