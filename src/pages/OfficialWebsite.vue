<!-- 
  @name  OfficialWebsite.vue(官网首页)
  @author zlz
  @date 2019.04.18
 -->
<template>
	<div>
    <div class="bt-all">
<!--       <div class="bt_cross" style="margin:0 auto;width:1250px;margin-bottom:20px">
        <label style="width:3px;height:13px;background-color:#7D7D7D;margin-top:7px;margin-right:7px"></label>
        <label style="margin-left:10px;margin-top:5px;margin-right:30px">普通下单</label>
        <div class="bt_white_button"><el-button @click="toTpl">批量下单</el-button></div>
      </div>
      <div class="bt_panel" style="width:1250px;padding:0px 20px">
        <el-form :inline="true" :model="formInline" class="demo-form-inline input-width-120 bt_input_sty" style="padding:20px;padding-bottom:0">
          <el-form-item>
            <div class="bt_cross">
              <div class="ct-span-sty-front">从</div>
              <el-select v-model="formInline.fromregion" placeholder="国家">
                <el-option v-for="(item, index) in senderCountry" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="bt_cross">
              <div class="ct-span-sty-front">发往</div>
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
      </div> -->
<!--       <div style="width:20px;text-align:center;margin:0 auto;height:3px;background-color:#7D7D7D;margin-bottom:30px"></div>
      <div style="width:625px;text-align:center;margin:0 auto">
        <p style="color:#545454;font-size:16px">众川国际拥有一支专业的管理团队，凭借优秀稳定的国内外资源，简洁易操作的物流系统，精湛的IT技术实力，致力于为全球华人及跨境电商企业提供高效、专业、阳光的国际货物运输方案，提供优质的航空货运、仓储、国际快件清关、国内派送等服务。公司总部位于中国成都，
        目前设立有英国、德国、美国分公司，我们将进一步辐射全球，服务全球。
        </p>
      </div> -->
    </div>  
	</div>	
</template>
<script>
  import Tools from "../lib/Tools.js";

  let ts = Tools.getInstance();

  export default {
  	name:'OfficialWebsite',
    data() {
      return {
        senderCountry:[],
        countries:[],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        logining:false,
      	ruleForm: {
          beginCny:'shanghai',
          endCny:'zhongguo',
          checkWeight:'',
          checkLength:'',
          checkWidth:'',
          checkHeight:''
        },
        rules: {
          checkWeight: [
            { required: true, message: '请输入重量', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkLength: [
            { required: true, message: '请输入长度', trigger: 'blur' },
            //{ validator: validaePass2 }
          ],
          checkWidth: [
            {required: true, message: '请输入宽度', trigger: 'blur' }
          ],
          checkHeight:[
            {required: true, message: '请输入高度', trigger: 'blur' }
          ],
        },
        checked: true,
        formInline: {
          fromregion: '',
          toregion: '',
          weight:"",
          length:"",
          width:"",
          height:"",
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
      }
    },
    mounted:function(){
      localStorage.setItem('isPage','false');

      let thiz = this;
      // 加载公共数据
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
  };
</script>
<style scoped>
  /*@import "../css/app.css";*/
  @import "../css/public.scss";

  .bt-all{
    margin-top:0px
  }
  .bt-form{
    width:115px
  }
</style>