import Vue from 'vue'
import './plugins/axios'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters
import wyEditor from '@/components/editor'
import {IMG_URL} from "@/config/config";
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale: enLang // 如果使用中文，无需设置，请删除
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.prototype.img = (path) => {//从数据库得到的icon只是单纯的图片名字，需要在前面拼接一个图片服务器地址，才能找到图片。
  return IMG_URL + path
}
//全局注册组件。
// Vue.component('uploadone',uploadone)//前者是标签名
// Vue.component('uploadmore',uploadmore)//前者同样是标签名
Vue.component('WyEditor',wyEditor)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
