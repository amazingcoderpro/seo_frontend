<template>
    <div class="dashboard">
        <HeadNav @parentMethod="initChild"></HeadNav>
        <EditAll ref="EditAll"></EditAll>
        <ProductList ref="ProductList"></ProductList>
    </div>
</template>

<script>
import * as base from '../assets/js/base'
import EditAll from "./editAll";
import ProductList from "./productList";
import HeadNav from '../components/HeadNav.vue';

export default {
    name: "dashboard",
    data() {
        return {
        }
    },
    components: {
        HeadNav,
        EditAll,
        ProductList
    },
    mounted() {

    },
    methods:{
        initChild(name){
            console.log(name)
             this.$refs.EditAll.init(name);
             this.$refs.ProductList.init(name);
        }

    }
}

</script>