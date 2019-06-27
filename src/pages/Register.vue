<!-- 
  @name  Register.vue(注册)
  @author zlz
  @date 2019.04.16
 -->
<template>
  <div class="button-register-radius">
    <div style="width:100%;height:2px;background:rgba(255,162,65,1);"></div>
    <div style="width:100%;position:relative">
      <img src="../assets/register.png" style="width:100%;height:907px;position:absolute"></img>
      <el-row>
        <el-col :span="16" :offset="4">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" style="width:500px" class="demo-ruleForm login-plt register-form">
            <p class="bt-tit" style="color:#626262">注册</p>
            <p class="bt-small_font" style="text-align:center;color:#7A7A7A;">*请填写准确的信息，以便出现问题时能及时联系您</p>
            <el-form-item prop="account">
              <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="用户名">
                <span slot="prefix" class="ct-reg-slot-font">*用户名</span>
              </el-input>
            </el-form-item>   
            <el-form-item prop="email">
              <el-input type="email" v-model="ruleForm.email" auto-complete="off" placeholder="请输入正确邮箱，以找回密码">
                <span slot="prefix" class="ct-reg-slot-font">*邮箱</span>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="6~16个字符">
                <span slot="prefix" class="ct-reg-slot-font">*登录密码</span>
              </el-input>
            </el-form-item>
            <el-form-item prop="passwordAgain">
              <el-input type="password" v-model="ruleForm.passwordAgain" auto-complete="off" placeholder="请再次输入登录密码">
                <span slot="prefix" class="ct-reg-slot-font">*确认密码</span>
              </el-input>
            </el-form-item>
            <el-form-item prop="phone">
              <el-input type="tel" v-model="ruleForm.phone" auto-complete="off" placeholder="请输入手机号码">
                <span slot="prefix" class="ct-reg-slot-font">*电话</span>
              </el-input>
            </el-form-item>
            <el-form-item prop="verifycode"  style="position:relative">
              <el-input type="password" v-model="ruleForm.verifycode" auto-complete="off">
                <span slot="prefix" class="ct-reg-slot-font">*验证码</span>
              </el-input>
               <div class="ct-plt" style="left:340px;top:0;color:#187CE8;cursor:pointer" @click="sendMsg">{{msg}}</div>
            </el-form-item>
            <el-form-item class="bg-item" style="width:100%">
              <el-button type="primary" style="width:100%;color:white;cursor:pointer" @click.native.prevent="handleSubmit" :loading="logining">注册</el-button>
              <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
            </el-form-item>
            <el-form-item class="bg-item" style="width:100%">
              <div @click="pageToLog" class="bt-normal_font" style="width:100px;margin:0 auto;text-align:center;color:#187CE8;cursor:pointer">
                去登录
              </div>
            </el-form-item>  
          </el-form>
        </el-col>
      </el-row>
      <div style="position:absolute;width:600px;margin-top:88px;left:50%;margin-left:-300px;">
        <p style="text-align:center;color:#121212;font-size:14px">蜀ICP备172626411号 Copyright www.zhongchuan56.com版权所有　友情链接：快递查询</p>
      </div>
    </div>
    
  </div>  
</template>

