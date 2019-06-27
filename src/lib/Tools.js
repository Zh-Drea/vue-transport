
/**
 * @name Tools.js
 * @author lilei
 * @date 2019.03.26
 * @desc 全局公用函数库
 */
import config from "../config.js";
import Msg from "./Msg";
import Vue from 'vue';
// import router from '../router/index.js';
let v = new Vue();

export default class Tools{

	constructor(){
		
	}

	// 实例工厂函数
	static getInstance(){
		return new Tools();
	}

	/**
	 * @name emit
	 * @params name->消息名称；msg->消息内容
	 * @return 
	 * @desc 发送消息，可以组件间发送
	 */
	emit(name,msg){
		Msg.$emit(name,msg);
	}

	/**
	 * @name on
	 * @params name->消息名称；callback->消息回调
	 * @return 
	 * @desc 接收消息
	 */
	on(name,callback){
		Msg.$on(name,callback);
	}

	/**
	 * @method save
	 * @params key->数据键；value->值
	 * @return 
	 * @desc 保存数据到本地，封装于localstorage
	 */
	save(key,value){

		if(window.localStorage){
			if(value instanceof Array || value instanceof Object){
				value = JSON.stringify(value);
			}
			window.localStorage.setItem(key,value);
		}
	}

	/**
	 * @method get
	 * @params key->数据键
	 * @return 
	 * @desc 获取指定键名的数据
	 */
	get(key){

		let value = null;

		if(window.localStorage){
			try{
				value = window.localStorage.getItem(key);
			}catch(e){
				console.error("get中获取数据出错");
			}
		}
		try{
			// value = JSON.parse(value);
		}catch(e){
			console.error("get中JSON.parse解析出错");
		}

		return value;
	}

	/**
	 * @method remove
	 * @params key->数据键
	 * @return 
	 * @desc 删除指定键名的数据
	 */
	remove(key){

		if(window.localStorage){
			window.localStorage.removeItem(key);
		}
	}

	/**----------------------弃用：组件销毁后，无法重新保存组件
	 * @name enter
	 * @params vm->指令实例；to-> 当前页面；from->上一页面name
	 * @return 
	 * @desc 关闭页面，改变keepAlive为false,并删除离开界面的缓存cache
	 */
	enter(vm,to,from){
		if (vm.$route.params.type === false && vm.$route.params.com === from.name) {
        	from.meta.keepAlive = false;
        	//销毁缓存
        	if (vm.$vnode && vm.$vnode.data.keepAlive)
	         {
	             if (vm.$vnode.parent && vm.$vnode.parent.componentInstance && vm.$vnode.parent.componentInstance.cache)
	             {
	                 if (vm.$vnode.componentOptions)
	                 {
	                  	 var key;
	                     var cache = vm.$vnode.parent.componentInstance.cache;
	                     var keys  = vm.$vnode.parent.componentInstance.keys;
	                  if (vm.$parent.$children) {
	                     vm.$parent.$children.map((o,i)=>{
		                    if (o.$vnode.componentOptions.Ctor.extendOptions.name === from.name) {
		                     key = o.$vnode.componentOptions.Ctor.cid
		                     console.log(key);
		                    }
		                   });
		                  }
	                     console.log(cache[key]);
	                     if (cache[key]);
	                     {
	                         if (keys.length) {
	                             var index = keys.indexOf(key.toString());
	                             if (index > -1) {
	                                 keys.splice(index, 1);
	                             }
	                         }
	                         delete cache[key];
	                     }
	                 }
	             }
	         }
	         vm.$destroy();
    	}
	  	else if (vm.$route.params.type === true && vm.$route.params.com === to.name) {
	    	to.meta.keepAlive = true;
	  	} 
	}

	/**
	 * @name sendRequest
	 * @params params->请求数据；url-> 请求地址；options->请求类型和同异步类型；callback->回调函数
	 * @return 
	 * @desc ajax请求
	    ts.sendRequest('common/data',{
          	data:{},
          	//type:'GET',
          	success:function(ret){

            	console.log('--------ret--------',JSON.stringify(ret));

          	},
          	error:function(ret){

          	}
	    });
	 */
	sendRequest(url,params){

		let loading;
		if (!params.isExit) {
			loading = v.$loading({
		         lock: true,
		         text: '加载中...',
		         spinner: 'el-icon-loading',
		         background: 'rgba(0, 0, 0, 0.7)'
	    	});
		}

		let user = localStorage.getItem('account');
	 	let defaultParams = {
	 	  type:params.type ? params.type : 'POST',
          url:config.baseURL + url,
          async: params.async ? params.async : true,
          data:params.data,
          dataType:params.dataType?params.dataType:"json",
          headers: {Authorization:"Bearer "+user},
          success:function(res){
 
          	switch (res.code){
		        case 1000:
		        
		        break 
		        case 1001:
		        	// token失效
		            v.$message({
	                    message: '登录过期',
	                    type: 'error'
                	});
                	// 延时两秒操作
                	setTimeout(function(){
                		localStorage.removeItem('account');
              			localStorage.removeItem('fullAccount');
	          			location ='/Login';
	          			// 返回首页，需要改变isPage状态
	          			localStorage.setItem('isPage','true');
                	},2000);
	          		
		        break
		        case 1002:
		            v.$message({
	                    message: res.msg,
	                    type: 'error'
                	}); 
		        break 
		        case 1003:
			        if (!params.isExit) {
			        	v.$message({
	                    	message: res.msg,
	                    	type: 'error'
	            		}); 
			        }
		        break
  				case 1004:
		            v.$message({
	                    message: res.msg,
	                    type: 'error'
                	}); 
		        break
		        case 1006:
		        	v.$message({
	                    message: res.msg,
	                    type: 'error'
                	}); 
		        default:
		         	// params.success(res);
		          //   v.$message({
	           //          message: '请勿重复提交',
	           //          type: 'error'
            //     	}); 
		        break
        	}	
        	params.success(res);
        	if (!params.isExit) {
        		setTimeout(() => {
					loading.close();
				}, 700);
        	}
          },
          error:function(err){
          	if (err.status == 500 ) {
          		v.$message({
                    message: '系统错误',
                    type: 'error'
            	}); 
          	}
          	params.error(err);
          	if (!params.isExit) {
          		setTimeout(() => {
					loading.close();
				}, 700);
          	}
          }
	 	};	

	 	$.ajax(defaultParams);

	 	if (!params.isExit) {
	 		setTimeout(() => {
	          loading.close();
	        }, 2000);
	 	} 	
	}


