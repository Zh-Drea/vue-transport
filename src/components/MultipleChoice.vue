<!-- 多选组件 -->
<template>
  <el-select v-model="multiChoiceDate.value5" @change="handleChange" multiple placeholder="请选择">
    <el-option
      v-for="item in multiChoiceDate.options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  
  import Tools from '../lib/Tools';

  let ts = Tools.getInstance();

  export default {
    props:['multiChoiceDate'],
    data() {
      return {
          
      }
    },
    methods:{
      handleChange(){
        ts.emit("slectParams",this.multiChoiceDate.value5)
      }
    }
  }
</script>