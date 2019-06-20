import Vue from 'vue'
import Router from 'vue-router'
import Notfount from './components/404.vue'

import Index from './views/index'
import Dashboard from './views/dashboard'






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
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        { path: '/dashboard', name: 'dashboard', component: Dashboard },
        
      ]
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
        next()
      }
  }
});


export default router;