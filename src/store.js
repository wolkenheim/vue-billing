import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    config: null,
    token: localStorage.getItem('token') || "",
  },
  mutations: {
    setConfig(state, value) {
      state.config = value;
    },
    setToken(state, value) {
      state.token = value;
    },
  },
  actions: {},
  getters: {
    token: state => {
      return (state.token === null || typeof state.token === 'undefined' || state.token == '') ? '' : state.token
    },
    isLoggedIn: (state, getters) => {
      return (getters.token == '') ? false : true
    }
  }

});

store.subscribe((mutation, state) => {
  (mutation.type === "setToken") ? localStorage.setItem('token', mutation.payload) : ''

});
export default store;
