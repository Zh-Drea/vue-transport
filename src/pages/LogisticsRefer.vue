<!-- 
  @name  LogisticsRefer.vue(物流查询)
  @author zlz
  @date 2019.04.17
 -->
<template>
	<div style="width:1200px">
    <el-row style="margin-top:20px">
      <el-col>
        <el-tabs  v-model="editableTabsValue" @tab-click="handleClick">
          <el-tab-pane label="普通查询" name="1">
            <el-row class="row-bg" justify="space-around">
              <el-col :span="2" style="width: 75px;"><div class="pull-left" style="margin-right:10px;margin-top:10px;text-align:center;font-size:
              9px">物流单号</div></el-col>
              <el-col :span="20">
                <input placeholder="请输入运单号进行搜索" v-model="seNum" class="bt-input">                   
                </input>
              </el-col>
              <el-col :span="2" ><el-button @click="getParams(seNum)" round  class="btn-big" type="primary" style="margin-left:20px;height:40px">查询</el-button></el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="批量查询" name="2">
            <div style="text-align:center;">
                <textarea placeholder="请输入物流单号,每行一个" v-model="textareaData" style="padding-top:20px" class="bt-area"></textarea>
                <el-button type="primary" style="margin:15px 30px;" class="btn-big" @click="batchQuery" round>查询</el-button>
             </div>
          </el-tab-pane>
        <!-- <el-tabs type="border-card" v-model="editableTabsValue" @tab-click="handleClick">
          <el-tab-pane label="普通查询" name="1">
            
          </el-tab-pane>
           <el-tab-pane label="批量查询" name="2">
             <div>
                <h5>请输入物流单号</h5>
                <el-input type="textarea" placeholder="请输入物流单号,每行一个" style="margin-top:10px"></el-input>
                <el-button type="primary" style="margin-top:10px">查询</el-button>
             </div>
           </el-tab-pane> -->
          </el-tabs>
      </el-col>
    </el-row>
    <div v-if="isShow">
      <el-row :gutter="20" style="margin-top:10px;">
        <el-col :span="5">
          <img src="../assets/LA.jpg" style="height:400px;width:100%"></img>
        </el-col>
        <el-col :span="19">
          <el-card class="box-card" style="height:400px">
            <div>
              <img src="../assets/car.png" style="width:30px;height:30px;display: block;float: left;" alt="">
              <h4 style="margin-bottom:20px;padding: 8px 0 0 15px;
              margin-left: 26px;">物流信息
              </h4>
            </div>
            <el-timeline v-if="!isExit">
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :color="activity.color"
                :timestamp="activity.create_time">
                {{activity.content}}
              </el-timeline-item>
            </el-timeline>
            <div v-if="isExit" style="text-align:center;margin-top:130px">暂无物流消息</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div v-if="!isShow">
      <el-row style="margin-top:10px;">
        <el-col>
            <el-card class="box-card" style="height:400px">
              <el-row>
                <el-col :span="1">
                  <img src="../assets/car.png" style="width:30px;height:30px;display: block;float: left;" alt="">
                </el-col>
                <el-col :span="2">
                  <h4>物流信息</h4>
                </el-col>
                <el-col :span="2" :offset="19">
                  <a v-if="!ids" @click="exportExclErr"><button style="margin-left:20px;background-color:white;border:1px solid rgba(24, 124, 232, 1);border-radius:15px;width:90px;color:rgba(24, 124, 232, 1);height:25px;">导出</button></a>
                  <a v-if="ids" :href="ids"><button style="margin-left:20px;background-color:white;border:1px solid rgba(24, 124, 232, 1);border-radius:15px;width:90px;color:rgba(24, 124, 232, 1);height:25px;">导出</button></a>
                </el-col>
              </el-row>              
              <hr>
              <el-table :data="tableData" @selection-change="handleSelectionChange" style="width: 100%">
                <el-table-column type="selection" width="100">
                </el-table-column>
                <el-table-column prop="waybill_sn" label="单号" width="400">
                </el-table-column>
                <el-table-column prop="content" label="状态" width="400">
                </el-table-column>
                <el-table-column prop="create_time" label="时间">
                </el-table-column>
              </el-table>
          </el-card>
        </el-col>
      </el-row>

    </div>
	</div>	
