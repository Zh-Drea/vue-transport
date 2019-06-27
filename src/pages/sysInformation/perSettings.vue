<!--
 * @name perSettings.vue
 * @author 王刚
 * @date 2019.4.18
 * @desc 个人设置
-->
<template>
  <div>
    <div class="xyj-edit-form" style="padding-right:20px;">
      <el-tabs v-model="editableTabsValue2" class="no-border-tabs">
        <el-tab-pane label="基础设置" name="pendingDisposal" :key="'pendingDisposal'">
          <el-form :model="finRecordsForm" ref="finRecordsForm" label-width="80px">
            <el-row>
              <el-col :span="11">
                <el-form-item label="用户昵称:" prop="userName"> 
                  <el-input v-model="finRecordsForm.userName" placeholder="请输入昵称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="2">
                <el-form-item label="用户邮箱:" prop="userEmail">
                  <el-input v-model="finRecordsForm.userEmail" placeholder="请输入邮箱"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="用户手机:" prop="userIphone">
                  <el-input v-model="finRecordsForm.userIphone" placeholder="请输入手机"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="验证码:" prop="verificationCode">
                  <el-input v-model="finRecordsForm.verificationCode" placeholder="请输入验证码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4" :offset="2">
                <el-button @click="sendMsg" style="color:#187CE8;font-size:14px;cursor:pointer">{{msgTitle}}</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="text-align:center;">
                <el-button type="primary" @click="submitForm('finRecordsForm')" size="small" round>确认修改</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
<!--         <el-tab-pane label="头像" name="pendingReply" :key="'pendingReply'">
          <div style="background: green; display: inline">
            222
          </div>
        </el-tab-pane>
        <el-tab-pane label="密码设置" name="completed" :key="'completed'">
          <div style="background: green; display: inline">
            333
          </div>
        </el-tab-pane> -->
      </el-tabs>
    </div>
  </div>
</template>
<script>
import Tools from '@/lib/Tools';
import config from "@/config.js";

let ts = Tools.getInstance();

export default {
  name: 'perSettings',
  data() {
    return {
      msgTitle:'发送验证码',
      // 短信开关
      isExit:true,
      editableTabsValue2: 'pendingDisposal',
      finRecordsForm: {
        userName: '',
        userEmail: '',
        userIphone: '',
        verificationCode: '',
      },
      timeOut:''
    }
  },
  methods: {
    // 发送验证码
    sendMsg(){
      let thiz = this;
      // 验证码点击开关
      if (!thiz.isExit) {
        return;
      }
      if (!thiz.finRecordsForm.userIphone) {
        thiz.$message({
            message: '请先输入电话',
            type: 'error'
        });
        return;
      }
      let url = config.msgURL+thiz.finRecordsForm.userIphone;
      ts.sendMsgRequest(url,{
        data:{},
        type:'GET',
        success:function(r){
          if (r.code == 0) {
            thiz.isExit = false;
            let num = 60;
            thiz.timeOut = setInterval(()=>{ 
              thiz.msgTitle = '倒计时' + num + '秒';
              num--;
              if (num === 1) {
                clearInterval(thiz.timeOut);
                thiz.isExit = true;
                thiz.msgTitle = '发送验证码'
              }
            }, 1000);
          }
          else{
            thiz.$message({
                message: r.msg,
                type: 'error'
            });
          }
        },
        error:function(e){

        }
      });   
    },
    submitForm() {
      let thiz = this;
      let sendParams = {};
      sendParams.nickname = thiz.finRecordsForm.userName;
      sendParams.mobile = thiz.finRecordsForm.userIphone;
      sendParams.email = thiz.finRecordsForm.userEmail;
      sendParams.code = thiz.finRecordsForm.verificationCode;

      // 校验
      let msg;
      if (!thiz.finRecordsForm.verificationCode) {
        msg = '请填写验证码'
      }
      if (!thiz.finRecordsForm.userIphone) {
        msg = '请填写用户手机'
      }
      if (!thiz.finRecordsForm.userEmail) {
        msg = '请填写用户邮箱'
      }
      if (!thiz.finRecordsForm.userName) {
        msg = '请填写用户昵称'
      }
      if (msg) {
        thiz.$message({
          message: msg,
          type: 'error'
        });
        return;
      }
      ts.sendRequest("personcenter/info/update",{
        data:sendParams,
        success:function(ret){
          if (ret.success) {
            thiz.$message({
                message: '修改成功',
                type: 'success'
            });
            thiz.isExit = true;
            thiz.msgTitle = '发送验证码';
            clearInterval(thiz.timeOut);
            thiz.getUser()
          }
          else{
            thiz.$message({
                message: ret.msg,
                type: 'error'
            });
            thiz.isExit = true;
            thiz.msgTitle = '发送验证码';
            clearInterval(thiz.timeOut);
          }
        },
        error:function(err){
        }
      })
    },
    getUser(){
      let thiz = this;
      ts.sendRequest("member/info",{
        data:{},
        type:'GET',
        success:function(r){
          // 保存完整的账号信息
          r.data.userName = r.data.nickname? r.data.nickname : r.data.username;
          ts.save("isExitName",r.data.userName);
          ts.save("fullAccount",r.data);
          //  改变vuex值
          thiz.$store.commit('saveLogin',{isLogin:true,data:r.data.userName});
        },
        error:function(e){

        }
      });
    }
  },
  mounted: function() {
    let user = JSON.parse(localStorage.getItem('fullAccount'));
    this.finRecordsForm.userName =  user.nickname;
    this.finRecordsForm.userEmail = user.email;
    this.finRecordsForm.userIphone = user.mobile;
  }
}

</script>
<style scoped>
.xyj-edit-form .el-form-item__content {
   width: calc(100% + 0px);
}
</style>
