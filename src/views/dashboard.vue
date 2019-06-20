<template>
    <div class="dashboard">
        <EditAll></EditAll>
        <ProductList></ProductList>
    </div>
</template>

<script>
import * as base from '../assets/js/base'
import EditAll from "./editAll";
import ProductList from "./productList";




export default {
    name: "dashboard",
    data() {
        return {

        }
    },
    components: {
        EditAll,
        ProductList
    },
    mounted() {

    },
    methods:{
        //  echarts自适应
        init() {


        },

    }
}

</script>