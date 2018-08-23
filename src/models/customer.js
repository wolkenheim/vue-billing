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
        country: "Deutschland",
        state: null,
        email: null,
        tickets: []
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
        firstname: required.and(string),
        lastname: required.and(string),
        email:  required.and(string),
        zipcode:  required.and(string),
        city:  required.and(string),
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
          validateOnSave: true,
          validateOnChange: true,
          methods:{
            update: "PUT"
          }
        }
    }


  }

export { Customer as default }
