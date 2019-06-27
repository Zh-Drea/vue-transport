<!-- 
  @name  NewsInformation.vue(新闻资讯)
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
  	name:'NewsInformation',
    data() {
      return {
      	msg:"新闻资讯"
      }
    },
    methods: {


    },
    mounted:function(){
    }
  };
</script>