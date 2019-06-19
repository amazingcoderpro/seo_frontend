import axios from 'axios'
import { Message, Loading } from 'element-ui';
import router from './router'
import * as base from './assets/js/base'

let loading        //定义loading变量

function startLoading() {    //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}
function endLoading() {    //使用Element loading-close 方法
    loading.close()
}

// 请求拦截  设置统一header
axios.interceptors.request.use(config => {
    // 加载
    startLoading()
    if (localStorage.eleToken)
        config.headers.Authorization = localStorage.eleToken
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截  401 token过期处理
axios.interceptors.response.use(response => {
    endLoading()
    return response
}, error => {
    // 错误提醒
    endLoading()
    if (error.response) {
        switch (error.response.status) {
            case 400:     error.message = '请求错误'   

            break     
     
            case 401:    
                error.message = '未授权，请登录' 
                base.LoginOut();
            break 
     
            case 403:          
                Message.error('token值无效，请重新登录')
                // 清除token
                base.LoginOut();
            break    
     
            case 404:    error.message = `请求地址出错: ${error.response.config.url}` 
     
            break  
     
            case 408:   error.message = '请求超时' 
     
            break   
     
            case 500:     error.message = '服务器内部错误'
     
             break    
     
            case 501:     error.message = '服务未实现'  
     
            break   
     
            case 502:     error.message = '网关错误'  
     
            break     
     
           case 503:        error.message = '服务不可用'    
     
           break     
     
           case 504:  error.message = '网关超时'   
     
           break  
     
           case 505:      error.message = 'HTTP版本不受支持'  
     
           break   
     
           default:  
                            error.message = '其他情况'  
        }
    }
    return Promise.reject(error)
})

export default axios