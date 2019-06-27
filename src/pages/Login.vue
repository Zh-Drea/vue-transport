<!-- 
  @name  Login.vue(登录)
  @author zlz
  @date 2019.04.16
 -->
<template>
  <div class="button-radius"> 
    <div style="width:100%;height:2px;background:rgba(255,162,65,1);"></div>
    <div style="position:relative">
      <img src="../assets/login.png"  style="width:100%;height:600px;position:absolute"></img>
      <div style="position:absolute;margin-top:100px;margin-left:350px">
        <div><img src="../assets/login_fly.png" style="height:70px;width:70px;"></img></div>
        <div><img src="../assets/login_safe.png" style="height:70px;width:70px;margin-top:7px"></img></div>
        <div><img src="../assets/login_price.png" style="height:70px;width:70px;margin-top:7px"></img></div>
        <div><img src="../assets/login_time.png" style="height:70px;width:70px;margin-top:7px"></img></div>
        <div><img src="../assets/login_serve.png" style="height:70px;width:70px;margin-top:7px"></img></div>
      </div>
      <div style="position:absolute;height:300px;margin-top:80px;margin-left:450px">
        <div style="color:white;font-size:30px;margin-top:26px;letter-spacing:8px">速度更快捷</div>
        <div style="color:white;font-size:30px;margin-top:37px;letter-spacing:8px">包裹更安全</div>
        <div style="color:white;font-size:30px;margin-top:37px;letter-spacing:8px">费用更低价</div>
        <div style="color:white;font-size:30px;margin-top:37px;letter-spacing:8px">时效更保障</div>
        <div style="color:white;font-size:30px;margin-top:37px;letter-spacing:8px">服务更专业</div>
      </div>
      <el-row :gutter="24">
        <el-col :span="8" :offset="14">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm login-ct login-form">
            <p class="bt-title" style="color:#626262">登录</p>
            <el-form-item prop="account" style="position:relative">
              <img class="ct-box-sty" src="../assets/login_user.png"></img>
              <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass" style="position:relative">
              <img class="ct-box-sty" src="../assets/login_mima.png"></img>
              <el-input type="password" v-model="ruleForm.checkPass"  auto-complete="off" @keyup.enter.native="handleSubmit" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item prop="verifycode" style="position:relative">
              <img class="ct-box-sty" src="../assets/login_yanzm.png"></img>
              <el-input type="text" v-model="ruleForm.verifycode"  auto-complete="off" placeholder="验证码"></el-input>
              <img class="ct-box-sty" style="left:240px;width:80px !important;height:25px;cursor:pointer" @click="changeVerifyImg" :src="verifyImg"></img>
            </el-form-item>
            <el-form-item class="bg-item" style="width:100%">

              <el-button type="primary" style="width:100%;" class="bt-normal_font" @click.native.prevent="handleSubmit" :loading="logining">
                登录
              </el-button>
              <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
            </el-form-item>
             <el-form-item class="bg-item">
              <el-row type="flex" class="row-bg" justify="space-between">
                <label class="bt-normal_font" style="color:#187CE8;margin-left:20px;cursor:pointer" @click="pageToReg">去注册</label>
                <label class="bt-normal_font" style="color:#187CE8;margin-right:10px;cursor:pointer" @click="pageToRet">忘记密码 ？</label>
              </el-row>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div style="display:flex;flex-direction:row;width:1350px;margin:0 auto;margin-top:170px">
      <div style="width:60px;height:90px;margin-left:20%">
        <img src="../assets/login_foot_fly.png" style="height:60px;width:60px"></img>
        <div class="ct_foot_margin" style="font-size:9px;color:#545454;text-align:center">
          空运直邮
        </div>
        <div class="ct_foot_margin" style="font-size:9px;color:#545454;text-align:center">
          优质时效 
        </div>
      </div>
      <div style="width:60px;height:90px;margin-left:15%">
        <img src="../assets/login_foot_money.png" style="height:60px;width:60px"></img>
        <div class="ct_foot_margin" style="font-size:9px;color:#545454;text-align:center">
          价格最优
        </div>
        <div class="ct_foot_margin" style="font-size:9px;color:#545454;text-align:center">
          安全理赔
        </div>
      </div>
      <div style="width:60px;height:90px;margin-left:15%">
        <img src="../assets/login_foot_sun.png" style="height:60px;width:60px"></img>
        <div class="ct_foot_margin" style="font-size:9px;color:#545454;text-align:center">
          阳光清关
        </div>
        <div class="ct_foot_margin" style="font-size:9px;color:#545454;text-align:center">
          高效快捷
        </div>
      </div>
      <div style="width:60px;height:90px;margin-left:15%">
        <img src="../assets/login_foot_time.png" style="height:60px;width:60px"></img>
        <div class="ct_foot_margin" style="margin-top:6px;font-size:9px;color:#545454;text-align:center">
          24小时
        </div>
        <div class="ct_foot_margin" style="margin-top:9px;font-size:9px;color:#545454;text-align:center">
          自助查询
        </div>
      </div>
    </div>
      <div style="width:600px;margin:0 auto;">
        <p style="text-align:center;color:#121212;margin-top:140px;font-size:14px">
          蜀ICP备172626411号 Copyright www.zhongchuan56.com版权所有　友情链接：快递查询
        </p>
      </div>
  </div>  
