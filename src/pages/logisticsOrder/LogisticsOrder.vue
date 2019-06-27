<!--
  @name  LogisticsOrder.vue
  @author lilei
  @date 2019.04.18
  @desc 物流下单页面
-->
<template>
  <div style="padding-bottom:100px;width:1200px;">
    <!-- 顶部步骤 -->
    <div style="margin-top:50px;padding-left:0px;text-align:center">

      <div class="step-item" :style="stepTag==1?bgBlue:bgGreen">
        <div class="step-title" :style="stepTag==0?bgBlue:null">选择货物商品信息</div>
        <div class="step-tria" :style="stepTag==0?bgBlue:null"></div>
        <div class="step-tria-blank"></div>
        <div style="clear:both;"></div>
      </div>
      <div class="step-item" :style="'left:-4px;'+(stepTag==2?bgBlue:bgGreen)">
        <div class="step-title" :style="stepTag==1?bgBlue:null">选择收件人/发件人</div>
        <div class="step-tria" :style="stepTag==1?bgBlue:null"></div>
        <div class="step-tria-blank"></div>
        <div style="clear:both;"></div>
      </div>
      <div class="step-item" :style="'left:-8px;'+(stepTag==3?bgBlue:bgGreen)">
        <div class="step-title" :style="stepTag==2?bgBlue:null">选择增值服务</div>
        <div class="step-tria" :style="stepTag==2?bgBlue:null"></div>
        <div class="step-tria-blank"></div>
        <div style="clear:both;"></div>
      </div>
      <div class="step-item" :style="'left:-12px;'+(stepTag==4?bgBlue:bgGreen)">
        <div class="step-title" :style="stepTag==3?bgBlue:null">确认订单</div>
        <div class="step-tria" :style="stepTag==3?bgBlue:null"></div>
        <div class="step-tria-blank"></div>
        <div style="clear:both;"></div>
      </div>
      <div class="step-item" :style="'left:-16px;'+(stepTag==4?bgBlue:null)">
        <div class="step-title" :style="stepTag==4?bgBlue:null">支付订单</div>
        <div class="step-tria" :style="stepTag==4?bgBlue:null"></div>
        <div class="step-tria-blank" :style="bgTrans"></div>
        <div style="clear:both;"></div>
      </div>
    </div>
    <!-- 选择线路/规格 -->
    <div v-if="stepTag==90">
      <div style="margin-bottom:20px;margin-top:30px;">
        <label style="width:4px;height:18px;background-color:#7D7D7D;vertical-align:middle;margin-top:2px;"></label>
        <label style="margin-left:10px;margin-top:15px;color:#545454;line-height:20px;">选择线路/规格</label>
      </div>
      <!-- 表单 -->
      <div class="bt-box" style="margin:0 auto;padding-bottom:20px;">
        <div style="display:flex;flex-direction:row;padding:20px;">
          <el-form :inline="true" :model="formInline" class="demo-form-inline input-width-120 bt_input_sty" style="padding:20px;padding-bottom:0">
            <el-form-item>
              <div class="bt_cross">
                <div class="ct-span-sty-front">从</div>
                <el-select v-model="formInline.fromregion" placeholder="国家">
                  <el-option v-for="(item, index) in countries" :label="item.name" :value="item.str"></el-option>
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

          </el-form>
        </div>
        <div style="padding:0px 20px;margin-top:10px;">
          <img src="../../assets/tixing.png" style="width:14px;height:14px;background-color:white;">
          <label style="top:1px;position:relative;margin-left:6px;">清关方式：</label>

          <span v-for="(item,key,index) in clears" style="margin-right:20px;" @click="chooseSc($event,index,key)" v-if="item=='BC'">
            <img :src="scRadio(index)" style="width:18px;height:18px;background-color:white;margin-right:5px;">
            <span>{{clears[key]}}</span>
          </span>

        </div>
        <div style="margin-top:30px;text-align:right;padding-right:40px;">
          <button @click="toTagOne" style="margin-left:20px;background:rgba(24,124,232,1);border:1px solid rgba(24, 124, 232, 1);border-radius:15px;padding:0px 20px;color:white;height:30px;">提交</button>
        </div>
      </div>
    </div>

    <!-- 选择货物商品信息（页面1）-->
    <div v-if="stepTag==0&&!isChoose">
      <div>
        <el-card class="box-card" style="margin:20px auto">
          <el-form :model="conditionFrom" ref="subDecForm">
            <el-row>
              <el-col :span="7">
                <el-form-item label="仓库:" required>
                  <el-select v-model="conditionFrom.stores" class="width-paved" placeholder="请选择仓库">
                    <el-option v-for="(item, index) in storesList" :label="item.store_name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-form-item label="清关方式:" required>
                  <el-select v-model="conditionFrom.customsType" @change="typeChange" class="width-paved" placeholder="请选择清关方式">
                    <el-option v-for="(item, index) in customsTypeList" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-form-item label="物流线路:" required>
                  <el-select v-model="conditionFrom.logisticsLine"  @change="logisticsLineChange" class="width-paved" placeholder="请选择物流线路">
                    <el-option v-for="(item, index) in logisticsLineList" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>    
      </div>
      <el-card class="box-card" style="width:1200px;margin:20px auto">
        <el-button class="pull-right btn" style="background-color: rgba(51,153,255,1);color: #fff;" @click="chooseGoods">添加商品</el-button>    
        <el-table :data="selectedGoods" style="width: 100%">
          <el-table-column width="400" prop="name" label="商品名称">
          </el-table-column>
          <el-table-column  prop="record_number" label="数量">
           <template slot-scope="scope">
            <div>
              <div style="float: left;padding: 8px 12px;border-radius: 4px 0 0 4px;border: 1px solid #dcdfe6;background-color: rgb(51, 153, 255);cursor: pointer;color: #fff;" @click="reduceNum(scope)"><i class="el-icon-minus"></i></div>
              <input class="scopeNum el-input__inner" style="color: #000;font-size: 16px;text-align: center;" @input="eidtNum($event,scope)" @keyup.enter="eidtNum($event,scope)" type="text" :id='"numValue"+scope.$index' :value='scope.row.num' label="描述文字"></input>
              <div style="float: left;padding: 8px 12px;border-radius: 0 4px 4px 0;border: 1px solid #dcdfe6;background-color: rgb(51, 153, 255);cursor: pointer;color: #fff;" @click="addNum(scope)"><i class="el-icon-plus"></i></div>
            </div>
          </template>
        </el-table-column>
        <el-table-column  prop="specification_type" width="150" label="操作">
         <template slot-scope="scope">
          <div @click="delFromSelect(scope.row)" style="display:inline-block;cursor:pointer;">
            <img src="../../assets/delete.png" style="width:14px;height:14px;margin-right:3px;background-color:white;cursor:pointer;">
          </div>
        </template>
      </el-table-column>
              </el-table>
              
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
              <el-col :span="4" :offset="1">
                <el-button type="primary" icon="el-icon-search" @click="searchGoods(page)">搜索</el-button>
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
    <el-button type="primary" @click="doneChoose">确定</el-button>
    <el-button @click="chooseDialog = false">取消</el-button>
  </span>
</el-dialog>
<el-button  class="pull-right btn" style="background-color: rgba(51,153,255,1);color: #fff;" @click="goodsToArdess">下一步</el-button>
</div>