<script>
  //import NProgress from 'nprogress'
  import config from "../config.js";
  import Tools from "../lib/Tools.js";

  let ts = Tools.getInstance();

  export default {
    name:'Register',
    data() {
      return {
        selectParam:'+86',
        msg:'短信验证码',
        logining: false,
        ruleForm: {
          account: '',
          email:"",
          password:'',
          passwordAgain:'',
          phone:'',
          verifycode:'',
          
        },
        rules: {
          account: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          email:[
            { required: true, message: '请输入邮箱', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          passwordAgain:[
            {required: true, message: '请输入确认密码', trigger: 'blur' }
          ],
          phone: [
            {required: true, message: '请输入手机号', trigger: 'blur' }
          ],
          verifycode: [
            {required: true, message: '请输入验证码', trigger: 'blur' }
          ],
        },
        checked: true,
        // 验证码开关
        isExit:true
      };
    },
    methods: {
      pageToLog(){
        this.$router.push('/Login');
      },
      handleReset2() {
        this.$refs.ruleForm.resetFields();
      },
      goBack(){
        this.$router.replace({name:config.defaultRoute,params:{}});
      },
      handleSubmit(ev) {
        var _this = this;

        this.$refs.ruleForm.validate((valid) => {

          if (valid) {

            _this.logining = true;
            var loginParams = {
              username: _this.ruleForm.account,
              password: _this.ruleForm.password,
              repass: _this.ruleForm.passwordAgain,
              email: _this.ruleForm.email,
              mobile: _this.ruleForm.phone,
              code: _this.ruleForm.verifycode,
            };

            // 调注册接口
            ts.sendRequest("member/register",{
              data:loginParams,
              isExit:'true',
              success:function(ret){
                _this.logining = false;
                if(ret&&ret.success){
                  _this.$message({
                    message: ret.msg,
                    type: 'success'
                  });

                  // 自动登录
                  // 跳转到登录界面
                  setTimeout(function(){
                    _this.$router.push('/Login');
                  },2000);

                  return;
                }
                else{

                  // console.log('错误信息',JSON.stringify(ret));

                  // 获取第一条错误信息
                  let errorMsg = "";

                  ret.msg.forEach(function(r,i,k){
                    errorMsg = errorMsg + r;
                  })

                  setTimeout(function(){
                    _this.$message({
                      message: errorMsg,
                      type: 'error'
                    });
                  },2000);
                  
                }
              },
              error:function(err){
                _this.logining = false;
              }
            });

            // if (loginParams.username === 'admin' && loginParams.password === '123456') {
            //   //登录信息保存到localStorage
            //   Ts.save('name',loginParams.username);
            //   this.$router.push('/Dialog');
            // }
            // else{
            //   this.$notify.error({
            //     title: '错误',
            //     message: '账号或者密码错误'
            //   });
            //   this.logining = true;
            //   let _this = this;
            //   var timeOut = setInterval(()=>{ 
            //       _this.logining = false;
            //     if (_this.logining) {
            //       clearInterval(timeOut);
            //       }
            //   }, 3000);  
            // }

          //   requestLogin(loginParams).then(data => {
          //     this.logining = false;
          //     //NProgress.done();
          //     let { msg, code, user } = data;
          //     if (code !== 200) {
          //       this.$message({
          //         message: msg,
          //         type: 'error'
          //       });
          //     } else {
          //       sessionStorage.setItem('user', JSON.stringify(user));
          //       this.$router.push({ path: '/table' });
          //     }
          //   });
          // } else {
          //   console.log('error submit!!');
          //   return false
          // }
        // });

          }
        });
      },
      sendMsg(){
        let thiz = this;
        if (!this.isExit) {
          return;
        }
        if (!this.ruleForm.phone) {
          this.$message({
            type:'error',
            message: '请先输入电话号码'
          })
          return;
        }
        let url = config.msgURL+thiz.ruleForm.phone;
        ts.sendMsgRequest(url,{
          data:{},
          type:'GET',
          success:function(r){
            if (r.code == 0) {
              let num = 60;
              thiz.isExit = false;
              let timeOut = setInterval(()=>{ 
                thiz.msg = '倒计时' + num + '秒';
                num--;
                if (num === 0) {
                  clearInterval(timeOut);
                  thiz.isExit = true;
                  thiz.msg = '短信验证码'
                }
              }, 1000);
            }
            else{
              thiz.$message({
                 message: r.msg,
                 type:'error',
              })
            }
          },
          error:function(e){
            console.log(e)
          }
        });
        
      }
    },
    destroyed(){
    },
    mounted:function(){
    }
  }

</script>

<style>
    .ct-plt{
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
      margin-left:20px;
      color:rgba(122,122,122,1);
    }
    .login-plt{
      background-color: rgba(255,255,255,0.85);
      // width:400px;
      border-radius:5px;
      margin: 100px auto;
      -webkit-border-radius: 5px;
      border-radius: 5px;
      -moz-border-radius: 5px;
      background-clip: padding-box;
      width: 350px;
      padding: 20px 30px;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #cac6c6;
    }
    .button-register-radius .el-button{
      border-radius:35px
    }
    .button-register-radius .el-input__inner{
      border-radius:35px
    }
    .el-input__inner{
      background-color:#FFFFFF
    }
    .bt-tit{
      font-size:20px;
      text-align:center;
      letter-spacing:30px
    }
    .register-form .el-input__inner{
      padding-left: 120px;
      background-color:white;
      border-radius:35px !important;
      font-size: 14px;
    }
</style>