<!--
 * @name goodsDeclaration.vue
 * @author 王刚
 * @date 2019.4.18
 * @desc 物品申报
-->
<template>
  <div>
    <!---------------------- 物品申报 --------------------- -->
    <div v-if="!isSumDec">
      <div class="xyj-edit-form" style="padding-right:20px;">
        <!--<h2>{{this.$store.state.keepAliveName}}</h2>-->
        <el-form :inline="true" :model="goodDecForm" ref="goodDecForm" label-width="80px">
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="物品名称:" prop="receiptName">
                <el-input v-model="goodDecForm.keywords" placeholder="请输入物品名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" style="text-align:center;" class="btn-middle">
              <el-button icon="el-icon-search" @click="findWaybill" round>搜索</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="xyj-edit-form" style="position:relative;text-align:center;">
        <el-button class="pos-ab-right" size="small" type="primary" @click="toSubDec" icon="el-icon-plus">填写申报</el-button>
        <el-tabs v-model="tabName" class="no-border-tabs" @tab-click="tabsSwitch">
          <el-tab-pane label="申报中" name="pendingDisposal" :key="'Declaration'">
            <el-table :data="declareTableData" style="width: 100%">
              <el-table-column prop="goods_sn" label="商品编码" width="150">
              </el-table-column>
              <el-table-column prop="declare_type_id" label="申报类型" width="100"
                :formatter="deType">
              </el-table-column>
              <el-table-column prop="english_brand_id" label="品牌" width="120"
              :formatter="brandType">
              </el-table-column>
              <el-table-column prop="chinese_name" label="物品名称" width="120">
              </el-table-column>
              <el-table-column prop="price" label="价格" width="80">
              </el-table-column>
              <el-table-column label="购买票据" align="center" width="160">
                <template slot-scope="scope">
                  <div style="display:inline-block;cursor:pointer;">
                    <img :src="scope.row.imgUrl" 
                      style="width:200px;height:70px;margin-right:3px;background-color:white;cursor:pointer;">
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="status" align="center" label="状态" width="100"
              :formatter="stType">
              </el-table-column>
              <el-table-column label="操作"> 
                <template slot-scope="scope">
                  <div @click="delFromSelect(scope.row)" style="display:inline-block;cursor:pointer;">
                    <img src="../../assets/delete.png" style="width:12px;height:12px;margin-right:3px;background-color:white;cursor:pointer;">
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
          </el-tab-pane>
          <el-tab-pane label="已完成" name="completed" :key="'completed'">
            <el-table :data="doneTableData" style="width: 100%">
              <el-table-column prop="goods_sn" label="商品编码" width="150">
              </el-table-column>
              <el-table-column prop="declare_type_id" label="申报类型" width="100"
               :formatter="deType">
              </el-table-column>
              <el-table-column prop="english_brand_id" label="品牌" width="120"
              :formatter="brandType">
              </el-table-column>
              <el-table-column prop="chinese_name" label="物品名称" width="120">
              </el-table-column>
              <el-table-column prop="price" label="价格" width="80">
              </el-table-column>
              <el-table-column label="购买票据" align="center" width="160">
                <template slot-scope="scope">
                  <div style="display:inline-block;cursor:pointer;">
                    <img :src="scope.row.imgUrl"   
                      style="width:200px;height:70px;margin-right:3px;background-color:white;cursor:pointer;">
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="状态" width="80"
              :formatter="stType">
              </el-table-column>
              <el-table-column label="操作"> 
                <template slot-scope="scope">
                  <div @click="delFromSelect(scope.row)" style="display:inline-block;cursor:pointer;">
                    <img src="../../assets/delete.png" style="width:12px;height:12px;margin-right:3px;background-color:white;cursor:pointer;">
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
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!---------------------- 提交申报 --------------------- -->
    <div v-if="isSumDec" class="xyj-edit-form label-120" style="padding-right:30px;">
      <!--<h2>{{this.$store.state.keepAliveName}}</h2>-->
      <div style="padding-bottom:15px;color:rgba(255,0,0,1);position:relative;">
        <div style="background:rgba(255,176,176,1);opacity:0.23;width:100%;height:30px;height:36px;"></div>
        <div style="position:absolute;top: 8px;left: 15px;"><i class="el-icon-warning" style="margin-right:15px;"></i>申报帮助提示内容</div>
      </div>
      <el-form :model="subDecForm" ref="subDecForm" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="申报类型:" hide-required-asterisk prop="declareType" required>
              <el-select style="width:287px" v-model="subDecForm.declareType" placeholder="申报类型">
                <el-option v-for="(item, index) in declareList" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <!-- <i class="el-icon-question el-icon-form-right"></i> -->
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item label="原产地:" prop="originCountry" required>
              <el-select style="width:287px" v-model="subDecForm.originCountry" placeholder="原产地">
                <el-option v-for="(item, index) in countryList" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <!-- <i class="el-icon-question el-icon-form-right"></i> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="品牌:" prop="engBrand" required>
              <el-select style="width:287px" v-model="subDecForm.engBrand" placeholder="品牌">
                <el-option v-for="(item, index) in brandList" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item label="英文物品名称:" prop="engGoodName" required>
              <el-input v-model="subDecForm.engGoodName" placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="物品分类:" prop="goodsClassfication" required>
              <el-select v-model="subDecForm.goodsClassfication" class="width-paved" placeholder="物品分类">
                <el-option v-for="(item, index) in goodsSortList" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item label="中文物品名称:" prop="cheGoodName" required>
              <el-input v-model="subDecForm.cheGoodName" placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="物品价格:" class="input-and-select" prop="goodsPrice" required>
              <div style="display:flex;flex-direction:row">
                <el-input v-model="subDecForm.goodsPrice" placeholder="">
                </el-input>
                <el-select v-model="subDecForm.priceName" class="width-paved" placeholder="币种">
                  <el-option v-for="(item, index) in currencyList" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </div>  
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item label="物品规格:" prop="goodsSpecifications" required>
              <el-input v-model="subDecForm.goodsSpecifications" placeholder="例如：50片,200ml,100g"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="计量单位:" prop="measurementUnit" required>
               <el-select v-model="subDecForm.measurementUnit" class="width-paved" placeholder="计量单位">
                <el-option v-for="(item, index) in unitList" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item label="物品单位净重:" prop="goodsWeight" required>
              <el-input v-model="subDecForm.goodsWeight" placeholder="单位kg">
                <template slot="append">kg</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="EAN:" prop="goodsEan">
              <el-input v-model="subDecForm.goodsEan" placeholder="全球统一编码,类似于条形码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="网上购买链接:" prop="purchaseLink" required>
              <el-input v-model="subDecForm.purchaseLink" placeholder="http://"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="购买票据:" prop="purchaseBills" required>
              <div style="display:inline-block;vertical-align:top;">
                <div :style="frontStyle">
                  <img :src="subDecForm.imgUrl" style="width:100%;height:100%;position:relative;z-index:2;background-color:transparent;" 
                    v-if="subDecForm.imgUrl">
                  <label style="color:#B3B3B3;font-size:12px;display:none;width:30px;text-align:center;position:absolute;left:65px;top:40px;">正面</label>
                </div>

                <el-upload
                  :action="uploadUrl"
                  name="file"
                  ref="upload"
                  :multiple="true"
                  :headers="uploadHeader"
                  :on-error="errorUpload"
                  :on-success="successUpload"
                  :auto-upload="true"
                  style="background-color:transparent;text-align:left;position:absolute;width:100%;height:100%;top:0px;opacity:0;z-index:3;">

                  <i class="el-icon-plus" style="font-size:40px;display:block;background-color:transparent;width:160px;height:100px;"></i>

                </el-upload>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="text-align:center;">
            <el-button type="primary" size="small" round @click="subDecSubmit()">提交</el-button>
            <el-button type="primary" size="small" round @click="goBack">返回</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>


  </div>
