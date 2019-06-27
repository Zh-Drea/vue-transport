import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/Login';
import Home from '@/pages/Home';
import Editor from '@/pages/Editor';

// ------------------begin---------------------// 路由懒加载
//注册
const Register = (resolve) => {
  import('@/pages/Register').then((module) => {
    resolve(module)
  })
}
//忘记密码
const RetrievePassword = (resolve) => {
  import('@/pages/RetrievePassword').then((module) => {
    resolve(module)
  })
}
//修改密码
const ChangePassword = (resolve) => {
  import('@/pages/ChangePassword').then((module) => {
    resolve(module)
  })
}
//首页
const OfficialWebsite = (resolve) => {
  import('@/pages/OfficialWebsite').then((module) => {
    resolve(module)
  })
}
//物流查询
const LogisticsRefer = (resolve) => {
  import('@/pages/LogisticsRefer').then((module) => {
    resolve(module)
  })
}
//新闻资讯
const NewsInformation = (resolve) => {
  import('@/pages/NewsInformation').then((module) => {
    resolve(module)
  })
}
//新闻资讯详情
const NewsInfoDetails = (resolve) => {
  import('@/pages/NewsInfoDetails').then((module) => {
    resolve(module)
  })
}
//公司介绍
const CompanyIntroduction = (resolve) => {
  import('@/pages/CompanyIntroduction').then((module) => {
    resolve(module)
  })
}
//联系方式
const ContactInformation = (resolve) => {
  import('@/pages/ContactInformation').then((module) => {
    resolve(module)
  })
}
//模板下载
const TplDownload = (resolve) => {
  import('@/pages/TplDownload').then((module) => {
    resolve(module)
  })
}
// ------------------end-----------------------

/***********wg------begin****************/
const perCenter = (resolve) => {
  import('@/pages/personalCenter').then((module) => {
    resolve(module)
  })
}
//物流管理
const logisticsRecord = (resolve) => {
  import('@/pages/logisticsManage/logisticsRecord').then((module) => {
    resolve(module)
  })
}
const sheetManagement = (resolve) => {
  import('@/pages/logisticsManage/sheetManagement').then((module) => {
    resolve(module)
  })
}
const goodsDeclaration = (resolve) => {
  import('@/pages/logisticsManage/goodsDeclaration').then((module) => {
    resolve(module)
  })
}

//售后管理
const helpCenter = (resolve) => {
  import('@/pages/afterSaleManage/helpCenter').then((module) => {
    resolve(module)
  })
}
const problemSheet = (resolve) => {
  import('@/pages/afterSaleManage/problemSheet').then((module) => {
    resolve(module)
  })
}

//财务管理
const accBalance = (resolve) => {
  import('@/pages/financeManage/accBalance').then((module) => {
    resolve(module)
  })
}
const finRecords = (resolve) => {
  import('@/pages/financeManage/finRecords').then((module) => {
    resolve(module)
  })
}
const paymentOrder = (resolve) => {
  import('@/pages/financeManage/paymentOrder').then((module) => {
    resolve(module)
  })
}

//系统信息
const perSettings = (resolve) => {
  import('@/pages/sysInformation/perSettings').then((module) => {
    resolve(module)
  })
}
const addressBook = (resolve) => {
  import('@/pages/sysInformation/addressBook').then((module) => {
    resolve(module)
  })
}
const sysMessage = (resolve) => {
  import('@/pages/sysInformation/sysMessage').then((module) => {
    resolve(module)
  })
}
/***********wg------end****************/

// 物流下单
const LogisticsOrder = (resolve) => {
  import('@/pages/logisticsOrder/LogisticsOrder').then((module) => {
    resolve(module)
  })
}
const newOrder = (resolve) => {
  import('@/pages/logisticsOrder/newOrder').then((module) => {
    resolve(module)
  })
}

const PaySuccess = (resolve) => {
  import('@/pages/logisticsOrder/PaySuccess').then((module) => {
    resolve(module)
  })
}
const logisticsDetails = (resolve) => {
  import('@/pages/logisticsManage/logisticsDetails').then((module) => {
    resolve(module)
  })
}

// 文件上传
const fileUpload = (resolve) => {
  import('@/pages/file/fileUpload').then((module) => {
    resolve(module)
  })
}
Vue.use(Router)

