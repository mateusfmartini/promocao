import 'font-awesome/css/font-awesome.css'

import Vue from 'vue'
import VueTheMask from 'vue-the-mask'
import VueGraph from 'vue-graph'

Vue.use(VueTheMask)
Vue.use(VueGraph)

import './config/bootstrap'
import './config/msgs'
import './config/axios'

import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

import App from './App'

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
