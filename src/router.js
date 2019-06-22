import Vue from 'vue'
import Router from 'vue-router'
import Notfount from './components/404.vue'

import Index from './views/index'
import Login from './views/login'
import ProductShow from './views/Product/productShow'
import Home from './views/Home/Home'
import Collections from './views/Collections/Collections'






Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        { path: '/productShow', name: 'productShow', component: ProductShow },
        { path: '/home', name: 'home', component: Home },
        { path: '/Collections', name: 'Collections', component: Collections },
        
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: '/404',
      component: Notfount
    }
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