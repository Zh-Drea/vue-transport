// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Tools from './lib/Tools'
// 导入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//导入vuex
import store from './store'

import 'vue-easytable/libs/themes-base/index.css'
import {VTable,VPagination} from 'vue-easytable'

import './css/app.css';

// import './css/public.scss';

import MainComponent from './MainComponent'

import router from './router'

Vue.config.productionTip = false

// Vue.prototype.router = router
// 导入vue-easytable
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
// 
Vue.use(ElementUI);
/* eslint-disable no-new */
/**
 * 如果路由不固定，应当从服务器加载路由列表
 */
new Vue({
  el: '#app',
  router,
  store,
  components: { MainComponent },
  template: '<MainComponent/>'
})