	sendMsgRequest(url,params){

		let user = localStorage.getItem('account');
	 	let defaultParams = {
	 	  type:'POST',
          url:url,
          async: true,
          data:params.data,
          dataType:params.dataType?params.dataType:"json",
          headers: {Authorization:"Bearer "+user},
          success:function(res){
 
          	switch (res.code){
		        case 0:
		        
		        break 
		        case 1001:
		        	// token失效
		            v.$message({
	                    message: '登录过期',
	                    type: 'error'
                	}); 
	          		localStorage.removeItem('account');
	          		localStorage.removeItem('fullAccount');
	          		location ='/OfficialWebsite';
		        break
		        case 1002:
		            v.$message({
	                    message: '系统错误',
	                    type: 'error'
                	}); 
		        break 
		        case 1003:
		            v.$message({
	                    message: '缺少参数',
	                    type: 'error'
                	}); 
		        break
  				case 1004:
		            v.$message({
	                    message: res.msg,
	                    type: 'error'
                	}); 
		        break
		        default:
		         	// params.success(res);
		          //   v.$message({
	           //          message: '请勿重复提交',
	           //          type: 'error'
            //     	}); 
		        break
        	}	
        	params.success(res);
          },
          error:function(err){
          	params.error(err);
          }
	 	};

	 	if (params.type) {
	 		defaultParams.type = params.type;
	 	}

		if (params.async) {
			defaultParams.async = params.async;
		}	 	

	 	$.ajax(defaultParams);
	}

	/**
	 * @name ruleNum
	 * @params rule->验证规则；value->输入框值；callback->回调函数
	 * @return 
	 * @desc 数字验证
	   
	 */
	 ruleNum(num,content,warn){
	 	let ret;
	 	if (num) {
	 		let reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
	 		if (!reg.test(num)  || num == 0) {
	 			ret = warn
	 		}
	 		else{
	 			ret = 'true'
	 		}
	 	}
	 	else{
	 		ret = content
	 	}
	 	return ret
	 }



	/**
	 * @name rulePhone
	 * @params rule->验证规则；value->输入框值；callback->回调函数
	 * @return 
	 * @desc 电话号码验证
	   
	 */
	 rulePhone(num, content, warn){
	 	let ret;
	 	if (num) {
	 		let reg = /^1(3|4|5|7|8)\d{9}$/;
	 		if (!reg.test(num)) {
	 			ret = warn
	 		}
	 		else{
	 			ret = 'true'
	 		}
	 	}
	 	else{
	 		ret = content
	 	}
	 	return ret
	 }


	 /**
	 * @name ruleCard
	 * @params rule->验证规则；value->输入框值；callback->回调函数
	 * @return 
	 * @desc 身份证号码验证
	   
	 */
	 ruleCard(num, content, warn){
	 	let ret;
	 	if (num) {
	 		 let reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
	 		if (!reg.test(num)) {
	 			ret = warn
	 		}
	 		else{
	 			ret = 'true'
	 		}
	 	}
	 	else{
	 		ret = content
	 	}
	 	return ret
	 }

	/**
	 * @name changeTime
	 * @params res->时间戳；
	 * @return 
	 * @desc 时间戳转换正常时间
	   
	 */
	changeTime(time){
        var date = new Date();
	    date.setTime(time * 1000);
	    var y = date.getFullYear();
	    var m = date.getMonth() + 1;    
	    m = m < 10 ? ('0' + m) : m;    
	    var d = date.getDate(); 
	    d = d < 10 ? ('0' + d) : d;    
	    var h = date.getHours();  
	    h = h < 10 ? ('0' + h) : h;  
	    var minute = date.getMinutes();  
	    var second = date.getSeconds();  
        minute = minute < 10 ? ('0' + minute) : minute;    
        second = second < 10 ? ('0' + second) : second;   
	    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second; 
    }

    /**
	  * @method getWebParam
	  * @params name->参数名称
	  * @return 返回参数值
	  * @desc 获取指定参数的值
	  */
	 getWebParam(){
	  	let res = window.location.href.split('&');
        let ret;
        if (res.length == 1) {
            ret = null
        }
        else{
            ret = res[1].split('=')[1];
        }
        return ret
	 }
    
}

