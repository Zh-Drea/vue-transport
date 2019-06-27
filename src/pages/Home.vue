<!-- 
  @name  Home.vue
  @author zlz
  @date 2019.04.17
-->
<template>
  <div>
      <!-- 剩余页面header -->
      <div v-if="isShow" class="contain">
        <div style="background-color:#187CE8">
          <el-row>
            <el-col :span="5">
              <div class="pull-left" style="margin:15px 0 15px 15px">
                 <img style="width:120px;height:30px;" src="../assets/zcgj.png"></img>
              </div>
            </el-col>
            <el-col :span="9">
              <div class="pull-left" style="display:flex;flex-drection:row;line-height:24px;color:white">
                <div>
                  <div @click="toHome" class="bt-font" style="margin-top:20px;cursor:pointer">首页</div>
                  <div v-if="showslice" style="width:23px;height:2px;background-color:white;margin-top:16.5px"></div>
                </div>
               <!--  <div>  
                  <div class="bt-font" style="margin-left:30px;margin-top:20px;cursor:pointer">产品与服务</div>
                </div>
                <div>
                  <div class="bt-font" style="margin-left:30px;margin-top:20px;cursor:pointer">客服支持</div>
                </div>
                <div>
                  <div class="bt-font" style="margin-left:30px;margin-top:20px;cursor:pointer">公司介绍</div>
                </div> -->
              </div>
            </el-col>
            <el-col :span="10" v-if="!this.$store.state.loginDate.isLogin">
              <div style="display:flex;flex-drection:row;width:200px;margin-left:400px;color:white">
                <span class="bt-font" @click="toLogin" style="margin-top:20px;cursor:pointer">登录</span>
                <span style="margin-top:20px">&nbsp;&nbsp;/&nbsp;&nbsp;</span>
                <span class="bt-font" @click="toRegister" style="margin-top:20px;cursor:pointer">注册</span>
                <!-- <span class="bt-font" style="margin-left:30px;margin-top:20px">仓库管理</span> -->
              </div>
            </el-col>
            <el-col :span="10" v-if="this.$store.state.loginDate.isLogin">
              <div style="display:flex;flex-drection:row;width:500px;margin-left:100px;color:white">
                <!-- <img src="../assets/select@2x.png" style="width:22px;height:22px;margin-top:20px"></img> -->
                <div class="bt-font" style="margin:20px 20px 0 0;min-width:150px;">{{this.$store.state.loginDate.data}}，欢迎你</div>
                <div>
                  <div class="bt-font" @click="toCenter" style="margin-top:20px;width:100px;cursor:pointer">个人中心</div>
                  <div v-if="!showslice" style="width:66px;height:2px;background-color:white;margin-top:20px"></div>
                </div>
                <div class="bt-font" @click="delUser" style="margin-top:20px;width:70px;cursor:pointer">退出</div>
                <!-- <div class="bt-font" style="margin-left:30px;margin-top:20px;width:150px">仓库管理</div> -->
              </div>
            </el-col>
          </el-row>
        </div>
        <div id="otherKeep">
          <keep-alive>
            <router-view class="bt-keep"  v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view class="bt-keep"  v-if="!$route.meta.keepAlive"></router-view>
        </div>  
      </div>
      <!-- 首页 -->
      <div v-if="!isShow" class="contain" style="position:relative;">
        <el-row>
          <el-col :span="24">
            <img src="../assets/fly.png" class="bt-image"></img>
          </el-col>  
        </el-row>
        <div>
           <el-row>
            <el-col :span="5">
              <div class="pull-left" style="margin:15px 0 15px 15px">
                 <img style="width:120px;height:30px;" src="../assets/zcgj.png"></img>
              </div>
            </el-col>
            <el-col :span="4">
              <div style="display:flex;flex-drection:row;line-height:24px;color:white">
                <div>
                  <div @click="toHome" class="bt-font" style="margin-top:20px;cursor:pointer">首页</div>
                  <div v-if="showslice" style="width:29px;height:2px;background-color:white;margin-top:16.5px"></div>
                </div>
               <!--  <div>  
                  <div class="bt-font" style="margin-left:30px;margin-top:20px;cursor:pointer">产品与服务</div>
                </div>
                <div>
                  <div class="bt-font" style="margin-left:30px;margin-top:20px;cursor:pointer">客服支持</div>
                </div>
                <div>
                  <div class="bt-font" style="margin-left:30px;margin-top:20px;cursor:pointer">公司介绍</div>
                </div> -->
              </div>
            </el-col>
            <el-col :span="7"  class="pull-right" v-if="!this.$store.state.loginDate.isLogin">
              <div style="display:flex;flex-drection:row;width:200px;margin-left:300px;color:white">
                <span class="bt-font" @click="toLogin" style="margin-top:20px;cursor:pointer">登录</span>
                <span style="margin-top:20px">&nbsp;&nbsp;/&nbsp;&nbsp;</span>
                <span class="bt-font" @click="toRegister" style="margin-top:20px;cursor:pointer">注册</span>
              </div>
            </el-col>
            <el-col :span="7" class="pull-right" v-if="this.$store.state.loginDate.isLogin">
              <div style="display:flex;flex-drection:row;width:500px;margin-left:120px;color:white">
                <!-- <img src="../assets/select@2x.png" style="width:22px;height:22px;margin-top:20px"></img> -->
                <div class="bt-font" style="margin:20px 20px 0 0;min-width:150px">{{this.$store.state.loginDate.data}}，欢迎你</div>
                <div class="bt-font" @click="toCenter" style="margin-top:20px;width:100px;cursor:pointer">个人中心</div>
                <div class="bt-font" @click="delUser" style="margin-top:20px;width:70px;cursor:pointer">退出</div>
                <!-- <div class="bt-font" style="margin-left:30px;margin-top:20px;width:150px">仓库管理</div> -->
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="pull-right">
              <div style="display:flex;flex-drection:row;margin-left:40px;margin-top:15px">
                <div style="display:flex;flex-direction:row">
                  <div @click="toLogRefer" class="el-icon-search" style="cursor:pointer;background:rgba(0,0,0,0.4);padding:7px;color:white;width:40px;height:40px;font-size:25px;"></div>
                  <div>
                    <input placeholder="请输入运单号进行搜索" v-model="selectParam" 
                      @keyup.enter="toLogRefer"
                      style="border:none;
                      outline:none;appearance:none;
                      width:300px;height:40px;background-color:white;
                      padding-left:30px;color:black;
                      font-size:16px;"
                    >                   
                    </input>
                  </div>
                </div>
                <div>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 字体布局 -->            
          <div class="bt-div" style="margin-top:160px;">
            <div class="bt_cross">
              <label style="color:white;margin-top:7px;background:rgba(250,250,250,0.4);padding:15px">普通下单</label>
              <label style="margin-top:7px;cursor:pointer;color:white;background:rgba(0,0,0,0.05);padding:15px;margin-left:4px" @click="toTpl">批量下单</label>
            </div>
            <div style="margin-top:20px;margin:0 auto;padding-bottom: 20px;padding-top: 20px;width:1250px;padding:30px 20px;background:rgba(250,250,250,0.4);">
              <el-form :inline="true" :model="formInline" class="demo-form-inline input-width-120 bt_input_sty" style="">
                <el-form-item>
                  <div class="bt_cross">
                    <div class="ct-span-sty-front" style="font-size:16px">从</div>
                    <el-select v-model="formInline.fromregion" placeholder="国家">
                      <el-option v-for="(item, index) in senderCountry" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </div>
                </el-form-item>
                <el-form-item>
                  <div class="bt_cross">
                    <div class="ct-span-sty-front" style="font-size:16px">发往</div>
                    <el-select v-model="formInline.toregion" placeholder="国家">
                      <el-option v-for="(item, index) in countries" :label="item.name" :value="item.str" v-if="item.code=='CN'"></el-option>
                    </el-select>  
                  </div>
                </el-form-item>
                <el-form-item style="margin-left:30px">
                  <div class="bt_cross">
                    <el-input v-model="formInline.weight" placeholder="重量"></el-input>
                    <span class="ct-span-sty-back">KG</span>
                  </div>
                </el-form-item>
                <el-form-item style="margin-left:10px">
                  <div class="bt_cross">
                    <el-input v-model="formInline.length" placeholder="长度"></el-input>
                    <span class="ct-span-sty-back">CM</span>
                  </div>
                </el-form-item>
                <el-form-item style="margin-left:10px">
                  <div class="bt_cross">
                    <el-input v-model="formInline.width" placeholder="宽度"></el-input>
                    <span class="ct-span-sty-back">CM</span>
                  </div>
                </el-form-item>
                <el-form-item style="margin-left:10px">
                  <div class="bt_cross">
                    <el-input v-model="formInline.height" placeholder="高度"></el-input>
                    <span class="ct-span-sty-back">CM</span>
                  </div>
                </el-form-item>
                <el-form-item class="bt_bule_button">
                  <el-button type="primary" style="margin-left:0px" @click="handleSubmit">立即下单</el-button>
                </el-form-item>
              </el-form>
            </div>
        </div>           
      </div>
      <div>
        <keep-alive>
          <router-view class="bt-keep"  v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view class="bt-keep"  v-if="!$route.meta.keepAlive"></router-view>
      </div>
      <div style="width:20px;text-align:center;margin:0 auto;height:3px;background-color:#7D7D7D;margin-bottom:30px"></div>
      <div style="width:800px;text-align:center;margin:0 auto">
        <p style="color:#545454;font-size:16px">众川国际拥有一支专业的管理团队，凭借优秀稳定的国内外资源，简洁易操作的物流系统，精湛的IT技术实力，致力于为全球华人及跨境电商企业提供高效、专业、阳光的国际货物运输方案，提供优质的航空货运、仓储、国际快件清关、国内派送等服务。公司总部位于中国成都，
        目前设立有英国、德国、美国分公司，我们将进一步辐射全球，服务全球。
        </p>
      </div>
      <div style="margin-top:100px;width:100%;padding-bottom:0px;padding-top:20px;background-color:#373D41;">
        <div style="display:flex;flex-direction:row;width:1350px;margin:0 auto;padding-bottom:20px">
          <div style="margin-left:90px;display:none">
            <label style="margin-bottom:20px">下载app</label>
            <div style="width:103px;height:103px;background-color:red"></div>
          </div>
          <div style="margin-left:328px;">
             <label style="margin-bottom:20px">联系我们</label>
             <p class="bt-ft">合作邮箱：info@young-global.com</p>
             <p class="bt-ft">加入我们：hr@young-global.com</p>
             <p class="bt-ft">市场媒体合作：yangxiaojiang@young-global.com</p>
             <p class="bt-ft">服务热线：028-********(09:30-18:00 周一至周五)</p>
             <p>公司地址：成都市高新区天府软件园D区</p> 
          </div>
          <div style="margin-left:328px;">
            <label style="margin-bottom:20px">关注我们</label>
            <p class="bt-ft">小洋匠微信公众号</p>
            <p class="bt-ft">小洋匠微博</p>
            <p>干物小酱公众号</p>
          </div>
        </div>
        <div style="width:1350px;height:1px;background-color:#646C71;margin:0 auto"></div>
        <div style="margin:0 auto;width:1350px;text-align:center;padding:14px 0px;">
          <div style="color:#FFFFFF;font-size:14px"><p>Copyright©2015-2017www.young-global.com All Rights Reserved</p></div>
        </div>
      </div>  
    </div>
  </div>  
