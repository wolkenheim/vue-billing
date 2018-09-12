<template>
  <v-layout>
    <v-flex xs12 sm8 offset-sm2>
      <v-card>
        <v-card-title primary-title>
          <v-toolbar flat dark color="teal">
            <v-toolbar-title>Kunde bearbeiten</v-toolbar-title>
          </v-toolbar>
        </v-card-title>

        <v-card-text>
          <v-alert v-if="showAlert" @click="showAlert = false" :value="true" :type="alertType" dismissible>
            {{ alertMessage }}
          </v-alert>
          <customer-form :customer="customer"></customer-form>
        </v-card-text>
      </v-card>

      <customer-ticket-list :customer-id="customer.id" :tickets="customer.tickets"></customer-ticket-list>
      <customer-invoice-list :customer-id="customer.id" :invoices="customer.invoices"></customer-invoice-list>

    </v-flex>
  </v-layout>
</template>
<script>

  import CustomerForm from './Form.vue'
  import Customer from '@/models/customer.js';
  import CustomerTicketList from './Ticket/List';
  import CustomerInvoiceList from './Invoice/List';
  import EventBus from '@/components/EventBus.js';

  export default {
    name: 'CustomerEdit',
    components: {
      CustomerForm,
      CustomerTicketList,
      CustomerInvoiceList
    },
    data() {
      return {
        alertMessage: "",
        alertType: "",
        showAlert: false,
        customer: {
          tickets: {},
          invoices: {}
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
      fetchCustomer() {
        this.customer.fetch().then().catch((error) => {
          console.log(error);
          return this.$router.push({name: "CustomerListing"});
        });
      }
    }
  }
</script>
