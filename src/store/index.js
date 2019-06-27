/**
 * @name index.js
 * @author zenglizong
 * @date 2019.4.2
 * @desc 配置页面缓存数据,删除tab则删除缓存,增加tab则增加缓存
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state =  {
  keepAliveName:['Dialog'],
  cartNum:1,
  ddj:'-------',
  ppp:'++++++++',
  menuList:["个人中心","物流管理","物流记录"],   //头部导航状态管理
  subDeclaration:false,   //提交申报状态管理
  subWorkOrder:false,      //提交工单状态管理
  addAddress:false,
  loginDate:{
    isLogin:false,
    data:''
  },
};

const getters = {
  getChangedNum(state){
    return state.changableNum
  }
};
//mutation必须是同步的，如果要异步需要使用action。
const mutations = {
  setKeepAliveRoute(state,res){
    console.log('-----mutations-------');
  	if (res) {
  		let isExit = true;
  		if (state.keepAliveName && state.keepAliveName.length > 0) {
  			state.keepAliveName.map((o,i)=>{
  				if (o == res) {
  					isExit = false 
  				}
			  })
  			if (isExit) {
          console.log('---------需要添加的界面:',res);
  				state.keepAliveName.push(res);
  			}
  	  }
	  }
  },
  moveKeepAliveRoute(state,res){
  	let plt;
  	if (res) {
  		if (state.keepAliveName && state.keepAliveName.length > 0) {
	  		state.keepAliveName.map((o,i)=>{
	  			if ( o === res) {
	  				plt = i;
	  			}
	  		})
  		}
      if (plt) {
        state.keepAliveName.splice(plt, 1);
      }
  	}
  },
  moveAllKeepAliveRoute(state){
    state.keepAliveName = ['Dialog']
  },
  increment(state){
    state.cartNum = state.cartNum + 1
  },
  decrement(state){
    state.cartNum = state.cartNum - 1 
  },

  //头部导航状态管理
  editMenuList(state,res){
    if(typeof res === "string"){
      if(res === "返回"){
        state.menuList.pop();
      }else{
        state.menuList.push(res);
      }
        
    }else{
      state.menuList = ["个人中心"];
      state.menuList.push(res);
      state.menuList = [].concat(...state.menuList);
    }
  },
  // 清空头部导航
  clearMenuList(state,res){
    state.menuList = res;
    console.log('vuex',JSON.stringify(state.menuList))
  },

  //提交申报状态管理
  subDeclaration(state,res){
    state.subDeclaration = res;
  },
  subWorkOrder(state,res){
    state.subWorkOrder = res;
  },
  addAddress(state,res){
    state.addAddress = res;
  },
  // 保存登录状态
  saveLogin(state,res){
    console.log('vuex',res.data);
    state.loginDate.isLogin = res.isLogin;
    state.loginDate.data = res.data;
  },
  // changContent(state,res){
  //   state.content = res;
  //   console.log(state.content);
  // }
}

const actions = {
    KeepAliveRoute(context,name){
      console.log('-----进入action-------');
      context.commit('setKeepAliveRoute',name)
    },
    moveAliveRoute(context,name){
      context.commit('moveKeepAliveRoute',name)
    },

    //头部导航状态管理
    editMenuListAction(context,name){
      context.commit('editMenuList',name)
    },

    //提交申报状态管理
    subDeclarationAction(context,name){
      context.commit('subDeclaration',name)
    },
    subWorkOrderAction(context,name){
      context.commit('subWorkOrder',name)
    },
    addAddressAction(context,name){
      context.commit('addAddress',name)
    },
    // 保存登录状态
    saveLoginAction(context,name){
      context.commit('saveLogin',name)
    },
    // moveAllRoute(context,name){
    //   context.commit('moveAllKeepAliveRoute')
    // }
};

const store = new Vuex.Store({state,getters,mutations,actions});

export default store;