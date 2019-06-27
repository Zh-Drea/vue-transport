<!--
 * @name accBalance.vue
 * @author 王刚
 * @date 2019.4.18
 * @desc 账户余额
-->
<template>
  <div>
    <div>
      <div class="xyj-accBalance xyj-edit-form" style="padding:15px 25px 10px 25px;">
        <el-row style="padding:10px 0;">
          <el-col :span="24">
            <label>余额总额：</label>
            <span style="color:rgba(255,0,0,1);font-weight:bold;font-size:16px;">￥{{balance}}</span>
          </el-col>
        </el-row>
      </div>
      <div class="xyj-edit-form label-120">
        <div class="xyj-onlineRecharge">
          <div>
            <div class="xyj-form-section" style="margin-top:0;">
              <img class='mr10' src="@/assets/personalCenter/icon-test@2x(1).png" alt="">在线充值<i class="el-icon-question" style="color:#FEB12D;margin-top: 10px;margin-left:10px"></i>
            </div>
            <div v-if="!isRecharge" class="xyj-recharge-form">
              <el-form :model="onlineRechargeForm" ref="onlineRechargeForm" label-width="120px" class="demo-ruleForm">
                <el-row :gutter="20">
                  <el-col :span="15">
                    <el-form-item label="充值额度:" prop="rechargeLimit">
                      <el-input v-model="onlineRechargeForm.rechargeLimit" placeholder="请输入充值额度，最低￥100"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7" style="padding-top: 5px;" class="btn-middle">
                    <el-button size="small" @click="submitForm()" round>提交充值</el-button>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <div v-if="isRecharge">
              <!-- 订单信息 -->
              <div style="padding:20px;">
                <div style="margin-top:10px;">
                  <span style="display:inline-block;width:86px;text-align:right;">充值额度：</span>
                  <span style="display:inline-block;color:red;font-size:16px;font-weight:bold;">￥{{onlineRechargeForm.rechargeLimit}}</span>
                </div>
                <div style="margin-top:10px;">
                  <span style="display:inline-block;width:86px;text-align:right;">支付方式：</span>

                  <span style="position:relative;top:20px;display:block;left:20px;">

                    <div style="display:inline-block;cursor:pointer;" @click="choosePay($event,'alipay')">
                      <img :src="payRadio('alipay')" style="width:12px;height:12px;background-color:white;margin-right:5px;margin-bottom:10px">
                      <img src="../../assets/alipay.png" style="width:100px;height:34px;background-color:white;">
                    </div>

                    <div style="display:inline-block;margin-left:30px;cursor:pointer;" @click="choosePay($event,'wxpay')">
                      <img :src="payRadio('wxpay')" style="width:12px;height:12px;background-color:white;margin-right:5px;margin-bottom:10px">
                      <img src="../../assets/wxpay.png" style="width:100px;height:34px;background-color:white;">
                    </div>

                  </span>
                </div>
              </div>
              <!-- 支付订单 -->
              <div style="margin-top:30px;text-align:center;padding-right:40px;">
                <button style="margin-left:20px;background:rgba(24,124,232,1);border:1px solid rgba(24, 124, 232, 1);border-radius:15px;padding:0px 20px;color:white;height:30px;" @click="payBill">支付订单</button>
              </div>

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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Tools from '@/lib/Tools';
import config from "@/config.js";

let ts = Tools.getInstance();

