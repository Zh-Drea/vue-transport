<!--
 * @name logisticsRecord.vue
 * @author 王刚
 * @date 2019.4.16
 * @desc 物流记录
-->
<template>
  <div>
    <div v-if="isExit">
      <div class="xyj-edit-form label-100" style="padding-right:20px;">
        <!--<h2>{{this.$store.state.keepAliveName}}</h2>-->
        <el-form :label-position="labelPosition" :inline="true" :model="logRecForm" ref="logRecForm" label-width="100px">
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="收件人:">
                <el-input v-model="logRecForm.receiptName" placeholder="请输入收件人关键词"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="收件电话:">
                <el-input v-model="logRecForm.receiptPhone" placeholder="请输入收件人电话"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="国际运单号:">
                <el-input v-model="logRecForm.receiptCode" placeholder="请输入国际运单号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="时间:">
                <el-date-picker v-model="logRecForm.date" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" range-separator="~" start-placeholder="开始日期" 
                end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="收件地址:">
                <el-input v-model="logRecForm.receiptAddress" placeholder="请输入收件地址"></el-input>
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
      <div class="xyj-edit-form" style="position:relative;">
        <el-tabs v-model="tabName" @tab-click="tabsSwitch">   
          <el-tab-pane label="全部" name="dataAll">
            <el-table :data="tableData.all" height="330" style="width:100%">
              <el-table-column prop="waybill_sn" label="国际运单号" width="170">
              </el-table-column>
              <el-table-column prop="tracknei_no" label="国内运单号" width="170" :formatter="noCheck">
              </el-table-column>
              <el-table-column prop="ab_name" label="线路" width="110">
              </el-table-column>
              <el-table-column prop="sender_name" label="寄件/收件人" width="100" :formatter="nameCheck">
              </el-table-column>
              <el-table-column prop="recevicer_phone" label="收件人电话" width="120">
              </el-table-column>  
              <el-table-column prop="pay_amount" label="运费" width="80">
              </el-table-column>
              <el-table-column prop="create_time" label="下单时间" width="160" :formatter="timeCheck">
              </el-table-column>
              <el-table-column prop="status" fixed="right" label="状态" width="80" :formatter="statusCheck">
              </el-table-column>
              <el-table-column width="140" fixed="right" label="操作">
               <template slot-scope="scope">
                <div style="display:flex;flex-direction:row">
                  <el-button type="primary" size="mini" @click="checkDetail(scope.row)">明细</el-button>
                  <el-button type="primary" v-if="scope.row.status == 14" size="mini" @click="refund(scope.row)">退款</el-button>
                  <el-button type="primary" v-if="scope.row.isShow" size="mini" @click="pay(scope.row)">支付</el-button> 
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
          <el-tab-pane label="待付款" name="paid">
            <el-table :data="tableData.stayPay" height="330" style="width:100%">
              <el-table-column prop="waybill_sn" label="国际运单号" width="170">
              </el-table-column>
              <el-table-column prop="tracknei_no" label="国内运单号" width="170" :formatter="noCheck">
              </el-table-column>
              <el-table-column prop="ab_name" label="线路" width="110">
              </el-table-column>
              <el-table-column prop="sender_recipient" label="寄件/收件人" width="150" :formatter="nameCheck">
              </el-table-column>
              <el-table-column prop="recevicer_phone" label="收件人电话" width="150">
              </el-table-column>
              <el-table-column prop="pay_amount" label="运费" width="80">
              </el-table-column>
              <el-table-column prop="create_time" label="下单时间" width="160" :formatter="timeCheck">
              </el-table-column>
              <el-table-column width="140" fixed="right" label="操作"> 
               <template slot-scope="scope">
                <div style="display:flex;flex-direction:row">
                  <el-button type="primary" size="mini" @click="checkDetail(scope.row)">明细</el-button>
                  <el-button type="primary" size="mini" @click="pay(scope.row)">支付</el-button> 
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
          <el-tab-pane label="待补费" name="packagePieces">
            <el-table :data="tableData.stayRepair" height="330" style="width:100%">
               <el-table-column prop="waybill_sn" label="国际运单号" width="170">
              </el-table-column>
              <el-table-column prop="tracknei_no" label="国内运单号" width="170" :formatter="noCheck">
              </el-table-column>
              <el-table-column prop="ab_name" label="线路" width="110">
              </el-table-column>
              <el-table-column prop="sender_recipient" label="寄件/收件人" width="150" :formatter="nameCheck">
              </el-table-column>
              <el-table-column prop="recevicer_phone" label="收件人电话" width="150">
              </el-table-column>
              <el-table-column prop="pay_amount" label="运费" width="80">
              </el-table-column>
              <el-table-column prop="create_time" label="下单时间" width="160" :formatter="timeCheck">
              </el-table-column>
              <el-table-column fixed="right" label="操作"> 
               <template slot-scope="scope">
                  <div style="display:flex;flex-direction:row">
                    <el-button type="primary" size="mini" @click="checkDetail(scope.row)">明细</el-button>
                    <el-button type="primary" size="mini" @click="pay(scope.row)">支付</el-button> 
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
          <el-tab-pane label="待入库" name="delivery">
            <el-table :data="tableData.stayStorage" height="330" style="width:100%">
               <el-table-column prop="waybill_sn" label="国际运单号" width="170">
              </el-table-column>
              <el-table-column prop="tracknei_no" label="国内运单号" width="170" :formatter="noCheck">
              </el-table-column>
              <el-table-column prop="ab_name" label="线路" width="110">
              </el-table-column>
              <el-table-column prop="sender_recipient" label="寄件/收件人" width="150" :formatter="nameCheck">
              </el-table-column>
              <el-table-column prop="recevicer_phone" label="收件人电话" width="150">
              </el-table-column>
              <el-table-column prop="pay_amount" label="运费" width="80">
              </el-table-column>
              <el-table-column prop="create_time" label="下单时间" width="160" :formatter="timeCheck">
              </el-table-column>
              <el-table-column fixed="right" width="140" label="操作"> 
                <template slot-scope="scope">
                  <div style="display:flex;flex-direction:row">
                    <el-button type="primary" size="mini" @click="checkDetail(scope.row)">明细</el-button>
                    <el-button type="primary" size="mini" @click="refund(scope.row)">退款</el-button>
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
          <el-tab-pane label="已入库" name="domesticDelivery">
            <el-table :data="tableData.putInStorage" height="330" style="width:100%">
              <el-table-column prop="waybill_sn" label="国际运单号" width="170">
              </el-table-column>
              <el-table-column prop="tracknei_no" label="国内运单号" width="170" :formatter="noCheck">
              </el-table-column>
              <el-table-column prop="ab_name" label="线路" width="110">
              </el-table-column>
              <el-table-column prop="sender_recipient" label="寄件/收件人" width="150" :formatter="nameCheck">
              </el-table-column>
              <el-table-column prop="recevicer_phone" label="收件人电话" width="150">
              </el-table-column>
              <el-table-column prop="pay_amount" label="运费" width="80">
              </el-table-column>
              <el-table-column prop="create_time" label="下单时间" width="160" :formatter="timeCheck">
              </el-table-column>
              <el-table-column fixed="right" label="操作"> 
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="checkDetail(scope.row)">明细</el-button>
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
          <el-tab-pane label="待出库" name="abroadDelivery">
            <el-table :data="tableData.stayOutStorage" height="330" style="width:100%">
              <el-table-column prop="waybill_sn" label="国际运单号" width="170">
              </el-table-column>
              <el-table-column prop="tracknei_no" label="国内运单号" width="170" :formatter="noCheck">
              </el-table-column>
              <el-table-column prop="ab_name" label="线路" width="110">
              </el-table-column>
              <el-table-column prop="sender_recipient" label="寄件/收件人" width="150" :formatter="nameCheck">
              </el-table-column>
              <el-table-column prop="recevicer_phone" label="收件人电话" width="150">
              </el-table-column>
              <el-table-column prop="pay_amount" label="运费" width="80">
              </el-table-column>
              <el-table-column prop="create_time" label="下单时间" width="160" :formatter="timeCheck">
              </el-table-column>
              <el-table-column fixed="right" label="操作"> 
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="checkDetail(scope.row)">明细</el-button>
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
          <el-tab-pane label="已出库" name="alreadyDelivery">
            <el-table :data="tableData.alreadyOutStorage" height="330" style="width:100%">
               <el-table-column prop="waybill_sn" label="国际运单号" width="170">
              </el-table-column>
              <el-table-column prop="tracknei_no" label="国内运单号" width="170" :formatter="noCheck">
              </el-table-column>
              <el-table-column prop="ab_name" label="线路" width="110">
              </el-table-column>
              <el-table-column prop="sender_recipient" label="寄件/收件人" width="150" :formatter="nameCheck">
              </el-table-column>
              <el-table-column prop="recevicer_phone" label="收件人电话" width="150">
              </el-table-column>
              <el-table-column prop="pay_amount" label="运费" width="80">
              </el-table-column>
              <el-table-column prop="create_time" label="下单时间" width="160" :formatter="timeCheck">
              </el-table-column>
              <el-table-column fixed="right" label="操作"> 
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="checkDetail(scope.row)">明细</el-button>
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
          <el-tab-pane label="已签收" name="completed">
            <el-table :data="tableData.alreadysignIn" height="330" style="width:100%">
               <el-table-column prop="waybill_sn" label="国际运单号" width="170">
              </el-table-column>
              <el-table-column prop="tracknei_no" label="国内运单号" width="170" :formatter="noCheck">
              </el-table-column>
              <el-table-column prop="ab_name" label="线路" width="110">
              </el-table-column>
              <el-table-column prop="sender_recipient" label="寄件/收件人" width="150" :formatter="nameCheck">
              </el-table-column>
              <el-table-column prop="recevicer_phone" label="收件人电话" width="150">
              </el-table-column>
              <el-table-column prop="pay_amount" label="运费" width="80">
              </el-table-column>
              <el-table-column prop="create_time" label="下单时间" width="160" :formatter="timeCheck">
              </el-table-column>
              <el-table-column fixed="right" label="操作"> 
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="checkDetail(scope.row)">明细</el-button>
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
    <div v-if="!isExit">
      <el-row>
        <el-col>
          <el-button type="primary" @click="backFirst" size="mini" style="margin-bottom:20px">返回</el-button>
        </el-col>
      </el-row>
      <div class="xyj-edit-form" style="padding-right:20px;">
        <div class="xyj-form-section" style="margin-top:0;"> 
          <img class='mr10' src="@/assets/personalCenter/icon-test@2x(1).png" alt="">基础信息
        </div>
        <el-form  :model="ruleForm" ref="ruleForm" label-width="80px" class="demo-ruleForm">
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="物流单号:" prop="receiptName">
                <el-input v-model="ruleForm.receiptName" disabled ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="2">
              <el-form-item label="物流线路:" prop="receiptPhone">
                <el-input v-model="ruleForm.receiptPhone" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="货物规格:" prop="receiptAddress">
                <el-input v-model="ruleForm.receiptAddress"disabled ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="2">
              <el-form-item label="货物重量:" prop="receiptCode">
                <el-input v-model="ruleForm.receiptCode" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="收件人:" prop="userName">
                <el-input v-model="ruleForm.userName" placeholder="" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="收件电话:" prop="userIphone">
                <el-input v-model="ruleForm.userIphone" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="2">
              <el-form-item label="收件地址:" prop="userAddress">
                <el-input v-model="ruleForm.userAddress" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="发件人:" prop="putName">
              <el-input v-model="ruleForm.putName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发件电话:" prop="putIPhone">
              <el-input v-model="ruleForm.putIPhone" disabled>
              </el-input>
              
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item label="发件地址:" prop="putAddress">
              <el-input v-model="ruleForm.putAddress" disabled></el-input>
            </el-form-item>
          </el-col>
          
          </el-row>
        </el-form>
      </div>
      <div class="xyj-edit-form">
        <div class="xyj-form-section">
          <img class='mr10' src="@/assets/personalCenter/icon-test@2x(1).png" alt="">商品信息
        </div>
        <el-table :data="showTableData" style="width: 100%">
          <el-table-column prop="chinese_name" label="商品名称" width="200">
          </el-table-column>
          <el-table-column prop="record_number" label="备案信息" width="200">
          </el-table-column>
          <el-table-column prop="specification_type" label="商品规格" width="300">
          </el-table-column>
          <el-table-column prop="num" label="商品数量">
          </el-table-column>
        </el-table>
      </div>
      <div class="xyj-edit-form" v-if="showVas">
        <div class="xyj-form-section">
          <img class='mr10' src="@/assets/personalCenter/zengzhifuwuicon@2x.png" alt="">增值服务
        </div>
        <div  style="display:flex;flex-direction:row">
          <div class="clearfix" v-for="item in vasData" style="margin:20px">
            <div :class="{'xyj-box': true, 'active': item.type}">
              <div class="xyj-img">
                <img :src="item.imgUrl" alt="" style="width:60px;height:60px">
              </div>
              <p class="xyj-content" style="font-size:14px">{{item.name}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="xyj-edit-form">
        <div class="xyj-form-section">
          <img class='mr10' src="@/assets/personalCenter/物流@2x.png" alt="">物流信息
        </div>
        <div style="padding:15px 0 15px 30px">
          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp">
              {{activity.content}}
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>

    <el-dialog
    title="选择支付方式"
    class="dialog-content"
    :visible.sync="payDialog"
    width="30%"
    >
      <div>
        <el-radio v-model="payType" label="zcpay">余额支付（可用余额   ￥{{zcMoney}}）</el-radio>
        <el-radio v-model="payType" label="wxpay">微信支付</el-radio>
        <el-radio v-model="payType" label="alipay">支付宝支付</el-radio>
      </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="selectPayType">确定</el-button>
      <el-button @click="payDialog = false">取消</el-button>
    </span>
  </el-dialog>  

    <!-- 微信支付dialog -->
   <el-dialog
    title="微信支付"
    class="dialog-content"
    @opened="openCard" 
    :visible.sync="wxPayDialog"
    width="400px"
    >
    <div id="wxPay" ref="wxPay" style="height:300px;width:300px"></div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="wxPayDialog = false">确定</el-button>
      <el-button type="primary" @click="wxPayDialog = false">取消</el-button>
    </span>
  </el-dialog>


  </div>
</template>
<script>
import Vue from 'vue'
import Tools from '@/lib/Tools';
import config from "@/config.js";

let ts = Tools.getInstance();

export default {
  name: 'logisticsRecord',
  data() {
    return {
      wxPayDialog:false,
      payType:'zcpay',
      loading: false,
      logRecForm: {
        receiptName: '',
        receiptPhone: '',
        receiptAddress: '',
        receiptCode: '',
        date: []
      },
      labelPosition: 'right',
      currentTab: 'dataAll',


      //表格数据-----------------begin
      pageIndex: 1,
      pageSize: 5,
      pageSizeOption: [5, 10, 20],
      total: 0,
      tableData:{
        // 全部
        all:[],
        //待付款
        stayPay: [],
        // 待补费
        stayRepair:[],
        // 待入库
        stayStorage:[],
        // 已入库
        putInStorage:[],
        // 待出库
        stayOutStorage:[],
        // 已出库
        alreadyOutStorage:[],
        // 已签收
        alreadysignIn:[]
      },
      /***********表格数据----------end***********/
      // 切换的tab名称
      tabName:'dataAll',
      isExit:true,
      showVas:true,

      // 
      checked: false,
      cargoInsurance: true,

      // 表格数据
      showTableData:[],

      // 时间线
      reverse: false,
      ruleForm: {
        receiptName: '2019042165561615311654156',
        receiptPhone:'德国>广州关口>成都',
        receiptAddress:'长100CM，宽100CM，高100CM',
        receiptCode:'10KG',
        userName:'苏大强',
        userIphone:'+86 12348621345',
        userAddress:'中国四川成都高新区天府软件园D7',
        putName:'苏大强',
        putIPhone:'+86 12348621345',
        putAddress:'中国四川成都高新区天府软件园D7XXXXXXXXXXXXXXXX'
      },  
      activities: [],
      isShow:false,
      // 服务
      vasData:[],
      // 支付dialog
      payDialog:false,
      page:{
        size:1,
        num:5
       },
       // 总条数
       allNum:0,
       wxPayImg:null,
       payNum:null,
       zcMoney:null,
       pay_amount:'',
    }
  },
  methods: {
    // 当操作后
    restore(){
      this.page ={
        size:1,
        num:5
      }
    },
    findWaybill(){
      this.restore();
      this.loadPage(this.page)
    },
    
    openCard(){
        $("#wxPay").append(this.wxPayImg);
        $("#wxPay").children().css({height:'350px',width:'350px',margin:'0px auto'});
    },

    //退款
    refund(row){
      let thiz = this;
      let params = {
        order_no:row.order_no
      };
      ts.sendRequest('waybill/refund',{
        data:params,
        success:function(res){
          if(res.success){
              thiz.$message({
                message:res.msg,
                type:'success'
              });
              thiz.loadPage(thiz.page);
              thiz.getUserMsg();
          }
        },
        error:function(e){

        }
      });
    },

    selectPayType(){
          // 运单支付
      let thiz = this;
      $("#wxPay").empty();
      let params = {
        order_no:this.payNum,
        amount:this.pay_amount,
        // amount:0.01,
        type:thiz.payType,
      };
      let sendDataType;
      if (thiz.payType == "wxpay") {
        this.payDialog = false;
        // this.wxPayDialog = true;
        sendDataType = "html"
      }
      else if(thiz.payType == "alipay"){
        this.payDialog = false;
        this.wxPayDialog = false;
        sendDataType = "html"
      }
      else{
        sendDataType = "json"
      }

      ts.sendRequest('waybill/pay',{
        data:params,
        dataType:sendDataType,
        success:function(r){
          if(thiz.payType=="alipay"&&r){
            $("body").append(r);
            // localStorage.removeItem('centerStatus')
            // thiz.$router.push({name:'paymentOrder',params:{type:'lookOrder'}});
          }

          if(thiz.payType=="zcpay"&&r.success){
            thiz.$message({
              message:'支付成功',
              type:'success'
            });
            thiz.payDialog = false;
            thiz.wxPayDialog = false;
            thiz.getUserMsg();
            thiz.restore();
            thiz.loadPage(thiz.page);
          }

          if(thiz.payType=="wxpay"&&r){
            thiz.wxPayImg = r;
            thiz.wxPayDialog = true;
            thiz.queryWxPayResult(thiz.payNum);
            // thiz.$router.push({name:'paymentOrder',params:{type:'lookOrder'}});
          }

        },
        error:function(e){

        }
      });

      // http://www.transport.cn/api/waybill/pay/update
      // 测试
      // ts.sendRequest('waybill/pay/update',{
      //   data:{
      //     order_no:"ZC003000000144DE",
      //   },
      //   dataType:"json",
      //   success:function(r){
      //     console.log('--------------waybill/pay/update---------',JSON.stringify(r));

      //   },
      //   error:function(e){

      //   }
      // });
    },
    // 二维码接口请求后，调用查询支付接口
    queryWxPayResult(param){
      let thiz = this;
      let timeOut = setInterval(()=>{ 
        ts.sendRequest('waybill/wxpay/update',{
          isExit:true,
          data:{order_no:param},
          success:function(ret){
            if (ret.success) {
              thiz.wxPayDialog = false;
              clearInterval(timeOut);
              thiz.$message({
                message:'支付成功',
                type:'success'
              });
              thiz.restore();
              thiz.loadPage(thiz.page);
            }
            if (!thiz.wxPayDialog) {
              clearInterval(timeOut);
            }           
          },
          error:function(err){

          }
        })              
      }, 3000); 
    },


        // 获取个人信息
    getUserMsg(){
      let thiz = this;
      ts.sendRequest('member/info',{
        data:{},
        type:'GET',
        success:function(r){
          thiz.zcMoney = r.data.balance;
          ts.save("fullAccount",r.data);
        },
        error:function(e){

        }
      });
    },
    // 页码变动
    handleCurrentChange(val){
      this.page.size = val;
      let page = {
        size:val,
        num:this.page.num
      }
      this.loadPage(page)
    },
    statusCheck(row,column){
      let ret;
      switch(row.status){
        case 10:
          ret = '待付款'
          break
        case 11:
          ret = '待补费'
          break
        case 14:
          ret = '待入库'
          break
        case 12:
          ret = '已入库'
          break
        case 13:
          ret = '待出库'
          break
        case 20:
          ret = '已出库'
          break
        case 15:
          ret = '退款'
          break
        case 30:
          ret = '已签收'
          break
        default:
          ret = '取消'
          break 
      };
      return ret
    },
    noCheck(row,column){
      let ret;
      if(!row.tracknei_no){
        ret = '-'
      }
      else{
        ret = row.tracknei_no
      }
      return ret
    },
    nameCheck(row,column){
      let ret;
      if (row.sender_name && row.recevice_name) {
        ret = row.sender_name + '/' + row.recevice_name
      }
      return ret;
    }, 
    timeCheck(row,column){
      let ret;
      if (row.create_time) {
        ret = ts.changeTime(row.create_time);
      }
      else{
        ret = '-'
      }
      return ret;
    },
    // 支付
    pay(row){
      this.payNum = row.order_no;
      this.pay_amount = row.pay_amount
      this.payDialog = true;
    },
    backFirst(){
      this.isExit = true
    },
    //tabs切换
    tabsSwitch(tab, event) {

      // 清空搜索数据
      this.logRecForm = {
        receiptName: '',
        receiptPhone: '',
        receiptAddress: '',
        receiptCode: '',
        date: []
      };

      this.tabName = tab.name;
      this.page = {
        size:1,
        num:5
      };
      this.loadPage(this.page)
    },
    //查看物流----------
    checkDetail(detail) {
      if(detail.waybill_sn){
        this.getDetails(detail.waybill_sn);
        this.isExit = false;
      }
      else{
        this.$message({
          type:'error',
          message:'无国际运单号'
        })
      }
    },
    getDetails(param){
      let thiz = this;
      ts.sendRequest("express/detail", {
        data: {waybill_no:param},
        success: function(res) {
          // 基础信息
          thiz.activities = [];
          thiz.ruleForm.receiptName = res.data.waybill_sn;
          // 物流线路
          thiz.ruleForm.receiptPhone = res.data.channel;
          thiz.ruleForm.receiptAddress = '长' + res.data.length + 'CM，宽' + res.data.width + 'CM，高' + res.data.height + 'CM';
          // 重量
          thiz.ruleForm.receiptCode = res.data.weight + 'KG';
          thiz.ruleForm.userName = res.data.receive_name;
          thiz.ruleForm.userIphone = res.data.receive_phone;
          thiz.ruleForm.userAddress = res.data.receive_address;
          thiz.ruleForm.putName = res.data.send_name;
          thiz.ruleForm.putIPhone = res.data.send_phone;
          thiz.ruleForm.putAddress = res.data.send_address;

          // table数据
          thiz.showTableData = res.data.goods_list;

          // 增值服务
          if (res.data.vas_list.length == 0) {
             thiz.showVas = false
          }
          else{
            res.data.vas_list.forEach(function(r,i,k){
              r.imgUrl = config.fileURL + r.thumb;
            });

            thiz.vasData = res.data.vas_list;
            thiz.showVas = true
          }
          // 物流信息
          if (res.data.express_track) {
            res.data.express_track.forEach(function(r,i,k){
              let plt = {
                content: r.content,
                timestamp: r.create_time
              }
              thiz.activities.push(plt)
            });
          }
        },
        error: function(err) {
        }
      })
    },
    loadPage(params){
      let thiz = this;
      let url = "express/search"+'?'+'page='+params.size+'&num='+params.num;

      let sendParams = {
        addressee:this.logRecForm.receiptName,
        mobile:this.logRecForm.receiptPhone,
        waybill_no:this.logRecForm.receiptCode,
        detail:this.logRecForm.receiptAddress,
      };
      if (this.logRecForm.date) {
        sendParams.create_time =  this.logRecForm.date[0];
        sendParams.end_time = this.logRecForm.date[1]
      }
      else{
        sendParams.create_time = '';
        sendParams.end_time = ''
      }
      // 加上搜索的条件
      switch(thiz.tabName){
        case 'paid':
          thiz.tableData.stayPay = [];
          sendParams.status = 10
          break
        case 'packagePieces':
          thiz.tableData.stayRepair = [];
          sendParams.status = 11;
          break
        case 'delivery':
          thiz.tableData.stayStorage = [];
          sendParams.status = 14
          break
        case 'domesticDelivery':
          thiz.tableData.putInStorage = [];
          sendParams.status = 12
          break
        case 'abroadDelivery':
          thiz.tableData.stayOutStorage = [];
          sendParams.status = 13
          break
        case 'alreadyDelivery':
          thiz.tableData.alreadyOutStorage = [];
          sendParams.status = 20
          break
        case 'completed':
          thiz.tableData.alreadysignIn = [];
          sendParams.status = 30
          break 
        default:
          thiz.tableData.all = [];
          break 
      } 
      ts.sendRequest(url,{
        type:"POST",
        data:sendParams,
        success:function(ret){
          thiz.allNum = ret.count;
          switch(thiz.tabName){
            case 'dataAll':
              ret.data.forEach(function(r,i,k){
                if(r.status == 10) {
                  r.isShow = true
                }
                else if(r.status == 11){
                  r.isShow = true
                }
                else{
                  r.isShow = false
                }
              });
              thiz.tableData.all = ret.data
              break
            case 'paid':
              thiz.tableData.stayPay = ret.data
              break
            case 'packagePieces':
              thiz.tableData.stayRepair = ret.data
              break
            case 'delivery':
              thiz.tableData.stayStorage = ret.data
              break
            case 'domesticDelivery':
              thiz.tableData.putInStorage = ret.data
              break
            case 'abroadDelivery':
              thiz.tableData.stayOutStorage = ret.data
              break
            case 'alreadyDelivery':
              thiz.tableData.alreadyOutStorage = ret.data
              break
            default:
              thiz.tableData.alreadysignIn = ret.data
              break 
          } 

        },
        error:function(err){
          thiz.$message({
            message: "数据加载失败",
            type: 'error'
          });
        }
      });
    }, 
    alipayQuery(){
      let thiz = this;
      ts.sendRequest('waybill/pay/update',{
        isExit:true,
        data:{order_no:ts.getWebParam()},
        success:function(res){
          if(res.success){
            thiz.loadPage(thiz.page)
          }
        },
        error:function(err){

        }
      })
    },
  },
  mounted: function() {
    this.zcMoney = JSON.parse(localStorage.getItem('fullAccount')).balance;
    this.loadPage(this.page);
    if(ts.getWebParam()){
      this.alipayQuery();
    }
  }
}
</script>
<style>
.el-textarea__inner {
  height: 120px;
}
.bt-pay{
  color:#3399FF;
  // border:1px solid black;
  padding:5px;
  padding-top:2px;
  padding-bottom:2px;
  cursor:pointer
}
</style>
