<template>
  <div class="role_manager">
    <div class="tableTitle"><span>角色管理</span></div>
    <!-- 搜索框 -->
    <div class="btnLeft">
      <el-input v-model="input" placeholder="请输入用户名"></el-input>
      <el-button type="primary" icon="el-icon-search" class="seek">搜索</el-button>
    </div>
    <!-- 添加 -->
    <div>
      <el-form :inline="true" ref="add_data">
        <el-form-item class="btnRight">
          <el-button type="primary" size="small" icon="view" @click="onAddMoney()">增加角色</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表单部分 -->
    <div class="table_right">
      <el-table
        :data="tableData"
        ref="topictable"
        :height="tableHeight"
        border
        >
        <el-table-column prop="name" label="角色" align="center" width="400"></el-table-column>
        <el-table-column prop="create_time" label="创建时间" align="center" width="400">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="update_time" label="更新时间" align="center" width="400">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.update_time }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operation" align="center" label="operation" fixed="right" width="400">
          <template slot-scope="scope">
             <el-button type="warning" icon="edit" size="small" @click="handleEdit(scope.row)">编辑</el-button>
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
    <!-- 分页 -->
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
    <DialogFound :dialog="dialog" :form="form" @update="getProfile"></DialogFound>
  </div>
</template>

<script>
import DialogFound from "./role_add";

export default {
  name: "role_manager",
  data() {
    return {
      total:1,//默认数据总数
      pagesize:10,//每页的数据条数
      pagesizes:[10, 20, 30, 40],//分组数量
      currentPage:1,//默认开始页面
      tableHeight:"100",
      input: '',

      tableData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      form: {
        id: "",
        name: "",
        menu_list: ""
      }
    };
  },
   mounted() {
      setTimeout(() => {
        this.tableHeight = window.innerHeight - this.$refs.topictable.$el.offsetTop - 150;
      }, 50);
  },
  components: {
    DialogFound
  },
  created() {
    this.getProfile();
  },
  
  methods: {
     current_change(currentPage){
      this.currentPage = currentPage;
    },
    getProfile() {
      // 获取表格数据
      this.$axios("/api/v1/account/role/?page=1&page_size=10").then(res => {
        this.tableData = res.data.data.results;
        this.total = res.data.data.count;
      });
    },
    handleDelete(row) {
      // 删除
      this.tree = {
        show: true,
        title: "修改资金信息",
        option: "put"
      };
      this.form = {
        id: row.id,
        username: row.username,
        password: row.password,
        password2: row.password,
        email: row.email,
        last_name: row.last_name
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
        id: row.id,
        username: row.username,
        password: row.password,
        password2: row.password,
        email: row.email,
        last_name: row.last_name
      };
    },
    handleDelete(row, index) {
      // 删除
      this.$axios.delete(`/api/v1/role/8/${row.id}/`).then(res => {
        this.$message("删除成功");
        this.getProfile();
      });
    },
    onAddMoney() {
      // 添加
      this.dialog = {
        show: true,
        title: "增加角色",
        option: "post"
      };
      this.form = {
        id: "",
        username: "",
        password: "",
        password2: "",
        email: "",
        last_name: ""
      };
    }
  }
};
</script>
<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.role_manager .btnLeft {
  float: left;
  display: flex;
}
.seek {
  margin-left: 5px;
  padding: 11px 20px;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
.block {
  float: right;
  padding-top: 10px;
}
</style>