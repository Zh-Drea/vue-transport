<!--
 * @name addressBook.vue
 * @author 王刚
 * @date 2019.4.18
 * @desc 地址簿
 * @city
-->
<template>
  <div>
    <!--------------------------   地址簿(查询)   -------------------------->
    <div v-if="!isAddAddress">
      <div class="xyj-edit-form-inline" style="padding-right:20px;">
        <!--<h2>{{this.$store.state.keepAliveName}}</h2>-->
        <el-form :inline="true" :model="finRecordsForm" ref="finRecordsForm" label-width="100px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="finRecordsForm.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="finRecordsForm.phone" placeholder="请输入电话"></el-input>
          </el-form-item>
          <el-form-item class="btn-middle">
            <el-button @click="findAddress" round>搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="xyj-edit-form-inline" style="position:relative;">
        <el-button class="pos-ab-right" size="small" type="primary" @click="addAddress" icon="el-icon-plus">添加地址</el-button>
        <el-tabs v-model="tabName" @tab-click="tabsSwitch">
          <el-tab-pane label="收货地址" name="pendingDisposal" :key="'pendingDisposal'"> 
            <el-table :data="recevieTableData" style="width: 100%">
              <el-table-column prop="name" label="名称" width="150">
              </el-table-column>
              <el-table-column prop="phone" label="电话" width="150">
              </el-table-column>
              <el-table-column prop="detail" label="地址" width="400">
              </el-table-column>
              <el-table-column prop="zipcode" label="邮编">
              </el-table-column>
              <el-table-column label="操作"> 
                <template slot-scope="scope">
                  <div @click="delFromSelect(scope.row,'reciver')" style="display:inline-block;cursor:pointer;">
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
          <el-tab-pane label="发货地址" name="aaa" :key="'aaa'">   
            <el-table :data="senderTableData" style="width: 100%">
              <el-table-column prop="sender" label="名称" width="150">
              </el-table-column>
              <el-table-column prop="telephone" label="电话" width="150">
              </el-table-column>
              <el-table-column prop="detail" label="地址" width="400">
              </el-table-column>
              <el-table-column prop="zipcode" label="邮编">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div @click="delFromSelect(scope.row,'sender')" style="display:inline-block;cursor:pointer;">
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

    <!--------------------------   添加地址   -------------------------->
    <div v-if="isAddAddress">
      <div class="xyj-edit-form label-120" style="padding-right:20px;">
        <el-tabs v-model="addressTabs" class="no-border-tables" @tab-click="addSwitch">
          <!-- 收货地址 -->
          <el-tab-pane label="收货地址" name="putAddress" :key="'putAddress'" style="width:100%;">
            <el-form :model="addAddressForm" ref="addAddressForm" label-width="120px">
              <el-row :gutter="20">
                <el-col :span="11">
                  <el-form-item label="收件人:" prop="name" required>
                    <el-input v-model="addAddressForm.name" placeholder="请输入姓名"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11" :offset="2">
                  <el-form-item label="电话:" prop="phone" required>
                    <el-input v-model="addAddressForm.phone" placeholder="请输入电话"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="11">
                  <el-form-item label="地区:" prop="region" required>
                    <el-cascader
                      ref="getCascaderAddr"
                      :options="options"
                      @active-item-change="handleItemChange"
                      @change="handleGetOptionsChange"
                      :props="props"
                    ></el-cascader>
                  </el-form-item>
                </el-col>
                <el-col :span="11" :offset="2">
                  <el-form-item label="身份证号码:" prop="cardNo" required>
                    <el-input v-model="addAddressForm.cardNo" placeholder="请输入身份证号码"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="11">
                  <el-form-item label="邮编:" prop="zipcode">
                    <el-input v-model="addAddressForm.zipcode" placeholder="请输入邮编"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="详细地址:" prop="address" required>
                    <el-input type="textarea" v-model="addAddressForm.address" placeholder="请输入详细地址"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
               <el-row>
                  <el-col :span="24">
                    <el-form-item label="身份证:" prop="userName">
                      <div style="display:inline-block;vertical-align:top;">
                        <div :style="frontStyle">
                          <img :src="addAddressForm.cardForntImage" style="width:100%;height:100%;position:relative;z-index:2;background-color:transparent;" v-if="addAddressForm.cardForntImage">
                          <label style="color:#B3B3B3;font-size:12px;display:none;width:30px;text-align:center;position:absolute;left:65px;top:40px;">正面</label>
                        </div>

                        <el-upload
                          :action="uploadUrl"
                          name="file"
                          ref="upload"
                          :multiple="true"
                          :headers="uploadHeader"
                          :on-error="errorUpload"
                          :on-success="receiveFrontSuccess"
                          :auto-upload="true"
                          style="background-color:transparent;text-align:left;position:absolute;width:100%;height:100%;top:0px;opacity:0;z-index:3;">

                          <i class="el-icon-plus" style="font-size:40px;display:block;background-color:transparent;width:160px;height:100px;"></i>

                        </el-upload>
                      </div>

                      <!-- 背面 -->
                      <div style="display:inline-block;margin-left:10px;vertical-align:top;">
                        <div :style="backStyle">
                          <img :src="addAddressForm.cardBackImage" style="width:100%;height:100%;position:relative;z-index:2;background-color:transparent;" v-if="addAddressForm.cardBackImage">
                          <label style="color:#B3B3B3;font-size:12px;display:none;width:30px;text-align:center;position:absolute;left:65px;top:40px;">背面</label>
                        </div>

                        <el-upload
                          :action="uploadUrl"
                          name="file"
                          ref="upload"
                          :multiple="true"
                          :headers="uploadHeader"
                          :on-error="errorUpload"
                          :on-success="receiveBackSuccess"
                          :auto-upload="true"
                          style="background-color:transparent;text-align:left;position:absolute;width:100%;height:100%;top:0px;opacity:0;z-index:3;">

                          <i class="el-icon-plus" style="font-size:40px;display:block;background-color:transparent;width:160px;height:100px;"></i>

                        </el-upload>
                      </div>

                      <!-- <div :style="backStyle">
                        <img src="" style="width:100%;height:100%;position:relative;z-index:2;background-color:red;display:none;">
                        <label style="color:#B3B3B3;font-size:12px;display:none;width:30px;text-align:center;position:absolute;left:65px;top:40px;">背面</label>
                      </div> -->

                    </el-form-item>
                  </el-col>
                </el-row>
              <el-row>
                <el-col :span="24" style="text-align:center;">
                  <el-button type="primary" size="small" round @click="addAddressSubmit('addAddressForm')">确认添加</el-button>
                  <el-button type="primary" size="small" round @click="goBack">返回</el-button>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <!-- 发货地址 -->
          <el-tab-pane label="发货地址" name="senderAddress" :key="'senderAddress'" style="width:100%;">
            <el-form :model="sendAddressForm" ref="sendAddressForm" label-width="120px">
              <el-row :gutter="20">
                <el-col :span="11">
                  <el-form-item label="发件人:" prop="name" required>
                    <el-input v-model="sendAddressForm.name" placeholder="请输入姓名"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11" :offset="2">
                  <el-form-item label="电话:" prop="phone" required>
                    <div style="display:flex;flex-direction: row">
                      <el-select v-model="sendAddressForm.code" style="width:130px;margin-right:10px" placeholder="区号">
                        <el-option v-for="(item, index) in countryOptions" :label="item.name+'+'+item.area_code" :value="item.id"></el-option>
                      </el-select>
                      <el-input v-model="sendAddressForm.phone" style="width:260px" placeholder="请输入电话"></el-input>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="11">
                  <el-form-item label="国家:" prop="region" required>
                   <el-select v-model="sendAddressForm.country" style="width:292px" placeholder="请选择">
                      <el-option
                        v-for="item in countryOptions"
                        :key="item.value"
                        :label="item.english_name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="11" :offset="2">
                  <el-form-item label="城市:" prop="cardNo" required>
                    <el-input v-model="sendAddressForm.city" placeholder="请输入城市"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
               <el-row :gutter="20">
                <el-col :span="11">
                  <el-form-item label="身份证号码:" prop="cardNo">
                    <el-input v-model="sendAddressForm.cardNo" placeholder="请输入身份证号码"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11" :offset="2">
                  <el-form-item label="邮编:" prop="zipcode">
                    <el-input v-model="sendAddressForm.zipcode" placeholder="请输入邮编"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="详细地址:" prop="address" required>
                    <el-input type="textarea" v-model="sendAddressForm.address" placeholder="请输入详细地址"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                  <el-col :span="24">
                    <el-form-item label="身份证:" prop="userName">
                      <div style="display:inline-block;vertical-align:top;">
                        <div :style="frontStyle">
                          <img :src="sendAddressForm.cardForntImage" style="width:100%;height:100%;position:relative;z-index:2;background-color:transparent;" v-if="sendAddressForm.cardForntImage">
                          <label style="color:#B3B3B3;font-size:12px;display:none;width:30px;text-align:center;position:absolute;left:65px;top:40px;">正面</label>
                        </div>

                        <el-upload
                          :action="uploadUrl" 
                          name="file"
                          ref="upload"
                          :multiple="true"
                          :headers="uploadHeader"
                          :on-error="errorUpload"
                          :on-success="senderFrontSuccess"
                          :auto-upload="true"
                          style="background-color:transparent;text-align:left;position:absolute;width:100%;height:100%;top:0px;opacity:0;z-index:3;">

                          <i class="el-icon-plus" style="font-size:40px;display:block;background-color:transparent;width:160px;height:100px;"></i>

                        </el-upload>
                      </div>

                      <!-- 背面 -->
                      <div style="display:inline-block;margin-left:10px;vertical-align:top;">
                        <div :style="backStyle">
                          <img :src="sendAddressForm.cardBackImage" style="width:100%;height:100%;position:relative;z-index:2;background-color:transparent;" 
                            v-if="sendAddressForm.cardBackImage">
                          <label style="color:#B3B3B3;font-size:12px;display:none;width:30px;text-align:center;position:absolute;left:65px;top:40px;">背面</label>
                        </div>

                        <el-upload
                          :action="uploadUrl"
                          name="file"
                          ref="upload"
                          :multiple="true"
                          :headers="uploadHeader"
                          :on-error="errorUpload"
                          :on-success="senderBackSuccess"
                          :auto-upload="true"
                          style="background-color:transparent;text-align:left;position:absolute;width:100%;height:100%;top:0px;opacity:0;z-index:3;">

                          <i class="el-icon-plus" style="font-size:40px;display:block;background-color:transparent;width:160px;height:100px;"></i>

                        </el-upload>
                      </div>

                      <!-- <div :style="backStyle">
                        <img src="" style="width:100%;height:100%;position:relative;z-index:2;background-color:red;display:none;">
                        <label style="color:#B3B3B3;font-size:12px;display:none;width:30px;text-align:center;position:absolute;left:65px;top:40px;">背面</label>
                      </div> -->

                    </el-form-item>
                  </el-col>
                </el-row>
                <el-col :span="24" style="text-align:center;">
                  <el-button type="primary" size="small" round @click="sendeSubmitForm('sendAddressForm')">确认添加</el-button>
                  <el-button type="primary" size="small" round @click="goBack">返回</el-button>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- <el-button :plain="true">成功</el-button> -->
  </div>
