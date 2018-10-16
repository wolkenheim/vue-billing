import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    config: null,
    token: localStorage.getItem('token'),
  },
  mutations: {
    setConfig(state, value) {
      state.config = value;
    },
    setToken(state, value){
      localStorage.setItem('token', value);
    },
  },
  actions: {

  },
  getters: {
    token: (state, getters) => {
      return (state.token === null || typeof state.token === 'undefined' || state.token == '') ? '' : state.token
    },
    isLoggedIn: (state, getters) => {
      return (getters.token == '') ? false : true
    }
  }
})