</template>
<script>
import Vue from 'vue'
import Tools from '@/lib/Tools';
import config from "@/config.js";

let ts = Tools.getInstance();

export default {
  name: 'goodsDeclaration',
  data() {
    return {
      uploadHeader:{Authorization:"Bearer "+localStorage.getItem('account')},
      uploadUrl:'',
      frontStyle:"width:160px;height:100px;display:inline-block;position:relative;cursor:pointer;background-image:url("+require('../../assets/load4.png')+");background-size:100% 100%;",
      loading: false,
      /**********物品申报*************/

      //物品申报数据
      goodDecForm: {
        keywords: '',
        date: '',
      },
      currentTab: 'Declaration',
      decTableData: [
        { "code": "213123123", "line": "德国-广州-北京", "sender": "德国林先生", "recipient": "北京王先生", "weight_size": "", "freight": "100", "state": "待支付" },
      ],

      tableConfig: {

        //待支付
        paidData: [],
        paidColumns: [],

        //待申报
        penDecData: [],
        penDecColumns: [],

        //申报中
        decData: [],
        decColumns: [],


        //已完成
        completedData: [],
        completedColumns: []
      },

      isSumDec: false,

      /**********提交申报*************/

      //表单数据
      subDecForm: {
        declareType: '',
        originCountry: '',
        engBrand: '',
        engGoodName: '',
        goodsClassfication: '',
        cheGoodName: '',
        goodsPrice: '',
        priceName:1,
        goodsSpecifications: '',
        measurementUnit: "",
        region_name: 'RMB',
        goodsWeight: '',
        goodsEan: '',
        purchaseLink: '',
        purchaseBills: '',
        imgUrl:'',
        imgShortUrl:''
      },
      dialogImageUrl: '',
      dialogVisible: false,
      // 国家list
      countryList:[],
      // 申报list
      declareList:[],
      // 物品分类list
      goodsSortList:[],
      // 币种list
      currencyList:[],
      // 计量单位list
      unitList:[],
      // 商品list
      brandList:[],
      // 申报中
      declareTableData:[],
      //已完成 
      doneTableData:[],
      tabName:'pendingDisposal',
      page:{
        size:1,
        num:5
      },
       // 总条数
      allNum:0,

      // 删除的信息
      delData:null,
      delDialog:false,
    }
  },
  methods: {
    //tabs切换
    tabsSwitch(tab, event) {
      this.tabName = tab.name;
      this.goodDecForm = {
        keywords: '',
        date: '',
      };
      this.restore();
      this.loadPage(this.page);
    },
    //当操作后
    restore(){
      this.page = {
        size:1,
        num:5
      }
    },
    findWaybill(){
      this.restore();
      this.loadPage(this.page)
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

    // 状态转义
    stType(row,column){
      let ret;
      if (row.status == 10) {
        ret = '申报中'
      }
      else if(row.status == 20){
        ret = '通过审核'
      }
      else if(row.status == 30){
        ret = '拒绝'
      }
      return ret
    },
    // 申报类型转义
    deType(row, column){
      let ret;
      if (!row.declare_type_id) {
        ret = '-'
      }
      else{
        this.declareList.forEach(function(r,i,k){
          if (r.id == row.declare_type_id) {
              ret = r.name;
          }
        })
      }
      return ret
    },
    // 品牌转义
    brandType(row, column){
      let ret;
      if (!row.english_brand_id) {
        ret = "-"
      }
      else{
        this.brandList.forEach(function(r,i,k){
          if (r.id == row.english_brand_id) {
            ret = r.name
          }
        })
      }
      return ret;
    },
    // 删除申报
    delFromSelect(row){
      let thiz = this;
      this.$confirm('确认删除？')
        .then(_ => {
          ts.sendRequest("goods/record/revoke",{
            data:{id:row.id},
            success:function(res){
              thiz.restore();
              thiz.loadPage(thiz.page)
            },  
            error:function(ero){

            }
          })
        })
        .catch(_ => {});
    },

    // 图片失败
    errorUpload(err,file,fileList){
      this.$notify.error({
        title: '失败',
        message: err.msg
      })  
    },
    // 图片成功
    successUpload(response, file, fileList){
      // this.$notify.success({
      //   title: '成功',
      //   message: response.msg
      // });
      // 拼接显示图片
      this.subDecForm.imgUrl = config.fileURL+response.data;
      this.subDecForm.imgShortUrl = response.data;
    },

    //返回物品申报
    goBack() {
      this.isSumDec = false;
      this.$store.dispatch("editMenuListAction", "返回")
      this.$store.dispatch("subDeclarationAction", false)
    },

    loadPage(params){
      let thiz = this;
      this.declareTableData = []; 
      this.doneTableData = [];
      let sendParams = {
        keywords:this.goodDecForm.keywords
      }
      if (this.goodDecForm.date) {
        sendParams.create_time = this.goodDecForm.date[0];
        sendParams.end_time = this.goodDecForm.date[1];
      }
      else{
        sendParams.create_time = '';
        sendParams.end_time = '';
      }
      if (this.tabName == 'pendingDisposal') {
        sendParams.status = 10
      }
      else{
        sendParams.status = 20
      }
      let url = "goods/record/search"+'?'+'page='+params.size+'&num='+params.num;
      ts.sendRequest(url,{
        data:sendParams,
        success:function(ret){
          thiz.allNum = ret.count;

          ret.data.forEach(function(r,i,k){
            r.imgUrl = config.fileURL + r.purchase_bills;
           })

          if (thiz.tabName == 'pendingDisposal') {
            thiz.declareTableData = ret.data;
          }
          else{
            thiz.doneTableData = ret.data;
          }
          
        },
        error:function(err){
        }
      });
    },
    //提交申报跳转（提交申报页面）
    toSubDec(tab, event) {
      // 清空数据
      this.subDecForm = {
        declareType: '',
        originCountry: '',
        engBrand: '',
        engGoodName: '',
        goodsClassfication: '',
        cheGoodName: '',
        goodsPrice: '',
        priceName:1,
        goodsSpecifications: '',
        measurementUnit: "",
        region_name: 'RMB',
        goodsWeight: '',
        goodsEan: '',
        purchaseLink: '',
        purchaseBills: '',
        imgUrl:'',
        imgShortUrl:''
      };

      this.isSumDec = true;
      this.$store.dispatch("editMenuListAction", "提交申报");
      this.$store.dispatch("subDeclarationAction", true)
    },

    //  添加申报
    subDecSubmit() {
      let thiz = this;
      // 校验
      let msg;
      if(!this.subDecForm.imgShortUrl){
        msg = '请上传购买票据'
      }
      if(!this.subDecForm.purchaseLink){
        msg = '请填写网上购买链接'
      }
      let weightCall = ts.ruleNum(this.subDecForm.goodsWeight,'请填写物品单位净重','物品单位净重格式不正确');
      if( weightCall !== 'true'){
        msg = weightCall
      }
      if(!this.subDecForm.measurementUnit){
        msg = '请选择计量单位'
      }
      if (!this.subDecForm.goodsSpecifications) {
        msg = '请填写物品规格'
      }
      if (!this.subDecForm.priceName) {
        msg = '请选择币种'
      }
      let priceCall = ts.ruleNum(this.subDecForm.goodsPrice,'请填写物品价格','物品价格格式不正确');
      if( priceCall !== 'true'){
        msg = priceCall
      }
      if(!this.subDecForm.cheGoodName){
        msg = '请填写中文物品名称'
      }
      if (!this.subDecForm.goodsClassfication) {
        msg = '请选择物品分类'
      }
      if(!this.subDecForm.engGoodName){
        msg = '请填写英文物品名称'
      }
      if(!this.subDecForm.engBrand){
        msg = '请选择品牌'
      }
      if(!this.subDecForm.originCountry){
        msg = '请选择原产地'
      }
      if (!this.subDecForm.declareType) {
        msg = "请选择申报类型"
      }

      if (msg) {
        this.$message({
          message:msg,
          type:'error'
        });
        return;
      }
      let obj = {
        declare_type_id:this.subDecForm.declareType,
        country_id:this.subDecForm.originCountry,
        english_brand_id:this.subDecForm.engBrand,
        brand_remark:'备注',
        english_name:this.subDecForm.engGoodName,
        type_id:this.subDecForm.goodsClassfication,
        chinese_name:this.subDecForm.cheGoodName,
        price:this.subDecForm.goodsPrice,
        specification_type:this.subDecForm.goodsSpecifications,
        unit_id:this.subDecForm.measurementUnit,
        weight:this.subDecForm.goodsWeight,
        ean:this.subDecForm.goodsEan,
        url:this.subDecForm.purchaseLink,
        purchase_bills:this.subDecForm.imgShortUrl
      };
      ts.sendRequest('goods/record',{
        data:obj,
        success:function(res){
          if (res.code === 1000) {
            thiz.$message({
              message: res.msg,
              type: 'success'
            });
            thiz.goBack();
            thiz.restore();
            thiz.loadPage(thiz.page);
          }
        },
        error:function(err){

        }
      })
    },
    // 获取select
    getList(){
      let thiz = this;
      ts.sendRequest('common/data',{
        data:{},
        type:'GET',
        success:function(res){
          thiz.declareList = res.data.declare_type;
          thiz.goodsSortList = res.data.goods_type;
          res.data.coin.forEach(function(r,i,k){
            if (r.name === 'RMB') {
              thiz.currencyList.push(r)
            }
          });
          thiz.unitList = res.data.unit;
          thiz.countryList = res.data.country;
          thiz.brandList = res.data.brand_list
        },
        error:function(ret){

        }
      })
    }
  },
  mounted: function() {
    this.uploadUrl = config.uploadURL;
    this.getList();
    this.loadPage(this.page);
  }
}

</script>
<style>
.input-and-select .el-input {
  width: 70% !important;
  margin-right:1%
}

.input-and-select .el-select {
  width: 39% !important;
}
.el-upload-list{
  width: 170px!important;
}
</style>
