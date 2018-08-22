
  import {Model, Collection} from 'vue-mc'
  import Customer from './customer'
  import store from '../store.js';

  class CustomerList extends Collection {


    model() {
      return Customer;
    }

    defaults() {
      return {
        orderBy: 'title',
      }
    }


    routes() {
      return {
        fetch: 'api/customer',
      }
    }


    getRouteResolver() {
      return function(route, parameters = {}){
        return store.state.config.API_URL + route;
      }
    }

    fetchFiltered(params = ""){
      let config = {
        url: store.state.config.API_URL+'api/customer',
        method: 'GET',
        params: params,
        // data
        // headers
      };

      return this.getRequest(config).send().then((response) => {
        this.onFetchSuccess(response);
      }).catch((error) => {
        console.log(error)
      });
    }

  }

  export default CustomerList
