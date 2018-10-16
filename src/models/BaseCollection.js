  import {Collection} from 'vue-mc'
  import store from '../store.js';

  /**
   * Needed to set Bearer Token on axios client to authorize API requests
   */
  class BaseCollection extends Collection {

    getRequest(config) {
      config.headers = this.getAuthHeaders()
      return super.getRequest(config);
    }

    getAuthHeaders() {
      let token = store.state.token;
      return (typeof token === 'undefined') ? '' : {
        Authorization: 'Bearer ' + token
      };
    }

    onFetchFailure(error){
      if(error.response.response.status === 401){
        store.commit('setToken','');
      }
      return super.onFetchFailure(error)
    }

  }

  export default BaseCollection
