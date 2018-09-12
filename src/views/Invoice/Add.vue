<template>
  <div class="about">
    <h1>Add new Invoice</h1>
    <customer-form :customer="customer"></customer-form>
  </div>
</template>
<script>

  import CustomerForm from './Form.vue'
  import Customer from '../../models/customer.js';

  export default {
    name: 'CustomerAdd',
    components: {
      CustomerForm
    },
    computed: {
      config(){
        return this.$store.state.config;
      }
    },
    created(){
      this.customer = new Customer();
    },
    data() {
      return {
        customer: {}

      }
    },
  }
</script>
