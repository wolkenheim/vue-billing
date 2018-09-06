<template>
  <div class="about">
    <h1>Edit Customer</h1>
    <customer-form :customer="customer"></customer-form>
    <customer-ticket-list :customer-id="customer.id" :tickets="customer.tickets"></customer-ticket-list>
  </div>
</template>
<script>

  import CustomerForm from './Form.vue'
  import Customer from '../../models/customer.js';
  import CustomerTicketList from './Ticket/List';
  import EventBus from '../../components/EventBus.js';

  export default {
    name: 'CustomerEdit',
    components: {
      CustomerForm,
      CustomerTicketList
    },
    data() {
      return {
        customer: {
          tickets: []
        },
      }
    },
    created() {
      EventBus.$on('customerUpdated', () => {
        this.fetchCustomer();
      });
    },
    mounted() {
      let id = this.$route.params.id;
      this.customer = new Customer();
      this.customer.id = id;
      this.fetchCustomer();
    },
    methods: {
      fetchCustomer(){
        this.customer.fetch().then().catch((error) => {
          console.log(error);
          return this.$router.push({name: "CustomerListing"});
        });
      }
    }
  }
</script>
