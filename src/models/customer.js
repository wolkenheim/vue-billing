import {Model, Collection} from 'vue-mc'
import store from '../store.js';
  /**
   * Task model
   */

  class Customer extends Model
  {

// Default attributes that define the "empty" state.
    defaults()
    {
      return {
        id: null,
        firstname: null,
        lastname: null,
        street: null,
        zipcode: null,
        city: null,
        country: null,
        state: null,
        email: null
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
      return {
        //id: integer.and(min(1)).or(equal(null)),
        //title: string.and(required),
        //done: boolean,
      }
    }

// Route configuration
    routes()
    {
      return {
        fetch: 'api/customer/{id}',
        delete: 'api/customer/{id}',
        save: 'api/customer',
        update: 'api/customer/{id}',
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
          methods:{
            update: "PUT"
          }
        }
    }

  }

export { Customer as default }
