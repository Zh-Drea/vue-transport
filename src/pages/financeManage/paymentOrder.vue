<!--
 * @name paymentOrder.vue
 * @author 王刚
 * @date 2019.4.18
 * @desc 支付订单
-->
<template>
  <div>
    <div class="xyj-edit-form" style="padding-right:20px;">
      <!--<h2>{{this.$store.state.keepAliveName}}</h2>-->
      <el-form :inline="true" :model="finRecordsForm" ref="finRecordsForm" label-width="80px" class="demo-ruleForm">
<!--         <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="关键词" prop="keyWord">
              <el-input v-model="finRecordsForm.keyWord" placeholder="请输入关键词"></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="订单号" prop="code">
              <el-input v-model="finRecordsForm.code" placeholder="请输入订单号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="时间">
              <el-date-picker v-model="finRecordsForm.date" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" style="text-align:center;" class="btn-middle">
            <el-button icon="el-icon-search" @click="findWaybill" round>搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <el-tabs v-model="currentTab" class="no-border-tabs"  @tab-click="tabsSwitch">
        <el-tab-pane label="未支付" name="pendingDisposal" :key="'pendingDisposal'">
          <el-table :data="noPayTableData" style="width: 100%">
            <el-table-column prop="id" label="订单号" width="200">
            </el-table-column>
            <el-table-column prop="waybill_sn" label="国际运单号" width="200">
            </el-table-column>
             <el-table-column prop="tracknei_no" label="国内运单号" width="200" :formatter="noCheck">
            </el-table-column>
            <el-table-column prop="pay_amount" label="支付金额" width="100">
            </el-table-column>
            <el-table-column prop="payMethod" label="支付方式" width="150" :formatter="typeCheck">
            </el-table-column>
            <el-table-column prop="create_time" label="时间" width="200" :formatter="timeCheck">
            </el-table-column>
            <el-table-column fixed="right" label="操作">     
              <template slot-scope="scope">
                <div @click="delFromSelect(scope.row)" style="display:inline-block;cursor:pointer;">
                  <img src="../../assets/delete.png" style="width:14px;height:14px;margin-right:3px;background-color:white;cursor:pointer;">
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            small
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :page-size="page.num"
            :current-page="page.size"
            :total="allNum">
          </el-pagination>  
        </el-tab-pane>
        <el-tab-pane label="已支付" name="pendingReply" :key="'pendingReply'">
          <el-table :data="disposalTableData" style="width: 100%">
            <el-table-column prop="id" label="订单号" width="200">
            </el-table-column>
            <el-table-column prop="waybill_sn" label="国际运单号" width="200">
            </el-table-column>
             <el-table-column prop="tracknei_no" label="国内运单号" width="200" :formatter="noCheck">
            </el-table-column>
            <el-table-column prop="pay_amount" label="支付金额" width="100">
            </el-table-column>
            <el-table-column prop="payMethod" label="支付方式" width="150" :formatter="typeCheck">
            </el-table-column>
            <el-table-column prop="create_time" label="时间" width="200" :formatter="timeCheck">
            </el-table-column>
            <el-table-column fixed="right" label="操作"> 
              <template slot-scope="scope">
                <div @click="delFromSelect(scope.row)" style="display:inline-block;cursor:pointer;">
                  <img src="../../assets/delete.png" style="width:14px;height:14px;margin-right:3px;background-color:white;cursor:pointer;">
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            small
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :page-size="page.num"
            :current-page="page.size"
            :total="allNum">
          </el-pagination> 
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import Tools from '@/lib/Tools';
import config from "@/config.js";

let ts = Tools.getInstance();

export default {
  name: 'problemSheet',
  data() {
    return {
      finRecordsForm: {
        keyWord: '',
        code: '',
        date: ''
      },
      currentTab: 'pendingDisposal',
      // 已支付
      disposalTableData: [],
      // 未支付
      noPayTableData:[],
      // tab
      tabName:'pendingDisposal',
      // pendingReply
      page:{
        size:1,
        num:5
      },
       // 总条数
      allNum:0,
    }
  },
  methods: {
    noCheck(row,column){
      let ret;
      if (!row.tracknei_no) {
        ret = '-'
      }
      else{
        ret = row.tracknei_no
      }
      return ret
    },
    timeCheck(row,column){
      let ret;
      if (row.create_time) {
        ret = ts.changeTime(row.create_time)
      }
      else{
        ret = '-'
      }
      return ret
    },
    stateCheck(row,column){
      let ret;
      if (row.status == 10) {
        ret = '未支付'
      }
      else{
        ret = '已支付'
      }
      return ret
    },
    typeCheck(row,column){
      let ret;
      if (row.type) {
        if(row.type == 1){
          ret = '余额支付'
        }
        else if(row.type == 2){
          ret = '支付宝'
        }
        else if(row.type == 3){
          ret = '微信'
        }
      }
      else{
        ret = '-'
      }
      return ret
    },
    //当操作返回后
    restore(){
      this.page = {
        size:1,
        num:5
      }
    },
    findWaybill(){
      this.restore();
      this.loadPage(this.page)
    },
    // 页码变动
    handleCurrentChange(val){
        this.page.size = val;
        let page = {
          size:val,
          num:this.page.num
        };
        this.loadPage(page)
    },

    // 删除支付订单信息
    delFromSelect(row){
       let thiz = this;
       this.$confirm('确认删除？')
        .then(_ => {
          
          ts.sendRequest('personcenter/finance/payorder/delete',{
            data:{waybill_id:row.id},
            success:function(res){
              thiz.restore();
              thiz.loadPage(thiz.page)
            },  
            error:function(ero){

            }
          })
        })
        .catch(_ => {});
      
    },
    //tabs切换
    tabsSwitch(tab, event) {
      this.tabName = tab.name;
      this.finRecordsForm.code ='';
      this.finRecordsForm.date = '';
      this.restore();
      this.loadPage(this.page);
    },

    loadPage(params){
      let thiz = this;
      let sendParams = {};
      this.noPayTableData = [];
      this.disposalTableData = [];
      sendParams.waybill_no = thiz.finRecordsForm.code;
      if (thiz.finRecordsForm.date) {
        sendParams.create_time = thiz.finRecordsForm.date[0];
        sendParams.end_time = thiz.finRecordsForm.date[1];
      }
      else{
        sendParams.create_time = '';
        sendParams.end_time = '';
      }
      if (this.tabName == 'pendingDisposal') {
        sendParams.status = 10
      }
      else{
        sendParams.status = 20
      }

      let url = "personcenter/finance/payorder/search"+'?'+'page='+params.size+'&num='+params.num;
      ts.sendRequest(url,{
        data:sendParams,
        success:function(ret){
          thiz.allNum = ret.count;
          if (thiz.tabName == 'pendingDisposal') {
            thiz.noPayTableData = ret.data;
          }
          else{
            thiz.disposalTableData = ret.data;
          }
          
        },
        error:function(err){
        }
      });
    },
    selectChange(selection, rowData) {
    },
  },
  mounted: function() {
      this.loadPage(this.page)

  }
}

</script>
<style scoped>
</style>