</template>
<script>
  import Tools from "../lib/Tools.js";
  import config from "@/config.js";
  let ts = Tools.getInstance();

  export default {
  	name:'OfficialWebsite',
    data() {
      return {
        editableTabsValue:'1',
        isShow:true,
        seNum:"",
      	msg:"物流查询",
        activities: [],
        tableData: [],  
        // 批量查询数据
        textareaData:'',
        batchData:'',
        // 选中行ids
        ids:'',
        isExit:false,
      }
    },
    methods: {
      exportExclErr(){
        this.$message({
          message: "请先选中行",
          type: 'error'
        })
      },
      // 选中行事件
      handleSelectionChange(val){
        let plt = '';
        if (val.length == 0) {
          this.ids = ''; 
          return;
        }
        val.forEach(function(r,i,k){
          if (i == 0) {
            plt = r.waybill_sn
          }
          else{
            plt = plt + ',' + r.waybill_sn
          }
        });
        this.ids =config.baseURL+ 'express/batch/out' + '?id='+ plt;
      },
      // 批量查询
      batchQuery(){
        let thiz = this;
        if (!this.textareaData) {
          thiz.$message({
            message: "请填写物流单号",
            type: 'error',
            duration:2000
          });
          return;
        }
        let params = this.textareaData.split("\n");
        ts.sendRequest('express/batch/search',{
          data:{data:params},
          success:function(res){
            thiz.tableData = res.data
          },
          error:function(err){

          }
        })
      },
      handleClick(tab, event) {
        this.editableTabsValue = tab.name;
        if (tab.name === '1') {
          this.isShow = true
        }
        else{
          this.isShow = false
        }
      },
      // 
      getParams(param){
        let thiz = this;
        if (!this.seNum) {
          thiz.$message({
            message: "请填写运单号",
            type: 'error',
            duration:1000
          });
          return;
        }
        thiz.activities = [];  
        ts.sendRequest('express/detail',{
          data:{waybill_no:param},
          success:function(res){
            if (res.data) {
              thiz.isExit = false;
              thiz.activities = res.data.express_track;
            }
            else{
               thiz.isExit = '暂无物流消息'
            }
          },
          error:function(err){

          }
        })
      },
    },
    mounted:function(){
      this.seNum = this.$route.params.code;
      this.getParams(this.$route.params.code);
      // console.log(this.$route.params.num)
    }
  };
</script>
<style scoped>
  .bt-area{
    border:none;
    background-color:#F4F4F4;
    outline:none;
    /*appearance:none;*/
    width:100%;
    color:black !important;
    height:150px;
    border-radius:15px;
    padding-left:30px;
    font-size:12px;
  }
  .bt-input{
    border:none;
    background-color:#F4F4F4;
    outline:none;
    appearance:none;
    width:100%;
    color:black !important;
    height:40px;
    border-radius:35px;
    padding-left:30px;
    font-size:12px;
  }
  .bt-content{
    display: flex;
    flex-direction: 
  }
  .el-button.is-round.btn-big{
        padding: 8px 33px;
  }
  .el-button.is-round.btn-middle{
    padding: 6px 28px;
  }
  .el-timeline-item__wrapper{
    display: flex;
    flex-direction: row
  }
  .el-input__inner{
    border-radius: 34px;
    height: 35px;
    line-height: 35px;
    background: rgba(244,244,244,1);
    border: none;
  }
  .el-tabs__nav-wrap::after{
    background-color:#fff;
  }
  
  .el-textarea__inner{
    min-height:140px!important;
    resize: none;
    border-radius: 13px;
  }
</style>