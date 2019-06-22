<template>
    <div class="productShow bigBox">
        <ProductHead @parentMethod="initChild"></ProductHead>
        <ProductEditAll ref="ProductEditAll"></ProductEditAll>
        <ProductList ref="ProductList"></ProductList>
    </div>
</template>

<script>
import * as base from '../../assets/js/base'
import ProductEditAll from "./productEditAll";
import ProductList from "./productList";
import ProductHead from './productHead.vue';

export default {
    name: "productShow",
    data() {
        return {
        }
    },
    components: {
        ProductHead,
        ProductEditAll,
        ProductList
    },
    mounted() {
    },
    methods:{
        initChild(name){
             this.$refs.ProductEditAll.init(name);
             this.$refs.ProductList.init(name);
        }
    }
}

</script>