export default {
  name: 'accBalance',
  data() {
    return {
      wxPayDialog:false,
      balance: "1000000.00",
      AvailableCredit: '8000.00',
      FreezingQuota: '8000.00',
      onlineRechargeForm: {
        rechargeLimit: '',
        code: '23123123123123'
      },
      rules: {
        rechargeLimit: [
          { required: true, message: '请输入金额', trigger: 'blur' }
        ]
      },
      confirmRechargeForm: {
        rechargeLimitVal: '200',
        codeVal: '23123123123123',
        resource: "",
      },
      isRecharge: false,
      payType:"alipay",
      wxPayImg:null
    }
  },
  computed:{
    scRadio:function(){
      let thiz = this;
      // 解决计算属性传参的问题
      return function(index){
        let finalPic = thiz.scIndex==index?require('../../assets/radio_active.png'):require('../../assets/radio.png');
        return finalPic;
      }
    },
    payRadio:function(){
      let thiz = this;
      // 解决计算属性传参的问题
      return function(type){
        let finalPic = thiz.payType==type?require('../../assets/radio_active.png'):require('../../assets/radio.png');
        return finalPic;
      }
    }
  },
  methods: {
    openCard(){
        $("#wxPay").append(this.wxPayImg);
        $("#wxPay").children().css({height:'350px',width:'350px',margin:'0px auto'});
    },
    choosePay:function(e,type){
      this.payType = type;
    },
    submitForm() {
       if (!this.onlineRechargeForm.rechargeLimit) {
          this.$message({
            message: '充值额度不能为空',
            type: 'error'
          });
          return; 
       }
      this.isRecharge = true;
    },
    payBill(){
      let thiz = this;
      $("#wxPay").empty();
      ts.sendRequest("personcenter/info/recharge",{
        dataType:"json",
        data:{
          amount:thiz.onlineRechargeForm.rechargeLimit,
          type:thiz.payType
        },
        success:function(ret){
          if(thiz.payType=="alipay"){
            $("body").append(ret);
            // thiz.queryPayResult(ret.order_no);
          }
          if(thiz.payType=="wxpay"&&ret){
            thiz.wxPayDialog = true;
            thiz.wxPayImg = ret.data;
            thiz.queryPayResult(ret.order_no);
            // thiz.$router.push({name:'paymentOrder',params:{type:'lookOrder'}});
          }

        },
        error:function(err){
          if(thiz.payType=="alipay"){
            $("body").append(err.responseText);
          }
          if(thiz.payType=="wxpay"){
            thiz.wxPayDialog = true;
            thiz.wxPayImg = err.responseText;
            thiz.queryWxPayResult(thiz.payNum);
            thiz.$router.push({name:'paymentOrder',params:{type:'lookOrder'}});
          }
         }   
      })

      // 测试返回订单号给后端 201905290011
      // ts.sendRequest("personcenter/info/recharge/return",{
      //   type:"POST",
      //   // dataType:"json",
      //   data:{
      //     order_no:"201905290011",
      //   },
      //   success:function(ret){
          
      //     console.log("--------personcenter/info/recharge/return--------",JSON.stringify(ret));
          
      //   },
      //   error:function(err){
      //     thiz.$message({
      //       message: "数据加载失败",
      //       type: 'error'
      //     });
      //   }
      // });

      // this.getUserData()

    },
    // 二维码接口请求后，调用查询支付接口
    queryPayResult(param){
      let thiz = this;
      let timeOut = setInterval(()=>{ 
        ts.sendRequest('personcenter/info/recharge/return',{
          isExit:true,
          data:{order_no:param,type:thiz.payType},
          success:function(ret){
            if (ret.success) {
              clearInterval(timeOut);
              thiz.$message({
                message:'支付成功',
                type:'success'
              });
              thiz.getUserData();
              thiz.isRecharge = false;
              thiz.wxPayDialog = false;
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
    getUserData(){
      let thiz = this;
      ts.sendRequest('member/info',{
        data:{},
        type:'GET',
        success:function(res){
          ts.save("fullAccount",res.data);
          thiz.balance = res.data.balance;
          thiz.onlineRechargeForm.rechargeLimit = '';
        },
        error:function(err){

        }
      })
    }
  },
  mounted: function() {
    this.getUserData();
    let plt = JSON.parse(localStorage.getItem('fullAccount'));
    this.balance = plt.balance
  }
}

</script>
<style scoped>
.mr10 {
  margin-right: 10px;
}

</style>
