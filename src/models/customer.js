import {Model, Collection} from 'vue-mc'
import store from '../store.js';
import Ticket from './ticket';
import {
  boolean,
  equal,
  integer,
  min,
  required,
  string,
} from 'vue-mc/validation'
import Vue from "vue";
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

    /**
     * Custom fetch method to deal with nested relationships. Otherwise you get plain js objects for tickets, not Ticket Models
     * @returns {Promise<T | void>}
     */
    xfetch(options = {}) {
      const config = () => ({
        url     : this.getFetchURL(),
        method  : this.getFetchMethod(),
        params  : assign({}, this.getFetchQuery(), options.params),
        headers : assign({}, this.getFetchHeaders(), options.headers),
      });

      return this.request(
        config,
        this.onFetch,
        this.onFetchSuccess,
        this.onFetchFailure
      );
    }
    /*
    fetch(){
      let route = this.getRoute('fetch');
      let url = this.getRouteResolver()(route, {id: this.id});

      let config = {
        url: url,
        method: 'GET',
        // params
        // data
        // headers
      };

      return this.getRequest(config).send().then((response) => {
        if(response.response.data.hasOwnProperty('success') && response.response.data === false){
          return;
        }

        let clonedTickets = JSON.parse(JSON.stringify(response.response.data.tickets));
        response.response.data.tickets = [];

        clonedTickets.forEach( (ticket) => {
          let ticketModel = new Ticket(ticket);
          response.response.data.tickets.push(ticketModel);
        });

        this.onFetchSuccess(response);
      }).catch(error => console.log("error", error));
    }
    */

    onFetchSuccess(response){

      if(response.response.data.hasOwnProperty('success') && response.response.data === false){
        return;
      }

      let clonedTickets = JSON.parse(JSON.stringify(response.response.data.tickets));
      response.response.data.tickets = [];

      clonedTickets.forEach( (ticket) => {
        let ticketModel = new Ticket(ticket);
        response.response.data.tickets.push(ticketModel);
      });


      this.assign(response.response.data);

      Vue.set(this, 'fatal', false);
      Vue.set(this, 'loading', false);

      this.emit('fetch', { error: null });
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
