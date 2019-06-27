<template>
	<div style="width:1200px;margin:0px auto">
		<div>
			<el-card class="box-card" style="width:1200px;margin:20px auto">
				<el-form :model="conditionFrom" ref="subDecForm">
		            <el-row>
			            <el-col :span="6" :offset="2">
			                <el-form-item label="收货仓库:">
			                  <el-select v-model="conditionFrom.stores" class="width-paved" placeholder="请选择收货仓库">
			                    <el-option v-for="(item, index) in storesList" :label="item.store_name" :value="item.id"></el-option>
			                  </el-select>
			                </el-form-item>
			            </el-col>
			            <el-col :span="6" :offset="2">
			                <el-form-item label="清关方式:">
			                  <el-select v-model="conditionFrom.customsType" class="width-paved" placeholder="请选择清关方式">
			                    <el-option v-for="(item, index) in customsTypeList" :label="item.name" :value="item.id"></el-option>
			                  </el-select>
			                </el-form-item>
			            </el-col>
			            <el-col :span="6">
			                <el-form-item label="物流线路:">
			                  <el-select v-model="conditionFrom.logisticsLine" class="width-paved" placeholder="请选择物流线路">
			                    <el-option v-for="(item, index) in logisticsLineList" :label="item.name" :value="item.id"></el-option>
			                  </el-select>
			                </el-form-item>
			            </el-col>
		            </el-row>
		        </el-form>
		    </el-card>    
	    </div>
	    <el-card class="box-card" style="width:1200px;margin:20px auto">    
	        <el-row>
	         	<el-col :span="18">
	         		<div v-if="selectedGoods.length == 0" style="display:flex;flex-direction:row;margin-top:20px">
	                	<label>内件商品</label>
	            		<div style="width:60%;margin-right:2%" @click="chooseGoods">
	                		<el-input disabled placeholder="点击选择商品"></el-input>
	            		</div>
	        			<el-input-number style="width:15%;margin-right:3%" v-model="num" :min="1" label="描述文字"></el-input-number>
	        			<div style="height:30px;width:30px;background-color:red"></div>	
	            	</div>
	 			    <div v-if="selectedGoods.length != 0" v-for="(item,index) in selectedGoods" style="display:flex;flex-direction:row;margin-top:20px">
	                	<label>内件商品</label>
	            		<div style="width:60%;margin-right:2%" @click="chooseGoods">
	                		<el-input disabled v-model="item.name" placeholder="点击选择商品"></el-input>
	            		</div>
	        			<el-input-number style="width:15%;margin-right:3%" v-model="item.num" :min="1" @change="handleChange(item)" label="描述文字"></el-input-number>
	        			<div @click="delFromSelect(item)" style="height:30px;width:30px;background-color:red"></div>
	            	</div>
	         	</el-col>
	         	<el-col :span="6">
	         		<div>货物重量：</div>
	         		<div>税费：</div>
	         		<div>合计费用：</div>
	         	</el-col>
	        </el-row>
	    </el-card>    
        <!--  选择商品dialog -->
        <el-dialog
	    title="选择商品"
	    class="dialog-content"
	    :visible.sync="chooseDialog"
	    width="60%"
	    >
          	<div style="border:1px solid #D5D5D5;padding:40px 50px;margin-top:15px;">
	            <div class="xyj-edit-form label-120" style="margin-bottom:0px;">
	              <el-form :model="goodsInformation" label-width="120px">
	                <el-row>
	                  <el-col :span="8">
	                    <el-form-item label="商品类别:" prop="userName">
	                      <el-select v-model="goodsInformation.selectTypeId" class="width-paved" placeholder="请选择商品类别">
	                        <el-option value="">请选择商品类别</el-option>
	                        <el-option v-for="(item, index) in goodsCates" :label="item.name" :value="item.id"></el-option>
	                      </el-select>
	                    </el-form-item>
	                  </el-col>
	                  <el-col :span="8" :offset="2">
	                    <el-form-item label="商品关键词:" prop="userIphone">
	                      <el-input v-model="goodsInformation.keyword" placeholder="商品关键词"></el-input>
	                    </el-form-item>
	                  </el-col>
	                  <el-col :span="4" :offset="1" class="btn-middle" style=" padding-top: 5px;">
	                    <el-button icon="el-icon-search" round @click="searchGoods(page)">搜索</el-button>
	                  </el-col>
	                </el-row>
	              </el-form>
	            </div>

            <!-- 短横线 -->
            	<div style="width:calc(100% - 200px);margin-left:100px;height:1px;background-color:#D5D5D5;margin-top:40px;" v-if="goodsList&&goodsList.length>0"></div>

            <!-- 商品表格 -->
	            <div style="margin-top:40px;" v-if="goodsList&&goodsList.length>0">
		            <el-table :data="goodsList" style="width: 100%" @selection-change="handleSelectionChange">
		            	 <el-table-column type="selection" width="55"></el-table-column>
		                <el-table-column prop="name" label="商品标题" width="280">
		                </el-table-column>
		                <el-table-column prop="channels_name" label="线路" width="180">
		                </el-table-column>
		                <el-table-column prop="specification_type" label="规格" width="180">
		                </el-table-column>
		                <el-table-column prop="content" label="简介">
		                </el-table-column>
		            </el-table>
	              	<el-pagination
					  	small
					  	layout="prev, pager, next"
					   	@current-change="handleCurrentChange"
					   	:page-size="page.num"
					   	:total="allNum">
					</el-pagination>
	            </div>
         	</div>
         	 <!-- 没有商品 -->
            <div style="border:1px solid #D5D5D5;padding:20px 20px;margin-top:15px;" v-if="!(goodsList&&goodsList.length>0)">
              <div class="no-more" style="padding-bottom:10px;text-align:center;">
                <img @click="toPageCenter" src="../../assets/no_data.png" style="width:180px;height:180px;background-color:white;">
                <!-- <p style="margin-top:30px;">没有找到商品，正在进行申报</p> -->
                <p style="margin-top:30px;">没有找到商品</p>

                <div>
                  <el-button type="primary" size="small" round @click="applyGoods">申报</el-button>
                </div>

              </div>
            </div>
		    <span slot="footer" class="dialog-footer">
		      <el-button @click="doneChoose">确定</el-button>
		      <el-button type="primary" @click="chooseDialog = false">取消</el-button>
		    </span>
	  	</el-dialog> 
	</div>
