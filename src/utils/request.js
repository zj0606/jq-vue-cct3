import axios from 'axios'
import {
  ElLoading,
  ElMessage 
} from 'element-plus'
// import store from '@/store'
// import { useUserStore } from '@/stores/user'
// const store = useUserStore()
// import {
//   getToken
// } from '@/utils/auth'

const {
  VITE_APP_BASE_API_CENTER_OPERATION_KEY,
  // VITE_APP_BASE_API_CENTER_OPERATION_TARGET,
  VITE_APP_BASE_API_CENTER_RESOURCE_KEY,
  // VITE_APP_BASE_API_CENTER_RESOURCE_TARGET,
  VITE_APP_BASE_API_CENTER_TPC_KEY,
  // VITE_APP_BASE_API_CENTER_TPC_TARGET,
  VITE_APP_BASE_API_CENTER_BSC_KEY,
  // VITE_APP_BASE_API_CENTER_BSC_TARGET,
  VITE_APP_BASE_API_CENTER_CCT_KEY,
  // VITE_APP_BASE_API_CENTER_CCT_TARGET,
  VITE_APP_BASE_API_CENTER_BASE_KEY,
  // VITE_APP_BASE_API_CENTER_BASE_TARGET,
  VITE_APP_BASE_API_OYYS_SEED_KEY,
  // VITE_APP_BASE_API_OYYS_SEED_TARGET
  VITE_APP_BASE_API_SLS_KEY,
  // VITE_APP_BASE_API_SLS_TARGET
  VITE_APP_BASE_URL,
  VITE_APP_BASE_API,
  VITE_APP_ENV
} = import.meta.env

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

const BASE_URL = /localhost/.test(window.location.origin) ? VITE_APP_BASE_URL : window.location.origin

const TIME_OUT = 5 * 60 * 1000;

axios.defaults.timeout = TIME_OUT;

// create an axios instance
const service = axios.create({
  baseURL: BASE_URL, // url = base url + request url
  // baseURL: '/api', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: TIME_OUT // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    //请求发送前 遍历请求参数 去除左右空格
    const { data = {} } = config
    if(Object.prototype.toString.call(data) === '[object Object]'){
      Object.keys(data).forEach(key=>{
        if(typeof data[key] === 'string'){
          data[key] = data[key].trim()
        }
      })
    }
    // do something before request is sent
    // if (config.url === '/center-resource/mem/saveMemStdNodesWharfAddress') {
    //   config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    // }
    if (VITE_APP_ENV !== 'development') {
      // replace java suffix to staging enverionment variables
      config.url = config.url.replace(new RegExp([
        VITE_APP_BASE_API_CENTER_OPERATION_KEY,
        VITE_APP_BASE_API_CENTER_RESOURCE_KEY,
        VITE_APP_BASE_API_CENTER_TPC_KEY,
        VITE_APP_BASE_API_CENTER_BSC_KEY,
        VITE_APP_BASE_API_CENTER_CCT_KEY,
        VITE_APP_BASE_API_CENTER_BASE_KEY,
        VITE_APP_BASE_API_OYYS_SEED_KEY,
        VITE_APP_BASE_API_SLS_KEY
      ].join('|'), 'g'), VITE_APP_BASE_API)
      // switch (true) {
      //   case new RegExp(VITE_APP_BASE_API_CENTER_OPERATION_KEY).test(config.url):
      //     config.baseURL = VITE_APP_BASE_API_CENTER_OPERATION_TARGET
      //     break
      //   case new RegExp(VITE_APP_BASE_API_CENTER_RESOURCE_KEY).test(config.url):
      //     config.baseURL = VITE_APP_BASE_API_CENTER_RESOURCE_TARGET
      //     break
      //   case new RegExp(VITE_APP_BASE_API_CENTER_BSC_KEY).test(config.url):
      //     config.baseURL = VITE_APP_BASE_API_CENTER_BSC_TARGET
      //     break
      //   case new RegExp(VITE_APP_BASE_API_CENTER_CCT_KEY).test(config.url):
      //     config.baseURL = VITE_APP_BASE_API_CENTER_CCT_TARGET
      //     break
      //   case new RegExp(VITE_APP_BASE_API_CENTER_BASE_KEY).test(config.url):
      //     config.baseURL = VITE_APP_BASE_API_CENTER_BASE_TARGET
      //     break
      //   default:
      //     break
      // }
    }
    const token = null //getToken()
    if (token) {
      // add token
      config.headers['Authorization'] = `Bearer ${token}`
    }
    // add loading warpper
    if (!config.noLoading) {
      service.interceptors.loading = ElLoading.service({
        lock: true,
        text: '加载中',
        background: 'rgba(255, 255, 255, 0.5)'
      })
    }
    service.interceptors.isHideMessage = config.hideMessage;
    return config
  },
  error => {
    // do something with request error
    service.interceptors.loading && service.interceptors.loading.close()
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    /**
     * Clear loading
     *
     */
    service.interceptors.loading && service.interceptors.loading.close()
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.status === false) {
      service.interceptors.isHideMessage != true && ElMessage ({
        message: res.msg || '请求失败',
        type: 'error',
        duration: 5 * 1000
      })

      // // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   // to re-login
      //   MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
      //     confirmButtonText: 'Re-Login',
      //     cancelButtonText: 'Cancel',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('user/resetToken').then(() => {
      //       location.reload()
      //     })
      //   })
      // }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      if (response.config.type === 'downLoad') {
        const filename = decodeURI(response.headers['content-disposition'].match(
          /filename=(.*)/
        )[1])
        return {
          blob: res,
          filename
        }
      } else {
        return res
      }
    }
  },
  error => {
    // console.log(JSON.stringify(error)) // for debug

    if (error === undefined || error.code === 'ECONNABORTED') {
      service.interceptors.isHideMessage != true && ElMessage .warning('服务请求超时')
      return Promise.reject(error)
    }

    // get error message
    // priority: data.message > codeMessage[status] > statusText
    const { response: { status, statusText, data: { msg, message }}} = error
    const text = message || msg || codeMessage[status] || statusText

    // display errorText
    service.interceptors.isHideMessage != true && ElMessage ({
      message: text,
      type: 'error',
      duration: 5 * 1000
    })

    // relogin when status 403 detected
    if (status === 403) {
      // store.dispatch('user/logout')

      return Promise.reject(new Error(text || '授权失败'))
    }

    service.interceptors.loading && service.interceptors.loading.close()
    return Promise.reject(error)
  }
)

export default service