</template>

<script>
  //import NProgress from 'nprogress'
  import config from "../config.js";
  import Tools from "../lib/Tools.js";

  let ts = Tools.getInstance();

  export default {
    name:'Login',
    data() {
      return {
        logining: false,
        ruleForm: {
          account: '',
          checkPass: '',
          verifycode:""
        },
        rules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ],
          verifycode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true,
        // 验证码照片
        verifyImg:'',
        // 验证码数字
        verifyNum:1,
      };
    },
    methods: {
      pageToRet(){
         this.$router.push('/ChangePassword');
      },
      pageToReg(){
        this.$router.push('/Register');
      },
      handleReset2() {
        this.$refs.ruleForm.resetFields();
      },
      goBack(){
        this.$router.replace({name:config.defaultRoute,params:{}});
      },
      handleSubmit(ev) {
        if (!this.ruleForm.account) {
          this.$message({
            message: "请填写用户名",
            type: 'error'
          });
          return;
        }
        if (!this.ruleForm.checkPass) {
          this.$message({
            message: "请填写密码",
            type: 'error'
          });
          return;
        }
        if (!this.ruleForm.verifycode) {
          this.$message({
            message: "请填写验证码",
            type: 'error'
          });
          return;
        }

        var _this = this;
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.logining = true;
            var loginParams = {
              username: this.ruleForm.account,
              password: this.ruleForm.checkPass,
              code:this.ruleForm.verifycode
            };

            ts.sendRequest("member/login",{
              data:loginParams,
              success:function(ret){
                _this.logining = false;
                if(ret&&ret.access_token){
                  _this.$message({
                    message: "登录成功",
                    type: 'success'
                  }); 
                  
                  // 保存账号到本地
                  ts.save("account",ret.access_token);
                   // 登陆后存放用户信息
                  ts.sendRequest("member/info",{
                    data:{token:ret.access_token},
                    type:'GET',
                    success:function(r){

                      r.data.showName = r.data.nickname? r.data.nickname : r.data.username;
                      // ts.save("userName",r.data.nickname);
                      // 保存完整的账号信息
                      ts.save("isExitName",r.data.showName);

                      ts.save("fullAccount",r.data);
                      //  改变vuex值
                      _this.$store.commit('saveLogin',{isLogin:true,data:r.data.showName});
                      
                    },
                    error:function(e){

                    }
                  });

                  // 自动登录
                  // 跳转到登录界面
                  setTimeout(function(){
                    if (JSON.stringify(_this.$route.params) != "{}") {
                       _this.$router.push({name:"LogisticsOrder",params:_this.$route.params});
                    }
                    else{
                      _this.$router.push('/OfficialWebsite');
                    }
                    
                  },1000);

                  return;
                }
                if(!ret.success){
                  // 获取第一条错误信息
                  // let errorMsg = "";
                  // for(let key in ret.error){
                  //   errorMsg = ret.error[key];
                  // }
                   _this.$message({
                    message: ret.msg,
                    type: 'error'
                  });   
                }
              },
              error:function(err){
                if (err.status == 401) {
                  _this.$message({
                    message: err.responseJSON.msg,
                    type: 'error'
                  });  
                }
                _this.logining = false;
              }
            });

            // if (loginParams.username === 'admin' && loginParams.password === '123456') {
            //   //登录信息保存到localStorage
            //   Ts.save('name',loginParams.username);
            //   this.$router.push('/perCenter');
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
          //   return false;
          // }
        // })
          }
        });
      },
      // 改变验证码照片
      changeVerifyImg(){
        this.verifyNum = this.verifyNum + 1
        this.verifyImg = config.baseURL+"vercode/"+this.verifyNum
      },
    },
    destroyed(){

    },
    mounted:function(){
      this.verifyImg = config.baseURL+"vercode/"+this.verifyNum;
    }
  }
</script>
<style scoped>
    .button-radius .el-button{
      border-radius:35px
    }
    .button-radius .el-input__inner{
      border-radius:35px;
      background-color:#FFFFFF
    }
     .ct_foot_margin{
        margin-top:10px
     }
     .ct-box-sty{
        position:absolute;
        height:25px;
        width:25px !important;
        z-index:1000;
        top:9px;
        left:10px
     } 
    .login-ct{
      background-color: rgba(255,255,255,0.85);
      width:400px;
      border-radius:5px;
      margin-top:100px;
      margin-left:50px;
      padding: 20px 30px;
      -webkit-border-radius: 5px;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #cac6c6;
      border-radius: 5px;
      -moz-border-radius: 5px;
      background-clip: padding-box;
    }
    .bt-title{
      font-size:20px;
      text-align:center;
      letter-spacing:30px
    }
    .login-form >>> .el-input__inner{
      padding-left: 50px;
      background-color:#FFFFFF;
      border-radius:35px !important;
      font-size: 14px;
      font-family:MicrosoftYaHei;
      font-weight:normal;
    }
</style>