<!--
 * @name helpCenter.vue
 * @author 王刚
 * @date 2019.4.18
 * @desc 帮助中心
-->
<template>
  <div>
    <div class="xyj-edit-form" style="padding-right:20px;">
      <el-form  :inline="true" :model="helpCenterForm" ref="ruleForm" label-width="80px">
        <el-row :gutter="20">
            <el-col :span="12" :offset="4">
              <el-form-item label="输入问题:" prop="receiptName" style="margin-bottom:0px;">
              <el-input v-model="helpCenterForm.problem" placeholder="请输入关键词"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="4" class="btn-middle" style="padding-top:5px">
              <el-button icon="el-icon-search" @click="submitForm('helpCenterForm')" round>搜索</el-button>
            </el-col>
          </el-row>

      </el-form>
    </div>
    <div>
    	<div class="help-content" v-for="(item,index) in helpContent" :class="{mar0:index %2 !==0}">
    		<div class="help-title">
    				<span>{{item.title}}</span>
    				<a :href="item.a_url" class="fr"><i class="el-icon-more"></i></a>
    		</div>
    		<div class="help-img-cont clearfix" style="padding:10px">
    			<el-aside style="width:150px;height:150px;"><img :src="item.img_url" alt="" /></el-aside>
    			<el-main>
    				<div style="margin-bottom:10px;" v-for="pro in item.content">
    					<a style="color:#333;" :href="pro.url">{{pro.name}}</a>
    				</div>
    			</el-main>
    		</div>
    	</div>
    </div>
  </div>
</template>

<script>

import Tools from '@/lib/Tools';
import config from "@/config.js";

let ts = Tools.getInstance();

export default {
  name: 'helpCenter',
  data () {
    return {
      helpCenterForm:{
      	problem:''
      },
      helpContent:[
      	{
      		title:"使用帮助",
      		a_url:"",
      		img_url:require("../../assets/personalCenter/use_help@2x.png"),
      		content:[
      			{
              name:'1.如何注册XX会员？',
              url:''
            },{
              name:'2.如何下单？',
              url:''
            },{
              name:'3.如何查询订单？',
              url:''
            },
            {
              name:'4.如何注册XX会员？',
              url:''
            },{
              name:'5.如何下单？',
              url:''
            }
      		]
      	},
      	{
      		title:"售后帮助",
      		a_url:"",
      		img_url:require("../../assets/personalCenter/later_help@2x.png"),
      		content:[
      			{
              name:'1.如何注册XX会员？',
              url:''
            },{
              name:'2.如何下单？',
              url:''
            },{
              name:'3.如何查询订单？',
              url:''
            },
            {
              name:'4.如何注册XX会员？',
              url:''
            },{
              name:'5.如何下单？',
              url:''
            }
      		]
      	},
      	{
      		title:"使用帮助",
      		a_url:"",
      		img_url:require("../../assets/personalCenter/use_help@2x.png"),
      		content:[
      			{
              name:'1.如何注册XX会员？',
              url:''
            },{
              name:'2.如何下单？',
              url:''
            },{
              name:'3.如何查询订单？',
              url:''
            },
            {
              name:'4.如何注册XX会员？',
              url:''
            },{
              name:'5.如何下单？',
              url:''
            }
      		]
      	},
      	{
      		title:"售后帮助",
      		a_url:"",
      		img_url:require("../../assets/personalCenter/later_help@2x.png"),
      		content:[
      			{
      				name:'1.如何注册XX会员？',
      				url:''
      			},{
      				name:'2.如何下单？',
      				url:''
      			},{
      				name:'3.如何查询订单？',
      				url:''
      			},
            {
              name:'4.如何注册XX会员？',
              url:''
            },{
              name:'5.如何下单？',
              url:''
            }
      		]
      	}
      ]
    }
  },
  methods:{
    submitForm () {

    },
    getHelp(){
      ts.sendRequest('help',{
        data:{},
        type:'GET',
        success:function(res){
          console.log('数据',JSON.stringify(res));
        },
        error:function(err){

        }
      })
    },
  },
  mounted:function(){
    this.getHelp()
  }
}
</script>

<style scoped>
  .help-content{
    width:48%;
    float:left;
    margin:15px 2% 15px 0;
    border:1px solid #eee;
  }
  .help-content.mar0{
    margin-right:0;
  }
  .help-content .help-title{
    width: 100%;
    line-height: 30px;
    border-bottom: 1px solid #eee;
    font-size: 16px;
    margin-bottom: 13px;
    font-size: 16px;
    font-weight:bold;
    color: #333333;
    padding:5px 15px;
  }
  .help-content .el-aside{
    height:150px;
    float:left;
  }
  .help-content .el-aside img{
    width:100%;
    height:100%;
  }
  .help-content .el-main{
    padding-top:0;
    padding-bottom:0;
  }
</style>
