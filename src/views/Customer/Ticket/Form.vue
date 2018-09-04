<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn slot="activator" color="primary" dark>Add / Edit Ticket</v-btn>
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
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Abbrechen</v-btn>
          <v-btn color="blue darken-1" flat @click.native="submit()">Speichern</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>

</template>

<script>
  import EventBus from '../../../components/EventBus.js';
  export default {
    name: 'TicketForm',
    props: ['ticket'],
    data: () => ({
      dialog: false
    }),
    created() {
      EventBus.$on('openTicketForm', () => this.dialog = true);
    },
    methods: {
      submit() {
        return this.dialog = false;
        this.ticket.save().then((response) => {
          this.dialog = false;
          //EventBus.$emit('invoiceUpdated');
        }).catch(error => {
          if (error.hasOwnProperty('errors')) {
            console.log(error.errors);
          }

        });
      }

    }
  }
</script>
