import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang'
import './icons'
import './permission'

// if (process.env.NODE_ENV === 'development') {
//   require('./mock')
// }
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

Vue.use(VXETable)

Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium',
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
console.log('hello')
