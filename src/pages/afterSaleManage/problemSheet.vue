  <!--
   * @name problemSheet.vue
   * @author 王刚
   * @date 2019.4.18
   * @desc 问题工单
 -->
 <template>
  <div>
    <!------------------------- 问题工单 ------------------------>
    <div v-if="isSubWorkOrder === 1">
      <div class="xyj-edit-form" style="padding-right:20px;">
        <el-form :model="proWorkOrderForm" ref="proWorkOrderForm" label-width="80px">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="问题标题:" prop="proTitle">
                <el-input v-model="proWorkOrderForm.proTitle" placeholder="请输入问题标题"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="问题单号:" prop="proCode">
                <el-input v-model="proWorkOrderForm.proCode" placeholder="请输入物品单号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="时间:">
                <el-date-picker
                  v-model="proWorkOrderForm.date"
                  type="datetimerange"
                  range-separator="~"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" style="text-align:center;"class="btn-middle">
              <el-button icon="el-icon-search" @click="searchForm()" round>搜索</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="xyj-edit-form" style="position:relative;text-align:center;">
          <el-button class="pos-ab-right" size="small" type="primary" @click="submitDec" icon="el-icon-plus">提交工单</el-button>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="work_no" label="订单号" width="220">
            </el-table-column>
            <el-table-column prop="title" label="问题标题" width="220">
            </el-table-column>
            <el-table-column prop="status" label="处理状态" width="220">
              <template slot-scope="scope">
                <p v-if="scope.row.status == 10" style="color:red">待处理</p>
                <p v-if="scope.row.status == 20">处理完成</p>
              </template>
            </el-table-column>
            <el-table-column label="操作"> 
              <template slot-scope="scope">
                <div style="display:flex;;cursor:pointer;">
                  <el-button size="mini" @click="delFromSelect(scope.row)">删除</el-button>
                  <el-button size="mini" @click="toDetails(scope.row.id)">详情</el-button>
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
    <!------------------------- 提交工单 ------------------------>
    <div v-if="isSubWorkOrder === 2">
      <div class="xyj-edit-form label-100" style="padding-right:20px;width:1000px">
        <!-- 警告信息 -->
        <div style="padding-bottom:15px;color:rgba(255,0,0,1);position:relative;">
          <div style="background:rgba(255,176,176,1);opacity:0.23;width:100%;height:30px;height:36px;"></div>
          <div style="position:absolute;top: 8px;left: 15px;"><i class="el-icon-warning" style="margin-right:15px;"></i>提交工单帮助内容</div>
        </div>
        <!-- 提交工单form -->
        <el-form :inline="true" :model="postSheetForm" ref="postSheetForm" label-width="100px">
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item  label="帮助类型:" prop="helpType" required>
                <el-select v-model="postSheetForm.helpType" style="width:200px">
                  <!-- <el-option value="" label="请选择类型"></el-option> -->
                  <el-option
                    v-for="item in typeList" 
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="11" :offset="2">
              <el-form-item label="帮助标题:" prop="helpTitle" required>
                <el-input v-model="postSheetForm.helpTitle" placeholder="帮助标题"></el-input>
              </el-form-item>
            </el-col>
          </el-row> 
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="帮助内容:" prop="helpContent" required>
               <el-input type="textarea" v-model="postSheetForm.helpContent"></el-input>
             </el-form-item>
           </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="图片附件:" prop="userName">
                <!-- 第一张 -->
                <div style="display:inline-block;vertical-align:top;">
                  <div :style="frontStyle">
                    <img :src="postSheetForm.showImgOne" style="width:100%;height:100%;position:relative;z-index:2;background-color:transparent;" v-if="postSheetForm.showImgOne">
                    <label style="color:#B3B3B3;font-size:12px;display:none;width:30px;text-align:center;position:absolute;left:65px;top:40px;">附件</label>
                  </div>
                  <el-upload
                    :action="uploadUrl" 
                    name="file"
                    ref="upload"
                    :multiple="true"
                    :headers="uploadHeader"
                    :on-error="errorUpload"
                    :on-success="successUploadOne"
                    :auto-upload="true"
                    style="background-color:transparent;text-align:left;position:absolute;width:100%;height:100%;top:0px;opacity:0;z-index:3;">

                    <i class="el-icon-plus" style="font-size:40px;display:block;background-color:transparent;width:160px;height:100px;"></i>

                  </el-upload>
                </div>
                <!-- 第二张 -->
                <div style="display:inline-block;margin-left:10px;vertical-align:top;">
                  <div :style="backStyle">
                    <img :src="postSheetForm.showImgTwo" style="width:100%;height:100%;position:relative;z-index:2;background-color:transparent;" 
                      v-if="postSheetForm.showImgTwo">
                    <label style="color:#B3B3B3;font-size:12px;display:none;width:30px;text-align:center;position:absolute;left:65px;top:40px;">附件</label>
                  </div>
                  <el-upload
                    :action="uploadUrl"
                    name="file"
                    ref="upload"
                    :multiple="true"
                    :headers="uploadHeader"
                    :on-error="errorUpload"
                    :on-success="successUploadTwo"
                    :auto-upload="true"
                    style="background-color:transparent;text-align:left;position:absolute;width:100%;height:100%;top:0px;opacity:0;z-index:3;">
                    <i class="el-icon-plus" style="font-size:40px;display:block;background-color:transparent;width:160px;height:100px;"></i>
                  </el-upload>
                </div>
                <!-- 第三张 -->
                <div style="display:inline-block;margin-left:10px;vertical-align:top;">
                  <div :style="threeStyle">
                    <img :src="postSheetForm.showImgThree" style="width:100%;height:100%;position:relative;z-index:2;background-color:transparent;" 
                      v-if="postSheetForm.showImgThree">
                    <label style="color:#B3B3B3;font-size:12px;display:none;width:30px;text-align:center;position:absolute;left:65px;top:40px;">附件</label>
                  </div>
                  <el-upload
                    :action="uploadUrl"
                    name="file"
                    ref="upload"
                    :multiple="true"
                    :headers="uploadHeader"
                    :on-error="errorUpload"
                    :on-success="successUploadThree"
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
              <el-button type="primary" size="small" round @click="submitForm()">提交</el-button>
              <el-button type="primary" size="small" round @click="goBack">返回</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div v-if="isSubWorkOrder === 3">
      <div class="xyj-edit-form" style="padding-right:20px;">
        <div style="margin-top:10px;margin-left:20px"><strong style="margin-right:20px">工单标题:</strong>{{job.title}}</div>
        <div style="display:flex;flex-direction:row;color:grey;margin-top:10px;margin-left:20px">
          <p>{{job.time}}</p>
          <p style="margin-left:15px">{{job.sname }}</p>
        </div>  
        <div style="width:900px;height:1px;margin:15px auto;background-color:grey"></div>
        <div style="margin-top:10px;margin-left:20px"><strong style="margin-right:20px">工单内容:</strong>{{job.content}}</div>
        <div style="margin-top:10px;margin-left:20px;display:flex;flex-direction:row">
          <strong style="margin-right:20px">工单照片:</strong>
          <div v-for="item in job.img">
            <img :src="item" style="width:150px;height:120px;margin-right:40px"></img>
          </div>
        </div>
      </div>
      <el-row v-if="isExit">
        <el-col :span="2">
          <el-button @click="resolve" style="margin-bottom:15px" size="mini">已解决</el-button>
        </el-col>
        <el-col :span="2" :offset="20">
          <el-button size="mini" style="margin-left:20px" @click="isSubWorkOrder = 1">返回</el-button>
        </el-col>
      </el-row>
      <el-row v-if="!isExit">
        <el-col :span="2" :offset="22">
          <el-button size="mini" style="margin-left:20px" @click="isSubWorkOrder = 1">返回</el-button>
        </el-col>
      </el-row>
      <div v-if="isExit">
        <el-input
          type="textarea"
          placeholder="请输入回复信息"
          v-model="job.textarea">
        </el-input>
        <el-row>
          <el-col :span="2" :offset="22">
            <el-button  @click="reply" size="mini" style="margin-left:20px;margin-top:10px">回复</el-button>
          </el-col>
        </el-row>
      </div>
      <div v-if="job.msgBoard.length != 0" style="margin-top:20px" v-for="item in job.msgBoard">
        <!-- 右边 -->
        <div v-if="item.member_id" style="margin-left:660px" id="item">
          <div style="display:flex;flex-direction:row;margin-bottom:15px">
            <img style="height:46px;width:46px;border-radius:50px" :src="item.img"/>
            <div>
              <div style="font-size:14px;color:white;margin-left:30px">{{item.name}}</div>
              <div style="margin-bottom:15px;color:white;margin-left:30px">{{item.create_time}}</div>
            </div>
          </div>
          <div>{{item.content}}</div>
        </div>
        <!-- 左边 -->
        <div v-if="!item.member_id" id="item">
          <div style="display:flex;flex-direction:row;margin-bottom:15px">
            <img style="height:46px;width:46px;border-radius:50px" :src="item.img"/>
            <div>
              <div style="font-size:14px;color:white;margin-left:30px">{{item.name}}</div>
              <div style="margin-bottom:15px;color:white;margin-left:30px">{{item.create_time}}</div>
            </div>
          </div>
          <div>{{item.content}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Tools from '@/lib/Tools';
import config from "@/config.js";

let ts = Tools.getInstance();

export default {
  name: 'problemSheet',
  data () {
    return {
      isShow:true,
      /***** 问题工单 *****/
      proWorkOrderForm:{
        proTitle: '',
        proCode:'',
        date: ''
      },

      // // 搜索form验证
      // selectRules: {
      //   proTitle: [
      //     { required: true, message: '请输入问题标题', trigger: 'blur' }
      //   ],
      //   proCode: [
      //     { required: true, validator: '请输入问题单号', trigger: 'blur' }
      //   ],
      //   date: [
      //     { required: true, message: '请输入时间', trigger: 'blur' }
      //   ]
      // },
      
      curTabIndex: 'pendingDisposal',

      tableData: [],

      isSubWorkOrder:1,


      /***** 提交工单 *****/
      dialogImageUrl: '',
      dialogVisible: false,
      postSheetForm: {
        helpType: '',
        helpTitle:'',
        helpContent:'',
        imgOne:'',
        imgTwo:'',
        imgThree:'',
        showImgOne:'',
        showImgTwo:'',
        showImgThree:''
      },

        //提交工单数据
      rules: {
        helpType: [
        { required: true, message: '请输入帮助类型', trigger: 'blur' }
        ],
        helpTitle: [
        { required: true, message: '请输入帮助标题', trigger: 'blur' }
        ],
        helpContent: [
        { required: true, message: '请输入帮助内容', trigger: 'blur' }
        ]
      },
      // 上传样式
      frontStyle:"width:160px;height:100px;display:inline-block;position:relative;cursor:pointer;background-image:url("+require('../../assets/load1.png')+");background-size:100% 100%;",
      backStyle:"width:160px;height:100px;display:inline-block;position:relative;margin-left:10px;cursor:pointer;background-image:url("+require('../../assets/load2.png')+");background-size:100% 100%;",
      threeStyle:"width:160px;height:100px;display:inline-block;position:relative;margin-left:10px;cursor:pointer;background-image:url("+require('../../assets/load3.png')+");background-size:100% 100%;",
      // 上传地址
      uploadUrl:'',
      // 图片上传请求头
      uploadHeader:{Authorization:"Bearer "+localStorage.getItem('account')},
      // 上传后的图片数组
      imgUrls:[],
      // 工单类型
      typeList:[],
      // 工单内容
      job:{
        textarea:'',
        order:'',
        workNo:'',
        time:'',
        content:'',
        title:'',
        img:[],
        msgBoard:[]
      },
      // 按钮是否显示
      isExit:false,
      page:{
        size:1,
        num:5
      },
       // 总条数
       allNum:0,
      }
    },
    methods:{
      // 当返回后操作返回后
      restore(){
        this.page ={
          size:1,
          num:5
        }
      },
      statusCheck(r,c){
        return r.status == 10 ? '待处理' : '处理完成'
      },
      handleCurrentChange(val){
        this.page.size = val;
        let page = {
          size:val,
          num:this.page.num
        }
        this.loadPage(page)
      },
      // 回复
      reply(){
        let thiz = this;
        if (!this.job.textarea) {
          this.$message({
            message: "请填写回复信息",
            type: 'error',
            duration:1000
          });
          return;
        }
        ts.sendRequest('personcenter/job/reply',{
          data:{id:thiz.job.order,content:thiz.job.textarea},
          success:function(res){
            thiz.job.textarea = '';
            thiz.toDetails(thiz.job.order)
          },
          error:function(ero){

          }
        })
      },
      // 解决问题
      resolve(){
        let thiz = this;
        ts.sendRequest('personcenter/job/action',{
          data:{id:thiz.job.order},
          success:function(res){
            thiz.loadPage(thiz.page)
            thiz.isSubWorkOrder = 1;
          },
          error:function(ero){

          }
        })
      },
      // 调到详情页
      toDetails(row){
        let thiz = this;
        this.job.img = [];
        ts.sendRequest('personcenter/job/detail',{
          data:{id:row},
          success:function(res){
            // 按钮显示
            thiz.isExit = res.data.status ==10 ? true : false;
            thiz.job.order = res.data.id;
            thiz.job.workNo = res.data.work_no;
            thiz.job.title = res.data.title;
            thiz.job.content = res.data.content;
            thiz.job.time = res.data.create_time;
            if (res.data.status == 10) {
              thiz.job.sname = '待处理'
            }
            else{
              thiz.job.sname = '处理完成'
            }
            if(res.data.thumb0){
              thiz.job.img.push(config.fileURL+res.data.thumb0)
            } 
            if(res.data.thumb1){
              thiz.job.img.push(config.fileURL+res.data.thumb1)
            }
            if(res.data.thumb2){
              thiz.job.img.push(config.fileURL+res.data.thumb2)
            }
            if (res.data.list.length == 0) {
              thiz.job.msgBoard = [];
              thiz.isSubWorkOrder = 3;
              return;
            }
            res.data.list.forEach(function(r,i,k){
              r.img = config.fileURL + r.avatar;
            })
            thiz.job.msgBoard = res.data.list; 
            thiz.isSubWorkOrder = 3;
          },  
          error:function(ero){

          }
        })
      },
      // 删除工单
      delFromSelect(row){
        let thiz = this;
        this.$confirm('确认删除？')
          .then(_ => {
            
            ts.sendRequest('personcenter/job/delete',{
              data:{waybill_id:row.id},
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
      // 加载工单类型
      getTypeList(){
        let thiz = this;
        ts.sendRequest('personcenter/job/record/type/list',{
          data:{},
          type:'GET',
          success:function(res){
             thiz.typeList = res.data;
          },
          error:function(err){

          }
        })
      },

      loadPage(params){
        let thiz = this;
        this.tableData = [];
        // 查询条件
        let sendParams = {
          title:thiz.proWorkOrderForm.proTitle,
          job_no:thiz.proWorkOrderForm.proCode,
        };
        if (thiz.proWorkOrderForm.date) {
          sendParams.start_time = thiz.proWorkOrderForm.date[0];
          sendParams.end_time = thiz.proWorkOrderForm.date[1]
        }
        else{
          sendParams.start_time = '';
          sendParams.end_time = ''
        }

        let url = "personcenter/job/search"+'?'+'page='+params.size+'&num='+params.num;
        ts.sendRequest(url,{
          data:sendParams,
          success:function(ret){
            thiz.allNum = ret.count;
            thiz.tableData = ret.data
          },
          error:function(err){
            thiz.$message({
              message: "数据加载失败",
              type: 'error'
            });
          }
        });
      },


      // 加载table数据
      getTableData(){
        let thiz = this;
        thiz.tableData = [];
        ts.sendRequest('personcenter/job/list',{
          data:{},
          type:'GET',
          success:function(res){
            res.data.forEach(function(r,i,k){
              let plt ={
                id:r.id,
                status:r.status,
                code:r.work_no,
                line:r.title,
                state:r.status === 10 ? '待处理' : '处理完成'
              };
              thiz.tableData.push(plt);
            });
          },
          error:function(err){

          }
        })
      },
      // 搜索
      searchForm() {
        this.restore();
        this.loadPage(this.page)
      },
      // 提交
      submitForm(formName) {
        let thiz = this;
        // 字段校验
        let msg;
        if (!this.postSheetForm.helpContent) {
          msg = '请填写帮助内容'
        }
        if (!this.postSheetForm.helpTitle) {
          msg = '请填写帮助标题'
        }
        if (!this.postSheetForm.helpType) {
          msg = '请选择帮助类型' 
        }
        if (msg) {
          this.$message({
            message:msg,
            type:'error'
          });
          return;
        }
        let sendParams = {
          type_id:this.postSheetForm.helpType,
          title:this.postSheetForm.helpTitle,
          content:this.postSheetForm.helpContent,
          thumb:[]
        };
        if (this.postSheetForm.imgOne) {
          sendParams.thumb.push(this.postSheetForm.imgOne)
        }
        if (this.postSheetForm.imgTwo) {
          sendParams.thumb.push(this.postSheetForm.imgTwo)
        }
        if (this.postSheetForm.imgThree) {
          sendParams.thumb.push(this.postSheetForm.imgThree)
        }
        ts.sendRequest("personcenter/job/add",{
          data:sendParams,
          success:function(ret){
            thiz.restore();
            thiz.loadPage(thiz.page)
            thiz.goBack()
          },
          error:function(err){
            // this.$notify.error({
            //   title: '失败',
            //   message: err.msg
            // }) 
          }
        })
      },

      pushTabRoute(tab, event){

      	this.$router.push({name:tab.name, params: {paicheNo: "23123"}})

      },
      selectChange(selection,rowData){
     },

       /*
       *提交工单
       * */
       submitDec() {
        // 清除数据
        this.postSheetForm = {
          helpType: '',
          helpTitle:'',
          helpContent:'',
          imgOne:'',
          imgTwo:'',
          imgThree:'',
          showImgOne:'',
          showImgTwo:'',
          showImgThree:''
        };

        this.isSubWorkOrder = 2;
        this.$store.dispatch("editMenuListAction","提交工单");
        this.$store.dispatch("subWorkOrderAction",true)
       },

      //返回问题工单
      goBack(){
        this.isSubWorkOrder = 1;
        this.$store.dispatch("editMenuListAction","返回")
        this.$store.dispatch("subWorkOrderAction",false)
      },
      handleConfirm(){
        this.$refs.upload.submit();
      },
      // 图片失败
      errorUpload(err,file,fileList){
        this.$notify.error({
          title: '失败',
          message: err.msg
        })  
      },
      // 图片成功
      successUploadOne(response, file, fileList){
        this.$notify.success({
          title: '成功',
          message: response.msg
        });
        this.postSheetForm.showImgOne = config.fileURL+response.data;
        this.postSheetForm.imgOne = response.data;
      },
      successUploadTwo(response, file, fileList){
        this.$notify.success({
          title: '成功',
          message: response.msg
        });
        this.postSheetForm.showImgTwo = config.fileURL+response.data;
        this.postSheetForm.imgTwo = response.data;
      },
      successUploadThree(response, file, fileList){
        this.$notify.success({
          title: '成功',
          message: response.msg
        });
        this.postSheetForm.showImgThree = config.fileURL+response.data;
        this.postSheetForm.imgThree = response.data;
      },
    },
    mounted:function(){
      this.uploadUrl = config.uploadURL;

      this.loadPage(this.page);

      this.getTypeList()
    }
  }
  </script>

  <style scoped>
     #item {
        position: relative;
        margin-bottom:50px;
        width: 300px;
        min-height: 50px;
        background: #187CE8;
        border-radius: 5px;
        line-height: 50px;
        margin-left: 10px;
        word-break: break-word;
        color: white;
        padding: 5px;
        line-height: 18px;
    }
     #item::after {
            content: "";
            display: block;
            position: absolute;
            width: 0;
            height: 0;
            border: 8px solid transparent;
            border-right-color: #187CE8;
            top: 15px;
            left: -14px;
        }

    .xyj-edit-form .el-textarea__inner{
      min-height:150px!important;
    }
  </style>
