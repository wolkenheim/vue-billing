<template>
  <div class="about">
    <h1>Edit Customer</h1>
    <customer-form :customer="customer"></customer-form>
  </div>
</template>
<script>

  import CustomerForm from './Form.vue'
  import Customer from '../../models/customer.js';

  export default {
    name: 'CustomerEdit',
    components: {
      CustomerForm
    },
    data() {
      return {
        customer: {}
      }
    },
    mounted(){
      let id =  this.$route.params.id;
      this.customer = new Customer();
      this.customer.id = id;
      this.customer.fetch().then().catch((error) => {
        return this.$router.push({name: "CustomerListing"});
      });
      }
  }
</script>
