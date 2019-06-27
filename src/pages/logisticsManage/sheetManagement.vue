<!--
 * @name sheetManagement.vue
 * @author 王刚
 * @date 2019.4.18
 * @desc 面单管理
-->
<template>
  <div>
    <div class="xyj-edit-form label-100" style="padding-right:20px;">
      <el-form :inline="true" :model="sheManForm" ref="sheManForm" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="收件人:" prop="addressee">
              <el-input v-model="sheManForm.addressee" placeholder="请输入收件人关键词"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="收件电话:" prop="mobile">
              <el-input v-model="sheManForm.mobile" placeholder="请输入收件人电话"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="国际运单号:" prop="waybill_no">
              <el-input v-model="sheManForm.waybill_no" placeholder="请输入国际运单号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
           <!--  <el-form-item prop="date" label="时间:">
              <el-date-picker type="date" placeholder="选择日期" v-model="sheManForm.date" style="width: 100%;"></el-date-picker>
            </el-form-item> -->
            <el-form-item label="时间:">
              <el-date-picker
                v-model="sheManForm.date"
                type="datetimerange"
                range-separator="~"
                value-format="yyyy-MM-dd HH:mm:ss"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
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
      <el-tabs v-model="currentTab" class="no-border-tabs" @tab-click="tabsSwitch">
        <el-tab-pane label="待打印" name="pendingPrinting" :key="'pendingPrinting'" style="width:100%;">
          <el-row>
            <el-col :span="2" :offset="22">
              <a v-if="pdfUrl" :href="pdfUrl"><el-button @click="downloadPdf">打印</el-button></a>
              <el-button v-if="!pdfUrl" @click="noDownloadPdf">打印</el-button>
            </el-col>
          </el-row>
          <el-table :data="noPrintTable" style="width: 100%" @selection-change="handleSelectionChange"> 
             <el-table-column type="selection" width="60">
            </el-table-column>
            <el-table-column prop="waybill_sn" label="国际运单号" width="170">
            </el-table-column>
            <el-table-column prop="tracknei_no" label="国内运单号" width="170">
            </el-table-column>
            <el-table-column prop="ab_name" label="线路" width="150">
            </el-table-column>
            <el-table-column label="寄件人/收件人" width="140" :formatter="nameType">
            </el-table-column>
            <el-table-column label="重量/长度" width="90" :formatter="weightType">
            </el-table-column>
            <el-table-column prop="clearport_name" label="目的地" width="100">
            </el-table-column>
            <el-table-column prop="actual_price" label="运费" width="100">
            </el-table-column>
            <el-table-column label="状态" width="100" :formatter="statusType">
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
        <el-tab-pane label="已打印" name="printed" :key="'printed'" style="width:100%;">
          <el-row>
            <el-col :span="2" :offset="22">
              <a v-if="doneUrl" :href="doneUrl"><el-button @click="downloadPdf">打印</el-button></a>
              <el-button v-if="!doneUrl" @click="noDownloadPdf">打印</el-button>
            </el-col>
          </el-row>
          <el-table :data="printTable" style="width: 100%" @selection-change="handleDoneChange">
            <el-table-column type="selection" width="60">
            </el-table-column>
            <el-table-column prop="waybill_sn" label="国际运单号" width="170">
            </el-table-column>
            <el-table-column prop="tracknei_no" label="国内运单号" width="170">
            </el-table-column>
            <el-table-column prop="ab_name" label="线路" width="150">
            </el-table-column>
            <el-table-column label="寄件人/收件人" width="140" :formatter="nameType">
            </el-table-column>
            <el-table-column label="重量/长度" width="90" :formatter="weightType">
            </el-table-column>
            <el-table-column prop="clearport_name" label="目的地" width="100">
            </el-table-column>
            <el-table-column prop="actual_price" label="运费" width="100">
            </el-table-column>
            <el-table-column label="状态" width="100" :formatter="statusType">
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
  name: 'sheetManagement',
  data() {
    return {

      loading: false,
      //获取所有表格数据
      getPrintingData: [],
      sheManForm: {
        addressee: '',
        mobile: '',
        waybill_no: '',
        date: []
      },
      rules: {
        addressee: [
          { required: true, message: '请输入收件人', trigger: 'blur' },
        ],
        pickupphone: [
          { required: true, validator: ts.rulePhone, trigger: 'blur' }
        ],
        waybillno: [
          { required: true, message: '请输入国际单号', trigger: 'blur' }
        ],
        date: [
            {  type: 'daterange', required: true, message: '请选择日期', trigger: 'change' }
          ],
      },

      currentTab: 'pendingPrinting',

      // 待打印table
      noPrintTable:[],
      // 打印table
      printTable:[],
       // 选中的id字符串
       selectIds:'',
       //未打印 下载pdf url
       pdfUrl:'',
       // 已打印
       doneUrl:'',
       page:{
        size:1,
        num:5
       },
       // 总条数
       allNum:0,
    }
  },
  methods: {
    // 当返回后操作返回后
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
    // 页码变动
    handleCurrentChange(val){
        this.page.size = val;
        let page = {
          size:val,
          num:this.page.num
        }
        this.loadPage(page)
    },
    //tabs切换
    tabsSwitch(tab, event) {
      // this.tabName = tab.$options.propsData.name;
      // console.log(tab.name)
      // 清空搜索数据
      this.sheManForm = {
        addressee: '',
        mobile: '',
        waybill_no: '',
        date: []
      };

      this.currentTab =  tab.name;
      this.restore();
      this.loadPage(this.page)
    },
    // 已打印再次打印
    handleDoneChange(val){
      let plt = '';
      val.forEach(function(r,i,k){
        if (i == 0) {
          plt = JSON.stringify(r.id)
        }
        else{
          plt = plt + ',' +JSON.stringify(r.id)
        }
      });
      this.selectIds = plt;
      if (val.length == 0) {
        this.doneUrl = ''; 
        return;
      }
      this.doneUrl =config.baseURL+ 'common/facepdf' + '?id='+ this.selectIds;
    },
    // 未打印打印
    handleSelectionChange(val){
      let plt = '';
      val.forEach(function(r,i,k){
        if (i == 0) {
          plt = JSON.stringify(r.id)
        }
        else{
          plt = plt + ',' +JSON.stringify(r.id)
        }
      });
      this.selectIds = plt;
      if (val.length == 0) {
        this.pdfUrl = ''; 
        return;
      }
      this.pdfUrl =config.baseURL+ 'common/facepdf' + '?id='+ this.selectIds;
    },
    // 寄件人收件人转义
    nameType(r,c){
      return r.sender_name + '/' + r.recevice_name
    },
    // 重量/长度转义
    weightType(r,c){
      return r.weight + '/' + r.length
    },
    // 状态转义
    statusType(r,c){
      let ret;
      if (r.down_status == 1) {
        ret = '打印'
      }
      else{
        ret = '未打印'
      }
      return ret
    },
    noDownloadPdf(){
      this.$message({
        message: "请先选中行",
        type: 'error'
      });
    },
    downloadPdf(){
      this.restore();
      this.loadPage(this.page)
    },
    //搜索
    searchSheet() {
      let thiz = this;

      ts.sendRequest('personcenter/face/search',{
        data:sendParams,
        success:function(res){
          
        },
        error:function(err){

        }
      })
    },
    loadPage(params){
      let thiz = this;
      this.noPrintTable = [];
      this.printTable = [];
      
      // 查询条件
      let sendParams = {
        addressee:this.sheManForm.addressee,
        mobile:this.sheManForm.mobile,
        waybill_no: this.sheManForm.waybill_no,
      };
      if (this.sheManForm.date) {
        sendParams.create_time =  this.sheManForm.date[0];
        sendParams.end_time = this.sheManForm.date[1]
      }
      else{
        sendParams.create_time = '';
        sendParams.end_time = ''
      }
      if (thiz.currentTab == 'pendingPrinting') {
        sendParams.down_status = 0
      }
      else{
        sendParams.down_status = 1
      }

      let url = "personcenter/face/search"+'?'+'page='+params.size+'&num='+params.num;
      ts.sendRequest(url,{
        data:sendParams,
        success:function(ret){
          thiz.allNum = ret.count;
          if (thiz.currentTab == 'pendingPrinting') {
            thiz.noPrintTable = ret.data
          }
          else{
            thiz.printTable = ret.data
          }
        },
        error:function(err){
          thiz.$message({
            message: "数据加载失败",
            type: 'error'
          });
        }
      });
    }


  },
  mounted:function(){
    this.loadPage(this.page)
    // this.getPage()
  }
}

</script>
<style>
</style>
