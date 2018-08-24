<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn slot="activator" color="primary" dark>Neues Ticket</v-btn>
      <ticket-form :customer-id="customerId" :ticket="ticket"></ticket-form>
    </v-dialog>
  </v-layout>
</template>

<script>
  import Ticket from '../../models/ticket.js';
  import TicketForm from './Form';
  import EventBus from '../../components/EventBus.js';
  export default {
    name: 'TicketAdd',
    components: {
      TicketForm
    },
    props: ['customerId'],
    data: () => ({
      ticket: {},
      dialog: false
    }),
    created(){
      EventBus.$on('closeDialog', () => {this.dialog = false});

      this.ticket = new Ticket();
      this.ticket.customer_id = this.customerId;
    },
  }
</script>
