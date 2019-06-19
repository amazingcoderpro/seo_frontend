
<template>
    <div class="rule_clone">
         <el-dialog  :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal='false' :close-on-press-escape='false' :modal-append-to-body="false" @close='resetForm'>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="Website">
              <span style="color:red;font-size:16px;font-weight: 600;">{{website}}</span>
            </el-form-item>
            <el-form-item label=" " :class="'contentBg'">
            </el-form-item>
            <el-form-item label="Pinterest">
              <el-select v-model="ruleForm.pinterest" placeholder="Pinterest"  @change="pinterestChange">
                <el-option v-for="(item,index) in pinterestArray" :key="index" :label="item.account" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Board" prop="board">
              <el-select v-model="ruleForm.board" placeholder="Board">
                <template v-for="item in pinterestArray">
                  <template v-if="item.id == ruleForm.pinterest">
                     <el-option v-for="(items,index) in item.board_pinterest_account" :key="index" :label="items.name" :value="items.id"> </el-option>
                  </template>
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="Rule Time" prop="ruleTime">
              <div class="block">
                  <el-date-picker v-model="ruleForm.ruleTime" type="datetimerange" start-placeholder="start time" end-placeholder="End time" 
                    :picker-options="pickerOptions">
                  </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="Schedule Rule" prop="schedule_rule" ref="scheduleRuleClass" class="scheduleRuleClass">
              <el-select :class="'W20'" v-model="scheduleRule.weekday" placeholder="schedule_rule">
                <el-option v-for="item in weekArray" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
              <el-time-picker :class="'W36'" is-range v-model="scheduleRule.timeVal" start-placeholder="start time" end-placeholder="End time" placeholder="选择时间范围">
              </el-time-picker>
              <div class="el-form-item__error" :style="'margin-left:244px;'" v-if="timeValState == 2">Must be more than 2 hours</div>
              <el-select :class="'W20'" v-model="scheduleRule.interval_time" placeholder="interval_time">
                <el-option v-for="item in publishTimeArray" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
              <el-button type="primary"  @click="scheduleRuleFun()">Add</el-button>
              <div class="el-form-item__error" v-if="scheduleRruleState == 2">请添加区间</div>
            </el-form-item>
            <!-- 时间区间的列表，没有数据是处于隐藏状态 -->
            <div v-if="ruleForm.schedule_rule.length>0">
                <ul class="scheduleRuleList">
                  <li v-for="(item,index) in ruleForm.schedule_rule" :key="item.value">
                    <span class="spanClass">第{{index+1}}条</span>
                    <template>
                        <span :class="'spanClass'" v-if="item.weekday == 0">Monday</span>
                        <span :class="'spanClass'" v-else-if="item.weekday == 1">Tuesday</span>
                        <span :class="'spanClass'" v-else-if="item.weekday == 2">Wednesday</span>
                        <span :class="'spanClass'" v-else-if="item.weekday == 3">Thursday</span>
                        <span :class="'spanClass'" v-else-if="item.weekday == 4">Friday</span>
                        <span :class="'spanClass'" v-else-if="item.weekday == 5">Saturday</span>
                        <span :class="'spanClass'" v-else>Sunday</span>
                    </template>
                    <span class="spanClass">Start:{{item.start_time}}</span>
                    <span class="spanClass">End:{{item.end_time}}</span>
                    <span class="spanClass">Interval Time:{{item.interval_time/3600}}H</span>
                    <el-button size="mini"  type="danger" @click="deletschedule(index)">X</el-button>
                  </li>
                </ul>
            </div>
            <el-form-item label="Tag" prop="tag">
              <el-input v-model="ruleForm.tag" :style="'width: 400px;'"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">Save</el-button>
              <el-button @click="resetForm()">Reset</el-button>
            </el-form-item>
          </el-form>
          <el-form :model="serchProduct" :rules="searchRules" ref="serchProduct" label-width="100px" class="demo-serchProduct searchContent">
            <el-form-item label="Category Name" prop="product__name">
                <el-input v-model="serchProduct.product__name" :style="'width: 400px;'"></el-input>
            </el-form-item>
            <el-form-item label="Product Online Time" prop="data1">
                <el-date-picker v-model="serchProduct.data1" type="datetimerange" start-placeholder="start time" end-placeholder="End time" :default-time="['00:00:00']">
                </el-date-picker>
            </el-form-item>
            <!-- <el-form-item label="Time" prop="data2" :class="'specialTime'">
                <el-date-picker v-model="serchProduct.data2" type="datetimerange" start-placeholder="start time" end-placeholder="End time" :default-time="['00:00:00']">
                </el-date-picker>
            </el-form-item> -->
            <!-- <el-form-item label="Scan" prop="scan">
              <el-select :class="'W20'" v-model="serchProduct.scan_sign">
                <el-option  :label="'='" :value="'=='"> </el-option>
                <el-option  :label="'>'" :value="'>'"> </el-option>
                <el-option  :label="'<'" :value="'<'"> </el-option>
                <el-option  :label="'>='" :value="'>='"> </el-option>
                <el-option  :label="'<='" :value="'<='"> </el-option>
              </el-select>
              <el-input :class="'W36'" v-model="serchProduct.scan" type="number" placeholder="Scan"></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="Sale" prop="sale">
              <el-select :class="'W20'"  v-model="serchProduct.sale_sign">
                <el-option  :label="'='" :value="'=='"> </el-option>
                <el-option  :label="'>'" :value="'>'"> </el-option>
                <el-option  :label="'<'" :value="'<'"> </el-option>
                <el-option  :label="'>='" :value="'>='"> </el-option>
                <el-option  :label="'<='" :value="'<='"> </el-option>
              </el-select>
              <el-input :class="'W36'" v-model="serchProduct.sale" type="number"  placeholder="Sale"></el-input>
            </el-form-item> -->
            <el-form-item label="Number of Products">
              <el-button type="primary"  @click="serchProductFun('serchProduct')" :style="'margin-right:20px;'">Search</el-button>
              <span>{{ruleForm.product_list.length}}个</span>
              <div class="el-form-item__error" v-if="productListState == 2">请查询出满足以下条件的商品</div>
            </el-form-item>

          </el-form>
        </el-dialog>
    </div>
