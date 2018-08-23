import {Model, Collection} from 'vue-mc'
import store from '../store.js';
import {
  boolean,
  equal,
  integer,
  min,
  required,
  string,
} from 'vue-mc/validation'
  /**
   * Ticket model
   */

  class Ticket extends Model
  {

// Default attributes that define the "empty" state.
    defaults()
    {
      return {
        id: null,
        title: null,
        description: null,
        hours: null,
        minutes: null,
        active: null,
        status: null,
      }
    }

// Attribute mutations.
    mutations()
    {
      return {
        //title: String,
        //body: String,
      }
    }

// Attribute validation
    validation()
    {
      return {}
    }

// Route configuration
    routes()
    {
      return {
        fetch: 'api/ticket/{id}',
        delete: 'api/ticket/{id}',
        save: 'api/ticket',
        update: 'api/ticket/{id}',
      }
    }

    getRouteResolver() {
      var self = this;
      return function(route, parameters = {}){
        return store.state.config.API_URL+self.getDefaultRouteResolver()(route, parameters)
      }
    }

    options() {
        return {
          validateOnSave: true,
          validateOnChange: true,
          methods:{
            update: "PUT"
          }
        }
    }


  }

export { Ticket as default }
