import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    config: null,
    token: "",
  },
  mutations: {
    setConfig(state, value) {
      state.config = value;
    },
    setToken(state, value){
      state.token = value;
    },
    initialiseToken(state) {
      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
      } else {
        state.token = "";
      }
    }
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

});

store.subscribe((mutation, state) => {
  (mutation.type === "setToken") ? localStorage.setItem('token', mutation.payload) : ''

});
export default store;
