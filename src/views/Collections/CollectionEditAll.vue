<template>
    <div class="shadowBox CollectionsEditAll">
        <p class="headSTitle">Collections Page All-In-One Meta Edit</p>
        <p class="littleMsg">Set the rules for title and descriptions. It can help you to increase the outfit rate in the google search result.</p>
        <el-form :model="allEditdata" :rules="rules" class="demo-form-inline" label-width="0" ref="formName">
            <p class="headSTitle MB5">Title:</p>
            <el-form-item>
                <template v-for="item in btnArray" >
                    <el-button :key="item.index" type="primary" icon="view" :disabled="!item.state" @click="titleBtnFun(item.value)">{{item.title}}</el-button>
                </template>
            </el-form-item>
            <el-form-item prop="remark_title">
                <el-input type="textarea" v-model="allEditdata.remark_title" class="W768 titleTextarea" :maxLength="70" placeholder="0 of 70 characters used"></el-input>
            </el-form-item>
            <p><el-checkbox v-model="allEditdata.titleChecked">Don't change meta title</el-checkbox></p>

            <p class="headSTitle MB5">Description:</p>
            <el-form-item>
                <template v-for="item in btnArray" >
                    <el-button :key="item.index" type="primary" icon="view" :disabled="!item.state" @click="desBtnFun(item.value)">{{item.title}}</el-button>
                </template>
            </el-form-item>
            <el-form-item prop="remark_description">
                <el-input type="textarea" v-model="allEditdata.remark_description" class="W768" :maxLength="320"   placeholder="0 of 320 characters used"></el-input>
            </el-form-item>
            <p><el-checkbox v-model="allEditdata.desChecked">Don't change meta description</el-checkbox></p>
            <el-form-item class="W768" >
                    <el-button type="primary" icon="view" @click="submitFun('formName')" style="float: right;" :disabled="subBtnState">SUBMIT</el-button>
            </el-form-item>
        </el-form>  
        <div class="showNow">
            <p class="headSTitle">Search engine listing preview</p>
            <p class="title">{{allEditdata.remark_title}}</p>
            <p class="colorGreen">charrcter.myshopify.com/products/current_product_handle</p>
            <p class="littleMsg">{{allEditdata.remark_description}}</p>
        </div>
    </div>
</template>

<script>
import * as base from '../../assets/js/base'

export default {
    name: "CollectionsEditAll",
    data() {
        return {
            rules: {
                remark_title: [
                    { required: true, message: "User title cannot be empty", trigger: "change" },
                    { min: 0, max: 100, message: "Length of 2 to 60 characters", trigger: "blur" }  
                ],
                remark_description: [
                    { required: true, message: "description cannot be empty", trigger: "blur" },
                    { min: 0, max: 100, message: "Length of 6 to 100 characters", trigger: "blur" }
                ]
            },
            btnArray:[
                {title:'Product Type',value:'%Product Type%',state:true},
                {title:'Product Title',value:'%Product Title%',state:true},
                {title:'Variants',value:'%Variants%',state:true},
                {title:'Product Description',value:'%Product Description%',state:false},
                {title:'Product Price',value:'%Product Price%',state:true},
                {title:'Domain',value:'%Domain%',state:true}
            ],
            allEditdata:{
                product_list_array:[],
                product_list:"",
                remark_title:"",
                remark_description:"",
                titleChecked:false,
                desChecked:false,
            },
            tableData:[],
            subBtnState:false,
        }
    },
    watch:{
        'allEditdata.product_list_array': {
            handler: function() {
                if(this.allEditdata.product_list_array.length == 0){
                    this.subBtnState = true;
                }else{
                    this.subBtnState = false;
                }
            },
        }
    },
    mounted() {
        this.init();
    },
    methods:{
        init(title) {
            let url = `/api/v1/product/`;
            if(title){
                url+=`?title=`+title;
            }
             this.$axios(url).then(res => {
                if(res.data.code == 1){
                    this.tableData = res.data.data;
                    if(this.tableData.length>0){
                        this.getIdList();
                    }else{
                        this.allEditdata.product_list_array = [];
                    }
                }else{
                    this.$message({message: "code Abnormal!",type: 'warning',center: true});
                }
            })
            .catch(error => {
                this.$message({message: error.message,type: 'warning',center: true});
            });      

        },
        getIdList(){
            this.allEditdata.product_list_array = [];
            this.tableData.map(e => {
                this.allEditdata.product_list_array.push(e.id);
            });
        },
        titleBtnFun(val){
            this.allEditdata.remark_title +=val + ' ';
        },
        desBtnFun(val){
            this.allEditdata.remark_description +=val + ' ';
        },
        submitFun(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.allEditdata.product_list = JSON.stringify(this.allEditdata.product_list_array); 
                    this.$axios.post('/api/v1/product_motify/',this.allEditdata)
                    .then(res => {
                        console.log(res)
                        if(res.data.code == 1){
                            this.$message({message: res.data.msg,type: 'success',center: true});
                        }else{
                            this.$message({message: res.data.msg,type: 'warning',center: true});
                        }
                    })
                    .catch(error => {
                        this.$message("Interface timeout!");
                    });
                }
            });
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
