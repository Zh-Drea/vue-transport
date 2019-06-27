<!-- 
  @name  NewsInformation.vue(联系方式)
  @author zlz
  @date 2019.04.17
 -->
<template>
	<div>
		<h4>数据展示:</h4>{{msg}}
	</div>	
</template>
<script>
  import Tools from "../lib/Tools.js";

  let Ts = Tools.getInstance();

  export default {
  	name:'ContactInformation',
    data() {
      return {
      	msg:"联系方式"
      }
    },
    methods: {


    },
    mounted:function(){
    }
  };
</script>