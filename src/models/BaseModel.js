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

  }

export { BaseModel as default }