</template>
<script>
import Vue from 'vue'
import Tools from '@/lib/Tools';
import config from "@/config.js";

let ts = Tools.getInstance();

export default {
  name: 'addressBook',
  data() {
    return {
      addressTabs: "putAddress",
      finRecordsForm: {
        name: '',
        phone: ''
      },

      disposalTableData: [
        { "code": "213123123", "phone": "德国-广州-北京", "address": "成都", "state": "待支付" },
      ],
      senderColumns: [
        { width: 60, titleAlign: 'center', columnAlign: 'center', type: 'selection' },
        { field: 'code', title: '姓名', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true },
        { field: 'phone', title: '电话', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true },
        { field: 'state', title: '邮编', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true },
        { field: 'address', title: '地址', width: 280, titleAlign: 'center', columnAlign: 'center', isResize: true },
        { field: 'custome-adv', title: '操作', width: 150, titleAlign: 'center', columnAlign: 'center', componentName: 'address-sender-operation', isResize: true }
      ],
      reciverColumns: [
        { width: 60, titleAlign: 'center', columnAlign: 'center', type: 'selection' },
        { field: 'code', title: '姓名', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true },
        { field: 'phone', title: '电话', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true },
        { field: 'state', title: '邮编', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true },
        { field: 'address', title: '地址', width: 280, titleAlign: 'center', columnAlign: 'center', isResize: true },
        { field: 'custome-adv', title: '操作', width: 150, titleAlign: 'center', columnAlign: 'center', componentName: 'address-reciver-operation', isResize: true }
      ],

      isAddAddress: false,

      /****添加地址*****/

      //收货地址
      addAddressForm: {
        name: '',
        phone: '',
        region: '1',
        address: '',
        zipcode:'',
        cardNo:'',
        cardForntImage:'',
        cardBackImage:'',
        showForntImage:'',
        showBackImage:''
      },

      //发货地址
      sendAddressForm: {
        name: '',
        phone: '',
        country: '',
        city:'',
        address: '',
        code:'',
        zipcode:'',
        cardNo:'',
        cardForntImage:'',
        cardBackImage:'',
        showForntImage:'',
        showBackImage:''
      },
      //城市联动
      options: [],
      sendeOptions: '',

      //上传地址
      uploadUrl: "",
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      hideShow: false,
      
      
      // 图片上传请求头
      uploadHeader:{Authorization:"Bearer "+localStorage.getItem('account')},

      // 上传样式
      frontStyle:"width:160px;height:100px;display:inline-block;position:relative;cursor:pointer;background-image:url("+require('../../assets/front.png')+");background-size:100% 100%;",
      backStyle:"width:160px;height:100px;display:inline-block;position:relative;margin-left:10px;cursor:pointer;background-image:url("+require('../../assets/back.png')+");background-size:100% 100%;",
      // 地域
      props:{
        value: 'label',
        children: 'children'
      },
      // 级联选择数组
      optionsArry:[],
      // 收货
      getOptionsArry:[],
      // 国家选项
      countryOptions:[],
      // 收件人table信息
      recevieTableData:[],
      // 发件人table信息
      senderTableData:[],
      page:{
        size:1,
        num:5
      },
       // 总条数
      allNum:0,
      tabName:'pendingDisposal',
    }
  },
  methods: {
    //当操作返回后
    restore(){
      this.page = {
        size:1,
        num:5
      }
    },
    // 搜索
    findAddress(){
      this.restore();
      this.getAddress(this.page)
    },
    //tabs切换
    tabsSwitch(tab, event) {
      this.tabName = tab.name;
      this.finRecordsForm.name ='';
      this.finRecordsForm.phone = '';
      this.restore();
      this.getAddress(this.page);
    },

    addSwitch(tab, event) {
      this.addressTabs = tab.name;
    },

    // 页码变动
    handleCurrentChange(val){
        this.page.size = val;
        let page = {
          size:val,
          num:this.page.num
        };
        this.getAddress(page)
    },
    // 删除地址簿信息
    delFromSelect(row,type){
      let thiz = this;
      let sendParams = {id:row.id};
      let url;
      if(type === 'reciver'){
        url = 'address/recevie/delete'
      }
      else{
        url = 'address/sender/delete'
      };
      this.$confirm('确认删除？')
        .then(_ => {
          
          ts.sendRequest(url,{
            data:sendParams,
            success:function(res){
              thiz.restore();
              thiz.getAddress(thiz.page)
            },  
            error:function(ero){

            }
          })
        })
      .catch(_ => {});
    },
    //获取国家信息
    getCountry(){
      let thiz = this;
      ts.sendRequest("common/data", {
        data: {},
        type:'GET',
        success: function(res) {
          thiz.countryOptions = res.data.country
        },
        error: function(err) {
        }
      }) 
    },
    //收货地址添加提交
    addAddressSubmit(formName) {
      let thiz = this;
      let msg;
      let sendParams = {};
      //校验数据
      if (!this.addAddressForm.address) {
        msg = '请填写详细地址'
      }
      let rCardCall = ts.ruleCard(this.addAddressForm.cardNo,'请填写身份证号','身份证号格式不正确');
      if( rCardCall !== 'true'){
        msg = rCardCall
      }
      if(!this.getOptionsArry[2]){
        msg = '请选择地区';
      }
      let rPhoneCall = ts.rulePhone(this.addAddressForm.phone,'请填写电话','电话格式不正确');
      if( rPhoneCall !== 'true'){
        msg = rPhoneCall
      }
      if (!this.addAddressForm.name) {
        msg = '请填写姓名'
      }
      if (msg) {
        this.$message({
          message: msg,
          type: 'error'
        });
        return;
      }
      // 处理级联选择数据
      thiz.options.forEach(function(r,i,k){
        if(r.label === thiz.getOptionsArry[0]){
          sendParams.province = r.value;
          r.children.forEach(function(q,w,e){
            if (q.label ===  thiz.getOptionsArry[1]) {
              sendParams.city = q.value;
              q.children.forEach(function(z,x,c){
                if (z.label === thiz.getOptionsArry[2]) {
                  sendParams.district = z.value
                }
              })
            }
          })
        }
      });

      sendParams.name = thiz.addAddressForm.name;
      sendParams.phone = thiz.addAddressForm.phone;
      sendParams.address = thiz.addAddressForm.address;
      sendParams.zipcode = thiz.addAddressForm.zipcode;
      sendParams.card_no = thiz.addAddressForm.cardNo;
      sendParams.card_image_id =  thiz.addAddressForm.showForntImage;
      sendParams.card_image_id2 =  thiz.addAddressForm.showBackImage;
      ts.sendRequest("address/recevieAdd", {
        data: sendParams,
        success: function(data) {
          // 清空添加数据
          thiz.addAddressForm.name ='';
          thiz.addAddressForm.phone ='';
          thiz.addAddressForm.address ='';
          thiz.getOptionsArry = [];
          thiz.addAddressForm.zipcode ='';
          thiz.addAddressForm.cardNo ='';
          thiz.addAddressForm.cardForntImage ='';
          thiz.addAddressForm.cardBackImage ='';

          thiz.restore();
          thiz.goBack();
          thiz.getAddress(thiz.page);
        },
        error: function(err) {
        }
      })
    },

    //发货地址添加提交
    sendeSubmitForm(formName) {
      let thiz = this;
      let msg;
      let sendParams = {};
      var regChinese = new RegExp("[\\u4E00-\\u9FFF]+","g");
      //校验数据
      if(regChinese.test(this.sendAddressForm.address)){
        msg = "请用英文填写详细地址！"
      } 
      if(!this.sendAddressForm.address){
        msg = '请填写详细地址';
      }
      if(regChinese.test(this.sendAddressForm.city)){
        msg = "请填写英文城市名！"
      } 
      if(!this.sendAddressForm.city){
        msg = '请填写城市';
      }
      if(!this.sendAddressForm.country){
        msg = '请选择国家';
      }

      var regPhone=/^[0-9]+$/
      if(!regPhone.test(this.sendAddressForm.phone)){
         msg = '发件人电话格式不正确'
      }
      if (!this.sendAddressForm.phone) {
        msg = "请填写电话号码";
      }
      if (!this.sendAddressForm.code) {
        msg = "请选择区号";
      }
　　   if(regChinese.test(this.sendAddressForm.name)){
        msg = "请填写英文姓名！"
      }  
      if (!this.sendAddressForm.name) {
        msg = '请填写姓名'
      }

      if (msg) {
        this.$message({
          message: msg,
          type: 'error'
        });
        return;
      }
      sendParams.code = thiz.sendAddressForm.code;
      sendParams.country_id = thiz.sendAddressForm.country;
      sendParams.city = thiz.sendAddressForm.city;
      sendParams.sender = thiz.sendAddressForm.name;
      sendParams.telephone = thiz.sendAddressForm.phone;
      sendParams.zipcode =   thiz.sendAddressForm.zipcode;
      sendParams.address = thiz.sendAddressForm.address;
      sendParams.card_no = thiz.sendAddressForm.cardNo;
      sendParams.card_image_no =  thiz.sendAddressForm.showForntImage;
      sendParams.card_image_no2 =  thiz.sendAddressForm.showBackImage;
      ts.sendRequest("address/senderAdd", {
        data: sendParams,
        success: function(data) {
          // 清空添加数据
          thiz.sendAddressForm.code ='';
          thiz.sendAddressForm.country ='';
          thiz.sendAddressForm.city ='';
          thiz.sendAddressForm.name ='';
          thiz.sendAddressForm.phone ='';
          thiz.sendAddressForm.address ='';
          thiz.sendAddressForm.zipcode ='';
          thiz.sendAddressForm.cardNo ='';
          thiz.sendAddressForm.cardForntImage ='';
          thiz.sendAddressForm.cardBackImage ='';

          thiz.restore();
          thiz.goBack();
          thiz.getAddress(thiz.page);
        },
        error: function(err) {
        }
      })
    },

    // 级联选择change
    handleOptionsChange(item){
      this.optionsArry = this.$refs['cascaderAddr'].currentLabels;
    },

    handleGetOptionsChange(item){
      this.getOptionsArry = this.$refs['getCascaderAddr'].currentLabels;
    }, 
    // 加载市,区
    handleItemChange(val){
      let thiz = this;
      thiz.options.forEach(function(r,i,k){
         //加载市
        if (val.length == 1) {
          if (r.label === val[0]) {
            let url = 'address/data/'+JSON.parse(r.value);
            ts.sendRequest(url,{
              type:'GET',
              data:{},
              success:function(res){
                let arr = [];
                // 整理市级信息
                res.data.forEach(function(row,index,key){
                  let plt = {};
                  plt.label = row.region_name;
                  plt.value = row.id;
                  plt.children = [];
                  arr.push(plt);
                });
                r.children = arr;
              },
              error:function(err){

              }
            })
            return false;
          }
        }
        else{
          // 加载区
          let ary = [];
          r.children.forEach(function(q,w,e){
            if (q.label === val[1]) {
              let url = 'address/data/'+JSON.parse(q.value);
              ts.sendRequest(url,{
                type:'GET',
                data:{},
                success:function(res){
                  let ary = [];
                  // 整理市级信息
                  res.data.forEach(function(q,w,e){
                    let plt = {};
                    plt.label = q.region_name;
                    plt.value = q.id;
                    ary.push(plt);
                  });
                  q.children = ary;
                },
                error:function(err){

                }
              })
              return false;
            }
          });
        }
      })
    },

    //先加载省
    getArea(){
      let thiz = this;
      ts.sendRequest("address/data/0",{
        type:'GET',
        data:{},
        success:function(res){
          res.data.forEach(function(r,i,k){
            let plt = {};
            plt.label = r.region_name;
            plt.value = r.id;
            plt.children = [];
            thiz.options.push(plt);
          })
        },
        error:function(err){

        }
      })
    },
    //收发件人地址
    getAddress(params){
      let thiz = this;
      let  sendUrl;
      let sendParams = {
        name: this.finRecordsForm.name,
        phone:this.finRecordsForm.phone
      };
      this.recevieTableData = [];
      this.senderTableData = [];

      if (this.tabName == 'pendingDisposal') {
        sendUrl = "address/recevie"+'?'+'page='+params.size+'&num='+params.num;
      }
      else{
        sendUrl = "address/sender"+'?'+'page='+params.size+'&num='+params.num;
      }
      ts.sendRequest(sendUrl,{
        data:sendParams,
        success:function(res){
          thiz.allNum = res.count;
          if (thiz.tabName == 'pendingDisposal') {
            thiz.recevieTableData = res.data;
          }
          else{
            thiz.senderTableData = res.data
          }
        },
        error:function(err){

        }
      });
    },

    //表格行选中事件
    selectChange(selection, rowData) {
    },


    //添加按钮跳转到添加地址页面
    addAddress() {
      if (this.tabName == 'pendingDisposal') {
        this.addressTabs = 'putAddress'
      }
      else{
        this.addressTabs = 'senderAddress'
      }


      this.isAddAddress = true;
      this.$store.dispatch("editMenuListAction", "添加地址");
      this.$store.dispatch("addAddressAction", true);
    },


    //返回地址簿
    goBack() {

      if (this.addressTabs == 'putAddress') {
        this.tabName = 'pendingDisposal'
      }
      else{
        this.tabName = 'aaa'
      }
      this.isAddAddress = false;
      this.$store.dispatch("editMenuListAction", "返回")
      this.$store.dispatch("addAddressAction", false)
    },

      //图片上传成功回调
    handleAvatarSuccess(response, file, fileList) {
    },  

    //上传按钮的提交
    handleConfirm() {
      this.$refs.upload.submit();
    },

    // 上传图片失败
    errorUpload(err,file,fileList){
      this.$notify.error({
        title: '失败',
        message: err.msg
      })  
    },
    // ------发货地址-------------
    // 正面图片成功
    senderFrontSuccess(response, file, fileList){
      this.$notify.success({
        title: '成功',
        message: response.msg
      });
      this.sendAddressForm.cardForntImage = config.fileURL+response.data;
      this.sendAddressForm.showForntImage = response.data;
      
    },
    // 背面图片上传
    senderBackSuccess(response, file, fileList){
      this.$notify.success({
        title: '成功',
        message: response.msg
      });
      this.sendAddressForm.cardBackImage = config.fileURL+response.data;
      this.sendAddressForm.showBackImage = response.data;
    },

    // -------收货地址---------
     receiveFrontSuccess(response, file, fileList){
      this.$notify.success({
        title: '成功',
        message: response.msg
      });
      this.addAddressForm.cardForntImage = config.fileURL+response.data;
      this.addAddressForm.showForntImage = response.data;
    },
    // 背面图片上传
    receiveBackSuccess(response, file, fileList){
      this.$notify.success({
        title: '成功',
        message: response.msg
      });
      this.addAddressForm.cardBackImage = config.fileURL+response.data; 
      this.addAddressForm.showBackImage = response.data;
    },
  },
  mounted: function() {
    this.uploadUrl = config.uploadURL;
    this.getAddress(this.page);
    this.getArea();
    this.getCountry();
  }
}

</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>
