<template>
    <header class="head-nav">
        <div class="headContent">
            <div class="tableTitle">
              <span>SEO META EDIT</span>
            </div>


        </div>








    </header>
</template>
<script>

import * as base from '../assets/js/base'

export default {
  name: "head_nav",
  data() {
    return {
      dialog: {
        show: false,
        title: "",
        option: "edit"
      }
    };
  },
  computed: {
    user() {
      if(window.localStorage.getItem('user') == undefined){
        base.LoginOut();
      }else{
        return window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : this.$store.getters.user
      }
    }
  },
  components: {
  },
  methods: {
    setDialogInfo(cmditem) {
      if (!cmditem) {
        this.$message("菜单选项缺少command属性");
        return;
      }
      switch (cmditem) {
        case "modify_password":
          this.changeMsg();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    modifyPassword() {
      // 修改密码
      this.$router.push("/modifyPassword");
    },
    logout() {
      // 清除token
      this.$store.dispatch("clearCurrentState");
      base.LoginOut();
    },
    changeMsg(){
      this.dialog = {
        show: true,
        title: "Modify Password",
        option: "put"
      };

    }
  }
};
</script>

<style scoped>
.head-nav {
    width: 100%;
    min-width: 600px;
    padding: 5px;
    background: #fff;
    color: #fff;
    border-bottom: 0px;
}
.headContent{
    width: 1200px;
    margin: 0 auto;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
}
.logo {
    margin-left: 20px;
    margin-right: 5px;
    vertical-align: middle;
    display: inline-block;
    width: 42px;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
}
.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}

</style>
