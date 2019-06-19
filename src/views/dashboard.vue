<template>
    <div class="dashboard">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span> Home</a></li>
            <li><a><span class="el-icon-right"> </span> Dashboard</a></li>
        </ul>
        <el-form :inline="true">
            <el-form-item label="Date Range">
                <el-select v-model="searchData.dataType" placeholder="Yesterday" class="week_name" @change="dataSelect">
                    <el-option
                    v-for="item in dataArray"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    class="W200"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <!-- 日期时间范围 -->
            <el-date-picker
                v-model="searchData.timeArray"
                type="daterange" 
                range-separator="--"
                start-placeholder="start time"
                end-placeholder="End time"
                :disabled="disabledType=='1'"
                :picker-options="pickerOptions"
                class="W300"
                >
            </el-date-picker>
            <el-button type="primary" icon="view" @click="init()">Search</el-button>
        </el-form>
        <div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart"></div>
        
        <div class="menu">
            <template v-for="item in chartBtnArray" >
                    <div :key="item.btnValue" class="menuSon active"  v-if="tableType == item.btnValue"  @click="tableInit(item.btnValue)" >
                        <span class="point "></span>
                        <span class="name">{{item.btnName}}</span>
                    </div>
                    <div :key="item.btnValue" class="menuSon"  v-else  @click="tableInit(item.btnValue)" >
                        <span class="point "></span>
                        <span class="name">{{item.btnName}}</span>
                    </div>
            </template>
        </div>
        <!-- 表单部分 -->
        <div class="table_right MB10">
          <el-table :data="tableData" border ref="topictable">
            <el-table-column  align="center"  class="parentNodeColumn" prop="subaccount_num" label="Accounts"  width="200"></el-table-column>
            <el-table-column  align="center"  class="parentNodeColumn" prop="board_num" label="Boards"  width="200"></el-table-column>
            <el-table-column  align="center"  class="parentNodeColumn" prop="pin_num" label="Pins"  width="200"></el-table-column>
            <el-table-column  align="center"  class="parentNodeColumn" prop="pin_saves" label="Saves"  width="200"></el-table-column>
            <el-table-column  align="center"  class="parentNodeColumn" prop="visitor_num" label="Visitors"  width="200"></el-table-column>
            <el-table-column  align="center"  class="parentNodeColumn" prop="click_num" label="Clicks"  width="200"></el-table-column>
            <el-table-column  align="center"  class="parentNodeColumn" prop="sales_num" label="Sales"  width="200"></el-table-column>
            <el-table-column  align="center"  class="parentNodeColumn" prop="revenue_num" label="Revenues"  ></el-table-column>
          </el-table>
        </div>
        <div class="bottomBox">
            <div class="leftBox">
                <div class="LTBox">
                    <div class="indexTitle">Latest Updates</div>
                    <div class="TC">
                        <div class="LTTime">
                            <p>{{updatesData.datetime}}</p>
                            <p>Latest Update Time</p>
                        </div>
                        <div class="bigNum">{{updatesData.new_saves}}</div>
                        <div class="smText">New Saves</div>
                        <div class="bigNum">{{updatesData.new_followers}}</div>
                        <div class="smText">New Followers</div>
                        <div class="bigNum">{{updatesData.new_pins}}</div>
                        <div class="smText">New Pins</div>
                        <div class="bigNum">{{updatesData.new_board}}</div>
                        <div class="smText">New Boards</div>
                        <div class="bigNum">{{updatesData.new_accounts}}</div>
                        <div class="smText">New Accounts</div>
                    </div>
                </div>
                <div class="LBBox">
                    <div class="indexTitle">Activity Log</div>
                    <div>
                        <div class="LBTable">
                            <table cellspacing="0">
                                <thead>
                                    <tr>
                                        <td>User</td>
                                        <td>Action</td>
                                        <td>Date</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,index) in ActivityArray" :key="index">
                                        <td>{{item.username}}</td>
                                        <td>{{item.action}}</td>
                                        <td>{{item.operation_time}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rightBox">
                <div class="RTBox">
                    <div class="indexTitle">Top Pins</div>
                    <div>
                        <table cellspacing="0">
                            <thead>
                                <tr>
                                    <td>Pin ID</td>
                                    <td>SKU</td>
                                    <td>Image</td>
                                    <td>Pin Date</td>
                                    <td>Saves</td>
                                    <td>Trends</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in pinsArray" :key="index">
                                    <td>{{item.pin_uri}}</td>
                                    <td>{{item.SKU}}</td>
                                    <td>
                                        <a :href="item.pin_url" target="_blank">
                                            <img :src="'data:image/jpeg;base64,'+ item.image" width="70" height="70" />
                                        </a>
                                    </td>
                                    <td>{{item.pin_date}}</td>
                                    <td>{{item.saves}}</td>
                                    <td class="iconfont_left">
                                        <span>{{item.trends*100+'%'}}</span>
                                        <template v-if="item.trends<0">
                                            <i class="iconfont icon-xiangxiajiantou"></i>
                                        </template>
                                        <template v-else>
                                            <i class="iconfont icon-xiangshangjiantou"></i>
                                        </template>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="RBBox">
                    <div class="indexTitle">Top Board</div>
                    <div>
                        <table cellspacing="0">
                            <thead>
                                <tr>
                                    <td>Board Name</td>
                                    <td>Pins</td>
                                    <td>Saves</td>
                                    <td>Create Date</td>
                                    <td>Followers</td>
                                    <td>Trends</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in BoardArray" :key="index">
                                    <td>
                                        <a :href="item.board_url" target="_blank">
                                            {{item.board_name}}
                                        </a>
                                    </td>
                                    <td>{{item.pins}}</td>
                                    <td>{{item.saves}}</td>
                                    <td>{{item.create_date}}</td>
                                    <td>{{item.followers}}</td>
                                    <td class="iconfont_left">
                                        <span>{{item.trends*100+'%'}}</span> 
                                        <template v-if="item.trends<0">
                                            <i class="iconfont icon-xiangxiajiantou"></i>
                                        </template>
                                        <template v-else>
                                            <i class="iconfont icon-xiangshangjiantou"></i>
                                        </template>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="el-loading-mask is-fullscreen" style="background-color: rgba(0, 0, 0, 0.7); z-index: 2000;" v-if="loadingState.dashboardOne || loadingState.dashboardTwo || loadingState.dashboardThree || loadingState.dashboardFour || loadingState.dashboardFive ">
            <div class="el-loading-spinner">
            <svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>
            <p class="el-loading-text">加载中...</p>
            </div>
        </div>
    </div>

</template>

<script>
import echarts from 'echarts'
import * as base from '../assets/js/base'
export default {
    name: "dashboard",
    props: {
        className: {
        type: String,
        default: 'yourClassName'
        },
        id: {
        type: String,
        default: 'yourID'
        },
        width: {
        type: String,
        default: '100%'
        },
        height: {
        type: String,
        default: '400px'
        }
    },
    data() {
        return {
            loadingState:{
                dashboardOne:true,
                dashboardTwo:true,
                dashboardThree:true,
                dashboardFour:true,
                dashboardFive:true
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();//设置选择今天之前的日期
                }
            },
            chart: null,
            bigReport:null,      //最大数据
            tableType:0,       
            tableValue:{
                XValue:[], 
                YValue:[], 
            },
            chartBtnArray:[
                {btnName:'Clicks',btnValue:'0'},
                {btnName:'Sales',btnValue:'1'},
                {btnName:'Revenue',btnValue:'2'},
                {btnName:'Pins',btnValue:'3'},
                {btnName:'Saves',btnValue:'4'},
                {btnName:'Boards',btnValue:'5'},
            ],
            updatesData:{
                datetime:"2019-1-1 12:00:00",
                new_accounts:"0",
                new_board:"0",
                new_followers:"0",
                new_pins:"0",
                new_saves:"0"
            },
            pinsArray:[],
            BoardArray:[],
            ActivityArray:[],
            disabledType:'1',   //是否可自定义事件框  1 不可以   0 可以
            tableData:[],
            dataArray:[//时间区间的星期几
                {"label":"Custom","value":"0"},
                // {"label":"Yesterday","value":"1"},
                // {"label":"Today","value":"2"},
                {"label":"Last 7 Days","value":"3"},
                {"label":"Current Month","value":"4"},
                {"label":"This Year","value":"5"},
            ],
            searchData:{
                dataType:'3',    //显示几天            
                start_time:'',
                end_time:'',
                store_id:'1',
                timeArray:[new Date(2019, 4, 28, 0, 0), new Date(2019, 5, 1, 0, 0)],             //日期数据源
            }
        }
    },
    components:{
    },
    mounted() {
        this.dataSelect();
        this.init();
    },
    methods:{
        //  echarts自适应
        init() {
            const self = this;//因为箭头函数会改变this指向，指向windows。所以先把this保存
             setTimeout(() => {
                window.onresize = function() {
                    self.chart = echarts.init(self.$refs.myEchart);
                    self.chart.resize();
                }
             },20)

            this.loadingState = {
                dashboardOne:true,
                dashboardTwo:true,
                dashboardThree:true,
                dashboardFour:true,
                dashboardFive:true
            };
            this.echartsInit();
            this.updates();
            this.pins();
            this.Board();
            this.activity();
        },
        echartsInit(){
            this.searchData.start_time = base.dateFormat(this.searchData.timeArray[0]);
            this.searchData.end_time =  base.dateFormat(new Date(this.searchData.timeArray[1]).getTime() + 1000 * 24 * 60 * 60 - 1000);
            this.dataSelect();
        // 获取表格数据
            // var DataSelf = window.localStorage.getItem('dashboardOne7');
            // if(DataSelf && this.searchData.dataType == 3){
            //     let _thisData = JSON.parse(DataSelf);
            //     this.bigReport = _thisData.overview_list;
            //     this.tableData = [];
            //     this.tableData.push(_thisData.total_data);
            //     this.tableInit(this.tableType);
            //     this.loadingState.dashboardOne = false;
            // }else{
            // }
            var urlString = `/api/v1/dashboard/1/?start_time=${this.searchData.start_time}&end_time=${this.searchData.end_time}`;
            this.$axios.get(urlString)
            .then(res => {
                this.loadingState.dashboardOne = false;
                if(res.data.code==1){
                    this.bigReport = res.data.data.overview_list;
                    this.tableData = [];
                    this.tableData.push(res.data.data.total_data);
                    this.tableInit(this.tableType);
                    localStorage.setItem("dashboardOne7", JSON.stringify( res.data.data ));
                }else{
                    this.$message("Acquisition failure!");
                }
            })
            .catch(error => {
                this.loadingState.dashboardOne = false;
                this.$message("Interface timeout!");
            });
        },
        updates() {
        // 获取表格数据

            var _startTime = base.dateFormat(this.searchData.timeArray[0],"day"); 
            var _endTime = base.dateFormat(this.searchData.timeArray[1],"day"); 
            if(_endTime != _startTime){
                var urlString = `/api/v1/dashboard/2/?start_time=${this.searchData.start_time}&end_time=${this.searchData.end_time}`;
                this.$axios.get(urlString)
                .then(res => {
                    this.loadingState.dashboardTwo = false;
                    if(res.data.code==1){
                        this.updatesData = res.data.data;
                    }else{
                        this.$message("Acquisition failure!");
                    }
                })
                .catch(error => {
                    this.loadingState.dashboardTwo = false;
                    this.$message("Interface timeout!");
                });
            }else{
                    this.loadingState.dashboardTwo = false;
            }
        },
        pins(){
            var urlString = `/api/v1/dashboard/3/?pins_period=7`;
            this.$axios.get(urlString)
            .then(res => {
                this.loadingState.dashboardThree = false;
                if(res.data.code==1){
                    this.pinsArray = res.data.data;
                }else{
                    this.$message("Acquisition failure!");
                }
            })
            .catch(error => {
                this.loadingState.dashboardThree = false;
                this.$message("Interface timeout!");
            });
        },
        Board(){
            var urlString = `/api/v1/dashboard/4/`;
            this.$axios.get(urlString).then(res => {
                if(res.data.code==1){
                    this.loadingState.dashboardFour = false;
                    this.BoardArray = res.data.data;
                }else{
                    this.$message("Acquisition failure!");
                }
            })
            .catch(error => {
                this.loadingState.dashboardFour = false;
                this.$message("Interface timeout!");
            });
        },
        activity(){
            var urlString = `/api/v1/dashboard/5/?start_time=${this.searchData.start_time}&end_time=${this.searchData.end_time}`;
            this.$axios.get(urlString).then(res => {
                this.loadingState.dashboardFive = false;
                if(res.data.code==1){
                   this.ActivityArray = res.data.data;
                }else{
                    this.$message("Acquisition failure!");
                }
            })
            .catch(error => {
                this.loadingState.dashboardFive = false;
                this.$message("Interface timeout!");
            });
        },
        tableInit(num){
            this.tableType=num;
            this.tableValue.YValue=[];
            this.tableValue.XValue=[];
            this.bigReport.map(e => {
                if(this.searchData.dataType == '5'){
                    this.tableValue.XValue.unshift(base.dateFormat(e.date,"day"))
                }else{
                    this.tableValue.XValue.unshift(base.dateFormat(e.date,"noyear"))
                }

              if(this.tableType == 0){
                this.tableValue.YValue.unshift(parseFloat(e.click_num));
              }
              else if(this.tableType == 1){
                this.tableValue.YValue.unshift(parseFloat(e.sales_num));
              }
              else if(this.tableType == 2){
                this.tableValue.YValue.unshift(parseFloat(e.revenue_num));
              }
              else if(this.tableType == 3){
                this.tableValue.YValue.unshift(parseFloat(e.pin_num));
              }
              else if(this.tableType == 4){
                this.tableValue.YValue.unshift(parseFloat(e.pin_saves));
              }else{
                this.tableValue.YValue.unshift(parseFloat(e.board_num));
              }
            });  
            this.initChart();
        },
        initChart() {
            this.chart = echarts.init(this.$refs.myEchart);
            // 把配置和数据放这里
                    this.chart.setOption({
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.tableValue.XValue
                        },
                    grid:{               
                        top:"50px",
                        left:"50px",
                        right:"15px",
                        bottom:"50px"
                    },
                    tooltip: {
                                trigger: 'axis'  //鼠标滑过时显示数据
                            },
                    yAxis: {
                        type: 'value',
                        //max: 3000,   //纵坐标的数据  最大最小值  如果不给 系统会默认分配值 会跟着值的变化而变化
                        min: 0,
                    },
                    series: [{
                        data:  this.tableValue.YValue,
                        type: 'line',
                        areaStyle: {},
                        color:['#0065a3'], //设置折线图内容颜色
                        smooth:true,//折点是圆弧状的
                        symbolSize: 12,   //设定实心点的大小
                    
                    }]
                })
        },
        dataSelect(){
            if(this.searchData.dataType == 0){
                this.disabledType = 0;
            }else{
                this.disabledType = 1;
                var _star;
                var _end;
                if(this.searchData.dataType == 1){
                    // 昨天
                     _star = new Date(base.dateFormat(new Date(new Date().getTime()-1000*24*60*60),"day") + " 00:00:00");
                     _end = new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 00:00:00");
                }else if(this.searchData.dataType == 2){
                    // 今天
                     _star = new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 00:00:00");
                     _end = new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 00:00:00");
                }else if(this.searchData.dataType == 3){
                    // 近七天
                     _star = new Date(base.dateFormat(new Date(new Date().getTime()-6*1000*24*60*60),"day") + " 00:00:00");
                     _end = new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 00:00:00");
                }else if(this.searchData.dataType == 4){
                    // 本月
                    var time = new Date();
                     _star = new Date(base.dateFormat(time.getFullYear()+"-"+ (time.getMonth()+1) +"-1"+ " 00:00:00"));
                     _end = new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 00:00:00");
                }else if(this.searchData.dataType == 5){
                    //本年度
                    var time = new Date();
                     _star = new Date(base.dateFormat(time.getFullYear()+"-1-1"+ " 00:00:00"));
                     _end = new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 00:00:00");
                }
                this.searchData.timeArray = [_star,_end]
            }
        }
    },
    beforeDestroy() {
        if (!this.chart) {
        return
        }
        this.chart.dispose();
        this.chart = null;
    }
}

