
<template>
    <div class="pin_manager">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span> Home</a></li>
            <li><a href="/account_manager"><span class="el-icon-right"> </span> Account Manager</a></li>
            <li><a href="/board_manager"><span class="el-icon-right"> </span> Board Manager</a></li>
            <li><a><span class="el-icon-right"> </span> Pin Manager</a></li>
        </ul>
        <el-form :inline="true" ref="add_data">
            <el-form-item class="btnRight">
                <el-input v-model="pinID"  placeholder="Pin Descripttion/SKU"></el-input>
                <el-button  type="primary" @click='init()'>Search</el-button>
            </el-form-item>
             <el-button type="primary" round class="button_right" @click="deleteAll()">Bulk Delete</el-button>
        </el-form>
        <!-- 表单部分 -->
        <div class="table_right">
          <el-table :data="tableData" border ref="topictable" class="topictable"  :height="tableHeight" @selection-change="handleSelectionChange" >
            <el-table-column type="selection" label="批量操作" align="center" width="55" ></el-table-column>
            <el-table-column type="index"  label="ID" align="center"  width="60"></el-table-column>
            <el-table-column prop="pin_thumbnail" label="Pin Image" align="center" width="160">
                <template slot-scope="scope"> 
                  <el-popover
                    placement="right"
                    title=""
                    trigger="hover">
                    <img :src="scope.row.pin_image"  :style="'width: 500px;'" width="100"/>
                    <img slot="reference" :src="'data:image/jpeg;base64,'+scope.row.pin_thumbnail" :alt="'data:image/jpeg;base64,'+scope.row.pin_thumbnail" style="height: 70px;width: 70px">
                  </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="pin_note" label="Pin Description" align="center" width="160"></el-table-column>
            <el-table-column prop="pin_url" label="Pin URL" align="center" width="150">
                <template slot-scope="scope"> 
                   <a :href="scope.row.pin_url" target="_blank">{{scope.row.pin_url}}</a>      
                </template>
            </el-table-column>
            <el-table-column prop="product_sku" label="Product SKU" align="center" width="160"></el-table-column>
            <!-- <el-table-column  class="parentNodeColumn" prop="view,view_increment" label="View" align="center"  width="150">
              <template slot-scope="scope"> Total:{{scope.row.views}}<br/>Todays new:{{scope.row.views_increment}}</template>
            </el-table-column> -->
            <el-table-column  class="parentNodeColumn" prop="saves,saves_increment" label="Saves" align="center"  width="170">
              <template slot-scope="scope"> Total:{{scope.row.saves}}<br/>Todays new:{{scope.row.saves_increment}}</template>
            </el-table-column>
            <el-table-column  class="parentNodeColumn" prop="comment,comment_increment" label="Comments" align="center"  width="170">
              <template slot-scope="scope"> Total:{{scope.row.comments}}<br/>Todays new:{{scope.row.comments_increment}}</template>
            </el-table-column>
            <el-table-column prop="under_board_name" label="Board Name" align="center" width="170"></el-table-column>
            <el-table-column prop="under_account_name" label="Account Name" align="center" width="170"></el-table-column>
            <el-table-column prop="operation" align="center" label="Manage Your Pins" fixed="right" width="190">
              <template slot-scope="scope">
                  <el-button type="primary" icon="edit" size="small" @click="editFun(scope.row)">Edit</el-button>
                  <el-button type="danger" icon="delete" size="small" @click="deteleFun(scope.row,scope.$index)">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="paging">
          <el-pagination :page-sizes="pagesizes" :page-size="pagesize" @size-change="handleSizeChange" @current-change="current_change" layout="total, sizes, prev, pager, next, jumper" :total=total></el-pagination>
        </div>
        <!-- 展示请求权限的弹窗 -->
        <DialogFound :dialog='dialog' :editData='editData'  ref="dailog" ></DialogFound>
    </div>

</template>

<script>

import DialogFound from "./pin_edit";

export default {
  name: "pin_manager",
  data() {
    return {
      total:1,//默认数据总数
      pagesize:10,//每页的数据条数
      pagesizes:[10, 20, 30, 40],//分组数量
      currentPage:1,//默认开始页面
      tableHeight:"100",
      editData:{},
      pinIDInput:'',  
      pinID:'',  
      account_data:{},
      board_data:{},
      thisId:'-1',
      tableData: [],
      multipleSelection: [],//选中
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
      DialogFound
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      // 获取表格数据
        this.account_data =JSON.parse(localStorage.getItem("account_data"));
        this.board_data =JSON.parse(localStorage.getItem("board_data"));
        var url = `/api/v1/account_list/${this.account_data.pinterest_account_id}/${this.board_data.board_id}/`;
            url +=`?page=${this.currentPage}&page_size=${this.pagesize}`;
            if(this.pinID!=''){
              url += `&query_str=${this.pinID}`;
            }
        this.$axios(url).then(res => {
            this.tableData = res.data.data.results;
            this.total = res.data.data.count;
        });      
    },
    editFun(row) {
      console.log(row)
      // 编辑
      this.editData = {
        pin_id:row.pin_id,
        pin_uri:row.pin_uri,
        board:this.board_data.board_id,
        url:row.pin_url,
        note:row.pin_note
      }

      this.dialog = {
        show: true,
        title: "Edit Pin",
        option: "put"
      };
    },
    deteleFun(row, index) {
      var ids = [];
          ids.push(row.pin_id);
      var pin_list = JSON.stringify(ids);
  

      // 删除
        this.$confirm('Determine to delete', 'Tips', {
              confirmButtonText: 'Determine',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
                this.$axios.delete(`/api/v1/pin_manage/?pin_list=`+pin_list)
                  .then(res => {
                    if(res.data.code == 1){
                      this.$message({type: 'success',message: 'Successful deletion!'});
                      this.dialog.show = false;
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
    // 批量刪除
    deleteAll(){
      if(this.multipleSelection.length>0){
        var ids = [];
        this.multipleSelection.forEach(element =>{
          ids.push(element.pin_id)
        });
        var pin_list = JSON.stringify(ids);
        this.$confirm('Are you sure you wanna delete this account?', 'Warning', {
              confirmButtonText: 'Yes, I’m Sure',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
                this.$axios.delete(`/api/v1/pin_manage/?pin_list=` + pin_list)
                  .then(res => {
                    if(res.data.code == 1){
                      this.$message({type: 'success',message: 'Successful deletion!'});
                      this.dialog.show = false;
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
.pin_manager .tableTitle span{width: 230px;}
.pin_manager .btnRight .el-form-item__content{
   width: 300px; 
}
.pin_manager .btnRight .el-form-item__content .el-input{
   width: 200px; 
}
.pin_manager .btnRight .el-form-item__content .el-button.el-button--primary{
    float:right;
}
.pin_manager .button_right{
   float: right;
   margin-right: 20px;
}
</style>