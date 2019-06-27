<!--
 * @name logisticsDetails.vue
 * @author 王刚
 * @date 2019.4.18
 * @desc 物流详情
-->
<template>
  <div>
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
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="chinese_name" label="商品名称" width="150">
        </el-table-column>
        <el-table-column prop="record_number" label="备案信息" width="150">
        </el-table-column>
        <el-table-column prop="specification_type" label="商品规格" width="400">
        </el-table-column>
        <el-table-column prop="num" label="商品数量">
        </el-table-column>
      </el-table>
    </div>
    <div class="xyj-edit-form">
      <div class="xyj-form-section">
        <img class='mr10' src="@/assets/personalCenter/zengzhifuwuicon@2x.png" alt="">增值服务
      </div>
      <div  style="display:flex;flex-direction:row">
        <div class="clearfix" v-for="item in vasData" style="margin:20px">
          <div :class="{'xyj-box': true, 'active': item.type}">
            <el-checkbox v-model="item.type" disabled></el-checkbox>
            <div class="xyj-img">
              <img :src="item.imgUrl" alt="" style="width:40px;height:40px">
            </div>
            <p class="xyj-content">{{item.name}}</p>
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
</template>

<script>
import Tools from '@/lib/Tools';
import config from "@/config.js";

let ts = Tools.getInstance();

export default {
  name: 'logisticsDetails',
  data () {
    return {
      checked: false,
      cargoInsurance: true,

      // 表格数据
      tableData:[],

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
    }
  },
  methods:{
    // 获取物流详情
    getDetails(param){
      let thiz = this;
      ts.sendRequest("express/detail", {
        data: {waybill_no:param},
        success: function(res) {
          debugger
          // 基础信息
          thiz.ruleForm.receiptName = res.data.waybill_sn;
          // 物流线路
          thiz.ruleForm.receiptPhone = res.data.channel;
          thiz.ruleForm.receiptAddress = '长' + res.data.length + 'CM，宽' + res.data.width + 'CM，高' + res.data.height + 'CM';
          // 重量
          // thiz.ruleForm.receiptCode = res.data.;
          thiz.ruleForm.userName = res.data.receive_name;
          thiz.ruleForm.userIphone = res.data.receive_phone;
          thiz.ruleForm.userAddress = res.data.receive_address;
          thiz.ruleForm.putName = res.data.send_name;
          thiz.ruleForm.putIPhone = res.data.send_phone;
          thiz.ruleForm.putAddress = res.data.send_address;

          // table数据
          thiz.tableData = res.data.goods_list;

          // 增值服务

          // thiz.vasData.forEach(function(row,index){
          //   res.data.vas_list.forEach(function(r,i){
          //     if (row.id === r.id) {
          //       row.type = true;
          //     }
          //   })
          // })

          if (res.data.vas_name === '增值服务1') {
            thiz.isShow = true
          }
          else{
            thiz.isShow = false
          }

          // 物流信息
          // res.data.express_track.forEach(function(r,i,k){
          //   let plt = {
          //     content: r.content,
          //     timestamp: r.create_time
          //   }
          //   thiz.activities.push(plt)
          // });
        },
        error: function(err) {
          console.log(err)
        }
      })
    },
    commonDate(){
      let thiz = this;
      ts.sendRequest('common/data',{
        data:{},
        type:'GET',
        success:function(res){
          res.data.vas.forEach(function(r,i,k){
            r.imgUrl = config.fileURL + r.thumb;
            r.type = false;
            thiz.vasData.push(r)
          })
        },
        error:function(err){

        }
      })
    }
  },
  mounted(){
    this.commonDate();
    // this.getDetails(this.$route.params.code);
  }
}

</script>

<style scoped>
  .xyj-box{
    width: 180px;
    height: 180px;
    border-top: 1px solid #fff;
    float:left;
  }
  .xyj-box.active{
    box-shadow: 0px 0px 8px 1px rgba(24,124,232,0.27);
  }
  .xyj-img{
    width: 106px;
    margin: 15px auto 5px;
    height: 106px;
  }
  .xyj-content{
    text-align: center;
    line-height: 18px;
  }
  .xyj-box .el-checkbox{
    float: right;
    margin-right: 6px;
    margin-top: 6px;
  }
  .mr10{
    margin-right:10px;
  }
</style>