let router = new Router({
    // mode:'history',
    routes:[
     {
         path: '/',
         component: Home,
         name: '',
         redirect:'/OfficialWebsite',
         children: [
             { path: '/Editor', name: 'Editor', component: Editor,meta: {keepAlive: true}},
             // ------------------begin---------------------
             { path: '/ChangePassword', name: 'ChangePassword', component: ChangePassword,meta: {keepAlive: false}},
             { path: '/OfficialWebsite', name: 'OfficialWebsite', component: OfficialWebsite,meta: {keepAlive: true}},
             { path: '/LogisticsRefer', name: 'LogisticsRefer', component: LogisticsRefer,meta: {keepAlive: true}},
             { path: '/NewsInformation', name: 'NewsInformation', component: NewsInformation,meta: {keepAlive: true}},
             { path: '/NewsInfoDetails', name: 'NewsInfoDetails', component: NewsInfoDetails,meta: {keepAlive: true}},
             { path: '/CompanyIntroduction', name: 'CompanyIntroduction', component: CompanyIntroduction,meta: {keepAlive: true}},
             { path: '/ContactInformation', name: 'ContactInformation', component: ContactInformation,meta: {keepAlive: true}},
             { path: '/TplDownload', name: 'TplDownload', component: TplDownload,meta: {keepAlive: true}},
             { path: '/Login', name: 'Login', component: Login,meta: {keepAlive: false}},
             { path: '/Register', name: 'Register', component: Register,meta: {keepAlive: false}},
             // ------------------end-----------------------
             { path: '/LogisticsOrder', name: 'LogisticsOrder', component: LogisticsOrder,meta: {keepAlive: false}},

             // 新页面
              {path: 'newOrder',name: 'newOrder',component: newOrder,meta: {keepAlive: true}},
             
             { path: '/PaySuccess', name: 'PaySuccess', component: PaySuccess,meta: {keepAlive: false}},

            /********************************************wg----begin*******************************************/
              { path: '/perCenter', name: 'perCenter', 
              redirect: 'perCenter/logisticsRecord',
              component: perCenter,meta: {keepAlive: false},

              children:[

              

             //物流记录
             {path: 'logisticsRecord',name: 'logisticsRecord',component: logisticsRecord,meta: {keepAlive: false}},

             //物流详情
             { path: 'logisticsDetails', name: 'logisticsDetails', component: logisticsDetails,meta: {keepAlive: false}},

            //面单管理
             { path: 'sheetManagement', name: 'sheetManagement', component: sheetManagement, meta: {keepAlive: false}},

            //物品申报
             {path: 'goodsDeclaration',name: 'goodsDeclaration',component: goodsDeclaration,meta: {keepAlive: true}},

             //帮助中心
             {path: 'helpCenter',name: 'helpCenter',component: helpCenter,meta: {keepAlive: true}},

             //问题工单
             {path: 'problemSheet',name: 'problemSheet',component: problemSheet,meta: {keepAlive: true}},

             //账户余额
             {path: 'accBalance',name: 'accBalance',component: accBalance,meta: {keepAlive: true} },

             //财务记录
             {path: 'finRecords',name: 'finRecords',component: finRecords,meta: {keepAlive: true}},

             //支付订单
             {path: 'paymentOrder',name: 'paymentOrder',component: paymentOrder,meta: {keepAlive: true}},

             //个人设置
             {path: 'perSettings',name: 'perSettings',component: perSettings,meta: {keepAlive: true}},

             //地址簿
             {path: 'addressBook',name: 'addressBook',component: addressBook,meta: {keepAlive: true}},

             //系统消息
             {path: 'sysMessage',name: 'sysMessage',component: sysMessage,meta: {keepAlive: true}},

             // 文件上传
             {path: 'fileUpload',name: 'fileUpload',component: fileUpload,meta: {keepAlive: true}}
              ]
            },
             

             /********************************************wg----end*******************************************/

         ]
     },
      // ------------------begin---------------------
     { path: '/RetrievePassword', name: 'RetrievePassword', component: RetrievePassword,meta: {keepAlive: false}},
     // ------------------end-----------------------

 ]
})


export default router
