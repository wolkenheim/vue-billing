import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vuetify'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import config from '../config/config.js';
store.commit('setConfig', config);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
