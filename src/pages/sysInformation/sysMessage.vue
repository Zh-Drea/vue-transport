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
      <el-form :inline="true" :model="finRecordsForm" ref="finRecordsForm" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12" :offset="4">
            <el-form-item label="关键词" prop="keyWord" style="margin-bottom:0;">
              <el-input v-model="finRecordsForm.keyWord" placeholder="请输入关键词"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" class="btn-middle">
            <el-button @click="submitForm('finRecordsForm')" round>搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <el-tabs v-model="currentTab" class="no-border-tabs">
        <el-tab-pane label="通知信息" name="pendingDisposal" :key="'pendingDisposal'">
          <div style="background: yellow; display: inline" class="no-border-table">
            <v-table is-horizontal-resize style="width:100%" :columns="disposalColumns" :table-data="disposalTableData" row-hover-color="#eee" row-click-color="#edf7ff" :select-change="selectChange"></v-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="系统信息" name="aaa" :key="'aaa'">
          <div style="background: yellow; display: inline">
            231231
          </div>
        </el-tab-pane>
      </el-tabs>
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
      finRecordsForm: {
        keyWord: ''
      },
      currentTab: 'pendingDisposal',

      disposalTableData: [
        { "line": "德国-广州-北京", "state": "待支付" },
      ],
      disposalColumns: [
        { width: 60, titleAlign: 'center', columnAlign: 'center', type: 'selection' },
        { field: 'line', title: '标题', width: 250, titleAlign: 'center', columnAlign: 'center', isResize: true },
        { field: 'state', title: '内容', width: 280, titleAlign: 'center', columnAlign: 'center', isResize: true },
        { field: 'custome-adv', title: '操作', width: 150, titleAlign: 'center', columnAlign: 'center', componentName: 'sys-table-operation', isResize: true }
      ]

    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        } else {
          return false;
        }
      });
    },

    selectChange(selection, rowData) {
    }
  },
  mounted: function() {

  }
}


// 自定义列组件
Vue.component('sys-table-operation', {
  template: `<span>
        <a href="javascript:void(0);" class="btn btn-mini" @click.stop.prevent="toPayment(rowData,index)">去处理</a>&nbsp;
    <a href="javascript:void(0);" style="margin-left:10px;" class="btn-delete" @click.stop.prevent="deleteRow(rowData,index)"><i class="el-icon-delete"></i></a>
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
    toPayment() {

      // 参数根据业务场景随意构造
      let params = { type: 'edit', index: this.index, rowData: this.rowData };
    },

    deleteRow() {

      // 参数根据业务场景随意构造
      let params = { type: 'delete', index: this.index };
      this.$emit('on-custom-comp', params);

    }
  }
})

</script>
<style scoped>
</style>
