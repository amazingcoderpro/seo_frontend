<template>
    <div class="productShow bigBox">
        <HomeHead @parentMethod="initChild"></HomeHead>
        <HomeEdit ref="ProductEditAll"></HomeEdit>
    </div>
</template>

<script>
import * as base from '../../assets/js/base'
import HomeEdit from "./HomeEdit";
import HomeHead from './HomeHead.vue';

export default {
    name: "productShow",
    data() {
        return {
        }
    },
    components: {
        HomeHead,
        HomeEdit
    },
    mounted() {
    },
    methods:{
        initChild(name){
            //  this.$refs.ProductEditAll.init(name);
            //  this.$refs.ProductList.init(name);
        }
    }
}

</script>