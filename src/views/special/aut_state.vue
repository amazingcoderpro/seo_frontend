<template>
    <div class="aut_state">
        <span v-if="state == 1" :style="'margin-left:-150px;'">Successful authorization!</span>
        <span v-else-if="state == 2">failed authorization,Please try again later!</span>
        <span v-else :style="'margin-left:-326px;'">This account has authorized! Please don't authorize again!  </span>
        <div class="timer">{{'Jump to the home page after '+timer+' seconds'}}</div>
    </div>

</template>


<script>
import * as base from '../../assets/js/base'
// import router from '../../router'
export default {
    name: "aut_state",
    components:{},
    data(){    
      return {
        state:1,
        timer:5
      }
    },
    created() {
      this.secFun();
      this.init();
    },
    methods: {
      init(){
        this.state = base.getQueryString('state') == null?1:base.getQueryString('state');
        setTimeout(() => {
              base.LoginOut();
              this.$router.push('/login');
              // window.close();
        }, 5000);
      },
      secFun(){
        var _thisTime = setInterval(() => {
            this.timer -= 1; 
            this.timer == 0?clearInterval(_thisTime):null;
            console.log(111)
        },1000);
        
      }
    }
};
</script>

<style scoped>
.aut_state{position:relative;width:100%;height:100%;background:url(../../assets/img/bg.jpg) no-repeat center center;background-size:100% 100%;}
.aut_state span{position:absolute;left:50%;top:50%;background:#fff;padding:20px;font-size:20px;font-weight:600;border-radius:20px;margin-left:-240px;margin-top:-33px;word-break:keep-all;}
.aut_state .timer{position:absolute;left:50%;top:60%;margin-left:-150px;}
</style>
