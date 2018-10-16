import BaseModel from './BaseModel.js';
import store from '../store.js';
import {
  boolean,
  equal,
  integer,
  min,
  numeric,
  required,
  string,
} from 'vue-mc/validation'
  /**
   * InvoiceItem model
   */

  class InvoiceItem extends BaseModel
  {

// Default attributes that define the "empty" state.
    defaults()
    {
      return {
        id: null,
        title: "Test",
        description: "Text",
        price:100,
        tax_rate: 19,
        invoice_id: 0
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
        title: required.and(string),
        price: required.and(numeric),
        tax_rate: required.and(numeric),
      }
    }

// Route configuration
    routes()
    {
      return {
        fetch: 'api/invoice-item/{id}',
        delete: 'api/invoice-item/{id}',
        save: 'api/invoice-item',
        update: 'api/invoice-item/{id}',
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

export { InvoiceItem as default }
