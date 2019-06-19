import Vue from 'vue'
import Router from 'vue-router'
import Notfount from './components/404.vue'
import Login from './views/login.vue'

import Index from './views/index'
import Dashboard from './views/dashboard'
import AccountList from './views/account/account_List'
import BoardList from './views/board/board_List'
import PinManager from './views/pin/pin_manager'
import RuleList from './views/rule/rule_list'
import RecordManager from './views/record/record_manager'
import RecordHistory from './views/record/record_history'
import UserManager from './views/user/user_manager'
import RoleManager from './views/role/role_manager'
import StoreManager from './views/store/store_manager'


import SubAccountDailyReport from './views/dailyReport/sub_account_daily_report'
import PinsDailyReport from './views/dailyReport/pins_daily_report'
import BoardsDailyReport from './views/dailyReport/boards_daily_report'

import SubAccountReport from './views/subAccountReport/sub_account_report'
import BoardReport from './views/subAccountReport/board_report'
import PinsReport from './views/subAccountReport/pins_report'

import AutState from './views/special/aut_state'
import Personal from './views/special/personal.vue'
import ShopfyRegist from './views/special/shopfy_regist.vue'
import StoreSettings from './views/special/storeSettings.vue'
import Privacy from './views/special/privacy.vue'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Index,
      children: [
        { path: '/dashboard', name: 'dashboard', component: Dashboard },
        { path: '/sub_account_daily_report', name: 'sub_account_daily_report', component: SubAccountDailyReport },
        { path: '/boards_daily_report', name: 'boards_daily_report', component: BoardsDailyReport },
        { path: '/pins_daily_report', name: 'pins_daily_report', component: PinsDailyReport },
        { path: '/sub_account_report', name: 'sub_account_report', component: SubAccountReport},
        { path: '/board_report', name: 'board_report', component: BoardReport },
        { path: '/pins_peport', name: 'pins_peport', component: PinsReport },
        { path: '/account_manager', name: 'account_List', component: AccountList },
        { path: '/board_manager', name: 'board_List', component: BoardList },
        { path: '/pin_manager', name: 'pin_manager', component: PinManager },
        { path: '/rule_list', name: 'rule_list', component: RuleList },
        { path: '/record_manager', name: 'record_manager', component: RecordManager },
        { path: '/record_history', name: 'record_history', component: RecordHistory },
        { path: '/user_manager', name: 'user_manager', component: UserManager },
        { path: '/role_manager', name: 'role_manager', component: RoleManager },
        { path: '/store_manager', name: 'store_manager', component: StoreManager },
        { path: '/storeSettings', name: 'storeSettings', component: StoreSettings },
        { path: '/personal', name: 'personal', component: Personal },
        
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/shopfy_regist',
      name: 'shopfy_regist',
      component: ShopfyRegist
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: Privacy
    },
    
    {
      path: '/aut_state',
      name: 'aut_state',
      component: AutState
    },
    {
      path: '*',
      name: '/404',
      component: Notfount
    },

  ]
})


router.beforeEach((to,from,next) =>{
  const isLogin = localStorage.eleToken ? true : false;
  if(to.path == "/login" || to.path == "/shopfy_regist" || to.path == "/privacy" || to.path == "/aut_state" ){
    next()
  }else{
    //isLogin ? next() : next('/login');
    if(isLogin) {
      next()
   
      // let refreshPath = window.localStorage.getItem('router_tree') ? JSON.parse(window.localStorage.getItem('router_tree')) : this.$store.getters.router_tree
      //   if(refreshPath.indexOf(to.path)>=0){
      //     next()
      //   }else{
      //     next('/login')
      //   }
      }else{
        next('/login')
      }
  }
});


export default router;