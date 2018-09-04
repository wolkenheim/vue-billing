
  import {Model, Collection} from 'vue-mc'
  import Ticket from './ticket'
  import store from '../store.js';

  class TicketList extends Collection {


    model() {
      return Ticket;
    }

    defaults() {
      return {
        orderBy: 'title',
      }
    }


    routes() {
      return {
        fetch: 'api/ticket',
      }
    }


    getRouteResolver() {
      return function(route, parameters = {}){
        return store.state.config.API_URL + route;
      }
    }


  }

  export default TicketList
