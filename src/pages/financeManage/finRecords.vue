<!--
 * @name finRecords.vue
 * @author 王刚
 * @date 2019.4.18
 * @desc 财务记录
-->
<template>
  <div>
    <div class="xyj-edit-form" style="padding-right:20px;">
      <!--<h2>{{this.$store.state.keepAliveName}}</h2>-->
      <el-form :inline="true" :model="finRecordsForm" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="订单号" prop="code">
              <el-input v-model="finRecordsForm.code" placeholder="请输入订单号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="时间">
              <el-date-picker v-model="finRecordsForm.date" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期">
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
      <el-tabs v-model="currentTab" class="no-border-tabs">
        <el-tab-pane label="记录列表" name="pendingDisposal" :key="'pendingDisposal'">
          <el-table :data="disposalTableData" style="width: 100%">
            <el-table-column prop="order_no" label="订单号" width="200">
            </el-table-column>
            <el-table-column prop="amount_money" label="充值金额" width="250">
            </el-table-column>
            <el-table-column prop="balance" label="充值后余额" width="220">
            </el-table-column>
            <el-table-column prop="create_time" label="充值时间" width="200" :formatter="checkTime">
            </el-table-column>
            <el-table-column label="操作">     
              <template slot-scope="scope">
                <div @click="delFromSelect(scope.row)" style="display:inline-block;cursor:pointer;">
                  <img src="../../assets/delete.png" style="width:14px;height:14px;margin-right:3px;background-color:white;cursor:pointer;">
                </div>
              </template>
            </el-table-column>
          </el-table> 
        </el-tab-pane>
      </el-tabs>
      <el-pagination
        small
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="page.num"
        :current-page="page.size"
        :total="allNum">
      </el-pagination>
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

      disposalTableData: [],
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
    checkTime(row,column){
      let ret = ts.changeTime(row.create_time);
      return ret
    },
    delFromSelect(row){
      let thiz = this;

      this.$confirm('确认删除？')
        .then(_ => {
          ts.sendRequest('personcenter/finance/log/delete',{
              data:{id:row.id},
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

    loadPage(params){
      let thiz = this;
      this.disposalTableData = [];
      let sendParams = {};
      sendParams.order_no = thiz.finRecordsForm.code;
      if (this.finRecordsForm.date) {
        sendParams.create_time = this.finRecordsForm.date[0];
        sendParams.end_time = this.finRecordsForm.date[1];
      }
      else{
        sendParams.create_time = '';
        sendParams.end_time = '';
      }

      let url = "personcenter/finance/log/search"+'?'+'page='+params.size+'&num='+params.num;
      ts.sendRequest(url,{
        data:sendParams,
        success:function(ret){
          thiz.allNum = ret.count;
          thiz.disposalTableData = ret.data;
        },
        error:function(err){
        }
      });
    },

    selectChange(selection, rowData) {
    }
  },
  mounted: function() {
     this.loadPage(this.page)
  }
}
</script>
<style scoped>
</style>
