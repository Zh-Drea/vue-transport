<!-- 
  @name  ChangePassword.vue(修改密码)
  @author zlz
  @date 2019.04.16
 -->
<template>
  <div class="changePassword_input only-button" style="width:1200px">
    <div style="display:flex;flex-direction:row">
      <div style="background-color:#187CE8;height:10px;width:2px;margin-top:40px"></div>
      <label style="margin-top:36px;margin-left:10px">{{title}}</label>
    </div>
    <div style="background-color:#E4E4E4;height:1px;width:1200px"></div>
    <div v-if="isShow === 'one'">
      <el-row>
        <el-col :span="9" :offset="3">
          <el-steps :active="active" finish-status="success" style="margin-top:50px;margin-bottom:50px"> 
            <el-step title=""></el-step>
            <el-step title=""></el-step>
            <el-step title=""></el-step>
          </el-steps>
          <el-form :model="ruleFormOne" :rules="rules" ref="ruleFormOne" label-position="left" label-width="0px" class="demo-ruleForm form-sty">
            <el-form-item prop="phone">
              <el-input type="text" v-model="ruleFormOne.phone" auto-complete="off" placeholder="请输入注册时填写的手机号码">
                 <span slot="prefix" class="ct-reg-slot-font">*手机号码</span>
              </el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
              <!-- <el-button type="primary" style="width:100%;margin-top:50px" @click.native.prevent="handleSubmit2" :loading="logining">发送验证码</el-button> -->
              <el-button type="primary" style="width:100%;margin-top:50px" @click="sendMsg" :loading="logining">发送验证码</el-button>
              <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="9" :offset="3"  style="margin-top:160px">
          <div class="bt-small_font" style="color:#A0A0A0">填写注册手机号码，点击发送验证码，系统会自动给您的手机发送一个随机验证码，
            请在手机中查收验证码</div>
        </el-col>
      </el-row>
    </div>
    <div v-if="isShow === 'two'">
      <el-row>
        <el-col :span="9" :offset="3">
          <el-steps :active="active" finish-status="success" style="margin-top:50px;margin-bottom:80px"> 
            <el-step title=""></el-step>
            <el-step title=""></el-step>
            <el-step title=""></el-step>
          </el-steps>
          <el-form :model="ruleFormTwo" :rules="rules" ref="ruleFormTwo" label-position="left" label-width="0px" class="demo-ruleForm form-sty">
            <el-form-item prop="phone">
              <el-input type="password" v-model="ruleFormTwo.code" auto-complete="off" placeholder="请输入手机中的验证码">
                <span slot="prefix" class="ct-reg-slot-font">*验证码</span>
              </el-input>
            </el-form-item>
             <div @click="changePage" style="cursor:default;margin-top:20px;width:100%;text-align:center;color:grey;cursor:pointer">返回上一步</div>
            <el-form-item style="width:100%;">
              <!-- <el-button type="primary" style="width:100%;margin-top:50px" @click.native.prevent="handleSubmit2" :loading="logining">发送验证码</el-button> -->
              <el-button type="primary" style="width:100%;margin-top:50px" @click="checkGetMsg" :loading="logining">{{content}}</el-button>
              <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="9" :offset="3"  style="margin-top:160px">
          <div class="bt-small_font" style="color:#A0A0A0">填写手机中的验证码，点击下一步，通过验证即可修改密码</div>
        </el-col>
      </el-row>
    </div>
    <div v-if="isShow === 'three'">
      <el-row>
        <el-col :span="9" :offset="3">
          <el-steps :active="active" finish-status="success" style="margin-top:50px;margin-bottom:50px"> 
            <el-step title=""></el-step>
            <el-step title=""></el-step>
            <el-step title=""></el-step>
          </el-steps>
          <el-form :model="ruleFormThree" :rules="rules" ref="ruleFormThree" label-position="left" label-width="0px" class="demo-ruleForm form-sty">
            <el-form-item prop="checkPass">
              <el-input type="password" v-model="ruleFormThree.checkPass" auto-complete="off" placeholder="请输入新的密码">
                <span slot="prefix" class="ct-reg-slot-font">*新密码</span>
              </el-input>
            </el-form-item>
            <el-form-item prop="checkPassAgain">
              <el-input type="password" v-model="ruleFormThree.checkPassAgain" auto-complete="off" placeholder="再次输入新密码">
                <span slot="prefix" class="ct-reg-slot-font">*再次输入</span>
              </el-input>
            </el-form-item>
            <div @click="changePage" style="cursor:default;margin-top:20px;width:100%;text-align:center;color:grey;cursor:pointer">返回上一步</div>
            <el-form-item style="width:100%;">
              <!-- <el-button type="primary" style="width:100%;margin-top:50px" @click.native.prevent="handleSubmit2" :loading="logining">发送验证码</el-button> -->
              <el-button type="primary" style="width:100%;margin-top:50px" @click="changePass" :loading="logining">{{content}}</el-button>
              <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>    
  </div>  
