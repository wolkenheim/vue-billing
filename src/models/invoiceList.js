
  import {Model, Collection} from 'vue-mc'
  import Invoice from './invoice'
  import store from '../store.js';

  class InvoiceList extends Collection {


    model() {
      return Invoice;
    }

    defaults() {
      return {
        orderBy: 'date',
      }
    }


    routes() {
      return {
        fetch: 'api/invoice',
      }
    }


    getRouteResolver() {
      return function(route, parameters = {}){
        return store.state.config.API_URL + route;
      }
    }

    fetchFiltered(params = ""){
      let config = {
        url: store.state.config.API_URL+'api/invoice',
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

  export default InvoiceList
