<template>
  <v-card>
    <v-card-title>
      <v-toolbar flat dark color="teal">
        <v-toolbar-title>Tickets des Kunden</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="addTicket()">
          <v-icon dark>add</v-icon>
        </v-btn>
        <v-btn icon @click="showSearch = !showSearch">
          <v-icon dark>search</v-icon>
        </v-btn>
        <v-text-field
          v-show="showSearch"
          append-icon="search"
          label="Suche"
          single-line
          hide-details
          v-model="search"
        ></v-text-field>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <v-alert v-if="showAlert" @click="showAlert = false" :value="true" :type="alertType" dismissible>
        {{ alertMessage }}
      </v-alert>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="ticketsModels"
        :search="search"
        :loading="loading"
        select-all
        :pagination.sync="pagination"
        :noResultsText="noResultsText"
        :noDataText="noDataText"
        :rowsPerPageItems="rowsPerPageItems"
        :rows-per-page-text="rowsPerPageText"
        item-key="id"
        class="site-clicks-table"
      >
        <template slot="headers" slot-scope="props">
          <tr>
            <th
              v-for="header in props.headers"
              :key="header.value"
              :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
              @click="changeSort(header.value)"
            >
              <v-icon small>arrow_upward</v-icon>
              {{ header.text }}
            </th>
          </tr>
        </template>
        <template slot="items" slot-scope="props">
          <tr :active="props.selected" @click="props.selected = !props.selected">
            <td>{{ props.item.title }}</td>
            <td>{{ props.item.namedStatus }}</td>
            <td>
              <v-btn icon small @click="editTicket( props.item )">
                <v-icon>edit</v-icon>
              </v-btn>
            </td>
            <td>
              <v-btn icon small @click="deleteTicket( props.item )">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
        <template slot="pageText" slot-scope="props">
          {{ props.pageStart }} - {{ props.pageStop }} von {{ props.itemsLength }}
        </template>
      </v-data-table>
      <ticket-form :ticket="ticketToEdit" :type="ticketFormType"></ticket-form>
    </v-card-text>
  </v-card>
</template>

<script>
  import Ticket from '@/models/ticket.js';
  import DataTables from '@/mixins/data-tables';
  import TicketForm from './Form'
  import EventBus from '@/components/EventBus.js';

  export default {
    name: 'CustomerTicketList',
    components: {
      TicketForm,
    },
    mixins: [DataTables],
    props: ['tickets','customerId'],
    data() {
      return {
        ticketFormType: '',
        showSearch: false,
        ticketToEdit: {},
        showAlert: false,
        alertMessage: null,
        alertType: 'success',
        pagination: {
          sortBy: 'count',
          descending: true
        },
        headers: [
          {text: 'Title', value: 'title'},
          {text: 'Status', value: 'namedStatus'},
          {text: '', value: 'edit'},
          {text: '', value: 'del'},
        ],
      }
    },
    computed: {
      ticketsModels() {
        if(this.tickets.hasOwnProperty('models')){
          return this.tickets.models;
        }
      }
    },
    methods: {
      addTicket() {
        this.ticketFormType = 'add';
        this.ticketToEdit = new Ticket();
        this.ticketToEdit.customer_id = this.customerId;
        EventBus.$emit('openTicketForm');
      },
      editTicket(ticket) {
        this.ticketFormType = 'edit';
        this.ticketToEdit = ticket;
        EventBus.$emit('openTicketForm');
      },
      deleteTicket(ticket) {
        let ticketToDelete = ticket;
        ticketToDelete.delete().then((response) => {
          if (response.response.data.hasOwnProperty('message')) {
            this.alertMessage = response.response.data.message;
            this.alertType = (response.response.data.success) ? 'success' : 'error';
            this.showAlert = true;
            EventBus.$emit('customerUpdated');
          }
        });
      }
    },

  }
</script>
