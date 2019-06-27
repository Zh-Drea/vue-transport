<!-- 级联选择器 -->
<template>
  <div>
    <div class="block">
      <el-cascader
        :options="allDate.options"
        v-model="allDate.selectedOptions"
        @change="handleChange">
      </el-cascader>
    </div>
</div>
</template>

<script>
  
  import Tools from '../lib/Tools';

  let ts = Tools.getInstance();

  export default {
    props:['allDate'],
    data() {
      return {
      }
    },
    methods: {
      handleChange(value) {
        ts.emit("params","brow")
      }
    }
  };
</script>