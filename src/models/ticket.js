import BaseModel from './BaseModel.js';
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

  class Ticket extends BaseModel
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
        customer_id: null,
        namedStatus: null
      }
    }

// Attribute mutations.
    mutations()
    {
      return {
        namedStatus: () => this.getNamedStatus(this.status)
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

    /**
     * Array of text - value pair for all ticket status. Creating an own model for them would be a bit of an overkill.
     * @returns {*[]}
     */
    getTicketStatuses()
    {
      return [{
        text: 'Not Active',
        value: 0
      },{
        text: 'Active',
        value: 1
      }, {
        text: 'Billed',
        value: 2,
      }];
    }

    /**
     * get a string representation of integer status of current ticket
     * @returns {*}
     */
    getNamedStatus(status){
      if(!status) return this.getTicketStatuses()[0].text;

      let statusObj = this.getTicketStatuses().find( (el) => {
        return el.value == status;
      });

      if (typeof statusObj != 'undefined'){
        return statusObj.text;
      }
      return "";
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