<!-- 选择货物商品信息（页面2） -->
<div v-if="isChoose">
  <div style="margin-top:50px;">
    <!-- 返回按钮 -->
    <div @click="hideChoose" style="height:32px;width:126px;text-align:center;border-radius:15px;border:1px solid #187CE8;color:#187CE8;cursor:pointer;">
      <img src="" class="arrow-left">
      <label style="margin-left:-10px;line-height:30px;cursor:pointer;">返回上一步</label>
    </div>
    <!-- 表单 -->
    <div style="border:1px solid #D5D5D5;padding:0px 20px;margin-top:10px;">
      <div style="padding:15px 0px;border-bottom:1px solid #C2C2C2;">
        <span>
          <img src="../../assets/path.png" style="width:20px;height:20px;background-color:white;margin-right:10px;">
          <label style="font-size:19px;color:#545454;top:3px;position:relative;">线路/规划</label>
        </span>
        <span style="font-size:18px;font-weight:bold;float:right;top:3px;position:relative;">
          预计：<span style="color:#FF0000;font-size:19px;sition:relative;">￥{{finalLogisticPath?finalLogisticPath.sumPrice.toFixed(2):0.00}}</span>
        </span>
      </div>
      <div style="margin-top:20px;padding:0px 20px;">
            <span style="font-weight:bold;display:inline-block;">物流线路：</span><!-- 
          --><div style="display:inline-block;">

            <div style="height:30px;line-height:30px;width:100px;background-color:#187CE8;color:white;text-align:center;
            position:relative;display:inline-block;z-index:100;">
            <div style="position:absolute;width:22px;height:22px;transform:rotate(45deg);background-color:transparent;left:-11px;top:4px;">

            </div>
            <label>{{finalLogisticPath?finalLogisticPath.name.split("-")[0]:""}}</label>
            <div style="position:absolute;width:22px;height:22px;transform:rotate(45deg);background-color:#187CE8;right:-11px;top:4px;">

            </div>
              </div><!-- 
                
              --><div style="height:30px;line-height:30px;width:100px;background-color:#E4E4E4;color:#545454;text-align:center;
              position:relative;display:inline-block;z-index:99;right:-3px;">
              <div style="position:absolute;width:22px;height:22px;transform:rotate(45deg);background-color:white;left:-11px;top:4px;">

              </div>
              <label>{{finalLogisticPath?finalLogisticPath.clear_port_name:""}}关口</label>
              <div style="position:absolute;width:22px;height:22px;transform:rotate(45deg);background-color:#E4E4E4;right:-11px;top:4px;">

              </div>
              </div><!-- 
                
              --><div style="height:30px;line-height:30px;width:100px;background-color:#187CE8;color:white;text-align:center;
              position:relative;display:inline-block;z-index:98;right:-6px;">
              <div style="position:absolute;width:22px;height:22px;transform:rotate(45deg);background-color:white;left:-11px;top:4px;">

              </div>
              <label>{{finalLogisticPath?finalLogisticPath.name.split("-")[1]:""}}</label>
              <div style="position:absolute;width:22px;height:22px;transform:rotate(45deg);background-color:transparent;right:-11px;top:4px;">

              </div>
            </div>

          </div>
        </div>
        <div style="margin-top:20px;padding:0px 20px;padding-bottom:30px;">
          <span style="display:inline-block;width:50%;">
            <span style="font-weight:bold;">货物规格：</span>
            <span>长{{formInline.length}}CM，宽{{formInline.width}}CM，高{{formInline.height}}CM</span>
          </span>
          <span style="display:inline-block;">
            <span style="font-weight:bold;">货物重量：</span>
            <span>{{formInline.weight}}KG</span>
          </span>
        </div>
      </div>

      <!-- 暂时不要 -->
      <div style="margin-top:15px;display:none;">
        <div class="xyj-edit-form label-120">
          <el-form :model="subDecForm" ref="subDecForm" label-width="120px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="商品类别:" prop="userName">
                  <el-select v-model="goodsInfoForm.goodsCate" class="width-paved" placeholder="请选择商品类别">
                    <el-option v-for="(item, index) in goodsCates" :label="item.name" :value="item.str"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="2">
                <el-form-item label="选择海关:" prop="userEmail">
                  <el-select v-model="subDecForm.goodsClassfication" class="width-paved" placeholder="请选择选择海关">
                    <el-option label="德国" value="shanghai"></el-option>
                    <el-option label="美国" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="商品关键词:" prop="userIphone">
                  <el-input v-model="subDecForm.userIphone" placeholder="商品关键词"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4" :offset="1" class="btn-middle" style=" padding-top: 5px;">
                <el-button icon="el-icon-search" round>搜索</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>

      <!-- 列表,暂时不要 -->
      <div style="border:1px solid #D5D5D5;padding:20px 20px;margin-top:15px;display:none;">
        <div class="no-more" style="padding-bottom:10px;text-align:center;">
          <img src="../../assets/no_data.png" style="width:180px;height:180px;background-color:white;">
          <p style="margin-top:30px;">没有找到商品，正在进行申报</p>
        </div>
      </div>

      <!-- 提交按钮 -->
      <div style="margin-top:30px;text-align:center;padding-right:40px;">
        <button @click="changeStep($event,2)" style="margin-left:20px;background:rgba(24,124,232,1);border:1px solid rgba(24, 124, 232, 1);border-radius:15px;padding:0px 20px;color:white;height:30px;">提交</button>
      </div>
    </div>
  </div>

  <!-- 选择收件人/发件人 -->
  <div v-if="stepTag==1">
    <div style="margin-top:50px;">
      <!-- 返回按钮 -->
      <div @click="backPageGoods" style="height:32px;width:126px;text-align:center;border-radius:15px;border:1px solid #187CE8;color:#187CE8;cursor:pointer;">
        <img src="" class="arrow-left">
        <label style="margin-left:-10px;line-height:30px;cursor:pointer;">返回上一步</label>
      </div>

      <!-- 发件人 -->
       <el-card class="box-card" style="margin:20px auto">
        <div style="padding:15px 0px;margin-bottom:9px">
          <span>
            <img src="../../assets/sender.png" style="width:20px;height:20px;background-color:white;margin-right:10px;">
            <label style="font-size:19px;color:#545454;top:3px;position:relative;">发件人</label>
          </span>
          <span style="font-size:14px;float:right;position:relative;" @click="amendSenderAdds">
            <el-button>修改地址</el-button>
          </span>
          <span style="font-size:14px;float:right;position:relative;margin-right:7px" @click="addSenderAddressBtn">
            <el-button>新增地址</el-button>
          </span>
          <span style="font-size:14px;float:right;position:relative;margin-right:7px;margin-bottom:7px" @click="showSenderAdds(page)">
            <el-button type="primary">+&nbsp;&nbsp;选择地址簿</el-button>
          </span>
        </div>
        <div style="padding:30px;border-top:1px solid #C2C2C2;"  v-show="senderShow">
          <div class="xyj-edit-form label-120" style="border:none;padding:none;">
            <el-form :model="subDecForm" class="demo-ruleForm" ref="subDecForm" label-width="120px">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="发件人:" prop="userName">
                    <el-input v-model="senderAddress.name" placeholder="发件人" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="2">
                  <el-form-item label="电话:" prop="userEmail">
                    <el-input v-model="senderAddress.phone" placeholder="电话" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item label="国家:" prop="userName">
                    <el-select v-model="senderAddress.area" disabled class="width-paved" placeholder="请选择国家">
                      <el-option v-for="(item, index) in countries" :label="item.english_name" :value="item.str" disabled></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8" :offset="2">
                  <el-form-item label="城市:" prop="userName">
                  
                    <el-input v-model="senderAddress.city" placeholder="请填写城市英文名" disabled></el-input>
                  </el-form-item>
                </el-col>
                  
              </el-row>

              <el-row>

                <el-col :span="8">
                  <el-form-item label="详细地址:" prop="userEmail">
                    <el-input v-model="senderAddress.detailAddress" placeholder="如道路、门牌号、小区等" disabled></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8" :offset="2">
                  <el-form-item label="邮编:" prop="userEmail">
                    <el-input v-model="senderAddress.zipcode" placeholder="邮编" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

            </el-form>
          </div>
        </div>
      </el-card>

        <!-- 收件人 -->
         <el-card class="box-card" style="margin:20px auto">
          <div style="padding:15px 0px;margin-bottom:9px">
            <span>
              <img src="../../assets/recevier.png" style="width:20px;height:20px;background-color:white;margin-right:10px;">
              <label style="font-size:19px;color:#545454;top:3px;position:relative;">收件人</label>
            </span>
            <span style="font-size:14px;float:right;top:3px;position:relative;" @click="amendRecevierAdds">
              <el-button>修改地址</el-button>
            </span>
            <span style="font-size:14px;float:right;top:3px;position:relative;margin-right:7px" @click="addAddresseeBtn">
              <el-button>新增地址</el-button>
            </span>
            <span style="font-size:14px;float:right;top:3px;position:relative;margin-right:7px" @click="showRecevierAdds(page)">
              <el-button type="primary">+&nbsp;&nbsp;选择地址簿</el-button>
            </span>
          </div>
          <div style="padding:30px;border-top:1px solid #C2C2C2;" v-show="recevierShow">
            <div class="xyj-edit-form" style="border:none;padding:none;">


             <el-form :model="subDecForm" ref="subDecForm" label-width="120px">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="收件人:" prop="userName">
                      <!-- <el-select v-model="recevierAddress.goodsCate" class="width-paved" placeholder="请选择商品类别">
                        <el-option v-for="(item, index) in goodsCates" :label="item.name" :value="item.str"></el-option>
                      </el-select> -->
                      <el-input v-model="recevierAddress.name" placeholder="收件人" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" :offset="4">
                    <el-form-item label="电话:" prop="userEmail">
                      <el-input v-model="recevierAddress.phone" placeholder="电话" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="地区:" prop="userName">
                      <!-- <el-cascader
                      ref="getCascaderAddr"
                      :options="options"
                      v-model='getCascaderAddr'
                      @active-item-change="handleItemChange"
                      @change="handleGetOptionsChange"
                      :props="props"
                      disabled
                      ></el-cascader> -->
                      <el-input v-model="getCascaderAddr" placeholder="电话" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" :offset="4">
                    <el-form-item label="详细地址:" prop="userEmail">
                      <el-input v-model="recevierAddress.detailAddress" placeholder="如道路、门牌号、小区等" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="身份证号:" prop="userIphone">
                      <el-input v-model="recevierAddress.cardNum" placeholder="身份证号" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" :offset="4">
                    <el-form-item label="邮编:" prop="userEmail">
                      <el-input v-model="recevierAddress.zipcode" placeholder="邮编" disabled></el-input>
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="身份证:" prop="userName">

                      <!-- 正面 -->
                      <div style="display:inline-block;vertical-align:top;">
                        <div :style="frontStyle">
                          <img :src="recevierAddress.cardFrontUrl" disabled style="width:100%;height:100%;position:relative;z-index:2;background-color:transparent;" v-if="recevierAddress.cardFrontUrl">
                          <label style="color:#B3B3B3;font-size:12px;display:none;width:30px;text-align:center;position:absolute;left:65px;top:40px;">正面</label>
                        </div>


                      </div>

                      <!-- 背面 -->
                      <div style="display:inline-block;margin-left:10px;vertical-align:top;">
                        <div :style="backStyle">
                          <img :src="recevierAddress.cardBackUrl" disabled  style="width:100%;height:100%;position:relative;z-index:2;background-color:transparent;" v-if="recevierAddress.cardBackUrl">
                          <label style="color:#B3B3B3;font-size:12px;display:none;width:30px;text-align:center;position:absolute;left:65px;top:40px;">背面</label>
                        </div>


                      </div>

                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </el-card>

        <div style="margin-top:30px;text-align:center;padding-right:40px;">
          <el-button @click="addressCheck" type="primary">提交</el-button>
        </div>
      </div>

    </div>

    <!-- 选择仓库 -->
    <div v-if="stepTag==3333">
      <div style="margin-top:50px;">
        <!-- 返回按钮 -->
        <div @click="backAddress" style="height:32px;width:126px;text-align:center;border-radius:15px;border:1px solid #187CE8;color:#187CE8;cursor:pointer;">
          <img src="" class="arrow-left">
          <label style="margin-left:-10px;line-height:30px;cursor:pointer;">返回上一步</label>
        </div>

        <!-- 服务列表 -->
        <div style="margin-top:20px;">

          <!-- 服务项 -->
          <div style="padding:30px;border:1px solid #D5D5D5;margin-bottom:30px;position:relative;"  v-for="(item,index) in stores" :style="{'box-shadow':(item.selected?'0px 0px 8px #187CE8':null)}">
            <div class="s-left" style="display:inline-block;text-align:center;vertical-align:middle;">
              <label style="font-size:16px;">{{item.store_name}}仓库</label>
            </div>
          <div class="s-mid" style="display:inline-block;margin-left:30px;width:calc(100% - 300px);vertical-align:middle;position:relative;top:4px;">
            <p>仓库地址：{{item.default_address}}</p>
            </div> 
          <div class="s-right" style="display:inline-block;margin-left:30px;text-align:center;vertical-align:middle;position:absolute;background-color:white;right:100px;">
            <div style="text-align:center;">
              <div v-if="item.selected" @click="changeStoreStatus(index,'cancel')" style="height:30px;padding-left:15px;padding-right:15px;text-align:center;border-radius:15px;border:1px solid #187CE8;color:#187CE8;cursor:pointer;">
                <img src="../../assets/cancel.png"  style="width:12px;height:12px;">
                <label  style="margin-left:6px;line-height:30px;cursor:pointer;">取消选择</label>
              </div>
              <button v-if="!item.selected" @click="changeStoreStatus(index,'done')" style="margin-left:20px;background:rgba(24,124,232,1);border:1px solid rgba(24, 124, 232, 1);border-radius:15px;padding:0px 20px;color:white;height:30px;relative;left:-12px;">选择仓库</button>
            </div>
          </div>
        </div>

        <div style="margin-top:30px;text-align:center;padding-right:40px;">
          <button @click="choiceWarehouse" style="margin-left:20px;background:rgba(24,124,232,1);border:1px solid rgba(24, 124, 232, 1);border-radius:15px;padding:0px 20px;color:white;height:30px;">提交</button>
        </div>

      </div>

    </div>
  </div>
  <!-- 选择增值服务-->
  <div v-if="stepTag==2">
    <div style="margin-top:50px;">
      <!-- 返回按钮 -->
      <div @click="backPageAddress" style="height:32px;width:126px;text-align:center;border-radius:15px;border:1px solid #187CE8;color:#187CE8;cursor:pointer;">
        <img src="" class="arrow-left">
        <label style="margin-left:-10px;line-height:30px;cursor:pointer;">返回上一步</label>
      </div>

      <!-- 服务列表 -->
      <div style="margin-top:20px;">
        <strong style="display: block;margin-bottom: 10px;font-weight:bold;font-weight:20px">送件方式</strong>
        <div style="padding:30px;margin-bottom:30px;position: relative;"  v-for="(obj,index) in this.delivery" :style="{'border':(obj.selected?'3px solid #187CE8':'1px solid #D5D5D5')}">
          <img v-if="obj.selected" src="../../assets/ok_select16@2x.png" style="position: absolute;right: 20px;top: 0px;width: 50px;height: 50px;}">
          <div class="s-left" style="display:inline-block;text-align:center;">
            <img :src="obj.imgUrl" style="width:120px;height:120px;background-color:white;display:block;">
            <label style="margin-top:20px;font-size:18px;">{{obj.name}}</label>
          </div>
          <div class="s-mid" style="display:inline-block;margin-left:30px;width:calc(100% - 300px);vertical-align:top;margin-top:20px;font-weight:bold;">
            <p>联系人：&nbsp;&nbsp;{{obj.default_sender}}</p>
            <p>联系方式：&nbsp;&nbsp;{{obj.phone}}</p>
            <p>地址：&nbsp;&nbsp;{{obj.detail}}</p>
            <span v-if="false" style="float:right;">
              <img src="../../assets/tixing.png" style="width:12px;height:12px;background-color:white;margin-right:5px;"  />
              <span style="font-size:12px;color:#FEB12D;">服务帮助</span>
            </span>
          </div>
          <div class="s-right" style="display:inline-block;margin-left:30px;text-align:center;margin-top: 60px;float: right;">
            <div style="margin-bottom:0px;text-align:center;">
              <button v-if="obj.selected" @click="changeDvStatus(index,'dvCancel')" style="height:30px;padding-left:15px;padding-right:15px;text-align:center;border-radius:15px;border:1px solid #187CE8;color:#187CE8;cursor:pointer;">
                <img src="../../assets/cancel.png"  style="width:12px;height:12px;">
                <label  style="margin-left:6px;line-height:30px;cursor:pointer;">取消选择</label>
              </button>
              <button v-if="!obj.selected" @click="changeDvStatus(index,'dvDone')" style="margin-left:10px;background:rgba(24,124,232,1);border:1px solid rgba(24, 124, 232, 1);border-radius:15px;padding:0px 20px;color:white;height:30px;relative;left:-12px;">
                选择服务
              </button>
            </div>    
          </div>
        </div>

        <strong style="display: block;margin-bottom: 10px;font-weight:bold;font-weight:20px">增值服务(可选)</strong>
        <!-- 服务项 -->
        <div style="padding:30px;margin-bottom:30px;position: relative;"  v-for="(item,index) in services" :style="{'border':(item.selected?'3px solid #187CE8':'1px solid #D5D5D5')}">
          <img v-if="item.selected" src="../../assets/ok_select16@2x.png" style="position: absolute;right: 20px;top: 0px;width: 50px;height: 50px;}">
          <div class="s-left" style="display:inline-block;text-align:center;">
            <img :src="item.thumbFullPath" style="width:120px;height:120px;background-color:white;display:block;">
            <label style="margin-top:20px;font-size:18px;">{{item.name}}</label>
          </div>
          <div class="s-mid" style="display:inline-block;margin-left:30px;width:calc(100% - 300px);vertical-align:top;margin-top:20px;">
            <p>{{item.content}}</p>
            <span v-if="true" style="float:right;">
              <img src="../../assets/tixing.png" style="width:12px;height:12px;background-color:white;margin-right:5px;">
              <span style="font-size:12px;color:#FEB12D;">服务帮助</span>
            </span>
          </div>
          <div class="s-right" style="display:inline-block;margin-left:30px;text-align:center;margin-top: 50px;float: right;">
            <div style="margin-bottom:0px;text-align:center;">
              <button v-if="item.selected" @click="changeStatus(index,'cancel')" style="height:30px;padding-left:15px;padding-right:15px;text-align:center;border-radius:15px;border:1px solid #187CE8;color:#187CE8;cursor:pointer;">
                <img src="../../assets/cancel.png"  style="width:12px;height:12px;">
                <label  style="margin-left:6px;line-height:30px;cursor:pointer;">取消选择</label>
              </button>
              <button v-if="!item.selected" @click="changeStatus(index,'done')" style="margin-left:10px;background:rgba(24,124,232,1);border:1px solid rgba(24, 124, 232, 1);border-radius:15px;padding:0px 20px;color:white;height:30px;relative;left:-12px;">选择服务</button>
            </div>
            <span style="font-size:20px;color:#FF0000;">￥{{item.price}}</span>
          </div>
        </div>




        <div style="margin-top:30px;text-align:center;padding-right:40px;">
          <button @click="serveCheck" style="margin-left:20px;background:rgba(24,124,232,1);border:1px solid rgba(24, 124, 232, 1);border-radius:15px;padding:0px 20px;color:white;height:30px;">提交</button>
        </div>

      </div>

    </div>
  </div>

  <!-- 确认订单 -->
  <div v-if="stepTag==3">
    <div style="margin-top:50px;">
      <!-- 返回按钮 -->
      <div @click="backPageServe" style="height:32px;width:126px;text-align:center;border-radius:15px;border:1px solid #187CE8;color:#187CE8;cursor:pointer;">
        <img src="" class="arrow-left">
        <label style="margin-left:-10px;line-height:30px;cursor:pointer;">返回上一步</label>
      </div>
      <div style="border:1px solid #D5D5D5;padding:0px 20px;margin-top:10px;">
        <div style="padding:15px 0px;border-bottom:1px solid #C2C2C2;">
          <span>
            <img src="../../assets/path.png" style="width:20px;height:20px;background-color:white;margin-right:10px;vertical-align: middle;">
            <label style="font-size:19px;color:#545454;top:3px;position:relative;">线路/规划</label>
          </span>
          <span style="font-size:18px;font-weight:bold;float:right;top:3px;position:relative;display:none;">
            预计：<span style="color:#FF0000;font-size:19px;sition:relative;">￥100</span>
          </span>
        </div>
        <div style="margin-top:20px;padding:0px 20px;">
            <span style="font-weight:bold;display:inline-block;">物流线路：</span><!-- 
          --><div style="display:inline-block;">

            <div style="height:30px;line-height:30px;width:100px;background-color:#187CE8;color:white;text-align:center;
            position:relative;display:inline-block;z-index:100;">
            <div style="position:absolute;width:22px;height:22px;transform:rotate(45deg);background-color:transparent;left:-11px;top:4px;">

            </div>
            <label>{{finalLogisticPath?finalLogisticPath.name.split("-")[0]:""}}</label>
            <div style="position:absolute;width:22px;height:22px;transform:rotate(45deg);background-color:#187CE8;right:-11px;top:4px;">

            </div>
              </div><!-- 

              --><div style="height:30px;line-height:30px;width:100px;background-color:#E4E4E4;color:#545454;text-align:center;
              position:relative;display:inline-block;z-index:99;right:-3px;">
              <div style="position:absolute;width:22px;height:22px;transform:rotate(45deg);background-color:white;left:-11px;top:4px;">

              </div>
              <label>{{finalLogisticPath?finalLogisticPath.clear_port_name:""}}关口</label>
              <div style="position:absolute;width:22px;height:22px;transform:rotate(45deg);background-color:#E4E4E4;right:-11px;top:4px;">

              </div>
              </div><!-- 

              --><div style="height:30px;line-height:30px;width:100px;background-color:#187CE8;color:white;text-align:center;
              position:relative;display:inline-block;z-index:98;right:-6px;">
              <div style="position:absolute;width:22px;height:22px;transform:rotate(45deg);background-color:white;left:-11px;top:4px;">

              </div>
              <label>{{finalLogisticPath?finalLogisticPath.name.split("-")[1]:""}}</label>
              <div style="position:absolute;width:22px;height:22px;transform:rotate(45deg);background-color:transparent;right:-11px;top:4px;">

              </div>
            </div>

          </div>
        </div>
        <div style="margin-top:20px;padding:0px 20px;padding-bottom:30px;">
          <span style="display:inline-block;width:50%;">
            <span style="font-weight:bold;">货物规格：</span>
            <span>长{{formInline.length}}CM，宽{{formInline.width}}CM，高{{formInline.height}}CM</span>
          </span>
          <span style="display:inline-block;">
            <span style="font-weight:bold;">货物重量：</span>
            <span>{{formInline.weight}}KG</span>
          </span>
        </div>
      </div>
      <div style="border:1px solid #D5D5D5;padding:0px 20px;margin-top:10px;">
        <div style="padding:15px 0px;border-bottom:1px solid #C2C2C2;">
          <span>
            <img src="../../assets/info.png" style="width:20px;height:20px;background-color:white;margin-right:10px;vertical-align: middle;">
            <label style="font-size:19px;color:#545454;top:3px;position:relative;">货物商品信息</label>
          </span>
        </div>
        <div style="margin-top:20px;padding:0px 20px;">
          <el-table :data="selectedGoods" style="width: 100%">
            <el-table-column prop="name" label="商品标题">
            </el-table-column>
            <el-table-column prop="record_number" label="备案信息">
            </el-table-column>
            <el-table-column prop="num" label="数量">
            </el-table-column>
            <el-table-column prop="specification_type" label="商品规格">
            </el-table-column>
            
              </el-table>
            </div>
          </div>
          <div style="border:1px solid #D5D5D5;padding:0px 20px;margin-top:10px;padding-bottom:20px;">
            <div style="padding:15px 0px;border-bottom:1px solid #C2C2C2;">
              <span>
                <img src="../../assets/s_and_r.png" style="width:20px;height:20px;background-color:white;margin-right:10px;vertical-align: middle;">
                <label style="font-size:19px;color:#545454;top:3px;position:relative;">收件人/发件人</label>
              </span>
            </div>
            <div style="margin-top:20px;padding:0px 20px;">
              <!-- 收件人 -->
              <div style="padding:10px 20px;background-color:#f4f4f4;margin-bottom: 10px;">
                <span style="display:inline-block;width:20%;">
                  <span style="font-weight:bold">收件人：</span>
                  <span>{{recevierAddress.name}}</span>
              </span><!-- 
            --><span style="display:inline-block;width:30%;">
              <span style="font-weight:bold">收件电话：</span>
              <span>{{recevierAddress.phone}}</span>
              </span><!-- 
            --><span style="display:inline-block;width:50%;">
              <span style="font-weight:bold">收件地址：</span>
              <span>{{address.recevier}}</span>
            </span>
          </div>
          <!-- 发件人 -->
          <div style="padding:10px 20px;background-color:#f4f4f4;">
            <span style="display:inline-block;width:20%;">
              <span style="font-weight:bold">发件人：</span>
              <span>{{senderAddress.name}}</span>
              </span><!-- 
            --><span style="display:inline-block;width:30%;">
              <span style="font-weight:bold">发件电话：</span>
              <span>{{senderAddress.phone}}</span>
              </span><!-- 
            --><span style="display:inline-block;width:50%;">
              <span style="font-weight:bold">发件地址：</span>
              <span>{{address.sender}}</span>
            </span>
          </div>
        </div>
      </div>
      <div v-if="selectedService.length != 0" style="border:1px solid #D5D5D5;padding:0px 20px;margin-top:10px;">
        <div style="padding:15px 0px;border-bottom:1px solid #C2C2C2;">
          <span>
            <img src="../../assets/appreciation.png" style="width:20px;height:20px;background-color:white;margin-right:10px;">
            <label style="font-size:19px;color:#545454;top:3px;position:relative;">增值服务</label>
          </span>
        </div>
        <div style="margin-top:20px;padding:0px 20px;">
          <el-table :data="selectedService" style="width: 100%">
            <el-table-column prop="name" label="服务名称">
            </el-table-column>
            <el-table-column prop="content" label="服务说明">
            </el-table-column>
            <el-table-column prop="price" label="服务费用">
              <template slot-scope="scope">
                <label style="color:red;">￥{{scope.row.price}}</label>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-row>
      <el-col :span="2" :offset="11">
        <el-button class="btn" style="margin-top:20px;background-color: rgb(51, 153, 255);color: rgb(255, 255, 255);" @click="creatWaybill">确认订单</el-button>
      </el-col>
    </el-row>
  </div>

  <!-- 支付订单 -->
  <div v-if="stepTag==4">
    <!-- 订单信息 -->
    <div style="padding:20px;margin-left:150px">
      <p style="font-size:19px;font-weight:bold;">订单信息</p>
      <div style="margin-top:10px;">
        <span style="display:inline-block;width:100px;text-align:right;">订单总金额：</span>
        <span style="display:inline-block;color:red;font-size:16px;font-weight:bold;">￥{{waybill.order.price}}</span>
      </div>
      <div style="margin-top:10px;">
        <span style="display:inline-block;width:100px;text-align:right;">订单编号：</span>
        <span>{{waybill.order.num}}</span>
      </div>
      <div style="margin-top:10px;">
        <span style="display:inline-block;width:100px;text-align:right;">余额支付：</span>

        <span style="cursor:pointer;" @click="choosePay($event,'zcpay')">
          <img :src="payRadio('zcpay')" style="width:12px;height:12px;background-color:white;margin-right:5px;">
          <span>余额支付（可用余额&nbsp;&nbsp;&nbsp;&nbsp;￥<span>{{waybill.order.money}}</span>）</span>
        </span>

      </div>
      <div style="margin-top:10px;">
        <span style="display:inline-block;width:100px;text-align:right;">支付方式：</span>

        <span style="position:relative;top:20px;display:block;left:20px;">

          <div style="display:inline-block;cursor:pointer;" @click="choosePay($event,'alipay')">
            <img :src="payRadio('alipay')" style="width:12px;height:12px;background-color:white;margin-right:5px;">
            <img src="../../assets/alipay.png" style="width:100px;height:34px;background-color:white;">
          </div>

          <div style="display:inline-block;margin-left:30px;cursor:pointer;" @click="choosePay($event,'wxpay')">
            <img :src="payRadio('wxpay')" style="width:12px;height:12px;background-color:white;margin-right:5px;">
            <img src="../../assets/wxpay.png" style="width:100px;height:34px;background-color:white;">
          </div>

        </span>
      </div>
    </div>
    <!-- 支付订单 -->
    <div style="margin-top:30px;text-align:center;padding-right:40px;">
      <button @click="payWaybill" style="margin-left:20px;background:rgba(24,124,232,1);border:1px solid rgba(24, 124, 232, 1);border-radius:15px;padding:0px 20px;color:white;height:30px;">支付订单</button>
    </div>
  </div>
  <!-- 发件人地地址簿dialog -->
  <el-dialog
  title=""
  class="dialog-content"
  :visible.sync="senderDialog"
  width="65%"
  >
  <el-table
  :data="senderTableDate"
  highlight-current-row
  @selection-change="senderSelectionChange"
  style="width: 100%">
  <el-table-column
  type="selection"
  width="55">
