import axios from 'axios';
import store from '../store'
import { EventBus } from '@/event.js';

export default function setup() {

    /**
     * Set Bearer to access protected routes
     */
    axios.interceptors.request.use(
        config => {
            const token = store.getters.token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        });
    /**
     * Case Token is invalid
     */
    axios.interceptors.response.use(
        response => response,
        error => {
            if(typeof (error.response) !== "undefined" && error.response.hasOwnProperty('status')){
              const {status} = error.response;
              if (status === 401) {
                store.commit('setToken', "");
                EventBus.$emit('axiosError', "There was a problem with your login.");
              }
            } else {
              EventBus.$emit('axiosError', "There was a problem with the server.");
            }

            return Promise.reject(error);
        }
    );
}
