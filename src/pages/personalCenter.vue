<template>
  <div class="button-radius" style="width:1200px;">
    <el-container style='margin-top:20px;'>
      <el-aside width="200px" style="background:rgba(255,255,255,1);box-shadow:0px 0px 4px 0px rgba(24,124,232,0.24);">
        <el-menu
        default-active="1"
        :unique-opened="true"
        :default-openeds="openeds"
        class="el-menu-vertical-demo">
        <template v-for="(item,index) in routerList">
          <el-submenu :index="index+''">
            <template slot="title">
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <template v-for="pro in item.detailList">
                <el-menu-item @click="toPage(pro.name,item.title,pro.title,pro.index)" :class="{active:pro.index == nowIndex}">{{pro.title}}</el-menu-item>
              </template>
            </el-menu-item-group>
          </el-submenu>
        </template>
      </el-menu>
    </el-aside>
    <el-main style='padding-bottom:0;'>
      <div>
        <div style="padding:0 0 20px 0px">

          <el-breadcrumb separator-class="el-icon-arrow-right">
            <img class="fl" src="../assets/personalCenter/zhuye@2x.png" alt="">
            <template v-for="item in this.$store.state.menuList">
              <el-breadcrumb-item >{{item}}</el-breadcrumb-item>
            </template>
          </el-breadcrumb>
        </div>
        <!-- <transition name="fade"> -->
          <router-view></router-view>
        <!-- </transition> -->
      </div>
    </el-main>
  </el-container>

</div>
</template>

<script>

import Tools from '../lib/Tools';
import config from "../config.js";

let ts = Tools.getInstance();

export default {
  name: 'personalCenter',
  props:["isKeepAlive"],
  data () {
    return {
      openeds: ['0'],
      uniqueOpened: false,
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      nowIndex:0,
      menuList:["物流管理","物流记录"],

      routerList:[
      {
        title:'物流管理',
        detailList:[
        {
          title:'物流记录',
          name:'logisticsRecord',
          index:0
        },
        {
          title:'面单打印',
          name:'sheetManagement',
          index:1
        },
        {
          title:'物品申报',
          name:'goodsDeclaration',
          index:2
        },
        ]
      },
      {
        title:'售后管理',
        detailList:[
        {
          title:'问题工单',
          name:'problemSheet',
          index:3
        }
        ]
      },
      {
        title:'财务管理',
        detailList:[
        {
          title:'账户余额',
          name:'accBalance',
          index:5
        },
        {
          title:'财务记录',
          name:'finRecords',
          index:6
        },
        {
          title:'支付订单',
          name:'paymentOrder',
          index:7
        }
        ]
      },
      {
        title:'系统信息',
        detailList:[
        {
          title:'个人设置',
          name:'perSettings',
          index:8
        },
        {
          title:'地址簿',
          name:'addressBook',
          index:9
        }
        ]
      },
      {
        title:'文件',
        detailList:[
        {
          title:'文件上传',
          name:'fileUpload',
          index:11
        },
        ]
      }
      ],

      editableTabsValue2: '2',
      editableTabs2: [{
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      }, {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content'
      }],
      tabIndex: 2,
      rules: {
        name: [
        { required: true, message: '请输入活动名称', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
        { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
        { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
        { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    goBack(){
      this.$store.dispatch('moveAllRoute');
      this.$router.replace({name:config.defaultRoute,params:{}});
      //replace替换原路由，作用是避免回退死循环
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    toPage(router,firstTitle,secondTitle,key){
      let ids = [];
      // this.$store.commit("clearMenuList",ids);
      this.routerList.forEach(function(row,index,ke){
        row.detailList.forEach(function(r,i,ky){
          if (router == r.name) {
            ids.push(JSON.stringify(index))
          }
        })
      });
      let obj = {
        name:router,
        first:firstTitle,
        second:secondTitle,
        key:key,
        id:ids
      };
      ts.save("centerStatus",obj);
      this.nowIndex = key;
      this.$router.push({name:router});
      let objTitle = [];
      objTitle.push(firstTitle)
      objTitle.push(secondTitle);
      // if(secondTitle === "物品申报"){
      //   if(this.$store.state.subDeclaration){
      //     objTitle.push("提交申报");
      //     // this.$store.commit("subDeclaration",false)
      //   }
      // }

      // if(secondTitle === "问题工单"){
      //   if(this.$store.state.subWorkOrder){
      //     objTitle.push("提交工单")
      //     // this.$store.commit("subWorkOrder",false)
      //   }
      // }

      // if(secondTitle === "地址簿"){
      //   if(this.$store.state.addAddress){
      //     objTitle.push("添加地址")
      //     // this.$store.commit("addAddress",false)
      //   }
      // }
      this.$store.dispatch("editMenuListAction",objTitle)
    },
    pushMenu(val){
      console.log(val)
      
      // this.menuList.push(val)
    }
  },
  mounted:function(){
      
    if (localStorage.getItem('centerStatus')) {

      let params = JSON.parse(localStorage.getItem('centerStatus')); 
      let objTitle = [];
      this.nowIndex = params.key;
      this.openeds = params.id;
      this.$router.push({name:params.name});
      objTitle.push(params.first);
      objTitle.push(params.second);
      this.$store.dispatch("editMenuListAction",objTitle);
    }
    if(this.$route.params.type === "lookLogisics"){
      this.nowIndex = 0;
      this.openeds = ['0'];
      this.menuList.push("物流详情");
      this.$store.dispatch("editMenuListAction",this.menuList)
    }
    if (this.$route.params.type === "lookOrder") {
      this.nowIndex = 7;
      this.openeds = ['2'];
      this.$router.push({name:'paymentOrder'});
      let objTitle = ['财务管理','支付订单'];
      this.$store.dispatch("editMenuListAction",objTitle)
    }
    if (this.$route.params.type === "lookZc") {
      this.nowIndex = 5;
      this.openeds = ['2'];
      this.$router.push({name:'accBalance'});
      let objTitle = ['财务管理','支付订单'];
      this.$store.dispatch("editMenuListAction",objTitle)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "@/css/public.scss";
    .el-breadcrumb__item{
          margin: 4px 0 0 10px;
    }
</style>
