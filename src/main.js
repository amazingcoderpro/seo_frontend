import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './http'

import router from './router' 
import store from './store'
import echarts from 'echarts'
import './assets/icon/iconfont.css'


import locale from 'element-ui/lib/locale/lang/en'

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(ElementUI, { locale });
Vue.prototype.$axios = axios


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')