import { createApp } from 'vue'
import './assets/style/style.scss'
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import App from './App.vue'
import router from './router/index'
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // 数据话持久插件
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)


/**=====国际化===== */
import { i18n } from './locales/index'
// 多语言
app.use(i18n)
// app.provide('setLanguage', setLanguage)
// app.config.globalProperties.$lang = lang

app.use(pinia)
app.use(router)
app.mount('#app')
