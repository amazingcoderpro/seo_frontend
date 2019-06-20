<template>
    <div class="index"> 
        <HeadNav></HeadNav>
        <div class="rightContainer">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import HeadNav from '../components/HeadNav.vue';
export default {
    name: "index",
    components:{
        HeadNav
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