</template>

<script>
  //import NProgress from 'nprogress'
  import config from "../config.js";
  import Tools from "../lib/Tools.js";

  let ts = Tools.getInstance();

  export default {
    data() {
      return {
        content:'发送验证码',
        title:'验证码',
        active: 1,
        logining: false,
        isShow:'one',
        ruleFormOne: {
          phone: ''
        },
        ruleFormTwo: {
          code:''
        },
        ruleFormThree: {
          checkPass: '',
          checkPassAgain:'',
        },
        rules: {
          phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          code:[
            { required: true, message: '请输入验证码', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ],
          checkPassAgain:[
           { required: true, message: '请输入确认密码', trigger: 'blur' },
          ]
        },
        checked: true
      };
    },
    methods: {
      //第一步
      sendMsg(){
        if (!this.ruleFormOne.phone) {
          this.$message({
            message:'请填写手机电话',
            type: 'error',
            duration:1000
          });
          return;
        }
        let thiz = this;
        let url = config.msgURL+thiz.ruleFormOne.phone;
        ts.sendMsgRequest(url,{
          data:{},
          type:'GET',
          success:function(r){
            if (r.code == 0) {
              thiz.active++;
              thiz.content = '下一步';
              thiz.isShow = "two";
              thiz.$message({
                message: r.msg,
                type: 'success',
                duration:1000
              });
            }
            else{
              thiz.$message({
                message: r.msg,
                type: 'error',
                duration:1000
              });
            }
          },
          error:function(e){

          }
        });  
      },
      // 第二步
      checkGetMsg(){
        if (!this.ruleFormTwo.code) {
          this.$message({
            message:'请填写验证码',
            type: 'error',
            duration:1000
          });
          return;
        }
        let thiz = this;
        ts.sendRequest("member/check/verify",{
          data:{phone:thiz.ruleFormOne.phone,code:thiz.ruleFormTwo.code},
          success:function(r){
            if (r.success) {
              thiz.active++;
              thiz.title ='密码修改';
              thiz.content = '完成';
              thiz.isShow = "three"
              // thiz.$message({
              //   message: r.msg,
              //   type: 'success',
              //   duration:1000
              // });
            }
            else{
              thiz.$message({
                message: r.msg,
                type: 'error',
                duration:1000
              });
            }
          },
          error:function(e){

          }
        });
        
      },
      // 返回上一步
      changePage(){
        this.active = this.active - 1;
        if(this.active == 1){
          this.content = '发送验证码';
          this.title = '手机验证';
          this.isShow = 'one';
        }
        if(this.active == 2){
          this.content = '下一步';
          this.isShow = "two"
        }
      },
      //第三步修改密码
      changePass(){
        let thiz = this;
        if (!this.ruleFormThree.checkPass) {
          thiz.$message({
            message: '请输入新密码',
            type: 'error',
            duration:1000
          });
          return;
        }
        if (!this.ruleFormThree.checkPassAgain) {
          thiz.$message({
            message: '请输入确认密码',
            type: 'error',
            duration:1000
          });
          return;
        }
        let url = "member/reset/"+thiz.ruleFormOne.phone+"/password";
        ts.sendRequest(url,{
          type:'PUT',
          data:{
            password:thiz.ruleFormThree.checkPass,
            repass:thiz.ruleFormThree.checkPassAgain
          },
          success:function(r){
            if (r.success) {
              thiz.$message({
                message: r.msg,
                type: 'success',
                duration:2000
              });
              setTimeout(function(){
                thiz.$router.push('/Login');
              },2000);
            }
            else{
              thiz.$message({
                message: r.msg,
                type: 'error',
                duration:1000
              });
            }
          },
          error:function(e){

          }
        });
      }
    },
    mounted:function(){
      this.content = '发送验证码';
      this.title = '手机验证';
      this.active = 1;
      this.isShow = 'one';
    }
  }
</script>

<style>
    @import "../css/app.css";
    .only-button .el-button{
      border-radius:35px !important
    }
    .only-button .el-input__inner{
       border-radius:35px !important;
      background-color:#F4F4F4;
      font-size:7px;
      color:#9F9F9F
    }
    .ct-box-sty{
      position:absolute;
      height:25px;
      width:90px;
      z-index:1000;
      left:10px;
      cursor:default 
     }
    .ct-reg-slot-font{
      font-size:14px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(122,122,122,1);
    }
    .login-container{
      background:rgba(255,255,255,1);
      opacity:0.85;
      width:400px;
      border-radius:5px;
      margin-top: 50px;
    }
    .changePassword_input .el-input__inner{
      padding-left: 120px;
      background-color:#F4F4F4;
      /*color:#9F9F9F;*/
      border-radius:35px !important;
      font-size: 14px;
    }
</style>