<template>
    <div class="index"> 
        <!-- <HeadNav></HeadNav> -->
        <div class="rightContainer">
            <router-view></router-view>
        </div>
        <input id="pageToken" type="hidden" :value="eleToken">
    </div>
</template>

<script>
import HeadNav from '../components/HeadNav.vue';
export default {
    name: "index",
    components:{
        HeadNav
    },
    data(){ 
        return {
            eleToken:""
        }   
    },
    created(){            // 回车事件
      this.eleToken = localStorage.eleToken;

    }
}
</script>

<style>
html, body {margin: 0;padding: 0;}
.index{
  width: 100%;
  height: 100%;
}

</style>