</el-table-column>
<el-table-column
prop="sender"
label="发货人">
</el-table-column>
<el-table-column
prop="telephone"
label="电话">
</el-table-column>
<el-table-column
prop="detail"
label="详细地址">
</el-table-column>
</el-table>
<el-pagination
  small
  layout="prev, pager, next"
  @current-change="addressSenderChange"
  :page-size="page.num"
  :current-page="page.size"
  :total="allNum">
</el-pagination>
<span slot="footer" class="dialog-footer">
  <el-button type="primary" @click="senderAdd">确定</el-button>
  <el-button @click="senderDialog = false">取消</el-button>
</span>
</el-dialog>
<!-- 收件人地地址簿dialog -->
<el-dialog
title=""
class="dialog-content"
:visible.sync="receviceDialog"
width="65%"
>
<el-table 
:data="receviceTableDate"
  highlight-current-row
@selection-change="recevierChange"
style="width: 100%">
<el-table-column
type="selection"
width="55">
</el-table-column>
</el-table-column>
<el-table-column
prop="name"
label="收件人">
</el-table-column>
<el-table-column
prop="phone"
label="电话">
</el-table-column>
<el-table-column
prop="detail"
label="详细地址">
</el-table-column>
<el-table-column
prop="card_no"
label="身份证号">
</el-table-column>
</el-table>
<el-pagination
  small
  layout="prev, pager, next"
  @current-change="addressRecevierChange"
  :page-size="page.num"
  :current-page="page.size"
  :total="allNum">
