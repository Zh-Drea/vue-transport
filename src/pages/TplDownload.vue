<!-- 
  @name  TplDownload.vue
  @author zlz
  @date 2019.04.18
  @desc 模板下载
 -->
<template>
  <div style="width:1200px">


    <div style="margin-top:50px;padding-left:0px;text-align:center">

      <div class="step-item" :style="stepTag==1?bgBlue:bgGreen">
        <div class="step-title" :style="stepTag==0?bgBlue:null">选择文件</div>
        <div class="step-tria" :style="stepTag==0?bgBlue:null"></div>
        <div class="step-tria-blank"></div>
        <div style="clear:both;"></div>
      </div>

      <div class="step-item" :style="'left:-4px;'+(stepTag==1?bgBlue:null)">
        <div class="step-title" :style="stepTag==1?bgBlue:null">支付订单</div>
        <div class="step-tria" :style="stepTag==1?bgBlue:null"></div>
        <div class="step-tria-blank" :style="bgTrans"></div>
        <div style="clear:both;"></div>
      </div>

    </div>

    <!-- 选择文件-->
    <div v-if="stepTag == 0">
      <el-row style="margin-top:30px">
        <el-col :span="24">
          <div style="display:flex;flex-direction:row">
            <div style="height:26px;width:6px;background-color:#7D7D7D"></div>
            <div style="color:#545454;font-size:20px;margin-left:20px">选择线路/规格</div> 
          </div>  
        </el-col>
      </el-row>
      <el-row style="margin-top:30px">
        <el-col :span="24">
          <div class="bt_panel">
            <img style="width:16px;height:16px;margin-left:26px" src="../assets/tixing@2x.png"></img>
            <span style="margin-left:10px;font-weight:bold;font-size:18px">批量下单系统使用说明：</span>
            <div style="margin-left:54px;margin-top:22px">
              <div style="font-size:18px">1. 简化下单时间及繁琐的打印过程，可以利用此系统进行批量下单节省时间。</div>
              <div style="margin-top:22px;font-size:18px">2. 请下载批量下单EXCEL模板，根据表格填写后再本页面上传，一次下单。</div>
              <div style="margin-top:22px;font-size:18px">3. 请严格按照邮寄商品编码库如实申报包裹内件，否则将会影响清关。</div>
              <!-- <div style="color:#409EFF;margin-top:30px;font-size:18px">查看商品编码</div> -->
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 选择文件下载 -->
      <div v-if="isShow=='hide'">
        <div style="margin-top:30px">
          <div class="bt_panel">
            <div class="input-width-240 it_st-padding bt_input_sty bt_cross" style="margin-left:0px">  
              <div class="ct-span-sty-front" style=";margin-top:10px;width:140px;text-align:right;">商品类别：</div>
              <el-select v-model="goodsCate" placeholder="请选择商品类别">
                <el-option value="">请选择商品类别</el-option>
                <el-option v-for="(item, index) in goodsCates" :label="item.name" :value="item.str"></el-option>
              </el-select>

              <div class="input-width-480 it_st-padding bt_input_sty bt_cross" style="margin-left:0px">
                  <div class="ct-span-sty-front" style="width:140px;margin-top:10px;text-align:right;">商品关键词：</div>
                  <el-input v-model="keywords" placeholder="请输入商品关键词" style="width:259px;"></el-input>
                  
                  <div class="bt_white_button" style="position:relative;left:260px;">
                    <el-button type="primary" style="" @click="findGoods">搜索</el-button>
                  </div>
              </div>
            </div>  

            <div style="height:2px;width:800px;background-color:#C2C2C2;margin:40px auto"></div>
            <!-- <div class="no-border-table">
              <v-table
                is-horizontal-resize
                style="margin-left:24px;width:1152px"
                :columns="columns"
                :table-data="tableData"
                row-hover-color="#eee"
                row-click-color="#edf7ff"
              ></v-table> 
            </div>  --> 

            <div style="padding:0px 40px;">

              <el-table :data="goodsList" style="width: 100%">
                <el-table-column prop="name" label="商品标题" width="350">
                </el-table-column>
                <el-table-column prop="channels_name" label="线路" width="180">
                </el-table-column>
                <el-table-column prop="specification_type" label="规格" width="180">
                </el-table-column>
                <el-table-column prop="content" label="简介">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <div @click="addToSelect(scope.row)" v-if="!scope.row.selected" style="display:inline-block;height:24px;border-radius:2px;background-color:#187CE8;text-align:center;padding:0px 10px;color:white;line-height:24px;font-size:12px;margin-right:20px;cursor:pointer;">
                      加入
                    </div>
                    <div @click="delFromSelect(scope.row)" v-if="scope.row.selected" style="display:inline-block;cursor:pointer;">
                      <img src="../assets/delete.png" style="width:12px;height:12px;margin-right:3px;background-color:white;cursor:pointer;">
                      <span style="font-size:12px;color:#187CE8;position:relative;top:1px;cursor:pointer;">删除</span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                small
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :page-size="page.num"
                :current-page="page.size"
                :total="allNum">
              </el-pagination>  
            </div>

          </div>
        </div>
        <el-row style="margin-top:30px;margin-bottom:50px;display:none;">
          <el-col :span="24">
            <div class="bt_panel">
              <div class="bt_cross" style="margin-top:12px;margin-left:34px">
                <img style="width:26px;height:26px;" src="../assets/moban.png"></img>
                <div style="font-size:24px;font-family:MicrosoftYaHei;font-weight:400;color:#000000;margin-top:-5px;margin-left:14px">模板商品</div>
              </div>  
              <div style="height:2px;background-color:#C2C2C2;margin:26px 26px 36px 26px"></div>
              <div class="no-border-table"> 
                <v-table
                  is-horizontal-resize
                  style="margin-left:24px;width:1152px"
                  :columns="columns"
                  :table-data="tableData"
                  row-hover-color="#eee"
                  row-click-color="#edf7ff"
                ></v-table> 
              </div>  
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" :offset="20">
<!--             <button style="margin-top:40px;margin-left:100px;background:rgba(24,124,232,1);
              border:1px solid rgba(24, 124, 232,1);border-radius:15px;width:120px;
              color:white;height:35px" @click="toAffirm"
            >确认下载
            </button> -->
            <div class="bt_bule_button" style="margin-top:50px;">
              <el-button type="primary" style="margin-bottom:20px;margin-left:105px;"  @click="toAffirm">确定下载</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 选择文件上传 -->
      <div v-else>
        <el-row style="margin-top:20px">
          <el-col :span="20">
            <div>
              <el-form :inline="true" :model="load" ref="load" class="demo-form-inline" style="margin-right:40px">
                <el-form-item label="国家：" required>
                  <el-select v-model="load.country" @change="selectedLine" placeholder="选择国家">
                    <el-option v-for="(item, index) in uploadData.country" :label="item.name" :value="item.id"></el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="仓库：" required>
                  <el-select v-model="load.store" @change="checkUpload" placeholder="选择仓库">
                    <el-option v-for="(item, index) in uploadData.store" :label="item.store_name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                 <el-form-item label="线路：" required>
                  <el-select v-model="load.line" @change="checkUpload" placeholder="选择线路">
                    <el-option v-for="(item, index) in uploadData.line" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="4">
           <div class="bt_bule_rectangle_button"><el-button class="el-icon-download" @click="toTplDownload" style="margin-left:70px;margin-top:0px">下载模板</el-button></div>
          </el-col>
        </el-row>
        <el-row style="margin-top:30px;margin-bottom:50px">
          <el-col :span="24">
            <div class="bt_panel" style="height:300px">
              <el-row  id="uploadCheck">
                <el-col :span="6" :offset="10" v-if="uploadCheck">
                  <img src="../assets/tpl_slice.png" style="width:200px;height:200px;text-align:center"></img>
                  <el-upload
                    :action="uploadUrl"
                    name="file"
                    ref="upload"
                    :data="{abroad_channel_id:load.line,store_id:load.store,country_id:load.country}"
                    :multiple="true"
                    :headers="uploadHeader" 
                    :on-error="errorUpload"
                    :on-success="successUpload"
                    :auto-upload="true">
                    <el-button type="primary">上传批量下单文件(EXCL)</el-button>
                  </el-upload>
                </el-col>
                <el-col :span="6" :offset="10" v-if="!uploadCheck">
                  <img src="../assets/tpl_slice.png" style="width:200px;height:200px;text-align:center"></img>
                  <el-button type="primary"  @click="reminder">上传批量下单文件(EXCL)</el-button>
                </el-col>  
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </div> 
     <!-- 确认数据 -->
    
     <!-- 导入订单 -->
     <div v-if="stepTag == 1">     
       <el-row style="margin-top:30px">
        <el-col :span="24">
          <div class="bt_panel">
            <div class="bt-font-sty bt_cross" style="margin-top:10px;margin-left:30px;margin-bottom:26px">
              <img style="height:26px;width:26px" src="../assets/xianlu.png"></img>
              <div style="font-size:24px;font-family:MicrosoftYaHei;font-weight:400;color:#000000;margin-top:-5px;margin-left:14px;margin-left:22px">数据信息</div>
            </div>
            <div class="bt-font-sty" style="height:2px;padding:0 20px;background-color:#C2C2C2;margin:0 26px 30px 26px"></div>
              <div style="margin-top:20px;padding:0px 20px;margin-left:82px;margin-bottom:44px">
                <span style="font-weight:bold;display:inline-block;font-size:18px">物流线路：</span><!-- 
                 --><div style="display:inline-block;">
                  <div style="height:30px;line-height:30px;width:100px;background-color:#187CE8;color:white;text-align:center;
                  position:relative;display:inline-block;z-index:100;">
                    <div style="position:absolute;width:22px;height:22px;transform:rotate(45deg);background-color:transparent;left:-11px;top:4px;">
                    </div>
                    <label>{{waybillData.senderCountry}}</label>
                    <div style="position:absolute;width:22px;height:22px;transform:rotate(45deg);background-color:#187CE8;right:-11px;top:4px;">
                    </div>
                  </div><!-- 
                   --><div style="height:30px;line-height:30px;width:100px;background-color:#E4E4E4;color:#545454;text-align:center;
                  position:relative;display:inline-block;z-index:99;right:-3px;">
                    <div style="position:absolute;width:22px;height:22px;transform:rotate(45deg);background-color:white;left:-11px;top:4px;">
                    </div>
                    <label>{{waybillData.waybill}}关口</label>
                    <div style="position:absolute;width:22px;height:22px;transform:rotate(45deg);background-color:#E4E4E4;right:-11px;top:4px;">
                    </div>
                  </div><!-- 
                   --><div style="height:30px;line-height:30px;width:100px;background-color:#187CE8;color:white;text-align:center;
                  position:relative;display:inline-block;z-index:98;right:-6px;">
                    <div style="position:absolute;width:22px;height:22px;transform:rotate(45deg);background-color:white;left:-11px;top:4px;">
                    </div>
                    <label>{{waybillData.reciveCountry}}</label>
                    <div style="position:absolute;width:22px;height:22px;transform:rotate(45deg);background-color:transparent;right:-11px;top:4px;">
                    </div>
                  </div>
                </div>
            </div>
            <div style="margin-left:62px">
              <div><span :style="mTitle">数据总条数：</span><span :style="mContent">{{waybillData.allNum}}条</span></div>
              <div style="margin-top:36px;margin-bottom:38px"><span :style="mTitle">货物总数量：</span><span :style="mContent">{{waybillData.num}}</span></div>  
            </div> 
          </div>
        </el-col>
      </el-row>


       <div style="padding:20px;">
        <p style="font-size:19px;font-weight:bold;">订单信息</p>
        <div style="margin-top:10px;">
          <span style="display:inline-block;width:86px;text-align:right;">订单总金额：</span>
          <span style="display:inline-block;color:red;font-size:16px;font-weight:bold;">￥{{waybillData.amount}}</span>
        </div>
        <div style="margin-top:10px;">
          <span style="display:inline-block;width:86px;text-align:right;">订单编号：</span>
          <span>{{waybillData.orderNo}}</span>
        </div>
        <div style="margin-top:10px;">
          <span style="display:inline-block;width:86px;text-align:right;">余额支付：</span>

          <span style="cursor:pointer;" @click="choosePay($event,'zcpay')">
            <img :src="payRadio('zcpay')" style="width:12px;height:12px;background-color:white;margin-right:5px;">
            <span>余额支付（可用余额&nbsp;&nbsp;&nbsp;&nbsp;￥<span>{{waybillData.allAmount}}</span>）</span>
          </span>

        </div>
        <div style="margin-top:10px;">
          <span style="display:inline-block;width:86px;text-align:right;">支付方式：</span>

          <span style="position:relative;top:20px;display:block;left:20px;">

            <div style="display:inline-block;cursor:pointer;" @click="choosePay($event,'alipay')">
              <img :src="payRadio('alipay')" style="width:12px;height:12px;background-color:white;margin-right:5px;">
              <img src="../assets/alipay.png" style="width:100px;height:34px;background-color:white;">
            </div>

            <div style="display:inline-block;margin-left:30px;cursor:pointer;" @click="choosePay($event,'wxpay')">
              <img :src="payRadio('wxpay')" style="width:12px;height:12px;background-color:white;margin-right:5px;">
              <img src="../assets/wxpay.png" style="width:100px;height:34px;background-color:white;">
            </div>

          </span>
        </div>
      </div>
      <!-- 支付订单 -->
      <div style="margin-top:30px;text-align:center;padding-right:40px;">
        <button @click="payWaybill" style="margin-left:20px;background:rgba(24,124,232,1);border:1px solid rgba(24, 124, 232, 1);border-radius:15px;padding:0px 20px;color:white;height:30px;">支付订单</button>
      </div>


     </div>

     <el-dialog
      title="微信支付"
      class="dialog-content"
      @opened="openCard()" 
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
</template>
<script>
  
  import Vue from 'Vue';

  import Tools from '@/lib/Tools';
  import config from "@/config.js";

  let ts = Tools.getInstance();

  export default {
    name:'TplDownload',
    data() {
      return {
        wxPayImg:null,
        wxPayDialog:false,
        // 上传参数
        uploadData:'',
        // 上传地址
        uploadUrl:'',
        // 图片上传请求头
        uploadHeader:{Authorization:"Bearer "+localStorage.getItem('account')},
        mTitle:"font-size:18px;font-family:MicrosoftYaHei-Bold;font-weight:bold;color:#545454",
        mContent:'font-size:18px;font-family:MicrosoftYaHei;font-weight:400;color:#000000;',
        payType:"alipay",
        isShow:'show',
        stepTag:0,
        endCny:'',
        tableData: [
          {"name":"赵伟","tel":"156*****1987","hobby":"钢琴、书法、唱歌","address":"上海市黄浦区金陵东路569号17楼"},
          {"name":"李伟","tel":"182*****1538","hobby":"钢琴、书法、唱歌","address":"上海市奉贤区南桥镇立新路12号2楼"},
          {"name":"孙伟","tel":"161*****0097","hobby":"钢琴、书法、唱歌","address":"上海市崇明县城桥镇八一路739号"},
          {"name":"周伟","tel":"197*****1123","hobby":"钢琴、书法、唱歌","address":"上海市青浦区青浦镇章浜路24号"},
          {"name":"吴伟","tel":"183*****6678","hobby":"钢琴、书法、唱歌","address":"上海市松江区乐都西路867-871号"}
         ],
        columns: [
          {width: 60, titleAlign: 'center',columnAlign:'center',type: 'selection'},
          {field: 'name', title: '姓名', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
          {field: 'tel', title: '手机号码', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true},
          {field: 'hobby', title: '爱好', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true},
          {field: 'address', title: '地址', width: 280, titleAlign: 'center', columnAlign: 'left',isResize:true},
        ],
        bgBlue:"background-color:#187CE8;color:white;",
        bgGreen:"background-color:#F4F4F4;",
        bgTrans:"opacity:0;",
        formInline:{
          user:'',
          region: '',
          inlineName:''
        },

        // 物流线路
        logisticsPaths:[],
        uploadData:{
          country:[],
          line:[],
          store:[]
        },
        load:{
          country:null,
          line:null,
          store:null
        },
        selectedlogisPath:"",
        // 下载模板的选择的线路
        selectedlogisPathDown:"",
        // 商品搜索关键词
        keywords:"",
        // 商品类别
        goodsCates:[],
        goodsCate:"",
        uploadCheck:false,

        // 商品列表（选择商品）
        goodsList:[],
        // 已选择加入的商品列表
        selectedGoods:[],
        // 运单信息
        waybillData:{
          allNum:'',
          amount:'',
          num:'',
          weight:'',
          orderNo:'',
          allAmount:'',
          senderCountry:'',
          reciveCountry:'',
          waybill:''
        },
        page:{
          size:1,
          num:5
        },
        allNum:0,

      }
    },
    computed:{
      payRadio:function(){
        let thiz = this;
        // 解决计算属性传参的问题
        return function(type){
          let finalPic = thiz.payType==type?require('../assets/radio_active.png'):require('../assets/radio.png');
          return finalPic;
        }
      }
    },
    methods: {
      //当操作后
      restore(){
        this.page = {
          size:1,
          num:5
        }
      },
      findGoods(){
        this.restore();
        this.searchGoods(this.page)
      },
      openCard: function(){
        $("#wxPay").append(this.wxPayImg);
        $("#wxPay").children().css({height:'350px',width:'350px',margin:'0px auto'});
      },

      // 运单支付
      payWaybill(){
        let thiz = this;
        $("#wxPay").empty();
        let params = {
          order_no:this.waybillData.orderNo,
          amount:this.waybillData.amount,
          // amount:0.01,
          type:thiz.payType,
        };
        let sendDataType;
        if (thiz.payType == "wxpay" || thiz.payType == "alipay" ) {
          sendDataType = "html"
        }
        else{
          sendDataType = "json"
        }

        ts.sendRequest('waybill/pay',{
          data:params,
          dataType:sendDataType,
          success:function(r){

            if(thiz.payType=="alipay"&&r){
              $("body").append(r);
              // localStorage.removeItem('centerStatus')
              // thiz.$router.push({name:'paymentOrder',params:{type:'lookOrder'}});
            }

            if(thiz.payType=="zcpay"&&r.success){
              thiz.$message({
                message:'支付成功',
                type:'success'
              });
              thiz.getUserMsg();
              localStorage.removeItem('centerStatus');
              thiz.$router.push({name:'accBalance',params:{type:'lookLogisics'}});
            }

            if(thiz.payType=="wxpay"&&r){
              thiz.wxPayDialog = true;
              thiz.wxPayImg = r
              thiz.queryWxPayResult();
              // thiz.$router.push({name:'paymentOrder',params:{type:'lookOrder'}});
            }

          },
          error:function(e){

          }
        });

      // http://www.transport.cn/api/waybill/pay/update
      // 测试
      // ts.sendRequest('waybill/pay/update',{
      //   data:{
      //     order_no:"ZC003000000144DE",
      //   },
      //   dataType:"json",
      //   success:function(r){
      //     console.log('--------------waybill/pay/update---------',JSON.stringify(r));

      //   },
      //   error:function(e){

      //   }
      // });

      },
      // 回调查询微信支付
      // 二维码接口请求后，调用查询支付接口
      queryWxPayResult(param){
        let thiz = this;
        let timeOut = setInterval(()=>{ 
          ts.sendRequest('waybill/wxpay/update',{
            isExit:true,
            data:{order_no:thiz.waybillData.orderNo},
            success:function(ret){
              if (ret.success) {
                clearInterval(timeOut);
                thiz.$message({
                  message:'支付成功',
                  type:'success'
                });
                localStorage.removeItem('centerStatus');
                thiz.$router.push({name:'paymentOrder',params:{type:'lookOrder'}});
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

      //批量文件上传提示
      reminder(){
        let msg;
        if(!this.load.store){
          msg = '请选择仓库'
         } 
        if(!this.load.line){
          msg = '请选择线路'
        }
        if (!this.load.country) {
          msg = '请选择国家'
        }
        if (msg) {
          this.$message({
            type:'error',
            message:msg
          })
        }
      },
      // 检查select选择值
      checkUpload(){
        if(this.load.country && this.load.line && this.load.store){
          this.uploadCheck = true;
        }
      },
      // 筛选物流线路
      selectedLine(){
        let thiz = this;
        ts.sendRequest("common/channels",{
          type:"POST",
          isExit:true,
          data:{
            country_id:thiz.load.country,
          },
          success:function(ret){

            ret.data.forEach(function(r,i,k){
              if (r.name.indexOf('CC') != -1) {
                ret.data.splice(i,1);
              }
            })

            thiz.uploadData.line = ret.data;
          },
          error:function(err){
            thiz.$message({
              message: "数据加载失败",
              type: 'error'
            });
          }
        });
      },

      // 提醒上传选择线路
      toLeadExcl(){
        this.$message({
          message: "请先选择线路",
          type: 'error'
        });
      },
      // 给select赋值
      assignSt(){
        // this.uploadData = {abroad_channel_id:this.selectedlogisPath};
        // console.log('选中行---------',JSON.stringify(this.selectedlogisPath))
      },
      // 图片失败
      errorUpload(err,file,fileList){
        // this.$notify.error({
        //   title: '只能支持zip格式',
        //   message: err.msg
        // })  
      },
      // 
      // 图片成功
      successUpload(response, file, fileList){
        if(response.success){
          this.$notify.success({
            title: '成功',
            message: response.msg
          });
          this.waybillData.allNum = response.data.count;
          this.waybillData.amount = response.data.sumPrice;
          this.waybillData.num = response.data.weight;
          this.waybillData.orderNo = response.data.order_no;

          this.waybillData.senderCountry = response.data.wayline.name.split("-")[0];
          this.waybillData.reciveCountry = response.data.wayline.name.split("-")[1];
          this.waybillData.waybill = response.data.wayline.clearan_name;
          this.stepTag = 1;
        }else{
          this.$notify.error({
            title: response.msg,
            message: response.msg
          });
          $("#uploadCheck .el-upload-list li:last").remove()
        }
        
      },

      choosePay:function(e,type){
        this.payType = type;
      },
      //到支付页面
      toPay(){
        this.stepTag = 2
      },
      // 从确认页面返回
      toTplSelect(){
        this.isShow = 'show';
        this.stepTag = 0
      },
      //到模板下载
      toTplDownload(){
        let msg;
        if(!this.load.store){
          msg = '请选择仓库'
         } 
        if(!this.load.line){
          msg = '请选择线路'
        }
        if (!this.load.country) {
          msg = '请选择国家'
        }
        if (msg) {
          this.$message({
            type:'error',
            message:msg
          })
          return;
        }

        this.searchGoods(this.page);

        this.isShow = 'hide'
      },
      //到确认数据（确定下载）
      toAffirm(){

        // 构造选择的商品列表
        let goodsIds = [];
        if (this.selectedGoods.length == 0) {
           this.$message({
            message:'请先选择商品',
            type:'error'
           })
           return;
        }

        for(let i = 0;i<this.selectedGoods.length;i++){
          goodsIds.push(this.selectedGoods[i].id);
        }
        // 执行下载
        window.open(config.baseURL+"goods/template?id="+goodsIds);

        // 跳回之前的页面
        // this.stepTag = 1;
        this.isShow = "show";

      },

      // 添加商品到已选
      addToSelect(item){
        let thiz = this;
        item.selected = true;
        let itemStr = JSON.stringify(item);
        let itemCopy = JSON.parse(itemStr);
        itemCopy.selected = true;
        // 判断已选列表中是否有了
        let count = 0;
        for(let i=0;i<thiz.selectedGoods.length;i++){
          if(thiz.selectedGoods[i].id==itemCopy.id){
            count++;
          }
        }
        if(count==0){thiz.selectedGoods.push(itemCopy);}
        // 处理商品数据
      },
      delFromSelect(item){
        let thiz = this;
        item.selected = false;
        // 判断已选列表中是否有了
        let index = undefined;
        for(let i=0;i<thiz.selectedGoods.length;i++){
          if(thiz.selectedGoods[i].id==item.id){
            index = i;
          }
        }
        if(index!=undefined){thiz.selectedGoods.splice(index,1);}
      },

      // 上传批量下单文件
      upload(){
        // 测试
        // let goodsIds = "";
        // ts.sendRequest("goods/template?id=6,8,9",{
        //   type:"GET",
        //   data:{},
        //   success:function(ret){
            
        //     console.log("--------goods/template&id=6,8,9--------",JSON.stringify(ret));
            
        //   },
        //   error:function(err){
        //     thiz.$message({
        //       message: "数据加载失败",
        //       type: 'error'
        //     });
        //   }
        // });

        // //http://www.transport.cn/api/goods/template?id=6,8,9
        // // 直接打开链接
        // window.open("http://www.transport.cn/api/goods/template?id=6,8,9");  

      },
      loadCommonData(){
        let thiz = this;
        // 加载公共数据
        ts.sendRequest("common/data",{
          type:"GET",
          data:{},
          success:function(ret){
            if(ret&&ret.success){

              ret.data.country.forEach(function(r,i,k){
                if (r.name == '德国') {
                  thiz.uploadData.country.push(r)
                }
              });

              // // 处理数据
              // for(let i=0;i<ret.data.country.length;i++){
              //   ret.data.country[i].str = JSON.stringify(ret.data.country[i]);
              //   // 物流目的地只能是中国
              //   if(ret.data.country[i].code=="CN"){
              //     thiz.formInline.toregion = ret.data.country[i].str;
              //   }
              // }
              for(let i=0;i<ret.data.goods_type.length;i++){
                ret.data.goods_type[i].str = JSON.stringify(ret.data.goods_type[i]);
              }
              // // for(let i=0;i<ret.data.clearport_list.length;i++){
              // //   ret.data.clearport_list[i].str = JSON.stringify(ret.data.clearport_list[i]);
              // // }
              // for(let i=0;i<ret.data.coin.length;i++){
              //   ret.data.coin[i].str = JSON.stringify(ret.data.coin[i]);
              // }
              // for(let i=0;i<ret.data.declare_type.length;i++){
              //   ret.data.declare_type[i].str = JSON.stringify(ret.data.declare_type[i]);
              // }
              // for(let i=0;i<ret.data.unit.length;i++){
              //   ret.data.unit[i].str = JSON.stringify(ret.data.unit[i]);
              // }
              // for(let i=0;i<ret.data.brand_list.length;i++){
              //   ret.data.brand_list[i].str = JSON.stringify(ret.data.brand_list[i]);
              // }
              // // 设置国家
              // thiz.countries = ret.data.country;
              // // 设置清关方式
              // thiz.clears = ret.data.clearance_type;
              // // 设置默认第一种清关方式
              // for(let key in ret.data.clearance_type){
              //   thiz.scKey = key;
              //   break;
              // }

              // 设置商品类别
              thiz.goodsCates = ret.data.goods_type;
              // thiz.goodsInfoForm.applyInfo.goodsCates = ret.data.goods_type;
              // // 海关
              // // thiz.clearPorts = ret.data.clearport_list;
              // // 币种
              // thiz.coinTypes = ret.data.coin;
              // // 申报类型
              // thiz.declareTypes = ret.data.declare_type;
              // // 计量单位
              // thiz.units = ret.data.unit;
              // // 英文品牌
              // thiz.enBrands = ret.data.brand_list;
            }else{
              thiz.$message({
                message: ret.msg,
                type: 'error'
              });
            }

          },
          error:function(err){
            thiz.$message({
              message: "数据加载失败",
              type: 'error'
            });
          }
        });

        ts.sendRequest("common/sotre",{
          type:"GET",
          data:{},
          success:function(ret){
            thiz.uploadData.store = ret.data;
          },
          error:function(err){
          }
        });
      },

      // 页码变动
      handleCurrentChange(val){
        this.page.size = val;
        let page = {
          size:val,
          num:this.page.num
        };
        this.loadPage(page)
      },

      // 搜索商品
      searchGoods(page){
        let thiz = this;
        let url = "goods/clear/goodsData"+'?'+'page='+page.size+'&num='+page.num; 
        ts.sendRequest(url,{
          type:"POST",
          data:{
            keywords:thiz.keywords,
            method:10, 
            goods_type:thiz.goodsCate?JSON.parse(thiz.goodsCate).id:"",
            abroad_channels_id:thiz.load.line
          },
          success:function(ret){
            if(ret&&ret.success){
              // 当商品没有时，申报的按钮状态
              if (ret.data.length === 0) {
                thiz.tagOneButton = false
              }else{
                thiz.tagOneButton = true
              }

              thiz.allNum = ret.count;

              // 处理数据，判断商品是否已加入临时已选商品信息
              for(let i=0;i<ret.data.length;i++){

                let count = 0;
                for(let ii=0;ii<thiz.selectedGoods.length;ii++){
                  if(ret.data[i].id==thiz.selectedGoods[ii].id){
                    count++;
                  }
                }
                if(count>0){ret.data[i].selected = true;}else{ret.data[i].selected = false;}

              }

              thiz.goodsList = ret.data;
            }
            else{
              thiz.$message({
                message: ret.msg,
                type: 'error'
              });  
            }
          },
          error:function(err){
            thiz.$message({
              message: "数据加载失败",
              type: 'error'
            });
          }
        });
      },

      getUserData(){
        let thiz = this;
        ts.sendRequest('member/info',{
          data:{},
          type:'GET',
          success:function(res){
            ts.save("fullAccount",res.data);
            thiz.waybillData.allAmount = res.data.balance;
          },
          error:function(err){

          }
        })
      }
    },
    mounted:function(){
      this.uploadUrl = config.baseURL+'waybill/batch/order';
      this.loadCommonData();
      this.getUserData();
    }
  };

  // 自定义组件
  Vue.component('add-goods-table', {
  template: `<span>
        <a href="javascript:void(0);" class="btn btn-mini" @click.stop.prevent="toPrinting(rowData,index)">查看面单</a>
        </span>`,
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods: {
    toPrinting() {

      let params = { type: 'Printing', index: this.index, rowData: this.rowData };
      this.$emit('on-custom-comp', params);
      
    },
  },
  mounted:function(){
    
  }
})

</script>
<style>
  @import "../css/public.scss";
  @import "../css/app.css";

  .ct_font{
    color:#545454;
    font-size:16px;
    margin-left:20px;
    font-weight:bold
  }

  .my_ct-span-sty-front{
    margin-left: -7px;
    margin-top:10px;
    font-size:8px;
    color:rgba(84,84,84,1);
    margin-right:7px;
    width:80px;
    text-align:center;
    font-family:MicrosoftYaHei;
  }

  .bt-span-sty{
    font-size:8px;
    text-align:center;
    height:30px;
    width:70px;
    margin-top:5px;
    color:#545454
  }

  .bt-s-sty{
    font-size:8px;
    margin-top:5px;
    color:#545454
  }

  .bt-font-sty{
    font-size:9px;
    font-family:MicrosoftYaHei-Bold;
    font-weight:bold;
    }

  .bt-st-div{
    width: 0;
    height: 0;
    border-width: 6px;
    border-style: solid;
    border-color: #B3B3B3 transparent transparent transparent;
  }
/*步骤样式*/
  .step-item{background-color:#F4F4F4;width:180px;position:relative;display:inline-block;}

  .step-item .step-title{color:#B3B3B3;padding:0px 20px;height:44px;background-color:#F4F4F4;width:calc(100% - 34px + 14px);line-height:44px;text-align:center;float:left;}
  .step-item .step-tria{background-color:#F4F4F4;width:28px;height:28px;margin-top:8px;margin-left:-14px;float:left;transform:rotate(45deg);box-sizing:content-box;}
  .step-item .step-tria-blank{background-color:transparent;width:33px;height:33px;margin-top:4px;margin-left:-12px;float:right;transform:rotate(45deg);box-sizing:content-box;position:absolute;right:0px;border-top:3px solid white;border-right:3px solid white;right:6px;}
</style>