</script>


<style>
/* .el-loading-mask.is-fullscreen{display: none!important;} */
.dashboard{width:calc(100% - 20px)}
.dashboard .table_right{margin-bottom:10px;}
.dashboard .leftBox{width:400px;float:left;}
.dashboard .rightBox{width:calc(100% - 420px);float:left;margin-left:20px;}
.dashboard .LTBox,.dashboard .LBBox,.dashboard .RTBox,.dashboard .RBBox{padding-bottom:10px;box-shadow:5px 4px 6px #ccc;margin-bottom:20px;}
.dashboard .bigNum{width:100%;font-size:38px;padding:5px 0;font-weight:600;}
.dashboard .smText{width:100%;font-size:14px;}
.dashboard table{width:100%;text-align: center;}
.dashboard table tbody tr td{border-top:1px solid #ccc;padding:5px 0;}
.dashboard .indexTitle{background:#006699;width:calc(100% - 50px);color:#fff;display:inline-block;padding:10px 40px 10px 10px;font-size:20px;font-weight:600;-webkit-box-shadow:0 0 5px #006699;box-shadow:0 0 5px #006699;}
.dashboard .RTBox{min-height:400px;}
.dashboard .RBBox{min-height:400px;}
.dashboard .LBBox{min-height:269px;}
.dashboard .el-table thead tr th{background:#006699;}
.dashboard .menu{border:1px solid #797979;border-radius:20px;padding:5px;text-align:center;display:-webkit-box;display:-ms-flexbox;display:flex;display:-webkit-flex;margin-bottom:40px;width:70%;margin-left:15%;}
.dashboard .menu .menuSon{-webkit-box-flex:1;-ms-flex:1;flex:1;position:relative;height:0;cursor:pointer;}
.dashboard .menu .menuSon .point{position:absolute;left:47%;top:-6px;width:10px;height:10px;border-radius:50%;border:2px solid #fff;background:#999999;box-shadow:0 0 6px #000; transition: all 0.3s;-webkit-transition: all 0.3s;}
.dashboard .menu .menuSon.active .point{width:20px;height:20px;top:-12px;margin-left: -5px; background:#006699;}
.dashboard .menu .menuSon .name{position:absolute;left:0;top:15px;width:100%;color:#0066AA;}
.dashboard .rightBox .iconfont.icon-xiangxiajiantou{color: red;font-size: 30px;}
.dashboard .rightBox .iconfont.icon-xiangshangjiantou{color: green;font-size: 30px;}
.dashboard .RBBox .iconfont_left{padding-bottom: 15px;}
.dashboard .RBBox .iconfont_left span{width: 30px;display: inline-block;padding-right: 20px;}
.dashboard .RTBox .iconfont_left{padding-bottom: 15px;}
.dashboard .RTBox .iconfont_left span{width: 30px;display: inline-block;padding-right: 10px;}
.dashboard .RBBox thead td,
.dashboard .RTBox thead td{font-weight: 600;padding: 20px;}
.dashboard a:hover{cursor: pointer;color:#ccc;}
</style>