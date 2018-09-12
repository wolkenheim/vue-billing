<template>
  <v-card>
    <v-card-title>
      <v-toolbar flat dark color="teal">
        <v-toolbar-title>Rechnungen des Kunden</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="addInvoice()">
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
        :items="invoiceModels"
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
            <td>{{ props.item.created_at }}</td>
            <td>{{ props.item.title }}</td>
            <td>{{ props.item.namedStatus }}</td>
            <td>
              <v-btn icon small :to="{ name: 'InvoiceEdit', params: {id: props.item.id } }">
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
    </v-card-text>

    <v-layout row justify-center>
      <v-dialog v-model="dialog"  persistent max-width="500px">
        <v-card>
          <v-toolbar dark color="teal">
            <v-btn icon dark @click.native="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Neue Rechnung für Kunden anlegen</v-toolbar-title>
          </v-toolbar>
        <invoice-form :invoice="invoiceToAdd"></invoice-form>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-card>
</template>

<script>
  import DataTables from "@/mixins/data-tables";
  import EventBus from '@/components/EventBus.js';
  import InvoiceForm from '@/views/Invoice/Form';
  import Invoice from '@/models/invoice';


  export default {
    name: 'CustomerInvoiceList',
    mixins: [DataTables],
    props: ['invoices', 'customerId'],
    components: {InvoiceForm},
    data() {
      return {
        dialog: false,
        invoiceToAdd: new Invoice(),
        showSearch: false,
        ticketToEdit: {},
        invoiceList: {},
        showAlert: false,
        alertMessage: null,
        alertType: 'success',
        pagination: {
          sortBy: 'count',
          descending: true
        },
        headers: [
          {text: 'Datum', value: 'created_at'},
          {text: 'Title', value: 'title'},
          {text: 'Status', value: 'namedStatus'},
          {text: '', value: 'edit'},
          {text: '', value: 'del'},
        ],
      }
    },
    computed: {
      invoiceModels() {
        if (this.invoices.hasOwnProperty('models')) {
          return this.invoices.models;
        }
      },
    },
    methods: {
      addInvoice(){
        this.invoiceToAdd = new Invoice();
        this.invoiceToAdd.customer_id = this.customerId;
        EventBus.$emit('openInvoiceForm');
        this.dialog = true;
      },
      deleteInvoice(invoice) {
        invoice.delete().then((response) => {
          if (response.response.data.hasOwnProperty('message')) {
            this.alertMessage = response.response.data.message;
            this.alertType = (response.response.data.success) ? 'success' : 'error';
            this.showAlert = true;
          }
        });
      }
    }
  }
</script>
