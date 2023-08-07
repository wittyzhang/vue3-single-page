// import Vue from 'vue'
import {createI18n} from 'vue-i18n'
import { Locale } from 'vant'
import enUS from 'vant/lib/locale/lang/en-US'
import zhCN from 'vant/lib/locale/lang/zh-CN'
import enLocale from './json/en.json'
import zhLocale from './json/zh.json'
// import { crc32 } from "@foxglove/crc";

// console.log(crc32)

const messages = {
  en: {
    ...enUS,
    ...enLocale
  },
  zh: {
    ...zhCN,
    ...zhLocale
  }
}

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('language') || 'en', // 设置默认语言
  globalInjection: true, // 如果不设置为true挂载到全局的话，{{$t(`message.name`)}}这种使用会报错
  messages: messages // 设置资源文件对象
})

// 更新vant组件库本身的语言变化，支持国际化
function vantLocales(lang) {
  if (lang === 'en') {
    Locale.use(lang, enUS)
  } else if (lang === 'zh') {
    Locale.use(lang, zhCN)
  }
}

function setLanguage(lang, callback) {
  console.log(lang, '------------------')
  i18n.locale = lang
  localStorage.setItem('language', lang)
  vantLocales(lang)
  callback && callback()
}
// --------这里是i18next-scanner新增的配置-------------
// function lang(key) {
//   let hashKey = `K${crc32(key).toString(16)}` // 将中文转换成crc32格式去匹配对应的json语言包
//   let words = i18n.global.t(hashKey)
//   if (words == key) {
//     words = key
//     console.log(key, '-无匹配语言key')
//   }
//   return words
// }
// --------这里是i18next-scanner新增的配置-------------
vantLocales(i18n.locale)
export { i18n, setLanguage }