</template>

<script>

import * as base from '../../assets/js/base'
  export default {
    name: "rule_clone",
    props: {
      dialog: Object,
      cloneData:Object
    },
    data() {
      var scheduleRuleFun = (rule, value, callback) => {
        if (this.ruleForm.schedule_rule.length == 0) {
          return callback(new Error('请添加区间'));
        }else{
          callback();
        }
      };
      var RuleTimeFun = (rule, value, callback) => {
        var _nowTime = new Date().getTime();
        var _startTime = new Date(this.ruleForm.ruleTime[0]).getTime();
        if(this.ruleForm.ruleTime.length == 2){
            if (_startTime < _nowTime) {
              return callback(new Error('Start time should be greater than current time!'));
            }else{
              var _endTime = new Date(this.ruleForm.ruleTime[1]).getTime();
              if(_endTime - _startTime < 1000 * 60 * 30){
                return callback(new Error('End time should be half an hour late from the start time at least!'));
              }else{
                callback();
              }
            }
        }else{
          return callback(new Error('请选择日期!'));
        }
      };
      return {
          pickerOptions: {
              disabledDate(time) {
                  return time.getTime() < Date.now() - 1000 * 60 * 60 * 24;//设置选择今天之前的日期
              }
          },
          website:'Chicdb',    
          pinterestArray:[],//Pinterest下拉框数据
          boardArray:[],     //board下拉框数据
          productListState:1,      //商品列表错误提示是否展示  1隐藏 2展示
          scheduleRruleState:1,         //添加时区的错误提示
          timeValState:1,          //时间区间错误提示是否展示  1隐藏 2展示
          scheduleRule:{//时间区间临时数据
              weekday:"0",  
              start_time:"",  
              end_time:"",  
              interval_time:"1800", 
              timeVal:[new Date(2016, 9, 10, 8, 0), new Date(2016, 9, 10, 16, 0)], //El的展示数据
          }, 
          weekArray:[//时间区间的星期几
            {"label":"Monday","value":"0"},
            {"label":"Tuesday","value":"1"},
            {"label":"Wednesday","value":"2"},
            {"label":"Thursday","value":"3"},
            {"label":"Friday","value":"4"},
            {"label":"Saturday","value":"5"},
            {"label":"Sunday","value":"6"},
          ],
          publishTimeArray:[//发布频率的时间选择
            {"label":"0.5H","value":"1800"},
            {"label":"1H","value":"3600"},
            {"label":"1.5H","value":"5400"},
            {"label":"2H","value":"7200"},
          ],
          serchProduct:{
            data1:[],   //产品上架时间初始数据
            data2:[],   //产品特殊时间初始数据
            publish_begin_time:'',//产品上架时间最终数据
            publish_end_time:'',   
            begin_time:'',        //产品特殊时间最终数据
            end_time:'',
            store:'',
            product__name:'',      
            sale_sign:'>',           // 销量标识符
            sale:'',           //产品销量
            scan_sign:'>',       //浏览量标识符
            scan:'',           // 浏览量
          },
          ruleForm: {//最终添加规则需要提交过去的对象
            pinterest:'',
            board:'',
            ruleTime:'',    //规则有效期的初始数据来源
            start_time:'',           //规则有效期开始时间
            end_time:'',             //规则有效期结束时间
            schedule_rule:[],         // 
            product_list:[],        //满足条件的商品列表  
            tag:'',      //规则标签
          },
          rules: {
            pinterest: [{ required: true, message: '请选择pinterest', trigger: 'change' }],
            board: [{ required: true, message: '请选择board', trigger: 'change' }],
            ruleTime: [{required: true,  trigger: 'change',validator:RuleTimeFun }],
            // schedule_rule:[{required: true,validator:scheduleRuleFun}],
            tag: [{ required: true, message: '请输入标签', trigger: 'blur' },],
          },
          searchRules:{
            product__name: [{ required: true, message: '请输入商品名', trigger: 'blur' },],
            data1:[{required: true, message: '请选择商品上架时间', trigger: 'change' }],
            data2:[{required: true, message: '请选择商品浏览量、销量时间', trigger: 'change' }],
            // sale: [{ required: true, message: '请输入产品销量', trigger: 'blur' },],
            // scan: [{ required: true, message: '请输入产品浏览量', trigger: 'blur'}],
          },
      };
    },
    watch:{
      dialog:function (){
        this.$axios.get("/api/v1/rule/pinterest_account_board/?authorized=[1]")
        .then(res => {
            if(res.data.code == 1){
              this.pinterestArray = res.data.data;
              if(res.data.data.length>0){
                this.ruleForm.pinterest = res.data.data[0].id;
              }else{
                this.ruleForm.pinterest = '';
              }
              this.pinterestChange();
              this.Init();
            }
        });
        this.$axios(`/api/v1/store/`).then(res => {
          if (res.data.code == 1) {
            this.website = res.data.data[0].name;
          } else {
            this.$message({
              message: "code Abnormal!",
              type: "warning",
              center: true
            });
          }
        });
      }
    },
    methods: {
      Init(){
        let rule_start = new Date(this.cloneData.start_time);
        let rule_end = new Date(this.cloneData.end_time);
        let product_start = new Date(this.cloneData.product_start);
        let product_end = new Date(this.cloneData.product_end);

        this.serchProduct.product__name = this.cloneData.product_key;
        this.serchProduct.data1 = [product_start,product_end];
        
        this.ruleForm.pinterest = this.cloneData.pinterest_account;
        this.ruleForm.board = this.cloneData.board;
        this.ruleForm.board = this.cloneData.board;
        this.ruleForm.ruleTime = [rule_start,rule_end];
        this.ruleForm.tag = this.cloneData.tag;
        this.cloneData.schedule_rule.map(e => {
          var _thisData = {
                weekday:e.weekday,
                start_time:e.start_time,
                end_time:e.end_time,
                interval_time:e.interval_time,         
          }
          this.ruleForm.schedule_rule.push(_thisData)
        });  
      },
      submitForm(formName) {
          // 最终提交
        if(this.ruleForm.schedule_rule.length == 0){
          //检查是否有满足条件的区间
          this.scheduleRruleState = 2;
        }else{
          this.scheduleRruleState = 1;
        }
        if(this.ruleForm.product_list.length == 0){
          //检查是否有满足条件的商品
          this.productListState = 2;
        }else{
            this.productListState = 1;
        }   
        this.$refs[formName].validate((valid) => {
          if (valid) {
              if(this.scheduleRruleState == 1 && this.productListState == 1){
              var _thisruleForm = {
                  pinterest:this.ruleForm.pinterest,
                  board:this.ruleForm.board,
                  start_time:base.dateFormat(this.ruleForm.ruleTime[0]),           //规则有效期开始时间
                  end_time:base.dateFormat(this.ruleForm.ruleTime[1]),             //规则有效期结束时间
                  schedule_rule:JSON.stringify(this.ruleForm.schedule_rule),         // 
                  product_list:JSON.stringify(this.ruleForm.product_list),        //满足条件的商品列表  
                  tag:this.ruleForm.tag,      //规则标签

                  product_start:base.dateFormat(this.serchProduct.data1[0]),           //产品的发布时间范围起点
                  product_end:base.dateFormat(this.serchProduct.data1[1]),             //产品的发布时间范围终点
                  product_key:this.serchProduct.product__name,      //产品的搜索关键字
                  pinterest_account:this.ruleForm.pinterest,      //pinterest账号id 
                }
                this.$axios.post(`/api/v1/rule/`, _thisruleForm)
                .then(res => {
                    if(res.data.code == 1){
                        this.$message({
                          message: "添加成功!",
                          type: "success"
                        });
                        this.dialog.show = false;
                        this.$parent.init();
                    }else{
                      this.$message("添加失败!");
                    }
                })
                .catch(error => {
                    this.$message("Interface timeout!");
                }); 
              }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
        this.$refs['ruleForm'].resetFields();
        this.$refs['serchProduct'].resetFields();
      },
      scheduleRuleFun(){
        var sTime = new Date(this.scheduleRule.timeVal[0]).getTime();
        var eTime = new Date(this.scheduleRule.timeVal[1]).getTime();
        var ctime = eTime - sTime;
        if(ctime>=7200000){
              this.timeValState = 1;
              this.scheduleRule.start_time = base.dateFormat(this.scheduleRule.timeVal[0],"hour");
              this.scheduleRule.end_time = base.dateFormat(this.scheduleRule.timeVal[1],"hour");
              var _thisObj = {
                    weekday:"0",  
                    start_time:"",  
                    end_time:"",  
                    interval_time:"1800"
                };
              _thisObj.weekday = this.scheduleRule.weekday;
              _thisObj.start_time = this.scheduleRule.start_time;
              _thisObj.end_time = this.scheduleRule.end_time;
              _thisObj.interval_time = this.scheduleRule.interval_time;
              this.ruleForm.schedule_rule.push(_thisObj);
        }else{
            this.timeValState = 2;
        }
        console.log(this.ruleForm.schedule_rule.length)
        if(this.ruleForm.schedule_rule.length == 0){
          //检查是否有满足条件的商品
          this.scheduleRruleState = 2;
        }else{
          this.scheduleRruleState = 1;
        }

      },
      deletschedule(index){
        //删除指定分区
        this.ruleForm.schedule_rule.splice(index,1);
      },
      serchProductFun(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.serchProduct.publish_begin_time = base.dateFormat(this.serchProduct.data1[0]);
              this.serchProduct.publish_end_time =  base.dateFormat(this.serchProduct.data1[1]);
              var url = "/api/v1/rule/search_product/?index=1";
              if(this.serchProduct.data1.length == 2){
                  url += "&publish_begin_time="+this.serchProduct.publish_begin_time;
                  url += "&publish_end_time="+this.serchProduct.publish_end_time;
              }
              if(this.serchProduct.product__name != ""){
                  url += "&product__name="+this.serchProduct.product__name;
              }
              if(this.serchProduct.sale != ""){
                  url += "&sale_sign="+this.serchProduct.sale_sign;
                  url += "&sale="+this.serchProduct.sale;
              }
              if(this.serchProduct.scan != ""){
                  url += "&scan_sign="+this.serchProduct.scan_sign;
                  url += "&scan="+this.serchProduct.scan;
              }
              this.$axios.get(url).then(res => {
                  if(res.data.code == 1){
                    this.ruleForm.product_list = res.data.data;
                  }else{
                    this.$message("获取商品列表失败!");
                  }
              })        
          } else {
            console.log('error submit!!');
            return false;
          }
        });


      },
      pinterestChange(){
        //pinterest账户变更触发的事件
        this.pinterestArray.map(e => {
          if(e.id == this.ruleForm.pinterest){
            if(e.board_pinterest_account.length>0){
              this.ruleForm.board = e.board_pinterest_account[0].id;
            }else{
              this.ruleForm.board = '';
            }
          }
        });   
      }
    }
  }
