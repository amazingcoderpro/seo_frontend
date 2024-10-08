import Vue from 'vue'
import Router from 'vue-router'
import Notfount from './components/404.vue'

import Index from './views/index'
import Login from './views/login'
import ShopfyRegist from './views/special/shopfy_regist'
import AutState from './views/special/aut_state'
import ProductShow from './views/Product/productShow'
import Home from './views/Home/Home'
import Collections from './views/Collections/Collections'
import Categore from './views/Categore/Categore'






Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/Categore',
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        { path: '/productShow', name: 'productShow', component: ProductShow },
        { path: '/home', name: 'home', component: Home },
        { path: '/Collections', name: 'Collections', component: Collections },
        { path: '/Categore', name: 'Categore', component: Categore },
        
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
      path: '/aut_state',
      name: 'aut_state',
      component: AutState
    },
    {
      path: '*',
      name: '/404',
      component: Notfount
    }
  ]
})


// router.beforeEach((to,from,next) =>{
//   const isLogin = localStorage.eleToken ? true : false;
//   if(to.path == "/login" || to.path == "/shopfy_regist" || to.path == "/aut_state" ){
//     next()
//   }else{
//     //isLogin ? next() : next('/login');
//     if(isLogin) {
//       next()
//        // next('/Home')
//       }else{
//         next('/login')
//       }
//   }
// });
router.beforeEach((to,from,next) =>{
  const isLogin = localStorage.eleToken ? true : false;
  let user = localStorage.user;
  let shopString = getQueryString("shop");
  if(user){
    user = JSON.parse(user);
  }
  if(to.path == "/login" || to.path == "/shopfy_regist" || to.path == "/aut_state" ){
    next()
  }else{
    if(isLogin) {
        if(user && shopString && user.username != shopString){  
          localStorage.removeItem('eleToken');
          localStorage.removeItem('store');
          localStorage.removeItem("user");
          localStorage.removeItem("remark_title_p");
          localStorage.removeItem("remark_description_p");
          router.push('/login')
          // next('/login')
        }else{
          next()
        }
      }else{
        next('/login')
      }
   }
});
export function getQueryString(key){
  var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
  var result = window.location.search.substr(1).match(reg);
  return result ? decodeURIComponent(result[2]) : null;
}

export default router;