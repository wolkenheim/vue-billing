<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-toolbar dark color="teal">
          <v-btn icon dark @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>

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
                <v-text-field v-model="ticket.minutes" type="number" min="0" max="59" label="minutes"
                              required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  v-model="ticket.status"
                  :items="statuses"
                  label="Bitte Status auswählen"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>

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
  import EventBus from '@/components/EventBus.js';

  export default {
    name: 'TicketForm',
    props: ['ticket','type'],
    data: () => ({
      title: '',
      dialog: false,
      statuses: []
    }),
    watch: {
      /**
       * due to the nature of nested properties and reactivity the select field will not realize when ticket is a ticket model and not empty
       * so this watcher needs to be set
       */
      ticket() {
        if (this.ticket.hasOwnProperty('getTicketStatuses')) {
          this.statuses = this.ticket.getTicketStatuses();
        }
      },
      type(){
        this.title = (this.type == 'add') ? 'Neues Ticket erstellen' : 'Ticket bearbeiten';
      }
    },
    created() {
      EventBus.$on('openTicketForm', () => this.dialog = true);
    },
    methods: {
      submit() {
        this.ticket.save().then(() => {
          this.dialog = false;
          EventBus.$emit('customerUpdated');
        }).catch(error => {
          if (error.hasOwnProperty('errors')) {
            console.log(error.errors);
          }

        });
      }

    }
  }
</script>
