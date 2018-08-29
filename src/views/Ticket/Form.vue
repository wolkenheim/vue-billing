<template>
  <v-card>
    <v-card-title>
      <span class="headline">Neues Ticket erstellen</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field v-model="ticket.title" label="Titel" required></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-textarea v-model="ticket.description" label="description" required></v-textarea>
          </v-flex>
          <v-flex xs6>
            <v-text-field v-model="ticket.hours" type="number" min="0" label="hours" required></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field v-model="ticket.minutes" type="number" min="0" max="59"  label="minutes" required></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
      <small>*indicates required field</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" flat @click.native="closeDialog()">Close</v-btn>
      <v-btn color="blue darken-1" flat @click.native="saveTicket()">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import EventBus from '../../components/EventBus.js';
  export default {
    name: 'TicketForm',
    props: ['customerId', 'ticket'],
    methods: {
      saveTicket(){
        this.closeDialog();
      },
      closeDialog(){
        EventBus.$emit("closeDialog");
      }
    }
  }
</script>
