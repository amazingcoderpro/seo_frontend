<template>
    <div class="productShow bigBox">
        <ProductHead @parentMethod="initChild"></ProductHead>
        <ProductEditAll ref="ProductEditAll" @parentMethod="initChild"></ProductEditAll>
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
        initChild(title){
             this.$refs.ProductEditAll.init(title);
             this.$refs.ProductList.init(title);
        }
    }
}

</script>