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
 * Invoice model
 */

class Invoice extends BaseModel {

// Default attributes that define the "empty" state.
  defaults() {
    return {
      id: null,
      title: null,
      date: null,
      invoice_number: null,
      items: [],
      sumNet: null,
      sumTaxAmount: null,
      sumTotal: null
    }
  }

// Attribute mutations.
  mutations() {
    return {
      //title: String,
      //body: String,
    }
  }

// Attribute validation
  validation() {
    return {
      title: required.and(string),
    }
  }

// Route configuration
  routes() {
    return {
      fetch: 'api/invoice/{id}',
      delete: 'api/invoice/{id}',
      save: 'api/invoice',
      update: 'api/invoice/{id}',
      getPdf: 'api/invoice/generate-pdf/{id}',
    }
  }

  /**
   * Read pdf stream vom api and output it to browser
   */
  getPdf() {

    let route = this.getRoute('getPdf');
    let url = this.getRouteResolver()(route, {id: this.id});

    let headers = this.getAuthHeaders();
    headers["Content-Type"] = "application/pdf; charset=utf-8";


    fetch(url, {
      headers
    })
      .then(function (response) {
        return response.blob();
      })
      .then(function (myBlob) {
        const fileURL = URL.createObjectURL(myBlob);
        window.open(fileURL);
      })
      .catch(error => console.log(error.response));
  }

  getAuthHeaders() {
    let token = store.state.token;
    return (typeof token === 'undefined') ? '' : {
      Authorization: 'Bearer ' + token
    };
  }

  getRouteResolver() {
    var self = this;
    return function (route, parameters = {}) {
      return store.state.config.API_URL + self.getDefaultRouteResolver()(route, parameters)
    }
  }

  options() {
    return {
      validateOnSave: true,
      validateOnChange: true,
      methods: {
        update: "PUT"
      }
    }
  }


}

export {Invoice as default}
