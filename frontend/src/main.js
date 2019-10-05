import 'font-awesome/css/font-awesome.css'

import Vue from 'vue'
import VueTheMask from 'vue-the-mask'

import App from './App'

import './config/bootstrap'
import './config/msgs'
import './config/axios'

import store from './config/store'
import router from './config/router'

Vue.use(VueTheMask)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