</script>
<style>
.rule_clone .el-dialog{width: 70%;height: 86%;overflow: auto;margin: 0;left: 15%;top: -10%;}
.rule_clone .el-form-item__label{width:165px!important;}
.rule_clone .el-form-item__content{margin-left:165px!important;}
.rule_clone .W20{width:20%;margin-right:2%;}
.rule_clone .W36{width:36%;margin-right:2%;}
.rule_clone .W40{width:40%;margin-right:2%;}
.rule_clone .W54{width:54%;margin-right:2%;}
.rule_clone .W60{width:60%;margin-right:2%;}
.rule_clone .scheduleRuleList{margin-left:145px;padding:0;margin-bottom:22px;list-style:none;}
.rule_clone .scheduleRuleList li{font-size:14px;color:#606266;margin-bottom:5px;}
.rule_clone .scheduleRuleList li span.spanClass{margin-right: 15px;}
.rule_clone .el-dialog__body{position: relative;}
.rule_clone .contentBg{height:176px;}
.rule_clone .searchContent{position: absolute;top: 82px;}
.rule_clone .specialTime{
    position: absolute;
    left: 346px;
}
.rule_clone input::-webkit-outer-spin-button,
.rule_clone input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.rule_clone input[type="number"]{
  -moz-appearance: textfield;
}
</style>