</div>  
</template>
<script>
import Tools from "../lib/Tools.js";

let ts = Tools.getInstance();

export default {
  name:'Home',
  data() {
    return {
      isShow:false,
      selectParam:'',
      msg:"新闻资讯详情",
      showslice:true,
      // 是否登录显示title
      titleShow:false,
      loginTitle:'',
      formInline: {
        fromregion: '',
        toregion: '',
        weight:"",
        length:"",
        width:"",
        height:"",
      },
      countries:[],
      senderCountry:[],
    }
  },
  watch:{
    $route(to,from){
      if (to.path != '/OfficialWebsite') {
        this.isShow = true;
        this.showslice = false;
        localStorage.setItem('isPage','true');
      }
      else{
        // 清空搜索内容
        this.selectParam = '';


        this.isShow =false;
        this.showslice = true;
        localStorage.setItem('isPage','false');
      }
   }
 },
 methods: {
   toTpl(){
        let user = localStorage.getItem('account');
        if (user) {
          this.$router.push('/TplDownload');
        }
        else{
          this.$router.push('/Login');
        }
    },
    handleSubmit(){
      let user = localStorage.getItem('account');
      if (!this.formInline.fromregion || !this.formInline.toregion) {
        this.$message({
          message: "请选择国家",
          type: 'error'
        });
        return;
      }
      let weightCall = ts.ruleNum(this.formInline.weight,'请填写重量','重量格式不正确');
      if( weightCall !== 'true'){
        this.$message({
          message: weightCall,
          type: 'error'
        });
        return;
      }
      let lengthCall = ts.ruleNum(this.formInline.length,'请填写长度','长度格式不正确');
      if( lengthCall !== 'true'){
        this.$message({
          message: lengthCall,
          type: 'error'
        });
        return;
      }
      let widthCall = ts.ruleNum(this.formInline.width,'请填写宽度','宽度格式不正确');
      if( widthCall !== 'true'){
        this.$message({
          message: widthCall,
          type: 'error'
        });
        return;
      }
      let heightCall = ts.ruleNum(this.formInline.height,'请填写高度','高度格式不正确');
      if( heightCall !== 'true'){
        this.$message({
          message: heightCall,
          type: 'error'
        });
        return;
      }
      if (user) {
        this.$router.push({name:"LogisticsOrder",params:this.formInline});
      }
      else{
        this.$router.push({name:"Login",params:this.formInline});
      }
    },
    toPageNew(){
      this.$router.push({ name: 'newOrder'});
    },
    changeDom(params){
      $('.bt-keep').css({
            width:params
        });
    },
    toLogRefer(){
      if (!this.selectParam) {
        this.$message({
          message: '运单号不能为空',
          type: 'error',
          duration:1000
        });
        return;
      }
      // this.$router.push({ name: 'LogisticsRefer', params: { num: this.selectParam}});
      this.$router.push({ name: 'LogisticsRefer',params: {code:this.selectParam}});
    },
    toHome(){
          // this.obj.backgroundColor = '#187CE8'
      this.formInline.weight = '';
      this.formInline.length = '';
      this.formInline.width = '';
      this.formInline.height = '';
                
      this.$router.push('/OfficialWebsite');
    },
    toLogin(){
      this.$router.push('/Login');
    },
    toRegister(){
      this.$router.push('/Register');
    },
    // 到个人中心
    toCenter(){
      if(this.$route.path.indexOf("perCenter") == -1){
        // ts.save("centerStatus",{
        //     name:"logisticsRecord",
        //     first:"物流管理",
        //     second:"物流记录",
        //     key:0,
        //     id:["0"]
        //   });
        this.$router.push({name:'logisticsRecord'});
      }else{
        this.$router.go(0); 
      }
      
      
    },
    // 删除token以及vuex信息
    delUser(){
      localStorage.removeItem('account');
      localStorage.removeItem('fullAccount');
      this.$store.commit('saveLogin',{isLogin:false,data:''});
      this.$router.replace('/OfficialWebsite');
    },
  },
  mounted:function(){

      if (localStorage.getItem('isPage') === 'true') {
         
        this.isShow =  true;
        this.showslice = false;
      }
      else{
        // console.log(localStorage.getItem('isPage'));
        // this.$router.replace('/OfficialWebsite');
         this.isShow = false;
         this.showslice = true;
      }
      let thiz = this;
      ts.sendRequest("common/data",{
        type:"GET",
        data:{},
        success:function(ret){

          if(ret&&ret.success){
            thiz.senderCountry.push(ret.data.country[1]);
            // 处理数据
            for(let i=0;i<ret.data.country.length;i++){
              ret.data.country[i].str = JSON.stringify(ret.data.country[i]);
              // 物流目的地只能是中国
              if(ret.data.country[i].code=="CN"){
                thiz.formInline.toregion = ret.data.country[i].str;
              }
              else if (ret.data.country[i].code=="DE") {
                thiz.formInline.fromregion = ret.data.country[i].id
              }
            }
            // 设置国家
            thiz.countries = ret.data.country;
            return;
          }
          
          if(ret&&ret.error){
            // 获取第一条错误信息
            let errorMsg = "";
            for(let key in ret.error){
              errorMsg = ret.error[key];
            }
            setTimeout(function(){
              thiz.$message({
                message: errorMsg,
                type: 'error'
              });
            },2000);
            
          }
        },
        error:function(err){
        }
      });


    }
  }
  </script>
  <style scoped>
  @import "../css/app.css";
  .el-select-dropdown__item.selected{
    padding-left:40px !important
  }
  .bt-keep{
    margin:0 auto;
    height: 100%;
    width:100%;
    min-height:700px;
    min-width:1190px;
  }
  label{
    color:#FFFFFF
  }
  p{
    color:#FFFFFF;
    font-size:12px;
    font-family:MicrosoftYaHei
  }

  .bt-ft{
    margin-bottom:15px
  }

  .el-input__inner{
    border-top-left-radius:35px;
    border-bottom-left-radius:35px;
    width:600px !important;
  }
  *{
    margin:0;
    padding:0
  }
  .contain{
    width : 100%;
    height: 100%;
    min-width:1200px;
  }
  .bt-font{
    color:#FFFFFF;
    font-size:16px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
    cursor:default 
  }
  .bt-image{
    position:absolute;
    width: 100%;
    height:580px;
  }
  .bt-div{
    position:absolute;
    width:1200px;
    left:50%;
    height:200px;
    margin-left:-600px;
  }
  .bt-dx{
    position:absolute;
    width:800px;
    left:50%;
    height:100px;
    margin-left:-400px;
  }
  .bt-title{
    font-size:45px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
    letter-spacing:8px
  }
   ::-webkit-scrollbar {
    width: 0em;
  }
  ::-webkit-scrollbar:horizontal {
    height: 0em;
  }

  ::-webkit-input-placeholder{color:#C2C2C2;}

  </style>