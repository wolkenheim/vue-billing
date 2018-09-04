<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn slot="activator" color="primary" dark>Edit Ticket</v-btn>
      <ticket-form :ticket="ticket"></ticket-form>
    </v-dialog>
  </v-layout>
</template>

<script>
  import TicketForm from './Form';
  import EventBus from '../../../components/EventBus.js';
  export default {
    name: 'TicketEdit',
    components: {
      TicketForm
    },
    props: ['ticket'],
    data: () => ({
      dialog: false
    }),
    created(){
      EventBus.$on('closeDialog', () => this.dialog = false);
      EventBus.$on('openTicketDialog', () => this.dialog = true);
    },
  }
</script>
