<!--
 * @name sysMessage.vue
 * @author 王刚
 * @date 2019.4.18
 * @desc 系统信息
-->
<template>
  <div>
    <div class="xyj-edit-form" style="padding-right:20px;">
      <!--<h2>{{this.$store.state.keepAliveName}}</h2>-->
      <img src="../../assets/tixing.png" style="width:14px;height:14px;background-color:white;">
      <label style="top:1px;position:relative;margin-left:6px;">注意事项：</label>
      <div style="margin-top:11px;margin-left:25px">1.请将身份证附件文件打包压缩成一个，ZIP格式的压缩文件后上传，压缩文件的大小不能超过10M；</div>
      <div style="margin-top:11px;margin-left:25px">2.身份证图片文件以身份证号码命名，格式为.jpg或者JPG；</div>
      <div style="margin-top:11px;margin-left:25px">3.如果一个身份证有多张图片文件（不能超过两张），文件名为身份证号码后加下划线和序号。</div>
      <div style="margin-top:11px;;margin-left:25px;color:#FF0000">（如42032219891223xxxx_1.jpg，42032219891223xxx_2.jpg）</div>
    </div>
    <div>
       <el-upload
        :action="uploadUrl"
        name="file"
        ref="upload"
        :multiple="true"
        :headers="uploadHeader"
        :on-error="errorUpload"
        :on-success="successUpload"
        accept=".zip"
        :auto-upload="true">
        <el-button size="small" type="primary" style="margin-left:850px">点击上传</el-button>
      </el-upload>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="card_no" label="身份证号" width="200">
        </el-table-column>
        <el-table-column label="身份证正面照" align="center" width="330">
          <template slot-scope="scope">
            <div style="display:inline-block;cursor:pointer;">
              <img :src="scope.row.frontImg" style="width:200px;height:70px;margin-right:3px;background-color:white;cursor:pointer;">
            </div>
          </template>
        </el-table-column>
        <el-table-column label="身份证反面照" align="center" width="330">
           <template slot-scope="scope">
            <div style="display:inline-block;cursor:pointer;">
              <img :src="scope.row.backImg" style="width:200px;height:70px;margin-right:3px;background-color:white;cursor:pointer;">
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作"> 
          <template slot-scope="scope">
            <div @click="delFromSelect(scope.row)" style="display:inline-block;cursor:pointer;">
              <img src="../../assets/delete.png" style="width:14px;height:14px;margin-right:3px;background-color:white;cursor:pointer;">
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
</template>
<script>
import Vue from 'vue'
import Tools from '@/lib/Tools';
import config from "@/config.js";

let ts = Tools.getInstance();

export default {
  name: 'sysMessage',
  data() {
    return {
       // 上传地址
      uploadUrl:'',
      // 图片上传请求头
      uploadHeader:{Authorization:"Bearer "+localStorage.getItem('account')},
      tableData: [],
      page:{
        size:1,
        num:5
      },
       // 总条数
      allNum:0,
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
    // 页码变动
    handleCurrentChange(val){
      this.page.size = val;
      let page = {
        size:val,
        num:this.page.num
      };
      this.getPage(page)
    },
    // 删除身份证信息
    delFromSelect(row){
      let thiz = this;

      this.$confirm('确认删除？')
        .then(_ => {
          ts.sendRequest('personcenter/info/card/delete',{
            data:{id:row.id},
            success:function(res){
              thiz.restore();
              thiz.getPage(thiz.page)
            },  
            error:function(ero){

            }
          })
        })
        .catch(_ => {});

    },
    // 图片失败
    errorUpload(err,file,fileList){
      // this.$message({
      //     message: msg,
      //     type: 'error'
      // });
    },
    // 图片成功
    successUpload(response, file, fileList){
      if (response.success) {
        this.$notify.success({
          title: '成功',
          message: response.msg
        });
      }
      else{
        this.$notify.error({
          title: '失败',
          message: response.msg
        });
      }
      this.restore();
      this.getPage(this.page);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        } else {
          return false;
        }
      });
    },
    selectChange(selection, rowData) {
    },
    getPage(params){
      let thiz = this;
      let url = "personcenter/info/card/list"+'?'+'page='+params.size+'&num='+params.num;
      ts.sendRequest(url,{
        type:'GET',
        data:{},
        success:function(ret){
          thiz.allNum = ret.count;  
          ret.data.forEach(function(r,i,k){
            r.frontImg = config.fileURL + r.card_1_file;
            r.backImg = config.fileURL + r.card_2_file;
          })
          thiz.tableData = ret.data;
        },
        error:function(err){
        }
      });
    }
  },
  mounted: function() {
    this.uploadUrl = config.baseURL+'personcenter/info/upload/cardimage';
    this.getPage(this.page);
  }
}
</script>
<style scoped>
  .el-upload-list__item-name{
    display:none !important
  }
</style>
