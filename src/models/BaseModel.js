import {Model} from 'vue-mc'
import store from '../store.js';

  /**
   * Base model needed for Auth Header
   */

  class BaseModel extends Model
  {

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

export { BaseModel as default }
