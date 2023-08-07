import axios from 'axios'
import { useUsersStore } from '@/store/login.js'
import { showToast, closeToast, showLoadingToast } from 'vant'
import { useRouter } from 'vue-router'

// import i18n from '@/locales'



// 根据环境不同引入不同api地址
// import { baseApi } from '@/config'

function tokenError(msg) {
  const router = useRouter()
  const store = useUsersStore()
  store._reset()
  Toast({ message: msg })
  router.push('/login')
}

const http = axios.create({
  baseURL: import.meta.env.VITE_REQUEST_BASE_URL, // url = base api url + request url
  timeout: 300000
})
const SUCCESS_CODE = '200'

http.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
http.defaults.transformRequest = [
  function (data) {
    if (Object.prototype.toString.call(data) === '[object FormData]') {
      return data
    } else {
      return JSON.stringify(data)
    }
  }
]

http.interceptors.request.use(
  config => {
    if (!config.hideloading) {
      // loading
      showLoadingToast()
    }
    // ---
    const store = useUsersStore()
    const token = store.token
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    // ---
    // ---
    config.headers.lang = localStorage.getItem('language') ? localStorage.getItem('language').toUpperCase() : 'EN'

    if (!config.noFormatUndefined && config.params) {
      Object.keys(config.params).forEach(key => {
        if (config.params[key] === '') {
          config.params[key] = undefined
        }
      })
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  response => {
    closeToast()
    const data = response.data
    if (response.request.responseType === 'blob') {
      return Promise.resolve(data)
    }
    if (data.code !== SUCCESS_CODE) {
      if (data.code === '1011006' || data.code === '1011008') {
        tokenError('login again')
        return
      }
      showToast(data.msg)
      return Promise.reject(data)
    } else {
      return Promise.resolve(data)
    }
  },
  error => {
    const errorRes = error.response
    closeToast()
    if (errorRes) {
      switch (errorRes.status) {
        case 401:
          // tokenError(i18n.t('message.LOGIN_EXPIRED'))
          break
        case 404:
          // console.error(i18n.t('message.NOT_EXIST'))
          break
        default:
          console.error(errorRes.data.msg)
      }
    } else {
      if (error.message.includes('timeout')) {
        // console.error(i18n.t('message.NETWORK_ANOMALY'))
      } else {
        // console.error(i18n.t('message.NETWORK_NOT_CONNECTED'))
      }
    }
    return Promise.reject(error)
  }
)

export default http
