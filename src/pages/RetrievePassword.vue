<!-- 
  @name  RetrievePassword.vue(忘记密码)
  @author zlz
  @date 2019.04.16
 -->
<template>
  <div class="all">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">找回密码</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm.account" prefix-icon="el-icon-warning" auto-complete="off" placeholder="请输入会员名/邮箱/手机号"></el-input>
      </el-form-item>
      <el-row :gutter="24">
        <el-col :span="18">
          <el-form-item prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="请输入验证码"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="6">
          <label style="margin-top:10px">验证码</label>
        </el-col>
      </el-row>
      <el-form-item class="bg-item" style="width:100%">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">提交信息</el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>  
</template>

<script>
  //import NProgress from 'nprogress'
  import config from "../config.js";
  import Tools from "../lib/Tools.js";

  let Ts = Tools.getInstance();

  export default {
    name:'RetrievePassword',
    data() {
      return {
        logining: false,
        ruleForm: {
          account: '',
          checkPass: ''
        },
        rules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      pageToRet(){
        this.$router.push('/RetrievePassword');
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
        var _this = this;
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true;
            //NProgress.start();
            var loginParams = { username: this.ruleForm.account, password: this.ruleForm.checkPass };
            if (loginParams.username === 'admin' && loginParams.password === '123456') {
              //登录信息保存到localStorage
              Ts.save('name',loginParams.username);
              this.$router.push('/Dialog');
            }
            else{
              this.$notify.error({
                title: '错误',
                message: '账号或者密码错误'
              });
              this.logining = true;
              let _this = this;
              var timeOut = setInterval(()=>{ 
                  _this.logining = false;
                if (_this.logining) {
                  clearInterval(timeOut);
                  }
              }, 3000);  
            }
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
        // });
          }
        });
      }
    },
    destroyed(){
      // this.$store.dispatch('moveAllRoute');
      window.removeEventListener('popstate', this.goBack, false);
    },
    mounted:function(){
      if (window.history && window.history.pushState) {
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', this.goBack, false);
      }
    }
  }

</script>

<style>
    @import "../css/app.css";
</style>