</el-pagination>
<span slot="footer" class="dialog-footer">
  <el-button type="primary" @click="recevierAdd">确定</el-button>
  <el-button @click="receviceDialog = false">取消</el-button>
</span>
</el-dialog>
<!-- 微信支付dialog -->
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


<!-- 新增发件人地址dialog -->
<el-dialog
:title="senderAddType"
class="dialog-content"
:visible.sync="addAddressDialog"
width="50%"
>
<el-form :model="subDecForm" class="demo-ruleForm" ref="subDecForm" label-width="120px">
  <el-row>
    <el-col :span="11">
      <el-form-item label="发件人:" prop="userName" required>
        <el-input v-model="addSenderAddress.name" placeholder="发件人"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="11" :offset="1">


      <el-form-item label="电话:" class="input-and-select" prop="goodsPrice" required>
        <div style="display:flex;flex-direction:row">
          <el-select v-model="addSenderAddress.code" class="width-paved width-paved-code" placeholder="区号">
            <el-option v-for="(item, index) in countries" :label="item.name+'+'+item.area_code" :value="item.id"></el-option>
          </el-select>
          <el-input v-model="addSenderAddress.phone" placeholder="">
          </el-input>
        </div>  
      </el-form-item>

    </el-col>
  </el-row>

  <el-row>
    <el-col :span="11">
      <el-form-item label="国家:" prop="userName" required>
        <el-select v-model="addSenderAddress.area" class="width-paved" style="width: 100%;" placeholder="请选择国家">
          <el-option v-for="(item, index) in countries" :label="item.english_name" :value="item.str"></el-option>
        </el-select>
      </el-form-item>
    </el-col>

    <el-col :span="11" :offset="1">
      <el-form-item label="城市:" prop="userName" required >
        <el-input v-model="addSenderAddress.city" placeholder="请填写城市英文名"></el-input>
      </el-form-item>
    </el-col>

  </el-row>

  <el-row>

    <el-col :span="11">
      <el-form-item label="详细地址:" prop="userEmail" required>
        <el-input v-model="addSenderAddress.detailAddress" placeholder="如道路、门牌号、小区等"></el-input>
      </el-form-item>
    </el-col>

    <el-col :span="11" :offset="1">
      <el-form-item label="邮编:" prop="userEmail">
        <el-input v-model="addSenderAddress.zipcode" placeholder="邮编"></el-input>
      </el-form-item>
    </el-col>

  </el-row>
</el-form>
<span slot="footer" class="dialog-footer">
  <el-button type="primary" @click="saveAddAddress">确定</el-button>
  <el-button @click="addAddressDialog = false">取消</el-button>
</span>
</el-dialog>


<!-- 新增收件人地址dialog -->
<el-dialog
:title='addType'
@opened="opendAddressee()" 
class="dialog-content"
:visible.sync="addAddresseeDialog"
width="40%"
>
<el-form :model="subDecForm" ref="subDecForm" label-width="120px">
  <el-row>
    <el-col :span="11">
      <el-form-item label="收件人:" prop="userName" required>
            <el-input v-model="addRecevierAddress.name" placeholder="收件人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="电话:" prop="userEmail" required>
            <el-input v-model="addRecevierAddress.phone" placeholder="电话"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="地区:" prop="getOptionsArry" required>
            <el-cascader
            style="width:212px"
            ref="getCascaderAddr"
            v-model="addGetOptionsArry"
            :options="options"
            @active-item-change="handleItemChange"
            @change="handleGetOptionsChange"
            :props="props"
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="详细地址:" prop="userEmail" required>
            <el-input v-model="addRecevierAddress.detailAddress" placeholder="如道路、门牌号、小区等"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="身份证号:" prop="userIphone" required>
            <el-input v-model="addRecevierAddress.cardNum" placeholder="身份证号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="邮编:" prop="userEmail">
            <el-input v-model="addRecevierAddress.zipcode" placeholder="邮编"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="身份证:" prop="userName">

            <!-- 正面 -->
            <div style="display:inline-block;vertical-align:top;">
              <div :style="frontStyle">
                <img :src="addRecevierAddress.cardFrontUrl" style="width:100%;height:100%;position:relative;z-index:2;background-color:transparent;" v-if="addRecevierAddress.cardFrontUrl">
                <label style="color:#B3B3B3;font-size:12px;display:none;width:30px;text-align:center;position:absolute;left:65px;top:40px;">正面</label>
              </div>

              <el-upload
              :action="uploadUrl"
              name="file"
              ref="upload"
              :multiple="true"
              :headers="uploadHeader"
              :on-error="errorUpload"
              :on-success="recevierFrontSuccess"
              :auto-upload="true"
              style="background-color:transparent;text-align:left;position:absolute;width:100%;height:100%;top:0px;opacity:0;z-index:3;">

              <i class="el-icon-plus" style="font-size:40px;display:block;background-color:transparent;width:160px;height:100px;"></i>

            </el-upload>
          </div>

          <!-- 背面 -->
          <div style="display:inline-block;margin-left:10px;vertical-align:top;">
            <div :style="backStyle">
              <img :src="addRecevierAddress.cardBackUrl" style="width:100%;height:100%;position:relative;z-index:2;background-color:transparent;" v-if="addRecevierAddress.cardBackUrl">
              <label style="color:#B3B3B3;font-size:12px;display:none;width:30px;text-align:center;position:absolute;left:65px;top:40px;">背面</label>
            </div>

            <el-upload
            :action="uploadUrl"
            name="file"
            ref="upload"
            :multiple="true"
            :headers="uploadHeader"
            :on-error="errorUpload"
            :on-success="recevierBackSuccess"
            :auto-upload="true"


            style="background-color:transparent;text-align:left;position:absolute;width:100%;height:100%;top:0px;opacity:0;z-index:3;">

            <i class="el-icon-plus" style="font-size:40px;display:block;background-color:transparent;width:160px;height:100px;"></i>

          </el-upload>
        </div>

          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saveAddressee">确定</el-button>
      <el-button @click="addAddresseeDialog = false">取消</el-button>
    </span>
  </el-dialog>

</div>
</template>
<script>
import Tools from '@/lib/Tools';
import config from "@/config.js";

let ts = Tools.getInstance();

