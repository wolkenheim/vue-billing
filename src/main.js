import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vuetify'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import DefaultLayout from "@/layouts/Default.vue";
import NoTopbarLayout from "@/layouts/NoTopbar.vue";

Vue.config.productionTip = false;

Vue.component("default-layout", DefaultLayout);
Vue.component("no-topbar-layout", NoTopbarLayout);

import config from '../config/config.js';
store.commit('setConfig', config);

import interceptorsSetup from './helpers/axios'
interceptorsSetup()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