</template>
<script>
  //import NProgress from 'nprogress'
  import config from "../../config.js";
  import Tools from "../../lib/Tools.js";

  let ts = Tools.getInstance();

  export default {
    name:'newOrder',
    data() {
      return {
      	// -----------海关线路
      	conditionFrom:{
      		stores:'',
      		customsType:'',
      		logisticsLine:''
      	},
      	// -----------关于select
      	storesList:[],
      	customsTypeList:[],
      	logisticsLineList:[],
      	goodsCates:[],
      	
      	// -----------关于商品
      	// 分页
      	page:{
      		size:1,
      		num:5,
      	},
      	// 总条数
      	allNum:0,
      	// 查询
      	goodsInformation:{
      		selectTypeId:'',
      		keyword:'',
      	},
      	goodsList:[],
      	// 已选入
      	selectedGoods:[],
      	//table上选择 
      	tableGoods:[], 

      	// dialog
      	chooseDialog:false,
      	num:1,
      	// goodsLength:[{name:'真的'},{name:'假的'},{name:' 真假'}],
      };
    },
    methods: {
    	handleChange(item) {

      	},
    	//---选择商品页面---
      	chooseGoods(){
      		if (!this.conditionFrom.logisticsLine) {
      			this.$message({
      				message:'请选择物流线路',
      				type:'error'
      			});
      			return;
      		}
      		this.searchGoods(this.page);
      		this.chooseDialog = true
      	},
      	// 获取物流线路
      	getList(){
	        let thiz = this;
	        // 获取物流线路
	        ts.sendRequest("common/channels",{
	          	type:"POST",
	          	data:{},
	          	success:function(ret){
		            thiz.logisticsLineList = ret.data;
		         	},
	          	error:function(err){
		            thiz.$message({
		              message: "数据加载失败",
		              type: 'error'
		            });
	          	}
	        });
	        // 获取公有数据
	        ts.sendRequest("common/data",{
		        type:"GET",
		        data:{},
		        success:function(ret){
		        	thiz.customsTypeList = [{id:10,name:'BC'}];
		        	thiz.goodsCates = ret.data.goods_type
		        },
		        error:function(err){
		        }
		    });
		    // 获取仓库
		    ts.sendRequest("common/sotre",{
		        type:"GET",
		        data:{},
		        success:function(ret){
		          	thiz.storesList = ret.data;
		        },
		        error:function(err){
		        }
	      	});
      	},
      	// 	dialog确认
      	doneChoose(){
      		this.tableGoods.forEach(function(r,i,k){
      			r.num = 1;
      		})
      		this.selectedGoods = this.tableGoods;
      		this.chooseDialog = false
      	},
      	//  dialog添加商品
      	handleSelectionChange(val){
      		this.tableGoods = val;
      	},
      	// 添加商品到已选
		addToSelect(item){
			let thiz = this;
			  // 判断商品的线路是否和已选的一致
			if(thiz.selectedGoods.length>0&&item.aborad_channels_id!=thiz.selectedGoods[0].aborad_channels_id){
			    thiz.$message({
			      	message: "只能加入线路相同的商品",
			      	type: 'error'
			    });
				return;
			}
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
			console.log('已选择商品',JSON.stringify(thiz.selectedGoods))
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
			console.log('已选择商品',JSON.stringify(thiz.selectedGoods))
		},
		// 跳转个人中心
	    toPageCenter(){
	      	this.$router.push('/perCenter');
	    },
	    // 跳转到个人中心的申报页面
	    applyGoods:function(){
      		this.$router.push('/perCenter/goodsDeclaration');
    	},
      	// 搜索商品
	    searchGoods(page){
	      	let thiz = this;
	      	let url = "goods/clear/goodsData"+'?'+'page='+page.size+'&num='+page.num; 
	      	ts.sendRequest(url,{
		        type:"POST",
		        data:{
		          	keywords:thiz.goodsInformation.keyword, 
		          	goods_type:thiz.goodsInformation.selectTypeId,
		          	clearance_method:thiz.conditionFrom.logisticsLine
		        },
		        success:function(ret){
			        if(ret&&ret.success){
			        	thiz.allNum = ret.count;
			            // 处理数据，判断商品是否已加入临时已选商品信息
			            for(let i=0;i<ret.data.length;i++){
			              ret.data[i].selected = false;
			            }
			            thiz.goodsList = ret.data;
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
	    },
	    // 页码变动
	    handleCurrentChange(val){
	    	this.page.size = val;
	    	let page = {
	    		size:val,
	    		num:this.page.num
	    	}
	    	this.searchGoods(page)
	    },
    },
    mounted:function(){
    	this.getList();
    }
  }

</script>

<style>

</style>