export default {
  name: 'LogisticsOrder',
  data() {
    return {
      // 微信支付dialog
      wxPayDialog:false,
      addAddressDialog:false,
      addAddresseeDialog:false,
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
        num:5
      },
      // 总条数
      allNum:0,
      // 查询
      goodsInformation:{
        selectTypeId:'',
        keyword:'',
      },
      //table上选择 
      tableGoods:[], 

      // dialog
      chooseDialog:false,
      num:1,
      styleObj: {
        dhl:'',
        goods:'',
        dhlShow:true,
        goodsShow:true
      },
      subDecForm: {
        declareType: '',
        originCountry: '',
        engBrand: '',
        engGoodName: '',
        goodsClassfication: '',
        cheGoodName: '',
        goodsPrice: '',
        goodsSpecifications: '',
        measurementUnit: "",
        region_name: 'RMB',
        goodsWeight: '',
        goodsEan: '',
        purchaseLink: '',
        purchaseBills: '',
        userIphone: ''
      },
      rules: {
        declareType: [
        { required: true, message: '请输入申报服务类型', trigger: 'blur' },
        ],
        originCountry: [
        { required: true, message: '请输入原产地', trigger: 'blur' }
        ],
        engBrand: [
        { required: true, message: '请输入英文品牌', trigger: 'blur' }
        ],
        engGoodName: [
        { required: true, message: '请输入英文物品名称', trigger: 'blur' }
        ],
        goodsClassfication: [
        { required: true, message: '请选择物品分类', trigger: 'change' },
        ],
        cheGoodName: [
        { required: true, message: '请输入中文物品名称', trigger: 'blur' }
        ],
        goodsPrice: [
        { required: true, message: '请输入物品价格', trigger: 'blur' }
        ],
        goodsSpecifications: [
        { required: true, message: '请输入物品规格', trigger: 'blur' }
        ],

        region_name: [
        { required: true, message: '请选择价格单位', trigger: 'change' },
        ],
        measurementUnit: [
        { required: true, message: '请输入计量单位', trigger: 'blur' }
        ],
        goodsWeight: [
        { required: true, message: '请输入物品单位净重', trigger: 'blur' }
        ],
        goodsEan: [
        { required: true, message: '请输入EAN', trigger: 'blur' }
        ],

        purchaseLink: [
        { required: true, message: '请输入网上购买链接', trigger: 'blur' }
        ],
        purchaseBills: [
        { required: true, message: '请上传购买票据', trigger: 'blur' }
        ]
      },
      dialogImageUrl: '',
      dialogVisible: false,
      input: "",
      radio: "1",
      stepTag: 0,
      isChoose: false,

      // 选择线路/规格的表单数据
      formInline: {
        fromregion: this.$route.params&&this.$route.params.fromregion?this.$route.params.fromregion:"",
        toregion: this.$route.params&&this.$route.params.toregion?this.$route.params.toregion:"",
        weight:this.$route.params&&this.$route.params.weight?this.$route.params.weight:"",
        length:this.$route.params&&this.$route.params.length?this.$route.params.length:"",
        width:this.$route.params&&this.$route.params.width?this.$route.params.width:"",
        height:this.$route.params&&this.$route.params.height?this.$route.params.height:"",
      },

      // 选择商品信息的表单数据
      goodsInfoForm:{

        // 搜索数据
        goodsCate:"",//(下拉)
        clearPort:"",//(下拉，暂时弃用)
        logisticsPath:"",
        goodsKeyWord:"",

        // 申报数据
        applyInfo:{
          applyType:"",//(下拉)
          goodsArea:"",//(下拉)
          goodsEnBrand:"",//(下拉)
          goodsEnName:"quechao",
          goodsCates:"",
          selectedCate:"",//(下拉)
          goodsChName:"德国雀巢",
          goodsPrice:"400",
          coinType:"",
          goodsCoin:"",
          goodsSpec:"1000g",
          goodsUnit:"",//单位(下拉)
          goodsWeight:"1000",
          goodsEAN:"12345678",// EAN码
          goodsLink:"http://www.xiaoyagnjiang.com/id",// 购买链接
          goodsTicketUrl:"",// 购买票据的上传图片URL
          goodsTicketUrlShort:"",// 购买票据的上传图片URL的相对地址
          goodsTicketId:"",// 购买票据的上传图片ID
        },

      },
      // 商品列表（选择商品）
      goodsList:[],
      // 已选择加入的商品列表
      selectedGoods:[],
      // 物流费用
      fee:0,

      // 最终支付的商品
      // finalGoodsList:[],

      // 发件人地址新增表单数据
      addSenderAddress:{
        senderId:'',
        name:"",
        zipcode:"",
        city:"",
        code:"",
        goodsCate:"",
        phone:"",
        area:"",
        detailAddress:"",
        cardFrontUrl:"",
        cardFrontUrlShort:"",
        cardBackUrl:"",
        cardBackUrlShort:"",
        cardNum:"",
      },
      getCascaderAddr:'',
      senderAddress:{
        code:"",
        senderId:'',
        name:"",
        zipcode:"",
        city:"",
        goodsCate:"",
        phone:"",
        area:"",
        detailAddress:"",
        cardFrontUrl:"",
        cardFrontUrlShort:"",
        cardBackUrl:"",
        cardBackUrlShort:"",
        cardNum:"",
      },
      // 收件人地址新增表单数据
      addAddressee:{

      },
      addRecevierAddress:{
        recevierId:'',
        name:"",
        zipcode:"",
        goodsCate:"",
        phone:"",

        province:"",
        city:"",
        area:"",

        detailAddress:"",
        cardFrontUrl:"",
        cardFrontUrlShort:"",
        cardBackUrl:"",
        cardBackUrlShort:"",
        cardNum:"",

        // 省数据
        provinces:[],
        // 市数据
        cities:[],
        // 区县数据
        areas:[],

        areaType:"",
      },
      recevierAddress:{

        recevierId:'',
        name:"",
        zipcode:"",
        goodsCate:"",
        phone:"",

        province:"",
        city:"",
        area:"",

        detailAddress:"",
        cardFrontUrl:"",
        cardFrontUrlShort:"",
        cardBackUrl:"",
        cardBackUrlShort:"",
        cardNum:"",

        // 省数据
        provinces:[],
        // 市数据
        cities:[],
        // 区县数据
        areas:[],

        areaType:"",

      },

      //手机区号
      areaCodes:[
        {
          name:"德国",
          val:"086",
          id:"086"
        },
         {
          name:"中国",
          val:"049",
          id:"049"
        }
      ],

      // 国家
      countries:[],
      // 清关类型
      clears:{},
      // 清关类型选择
      scIndex:0,
      scKey:"",
      params:this.$route.params,

      // 商品类别
      goodsCates:[],
      // 清关关口
      clearPorts:[],
      // 物流线路
      logisticsPaths:[],
      // 最终的物流线路
      finalLogisticPath:"",
      // 币种
      coinTypes:[],

      // 申报类型
      declareTypes:[],
      // 计量单位
      units:[],
      // 英文品牌列表
      enBrands:[],

      // 步骤额外样式
      bgBlue: "background-color:#187CE8;color:white;",
      bgGreen: "background-color:#F4F4F4;",
      bgTrans: "opacity:0;",

      bgBlueLeft: "background-color:#187CE8;color:white;left:-2.5px;",
      bgGreenLeft: "background-color:#F4F4F4;left:-2.5px;",

      // radioSrc:"../../assets/radio_active.png",

      // 正面图片样式
      frontStyle:"width:160px;height:100px;display:inline-block;position:relative;cursor:pointer;background-image:url("+require('../../assets/front.png')+");background-size:100% 100%;",
      backStyle:"width:160px;height:100px;display:inline-block;position:relative;margin-left:10px;cursor:pointer;background-image:url("+require('../../assets/back.png')+");background-size:100% 100%;",

      // 支付的radio选中情况，可能有alipay,wxpay,last
      payType:"zcpay",

      // 上传地址
      uploadUrl:'',
      // 图片上传请求头
      uploadHeader:{Authorization:"Bearer "+localStorage.getItem('account')},
      // 上传后的图片数组
      imgUrls:[],
      //  级联选择
      options:[],
      // selectedOptions:[],
      selectedIds:[],
      getOptionsArry:[],
      addGetOptionsArry:[],
      selectedDvId:'',
      // 地域
      props:{
        value: 'label',
        children: 'children'
      },
      // tag = 1 按钮状态
      tagOneButton:true,
      // 发件人dialog
      senderDialog:false, 
      // 收件人dialog
      receviceDialog:false,
      // 发件人table
      senderTableDate:[],
      // 收件人table
      receviceTableDate:[],
      // 选中发件人信息
      selectSenderDate:{},
      // 选中收件人信息
      selectReceviceDate:{},
      // 增值服务数据
      services:[],
      // 选中的增值服务
      selectedService:[],
      // 增值服务
      serveId:'',

      // 仓库
      stores:[],
      // 选择的仓库
      selectedStores:[],
      selectedStoreId:undefined,

      // 运单信息
      waybill:{
        tableData:[],
        goodsList:[],
        line:'',
        goods:{
          length:'',
          width:'',
          height:'',
          weight:'',
        },
        sender:{
          name:'',
          phone:'',
          address:''
        },
        recevier:{
          name:'',
          phone:'',
          address:''
        },
        services:[],
        order:{
          num:'',
          price:'',
          money:''
        }
      },
      // 支付订单信息
      payOrderMsg:{
        type:'',
        num:'',
        price:''
      },
      //仓库
      warehouse:[],
      // 送件方式
      delivery:[],
      // 选中送件方式Id;
      selectedDelivery:'',
      //修改数量dialog 
      numDialog:false, 
      goodsNum:1,
      numPlt:'',
      // 新增，修改发件人界面显示
      senderShow:false,
      // 新增，修改收件人界面显示
      recevierShow:false,
      wxPayImg:null,
      loadType:null,
      addType:null,
      senderAddType:null,
      addTime:'',
      // 收件人，发件人地址
      address:{
        recevier:'',
        sender:''
      },
      chooseAddress:[],
      chooseRecive:[],
      senderaddressType:'',
      recevieaddressType:'',
    }
  },
  computed:{
    scRadio:function(){
      let thiz = this;
      // 解决计算属性传参的问题
      return function(index){
        let finalPic = thiz.scIndex==index?require('../../assets/radio_active.png'):require('../../assets/radio.png');
        return finalPic;
      }
    },
    payRadio:function(){
      let thiz = this;
      // 解决计算属性传参的问题
      return function(type){
        let finalPic = thiz.payType==type?require('../../assets/radio_active.png'):require('../../assets/radio.png');
        return finalPic;
      }
    }
  },
  methods: {
      logisticsLineChange(){
        this.selectedGoods = [];
      },
      reduceNum(scope){
        var curid = 'numValue'+scope.$index;
        var curIds = document.getElementById(curid)
        if(scope.row.num == 1){
            this.$message({
              message: '数量不能小于1',
              type: 'error'
            });
            return;
        }else{
          scope.row.num--
          curIds.value = scope.row.num
        }
      },
      eidtNum(event,scope){
        scope.row.num = event.target.value;
      },
      addNum(scope){
        scope.row.num++
        var curid = 'numValue'+scope.$index;
        var curIds = document.getElementById(curid)
        curIds.value = scope.row.num
      },
      //打开收件人新增地址
      addAddresseeBtn(){
        this.addAddressee ={};
        this.addRecevierAddress = {
          recevierId:'',
          name:"",
          zipcode:"",
          goodsCate:"",
          phone:"",

          province:"",
          city:"",
          area:"",

          detailAddress:"",
          cardFrontUrl:"",
          cardFrontUrlShort:"",
          cardBackUrl:"",
          cardBackUrlShort:"",
          cardNum:"",

          // 省数据
          provinces:[],
          // 市数据
          cities:[],
          // 区县数据
          areas:[],

          areaType:"",
          changeTime:1,
        };
        this.loadType = false;
        this.recevieaddressType = 'add';
        this.addGetOptionsArry = [];
        this.addAddresseeDialog = true;
      },
       //保存收件人地址
       saveAddressee(){
        var thiz = this;
        let recevierUrl = "address/recevieAdd";
        let recevierParams = {};
        let msg;

        let rCardCall = ts.ruleCard(this.addRecevierAddress.cardNum,'请填写收件人身份证号','收件人身份证号格式不正确');
        if( rCardCall !== 'true'){
          msg = rCardCall
        }
        if(!this.selectedIds[2]){
          msg = '请选择收件人地区';
        }
        // let rPhoneCall = ts.rulePhone(this.addRecevierAddress.phone,'请填写收件人电话','收件人电话格式不正确');
        // if( rPhoneCall !== 'true'){
        //   msg = rPhoneCall
        // }

        var regPhone=/^[1-9]\d*$|^0$/
        if(!regPhone.test(this.addRecevierAddress.phone)){
           msg = '收件人电话格式不正确'
        }
        // 收件人
        if (!this.addRecevierAddress.name) {
          msg = '请填写收件人姓名'
        }


        if (msg) {
          this.$message({
            message: msg,
            type: 'error'
          });
          return;
        }
        recevierParams.province = thiz.selectedIds[0];
        recevierParams.city = thiz.selectedIds[1];
        recevierParams.district = thiz.selectedIds[2];

        // recevierParams.province = 37;
        // recevierParams.city = 123;
        // recevierParams.district = 127;

        recevierParams.name = thiz.addRecevierAddress.name;
        recevierParams.phone = thiz.addRecevierAddress.phone;
        recevierParams.zipcode = thiz.addRecevierAddress.zipcode;
        recevierParams.address = thiz.addRecevierAddress.detailAddress;
        recevierParams.card_no = thiz.addRecevierAddress.cardNum;
        recevierParams.card_image_id = thiz.addRecevierAddress.cardFrontUrlShort;
        recevierParams.card_image_id2 = thiz.addRecevierAddress.cardBackUrlShort;
        // 收件人---选择地址簿
        if (this.selectReceviceDate.id) {
          this.addRecevierAddress.recevierId = this.selectReceviceDate.id
        }
        // 收件人---新增
        if (this.recevieaddressType == 'add') {
         ts.sendRequest(recevierUrl,{
          data:recevierParams,
          success:function(ret){
            thiz.addRecevierAddress.recevierId = ret.data[0].id;
            thiz.selectReceviceDate.id = ret.data[0].id;
            thiz.addAddresseeDialog = false;
            thiz.recevierAddress = thiz.addRecevierAddress;
            thiz.address.recevier = thiz.getOptionsArry[0]+thiz.getOptionsArry[1]+thiz.getOptionsArry[2]+thiz.addRecevierAddress.detailAddress;
            thiz.getCascaderAddr = thiz.getOptionsArry[0]+"/"+thiz.getOptionsArry[1]+"/"+thiz.getOptionsArry[2];
            thiz.recevierShow = true;
          },
          error:function(err){
          }
        });
       }
        // 收件人---修改
        if (this.recevieaddressType == 'change') {
          let url = 'address/recevie/'+new Number(this.selectReceviceDate.id)+'/update';
          ts.sendRequest(url,{
            type:'PUT',
            data:recevierParams,
            success:function(ret){
              if(ret.success){
                  thiz.addRecevierAddress.recevierId = thiz.selectReceviceDate.id;
                  thiz.addAddresseeDialog = false;
                  thiz.recevierAddress = thiz.addRecevierAddress;
                  thiz.recevierShow = true;
                  thiz.getCascaderAddr = thiz.getOptionsArry[0]+"/"+thiz.getOptionsArry[1]+"/"+thiz.getOptionsArry[2];
                  thiz.address.recevier = thiz.getOptionsArry[0]+thiz.getOptionsArry[1]+thiz.getOptionsArry[2]+thiz.addRecevierAddress.detailAddress;
                  // 第一次修改后
                  thiz.addTime = 'two';
              }
            },
            error:function(err){

            }
          });
        }

      },
      //打开发件人新增地址
      addSenderAddressBtn(){
        this.addSenderAddress = {
          senderId:'',
          name:"",
          zipcode:"",
          city:"",
          goodsCate:"",
          phone:"",
          code:"",
          area:"",
          detailAddress:"",
          cardFrontUrl:"",
          cardFrontUrlShort:"",
          cardBackUrl:"",
          cardBackUrlShort:"",
          cardNum:"",
        };
        this.senderaddressType = 'add';
        this.senderAddType = '新增地址';
        this.addAddressDialog = true
      },
      // 拼接详细地址
      senderJointDetail(params){
        let thiz = this;
        this.address.sender = JSON.parse(this.addSenderAddress.area).english_name + thiz.addSenderAddress.city + thiz.addSenderAddress.detailAddress;
      },
      //保存发件人地址
      saveAddAddress(){
        //校验数据
        var thiz = this;
        let senderParams = {};
        let senderUrl = "address/senderAdd";
        let msg;
        var regChinese = new RegExp("[\\u4E00-\\u9FFF]+","g");
        // 发件人---选择地址簿
        if (this.selectSenderDate.id) {
          this.senderAddress.senderId = this.selectSenderDate.id
        }
        if (regChinese.test(this.addSenderAddress.detailAddress)) {
          msg = '发件人详细地址必须为英文名';
        }
        if (!this.addSenderAddress.detailAddress) {
          msg = '请填写发件人详细地址';
        }

        
　　    if(regChinese.test(this.addSenderAddress.city)){
          msg = "发件人城市必须为英文名！"
        }  
        if (!this.addSenderAddress.city) {
          msg = '请填写发件人城市英文名';
        }
        if(!this.addSenderAddress.area){
          msg = '请选择发件人国家';
        }

        var regPhone=/^[0-9]+$/
        if(!regPhone.test(this.addSenderAddress.phone)){
           msg = '发件人电话格式不正确'
        }

        if(!this.addSenderAddress.code){
          msg = '请选择发件人电话区号';
        }

        if (regChinese.test(this.addSenderAddress.name)) {
          msg = '发件人姓名必须为英文名';
        }
        if (!this.addSenderAddress.name) {
          msg = '请填写发件人姓名';
        }

        if (msg) {
          this.$message({
            message: msg,
            type: 'error'
          });
          return;
        }
        senderParams.code = thiz.addSenderAddress.code;
        senderParams.country_id = JSON.parse(thiz.addSenderAddress.area).id
        senderParams.sender = thiz.addSenderAddress.name;
        senderParams.city = thiz.addSenderAddress.city;
        senderParams.address = thiz.addSenderAddress.detailAddress;
        senderParams.zipcode = thiz.addSenderAddress.zipcode;
        senderParams.telephone = thiz.addSenderAddress.phone;
        
        // 发件人---新增
        if (this.senderaddressType == 'add') {
         ts.sendRequest(senderUrl,{
          data:senderParams,
          success:function(ret){
            if (ret.success) {
              thiz.senderJointDetail(JSON.parse(thiz.addSenderAddress.area).id);
              thiz.addSenderAddress.senderId = ret.data[0].id
              thiz.selectSenderDate.id = ret.data[0].id
              thiz.addAddressDialog = false;
              thiz.senderAddress = thiz.addSenderAddress
              thiz.senderShow = true;
            }
            else{
              thiz.$message({
                type:'error',
                message:ret.msg
              })
            }
          },
          error:function(err){
          }
        });
       }
       if(this.senderaddressType == 'change'){         // 发件人---修改
          let url = 'address/sender/'+new Number(this.selectSenderDate.id)+'/update';
          ts.sendRequest(url,{
            type:'PUT',
            data:senderParams,
            success:function(ret){
              thiz.senderJointDetail(JSON.parse(thiz.addSenderAddress.area).id);
              thiz.addSenderAddress.senderId = thiz.selectSenderDate.id;
              thiz.addAddressDialog = false;
              thiz.senderAddress = thiz.addSenderAddress;
              thiz.senderShow = true;
            },
            error:function(err){
              
            }
          });
        }
      },
      // 筛选物流线路
      typeChange(){
        let thiz = this;
        ts.sendRequest("common/channels",{
          type:"POST",
          isExit:true,
          data:{
            country_id:thiz.formInline.fromregion,
          },
          success:function(ret){
            if(ret.success){
              ret.data.forEach(function(r,i,k){
                if (r.name.indexOf('CC') != -1) {
                  ret.data.splice(i,1);
                }
              })
              thiz.logisticsLineList = ret.data;
            }else{
              thiz.$message({
                message: ret.msg,
                type: 'error'
              });
              if(ret.msg == "缺少国家参数或类型不正确"){
                setTimeout(function(){
                    thiz.$router.push({name:'OfficialWebsite'});
                },1000)
                  
              }
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
      // 修改发件人地址
      amendSenderAdds(){
        if(!this.senderAddress.senderId){
          this.$message({
            message: "请先选择地址簿",
            type: 'error'
          });
          return
        }
        this.senderAddType = '修改地址';
        this.senderaddressType = 'change';
        // this.senderShow = true;
        this.addAddressDialog = true;
        this.addSenderAddress = this.senderAddress;

      },
      // 修改收件人地址
      amendRecevierAdds(){
        // this.recevierShow = true;
        if(!this.recevierAddress.recevierId){
          this.$message({
            message: "请先选择地址簿",
            type: 'error'
          });
          return
        }
        
        this.addRecevierAddress = this.recevierAddress;
        // this.senderShow = true;
        
        this.loadType = true;
        this.recevieaddressType = 'change';
        this.addAddresseeDialog = true;
      },
      // 返回增值服务
      backPageServe(){
        this.stepTag = 2
      },
      // 返回地址簿
      backPageAddress(){
        this.stepTag = 1
      },
    //---选择商品页面---
      // 返回选择商品页面
      openCard: function(){
        $("#wxPay").append(this.wxPayImg);
        $("#wxPay").children().css({height:'350px',width:'350px',margin:'0px auto'});
      },

      opendAddressee(){
        if (this.recevieaddressType == 'add') {
          this.addType = '新增地址';
          $(".el-cascader>.el-input>input").val('')
        }
        if (this.recevieaddressType == 'change') {
           this.addType = '修改地址';
           let arry = this.getCascaderAddr.split('/');
           let arryOne = [arry[0],arry[1]];
           let arrtTwo = [arry[0],arry[1],arry[2]];
           this.loadAddress(arryOne);
           this.addGetOptionsArry = arrtTwo;
        }
      },
      backPageGoods(){
        this.stepTag = 0
      },
      // 到地址簿
      goodsToArdess(){
        let msg;
        if (this.selectedGoods.length == 0) {
          msg = '请先选择商品'
        }

        if (!this.conditionFrom.logisticsLine) {
          msg = '请先选择物流线路'
        }

        if (!this.conditionFrom.stores) {
           msg = '请先选择仓库'
         }

        if (!this.conditionFrom.customsType) {
          msg = '请先选择清关方式'
        }
        if (msg) {
          this.$message({
            message:msg,
            type:'error'
          });
          return
        }
        this.goodsWaybill();
    },
    chooseGoods(){
      let msg;
      if (!this.conditionFrom.customsType) {
        this.$message({
          message:'请先选择清关方式',
          type:'error'
        });
        return
      }
      if (!this.conditionFrom.stores) {
        this.$message({
          message:'请先选择仓库',
          type:'error'
        });
        return
      }
      if (!this.conditionFrom.logisticsLine) {
        this.$message({
          message:'请先选择物流线路',
          type:'error'
        });
        return
      }
      this.goodsInformation = {

      };
      this.searchGoods(this.page);
      this.chooseDialog = true
    },
      // 获取物流线路
      getList(){
        let thiz = this;
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
      goodsWaybill(){
        let thiz = this;
        let arr = [];
        if (!thiz.formInline.weight) {
          localStorage.setItem('isPage','true');
          this.$router.push('/OfficialWebsite');
          return;
        }
        this.selectedGoods.forEach(function(row,index,key){
          arr.push({id:row.id,num:row.num});
        });

        let data = {
          abroad_channels_id:thiz.selectedGoods[0].aborad_channels_id,
          clearance_type:thiz.conditionFrom.customsType,
          // goods:goodsIds,
          weight:Number(thiz.formInline.weight),
          length:Number(thiz.formInline.length),
          width:Number(thiz.formInline.width),
          height:Number(thiz.formInline.height),
          goods:arr
        };
        // 根据线路ID和清关关口ID来获取物流线路信息
        ts.sendRequest("common/wayline",{
          type:"POST",
          data:data,
          success:function(ret){
            if (ret.success&&ret) {
              thiz.finalLogisticPath = ret.data[0];
              thiz.stepTag=1;
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
      //  dialog确认
      doneChoose(){
        let thiz = this;
        if (this.tableGoods.length == 0) {
          return;
        }
        else{
          this.tableGoods.forEach(function(r,i,k){
            r.num = 1;
          })
        }
        if (this.selectedGoods.length == 0) {
          this.selectedGoods = this.tableGoods;
        }
        else{  
          // 两个数组去重
          this.tableGoods.forEach(function(r,i,k){
            if (JSON.stringify(thiz.selectedGoods).indexOf(JSON.stringify(r.name)) == -1) {
              thiz.selectedGoods.push(r)
            }
          }) 
        }
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
      // 跳转个人中心
      toPageCenter(){
        this.$router.push({name:'logisticsRecord'});
      },
      // 搜索商品
      searchGoods(page){
        let thiz = this;
        let url = "goods/clear/goodsData"+'?'+'page='+page.size+'&num='+page.num; 
        ts.sendRequest(url,{
          type:"POST",
          data:{
            keywords:thiz.goodsInformation.keyword,
            method:10, 
            goods_type:thiz.goodsInformation.selectTypeId,
            abroad_channels_id:thiz.conditionFrom.logisticsLine
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
    // 从仓库返回地址选择页面
    backAddress(){
      this.stepTag = 2;
      this.isChoose = false;
      if (this.getOptionsArry.length >0 ) {
        this.getCascaderAddr = this.getOptionsArry[0]+"/"+this.getOptionsArry[1]+"/"+this.getOptionsArry[2]
        // $(".el-cascader>.el-input>input").val(this.getOptionsArry[0]+"/"+this.getOptionsArry[1]+"/"+this.getOptionsArry[2]);
      }
    },
    // 发件人table转义国家
    senderCountry(r,c){
      let name;
      this.countries.forEach(function(i,o,k){
        if (r.country_id === i.id) {
          name = i.name
        }
      })
      return name;
    },
    // 发件人地址添加
    senderAdd(){
      if (this.chooseAddress.length == 1) {
        this.selectSenderDate = this.chooseAddress[0];
        this.senderAddress.senderId =  this.selectSenderDate.id;
        this.senderAddress.name = this.selectSenderDate.sender;
        this.senderAddress.zipcode = this.selectSenderDate.zipcode;
        // 过滤出选中的国家
        for(let i =0;i<this.countries.length;i++){
          if(this.selectSenderDate.country_id==this.countries[i].id){
            this.senderAddress.area = this.countries[i].str;
          }
        }
        // this.senderAddress.area= this.selectSenderDate.country_id;
        // 真的

        this.senderAddress.code = JSON.parse(this.selectSenderDate.code);
        this.senderAddress.city = this.selectSenderDate.city;
        this.senderAddress.detailAddress = this.selectSenderDate.address;
        this.senderAddress.phone = this.selectSenderDate.telephone;
        this.senderAddress.cardFrontUrlShort = this.selectSenderDate.card_image_no;
        this.senderAddress.cardBackUrlShort = this.selectSenderDate.card_image_no2;
        this.senderAddress.cardFrontUrl = config.fileURL + this.selectSenderDate.card_image_no;
        this.senderAddress.cardBackUrl = config.fileURL + this.selectSenderDate.card_image_no2;
        this.senderAddress.cardNum = this.selectSenderDate.card_no;

        // 发件人详细地址赋值
        this.address.sender = this.selectSenderDate.detail;

        this.senderDialog = false;
        this.senderShow = true;
      }
      else{
        this.$message({
          message:"请勾选一行地址！",
          type:'error'
        });
        return
      }
    },
    // 收件人地址添加
    recevierAdd(){
      if(this.chooseRecive.length == 1){
        this.selectReceviceDate = this.chooseRecive[0];

        let optionsIds = [];
        optionsIds.push(this.selectReceviceDate.province);
        optionsIds.push(this.selectReceviceDate.city);
        optionsIds.push(this.selectReceviceDate.district);
        this.selectedIds = optionsIds;

        let optionsArry = [];
        optionsArry.push(this.selectReceviceDate.province_name);
        optionsArry.push(this.selectReceviceDate.city_name);
        optionsArry.push(this.selectReceviceDate.district_name);
        this.getOptionsArry = optionsArry;

        // 用jquery来操作dom
        this.getCascaderAddr = this.selectReceviceDate.province_name+"/"+this.selectReceviceDate.city_name+"/"+this.selectReceviceDate.district_name;
        // $(".el-cascader>.el-input>input").val(val.province_name+"/"+val.city_name+"/"+val.district_name);

        this.address.recevier = this.selectReceviceDate.detail;
        this.recevierAddress.recevierId = this.selectReceviceDate.id;
        this.recevierAddress.name = this.selectReceviceDate.name;
        this.recevierAddress.zipcode = this.selectReceviceDate.zipcode;
        this.recevierAddress.detailAddress = this.selectReceviceDate.address;
        this.recevierAddress.cardNum = this.selectReceviceDate.card_no;
        this.recevierAddress.phone = this.selectReceviceDate.phone;
        this.recevierAddress.cardFrontUrlShort = this.selectReceviceDate.card_image_id;
        this.recevierAddress.cardBackUrlShort = this.selectReceviceDate.card_image_id2;
        if (this.selectReceviceDate.card_image_id) {
          this.recevierAddress.cardFrontUrl = config.fileURL + this.selectReceviceDate.card_image_id;
        }
        else{
          this.recevierAddress.cardFrontUrl = ''
        }
        if (this.selectReceviceDate.card_image_id2) {
          this.recevierAddress.cardBackUrl = config.fileURL + this.selectReceviceDate.card_image_id2;
        }
        else{
          this.recevierAddress.cardBackUrl = ''
        }
        this.receviceDialog = false;
        this.recevierShow = true;

        // 选择地址簿
        this.addTime = 'one';
      }else{
        this.$message({
          message:"请勾选一行地址！",
          type:'error'
        });
        return
      }

      
    },
    // 发件人地址簿选中
    senderSelectionChange(val){
      this.chooseAddress = val;
      // this.selectSenderDate = val;
    },
    // 收件人地址簿选中
    recevierChange(val){
      this.chooseRecive = val;
    },
    // 跳转到tag = 1
    toTagOne(){
      let msg;
      if (!this.formInline.fromregion || !this.formInline.toregion) {
        msg = "请选择国家"
      }

      let weightCall = ts.ruleNum(this.formInline.weight,'请填写重量','重量格式不正确');
      if( weightCall !== 'true'){
        msg = weightCall
      }
      let lengthCall = ts.ruleNum(this.formInline.length,'请填写长度','长度格式不正确');
      if( lengthCall !== 'true'){
        msg = lengthCall
      }
      let widthCall = ts.ruleNum(this.formInline.width,'请填写宽度','宽度格式不正确');
      if( widthCall !== 'true'){
        msg = widthCall
      }
      let heightCall = ts.ruleNum(this.formInline.height,'请填写高度','高度格式不正确');
      if( heightCall !== 'true'){
        msg = heightCall
      }
      if (msg) {
        this.$message({
          message:msg,
          type:'error'
        });
        return
      }
      this.stepTag = 1;
      this.isChoose = false;
      // 加载海关
      this.getClearPorts();
      // this.getLogisPaths();
      // 加载商品
    },
    handleGetOptionsChange(item){
      let thiz = this;
      this.getOptionsArry = this.$refs['getCascaderAddr'].currentLabels;
      // 处理级联选择数据
      let selIds = [];
      thiz.options.forEach(function(r,i,k){
        if(r.label === thiz.getOptionsArry[0]){

          selIds.push(r.value);

          r.children.forEach(function(q,w,e){

            if (q.label ===  thiz.getOptionsArry[1]) {

              selIds.push(q.value);

              q.children.forEach(function(z,x,c){

                if (z.label === thiz.getOptionsArry[2]) {

                  selIds.push(z.value);

                }
              })
            }
          })
        }
      });
      // 数据去重
      selIds.splice(3,3);
      thiz.selectedIds = selIds;


      $(".el-cascader>.el-input>input").val("");

    }, 

    // 重新加载
    loadAddress(val){
       let thiz = this;
       
        thiz.options.forEach(function(r,i,k){
         //加载市
         if (r.label == val[0]) {
            let url = 'address/data/'+JSON.parse(r.value);
            ts.sendRequest(url,{
              type:'GET',
              isExit:true,
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

                let ary = [];

                r.children.forEach(function(q,w,e){
                  if (q.label == val[1]) {
                    let url = 'address/data/'+JSON.parse(q.value);
                    ts.sendRequest(url,{
                      type:'GET',
                      isExit:true,
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
                  }
                });

              },
              error:function(err){
              }
            })
          }
      });
        
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
              isExit:true,
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
                isExit:true,
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
    // 改变送件方式
    changeDvStatus(index,st){
      if (st == 'dvCancel') {
        this.delivery[index].selected = false;
        this.selectedDelivery = '';

      }else{
        for(let i=0;i<this.delivery.length;i++){
          this.delivery[i].selected = false;
        }
        this.delivery[index].selected = true;
        this.selectedDelivery = this.delivery[index].id;
      }  
    },

    // 改变box状态
    changeStatus(index,st){
      let thiz = this;
      if (st === 'cancel') {
        this.services[index].selected = false;
        // 从已选择的移除
        for(let i=0;i<this.selectedService.length;i++){
          if(this.selectedService[i].id==this.services[index].id){
            this.selectedService.splice(i,1);
            break;
          }
        }
      }else{
        this.services[index].selected = true;
        this.selectedService.push(this.services[index]);
      }
    },

    // 处理选择仓库
    changeStoreStatus(index,st){
      let thiz = this;
      if (st === 'cancel') {

        this.selectedStoreId = undefined;
        this.stores[index].selected = false;

      }else{
        this.selectedStoreId = this.stores[index].id;

        for(let i=0;i<this.stores.length;i++){
          this.stores[i].selected = false;
        }
        this.stores[index].selected = true;
      }
    },

    // 运单支付
    payWaybill(){
      let thiz = this;
      $("#wxPay").empty();
      let params = {
        order_no:this.waybill.order.num,
        amount:this.waybill.order.price,
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
            localStorage.setItem('isPage','true');
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
            thiz.$router.push({name:'logisticsRecord',params:{type:'lookLogisics'}});
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

    },
    // 回调查询微信支付
    // 二维码接口请求后，调用查询支付接口
    queryWxPayResult(param){
      let thiz = this;
      let timeOut = setInterval(()=>{ 
        ts.sendRequest('waybill/wxpay/update',{
          isExit:true,
          data:{order_no:thiz.waybill.order.num},
          success:function(ret){
            if (ret.success) {
              clearInterval(timeOut);
              thiz.$message({
                message:'支付成功',
                type:'success'
              });
              localStorage.removeItem('centerStatus');
              thiz.$router.push({name:'logisticsRecord',params:{type:'lookLogisics'}});
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
    // 获取个人信息
    getUserMsg(){
      let thiz = this;
      ts.sendRequest('member/info',{
        data:{},
        type:'GET',
        success:function(r){
          ts.save("fullAccount",r.data);
        },
        error:function(e){

        }
      });
    },
    // 生成运单
    creatWaybill(){

      let thiz = this;
      // 构建选择服务ids
      let servicesIds = [];
      this.selectedService.forEach(function(r,i,k){
        servicesIds.push(r.id)
      })

      let fullAccount = ts.get("fullAccount");

      // 构造选择的商品的ID的数组
      let goodsIds = [];
      for(let i=0;i<this.selectedGoods.length;i++){
        goodsIds.push({
          id:this.selectedGoods[i].id,
          num:this.selectedGoods[i].num
        });

      }

      let params = {

        member_id:fullAccount?fullAccount.id:"",

        // abroad_channels_id:thiz.goodsInfoForm.logisticsPath?JSON.parse(thiz.goodsInfoForm.logisticsPath).id:"",
        abroad_channels_id:this.selectedGoods[0].aborad_channels_id,
        // clear_port_id:this.goodsInfoForm.logisticsPath?JSON.parse(this.goodsInfoForm.logisticsPath).clear_port_id:"",
        clear_port_id:this.selectedGoods[0].clear_port_id,
        store_id:this.conditionFrom.stores,
        vas_id:servicesIds,

        length:this.formInline.length,
        width:this.formInline.width,
        height:this.formInline.height,
        weight:this.formInline.weight,

        // number:goodsIds.length,
        goods:goodsIds,
        actual_price:this.finalLogisticPath.sumPrice,

        address:this.recevierAddress.recevierId,
        send_address:this.senderAddress.senderId,
        clear_port_type:this.scKey?this.scKey:"",

        send_type:this.selectedDelivery
      };

      ts.sendRequest('waybill/add',{
        data:params,
        success:function(ret){
          let obj = ret.data;
          thiz.waybill.order.price = ret.data.actual_price;
          thiz.waybill.order.num = ret.data.order_no;
          thiz.waybill.order.money = JSON.parse(fullAccount).balance;
          thiz.getUserMsg();
          thiz.stepTag = 4
        },
        error:function(err){

        }
      });

    },
    // 确认服务选择信息
    serveCheck(){
      if (this.selectedDelivery) {
        this.stepTag = 3;
      }
      else{
        this.$message({
          message: "请先选择送件方式",
          type: 'error'
        });
      }
      
    },
    // 获取仓库
    getWarehouse(){

    },
    //  选择仓库
    choiceWarehouse(){
      let thiz = this;
      if (!this.selectedStoreId) {
        this.$message({
          message:'请选择仓库',
          type:'error'
        })
        return;
      }
      this.stepTag = 2;
      this.isChoose = false;
      // 加载增值服务的数据
      ts.sendRequest("waybill/vas",{
        type:"GET",
        data:{},
        success:function(ret){

          for(let i=0;i<ret.data.length;i++){
            ret.data[i].selected = false;
            ret.data[i].thumbFullPath = config.fileURL+ret.data[i].thumb;
          }

          thiz.services = ret.data;

        },
        error:function(err){
          thiz.$message({
            message: "数据加载失败",
            type: 'error'
          });
        }
      });
    },
    // 加载增值服务
    loadServe(){
      let thiz = this;
      ts.sendRequest("waybill/vas",{
        type:"GET",
        data:{},
        success:function(ret){
          for(let i=0;i<ret.data.length;i++){
            ret.data[i].selected = false;
            ret.data[i].thumbFullPath = config.fileURL+ret.data[i].thumb;
          }
          thiz.services = ret.data;
        },
        error:function(err){
        }
      });
    },
    // 加载送件方式
    loadDelivery(){
      let thiz = this;
      ts.sendRequest("common/deliveryMode",{
        type:"GET",
        data:{},
        success:function(ret){
          thiz.storesList.forEach(function(r,i,k){
            if (r.id == thiz.conditionFrom.stores) {
              ret.data.forEach(function(row,index,key){
                row.imgUrl = config.fileURL+row.image;
                row.detail = r.default_address;
                row.default_sender = r.default_sender;
                row.phone = r.phone;
                row.selected = false;
              })
            }
          });

          thiz.delivery = ret.data;
        },
        error:function(err){
        }
      });
    },
    // 确认发件人收件人地址
    addressCheck(){
      let thiz = this;
      if (!this.submitAddress()) {
        return;
      }

      // 收件人地址和发件人地址id存在，才能进行下一步
      if (this.senderAddress.senderId && this.recevierAddress.recevierId) {
        this.loadServe();
        this.loadDelivery();
        this.stepTag = 2;
        this.isChoose = false;
      }
      else{
        this.$message({
          message: "请先填写发件人或收件人地址",
          type: 'error'
        });
      }

    },
    changeStep: function(e, tag) {
      this.stepTag = tag;
      this.isChoose = false;

      // 选择商品信息，要选择海关，加载商品列表
      if(tag==1){
        this.getClearPorts();
      }

      // 选择收件人/发件人，要加载地区数据
      if(tag==2){
        this.getArea();
      }

      // 
      if(tag==3){

      }

      if (tag==4) {
      }

    },
    // 获取清关口岸
    getClearPorts(){
      let thiz = this;
      ts.sendRequest("common/clearportList",{
        type:"GET",
        data:{},
        success:function(ret){

          for(let i=0;i<ret.data.length;i++){
            ret.data[i].str = JSON.stringify(ret.data[i]);
          }
          thiz.clearPorts = ret.data;

        },
        error:function(err){
          thiz.$message({
            message: "数据加载失败",
            type: 'error'
          });
        }
      });
    },
    // 获取物流线路
    getLogisPaths(){
      let thiz = this;
      ts.sendRequest("common/channels",{
        type:"POST",
        data:{
          country_id:thiz.formInline.fromregion?JSON.parse(thiz.formInline.fromregion).id:"",
        },
        success:function(ret){

          for(let i=0;i<ret.data.length;i++){
            ret.data[i].str = JSON.stringify(ret.data[i]);
          }
          thiz.logisticsPaths = ret.data;

        },
        error:function(err){
          thiz.$message({
            message: "数据加载失败",
            type: 'error'
          });
        }
      });
    },
    showChoose: function(e,curTag) {
      let thiz = this;
      if (this.selectedGoods.length === 0) {
        this.$message({
          message: "请先选中商品",
          type: 'error'
        });
        return;
      }
      this.isChoose = true;
      this.stepTag = 1;

      // 判断是否是选择货物信息的提交
      if(curTag==1){

        // 构造选择的商品ID
        let goodsIds = [];
        for(let i=0;i<thiz.selectedGoods.length;i++){
          goodsIds.push(thiz.selectedGoods[i].id);
        }

        let data = {
          id:thiz.selectedGoods[0].aborad_channels_id,
          clear_port_id:thiz.selectedGoods[0].clear_port_id,
          // goods:goodsIds,
          weight:Number(thiz.formInline.weight),
          length:Number(thiz.formInline.length),
          width:Number(thiz.formInline.width),
          height:Number(thiz.formInline.height),
        };

        // 根据线路ID和清关关口ID来获取物流线路信息
        ts.sendRequest("common/wayline",{
          type:"POST",
          data:data,
          success:function(ret){
            if(ret&&ret.success){

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

        // 计算物流费用（暂时以商品价格算）
        let totalFee = 0;
        for(let i=0;i<this.selectedGoods.length;i++){
          totalFee = totalFee + Number(this.selectedGoods[i].record_price);
        }
        this.fee = totalFee;

      }
    },
    hideChoose: function(e) {
      this.isChoose = false;
      this.stepTag = 1;
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleRemove(file, fileList) {
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleConfirm() {
      this.$refs.upload.submit();
    },
    chooseSc:function(e,index,key,id){
      this.scIndex = index;
      this.scKey = key;
    },
    choosePay:function(e,type){
      this.payType = type;
    },
    // 申报商品
    applyGoods:function(){
      let thiz = this;
      ts.save("centerStatus",{
          name:"goodsDeclaration",
          first:"物流管理",
          second:"物品申报",
          key:2,
          id:["0"]
        });
      // 跳转到个人中心的申报页面
      thiz.$router.push({name:'goodsDeclaration'});

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
      this.$notify.success({
        title: '成功',
        message: response.msg
      });
      // 拼接显示图片
      this.goodsInfoForm.applyInfo.goodsTicketUrl = config.fileURL+response.data;
      this.goodsInfoForm.applyInfo.goodsTicketUrlShort = response.data;

      this.imgUrls.push(response.data);
    },

    // 发货人身份证正面上传成功回调
    senderFrontSuccess(response, file, fileList){
      let thiz = this;
      // 拼接显示图片
      this.senderAddress.cardFrontUrl = config.fileURL+response.data;
      this.senderAddress.cardFrontUrlShort = response.data;
    },
    // 发货人身份证背面面上传成功回调
    senderBackSuccess(response, file, fileList){
      let thiz = this;
      // 拼接显示图片
      this.senderAddress.cardBackUrl = config.fileURL+response.data;
      this.senderAddress.cardBackUrlShort = response.data;
    },

    // 收货人身份证正面上传成功回调
    recevierFrontSuccess(response, file, fileList){
      let thiz = this;
      // 拼接显示图片
      this.addRecevierAddress.cardFrontUrl = config.fileURL+response.data;
      this.addRecevierAddress.cardFrontUrlShort = response.data;
    },
    // 收货人身份证背面面上传成功回调
    recevierBackSuccess(response, file, fileList){
      let thiz = this;
      // 拼接显示图片
      this.addRecevierAddress.cardBackUrl = config.fileURL+response.data;
      this.addRecevierAddress.cardBackUrlShort = response.data;
    },

    // 新增地址
    submitAddress(){
     let thiz = this;
      
      
      return true;
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

    addressSenderChange(val){
        this.page.size = val;
        let page = {
          size:val,
          num:this.page.num
        };
        this.showSenderAdds(page)
    },

    addressRecevierChange(val){
        this.page.size = val;
        let page = {
          size:val,
          num:this.page.num
        };
        this.showRecevierAdds(page)
    },

    // 显示发货人地址列表
    showSenderAdds(params){
      let thiz = this;
      this.restore();
      this.senderTableDate = [];
      let sendUrl = "address/sender"+'?'+'page='+params.size+'&num='+params.num;
      ts.sendRequest(sendUrl,{
        data:{},
        isExit:true,
        success:function(res){
          thiz.allNum = res.count;
          thiz.senderTableDate = res.data
        },
        error:function(err){

        }
      });
      this.senderDialog = true
    },
    restore(){
      this.page = {
        size:1,
        num:5
      }
    },
    // 显示收货人地址列表
    showRecevierAdds(params){
      let thiz = this;
      this.restore();
      this.receviceTableDate = [];
      let sendUrl = "address/recevie"+'?'+'page='+params.size+'&num='+params.num;
      ts.sendRequest(sendUrl,{
        data:{},
        isExit:true,
        success:function(res){
          thiz.allNum = res.count;
          thiz.receviceTableDate = res.data
        },
        error:function(err){
        }
      });
      this.receviceDialog = true
    },
    // 监听选择区域变化
    provinceChange(){
      let thiz = this;
      if(thiz.recevierAddress.province){
        let pid = JSON.parse(thiz.recevierAddress.province).id;
        thiz.getCities(pid);
      }
    },
    cityChange(){
      let thiz = this;
      if(thiz.recevierAddress.city){
        let pid = JSON.parse(thiz.recevierAddress.city).id;
        thiz.getAreas(pid);
      }
    },
  },
  mounted: function() {
    let thiz = this;
    this.getList();
    this.uploadUrl = config.uploadURL;
    this.getArea();
    // 加载公共数据
    ts.sendRequest("common/data",{
      type:"GET",
      data:{},
      success:function(ret){
        if(ret&&ret.success){

          // 处理数据
          for(let i=0;i<ret.data.country.length;i++){
            ret.data.country[i].str = JSON.stringify(ret.data.country[i]);
            // 物流目的地只能是中国
            if(ret.data.country[i].code=="CN"){
              thiz.formInline.toregion = ret.data.country[i].str;
            }
          }
          for(let i=0;i<ret.data.goods_type.length;i++){
            ret.data.goods_type[i].str = JSON.stringify(ret.data.goods_type[i]);
          }
          // for(let i=0;i<ret.data.clearport_list.length;i++){
          //   ret.data.clearport_list[i].str = JSON.stringify(ret.data.clearport_list[i]);
          // }
          for(let i=0;i<ret.data.coin.length;i++){
            ret.data.coin[i].str = JSON.stringify(ret.data.coin[i]);
          }
          for(let i=0;i<ret.data.declare_type.length;i++){
            ret.data.declare_type[i].str = JSON.stringify(ret.data.declare_type[i]);
          }
          for(let i=0;i<ret.data.unit.length;i++){
            ret.data.unit[i].str = JSON.stringify(ret.data.unit[i]);
          }
          for(let i=0;i<ret.data.brand_list.length;i++){
            ret.data.brand_list[i].str = JSON.stringify(ret.data.brand_list[i]);
          }
          // 设置国家
          thiz.countries = ret.data.country;
          // 设置清关方式
          thiz.clears = ret.data.clearance_type;
          // 设置默认第一种清关方式
          for(let key in ret.data.clearance_type){
            thiz.scKey = key;
            break;
          }

          // 设置商品类别
          thiz.goodsCates = ret.data.goods_type;
          thiz.goodsInfoForm.applyInfo.goodsCates = ret.data.goods_type;
          // 海关
          // thiz.clearPorts = ret.data.clearport_list;
          // 币种
          thiz.coinTypes = ret.data.coin;
          // 申报类型
          thiz.declareTypes = ret.data.declare_type;
          // 计量单位
          thiz.units = ret.data.unit;
          // 英文品牌
          thiz.enBrands = ret.data.brand_list;
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

  }
}

</script>
<style>
@import '../../css/public.scss';
@import '../../css/app.css';

.el-input__inner {
  background: rgba(244, 244, 244, 1);
  border: none;
  border-radius: 0px !important;
}

/*步骤样式*/
.step-item {
  background-color: #F4F4F4;
  width: 200px;
  position: relative;
  display: inline-block;
}

.step-item .step-title {
  color: #B3B3B3;
  padding: 0px 20px;
  height: 44px;
  background-color: #F4F4F4;
  width: calc(100% - 34px + 14px);
  line-height: 44px;
  text-align: center;
  float: left;
}

.step-item .step-tria {
  background-color: #F4F4F4;
  width: 28px;
  height: 28px;
  margin-top: 8px;
  margin-left: -14px;
  float: left;
  transform: rotate(45deg);
  box-sizing: content-box;
}

.step-item .step-tria-blank {
  background-color: transparent;
  width: 33px;
  height: 33px;
  margin-top: 4px;
  margin-left: -12px;
  float: right;
  transform: rotate(45deg);
  box-sizing: content-box;
  position: absolute;
  right: 0px;
  border-top: 3px solid white;
  border-right: 3px solid white;
  right: 6px;
}

.bt-box {
  border: 1px solid #D5D5D5;
  margin-top: 20px
}

.bt-span-sty {
  font-size: 8px;
  text-align: center;
  height: 30px;
  width: 50px;
  margin-top: 5px;
  color: #545454
}

.bt-select-sty {
  font-size: 9px;
  width: 120px;
  height: 30px;
  border: none;
  border-radius: 0;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  outline: none;
  text-align: center;
  text-align-last: center;
}

.bt-st-div {
  width: 0;
  height: 0;
  border-width: 6px;
  border-style: solid;
  border-color: #B3B3B3 transparent transparent transparent;
}

.bt-input-sty {
  font-size: 9px;
  height: 30px;
  width: 120px;
  background-color: #F4F4F4;
  border: none;
  outline: none;
  appearance: none;
  text-align: center;
  text-align-last: center;
}

.btn-form {
  margin-top: 15px
}

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

.input-and-select .el-input {
  width: 70%;
}

.input-and-select .el-select {
  width: 28%;
}
.el-input-number__decrease,.el-input-number__increase{
  display:none
}
.scopeNum {
    float: left;
    width: 100px;
    border-top: 1px solid rgba(244, 244, 244, 1);
    border-bottom: 1px solid rgba(244, 244, 244, 1);
}
.scopeNum input{
  background-color: #fff!important;
      text-align: center!important;
}
.btn:hover{
  background-color: rgb(17, 105, 193)!important;
}
.width-paved-code .el-input.el-input--suffix{
  margin-right: 0!important;
  width: 106px!important;
}
.width-paved-code .el-input--suffix .el-input__inner {
    padding-right: 15px;
}
.el-select.width-paved-code{
      margin-right: 28px;
}

.el-table--striped .el-table__body tr.el-table__row--striped.current-row td, .el-table__body tr.current-row>td, .el-table__body tr.hover-row.current-row>td, .el-table__body tr.hover-row.el-table__row--striped.current-row>td, .el-table__body tr.hover-row.el-table__row--striped>td, .el-table__body tr.hover-row>td{
      background-color: #c0d8f3;
}
</style>
