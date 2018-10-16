
  import {Model} from 'vue-mc'
  import Ticket from './ticket'
  import store from '../store.js';
  import BaseCollection from './BaseCollection.js';

  class TicketList extends BaseCollection {


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
