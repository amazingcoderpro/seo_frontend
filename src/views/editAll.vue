<template>
    <div class="shadowBox editAll">
        <p class="headSTitle">Product Page All-In-One Meta Edit</p>
        <p class="littleMsg">Set the rules for title and descriptions. It can help you to increase the outfit rate in the google search result.</p>
        <el-form :model="allEditdata" class="demo-form-inline" label-width="0">
            <p class="headSTitle MB5">Title:</p>
            <el-form-item>
                <template v-for="item in titleBtnArray" >
                    <el-button :key="item.index" type="primary" icon="view" @click="titleBtnFun(item.value)">{{item.title}}</el-button>
                </template>
            </el-form-item>
            <el-form-item>
                <el-input type="textarea" v-model="allEditdata.titleVal" class="W600"  placeholder="0 of 70 characters used"></el-input>
            </el-form-item>
            <p><el-checkbox v-model="allEditdata.titleChecked">Don't change meta title</el-checkbox></p>

            <p class="headSTitle MB5">Description:</p>
            <el-form-item>
                <template v-for="item in desBtnArray" >
                    <el-button :key="item.index" type="primary" icon="view" @click="titleBtnFun(item.value)">{{item.title}}</el-button>
                </template>
            </el-form-item>
            <el-form-item>
                <el-input type="textarea" v-model="allEditdata.desVal" class="W600"  placeholder="0 of 320 characters used"></el-input>
            </el-form-item>
            <p><el-checkbox v-model="allEditdata.desChecked">Don't change meta description</el-checkbox></p>
            <el-form-item class="W600" >
                    <el-button type="primary" icon="view" @click="submitFun()" style="float: right;">SUBMIT</el-button>
            </el-form-item>
        </el-form>  

        <div class="showNow">
            <p class="headSTitle">Search engine listing preview</p>
            <p class="title">{{allEditdata.titleVal}}</p>
            <p class="colorGreen">charrcter.myshopify.com/products/current_product_handle</p>
            <p class="littleMsg">{{allEditdata.desVal}}</p>
        </div>



    </div>

</template>

<script>
import * as base from '../assets/js/base'

export default {
    name: "editAll",
    data() {
        return {
            titleBtnArray:[
                {title:'Product Type',value:0},
                {title:'Product Title',value:0},
                {title:'Variants',value:0},
                {title:'Product Description',value:0},
                {title:'Product Price',value:0},
                {title:'Domain',value:0}
            ],
            desBtnArray:[
                {title:'Product Type',value:0},
                {title:'Product Title',value:0},
                {title:'Variants',value:0},
                {title:'Product Description',value:0},
                {title:'Product Price',value:0},
                {title:'Domain',value:0}
            ],
            allEditdata:{
                titleVal:"Here's an Example of Product Title for All of the Products",
                desVal:"Here you can see the example of Meta Description that you will match will the relevant tag, it's will show you a snippet looks like in the google search results.",
                titleChecked:false,
                desChecked:false,
            }
        }
    },
    mounted() {

    },
    methods:{
        //  echarts自适应
        init() {


        },
        titleBtnFun(num){
            console.log(num)
        },
        submitFun(){

        }

    }
}

</script>
<style>

.showNow p{
margin:5px 0;
}
.showNow .title{
    font-size: 16px;
    font-weight: 600;
    color: #0033FF;
}

</style>
