<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import config from "./config.js";
import Tools from "./lib/Tools.js";
let Ts = Tools.getInstance();
export default {
  name: 'app',
  components: {
  },
  mounted:function(){
    if (localStorage.getItem('fullAccount')) {
        this.$store.dispatch('saveLoginAction',{isLogin:true,data:localStorage.getItem('isExitName')});
      }
      else{
        this.$store.dispatch('saveLoginAction',{isLogin:false,data:''});
      }
      // location.reload();
      // this.$router.go(0);  
	// 显示默认的路由
 //  if (Ts.get('name')) {
    
 //  }
	// else{
 //     this.$router.replace({name:config.defaultRoute,params:{}});
 //  }
  },
}

</script>
<style>
  .el-input__inner{
    color:black !important
  }
</style>