<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn slot="activator" color="primary" dark>Neues Ticket</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Neues Ticket erstellen</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="ticket.title" label="Titel" required></v-text-field>
                <v-text-field v-model="ticket.description" label="description" required></v-text-field>
                <v-text-field v-model="ticket.hours" label="hours" required></v-text-field>
                <v-text-field v-model="ticket.minutes" label="minutes" required></v-text-field>
                <v-text-field v-model="ticket.customer_id" label="minutes" required></v-text-field>
              </v-flex>

            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import Ticket from '../../models/ticket.js';
  export default {
    name: 'TicketAdd',
    props: ['customerId'],
    data: () => ({
      ticket: {},
      dialog: false
    }),
    created(){
      this.ticket = new Ticket();
      this.ticket.customer_id = this.customerId;
    },
  }
</script>
