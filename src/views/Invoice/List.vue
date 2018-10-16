<template>
  <v-card height=100%>
    <v-card-title>
      <div>
        <h3 class="headline mb-0">Listing der Rechnungen</h3>
      </div>
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Suche"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-alert v-if="showAlert" @click="showAlert = false" :value="true" :type="alertType" dismissible>
        {{ alertMessage }}
      </v-alert>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="invoicesModels"
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
            <td>{{ props.item.date}}</td>
            <td>{{ props.item.title}}</td>
            <td>{{ props.item.customer.fullname }}</td>
            <td>
              <v-btn icon small :to="{ name: 'InvoiceEdit', params: {id: props.item.id } }">
                <v-icon>edit</v-icon>
              </v-btn>
            </td>
            <td>
              <v-btn icon small @click="deleteInvoice( props.item )">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
        <template slot="pageText" slot-scope="props">
          {{ props.pageStart }} - {{ props.pageStop }} von {{ props.itemsLength }}
        </template>
      </v-data-table>
      <v-btn fab dark color="indigo" :to="{name: 'CustomerAdd'}">
        <v-icon dark>add</v-icon>
      </v-btn>
    </v-card-text>

  </v-card>
</template>

<script>
  import DataTables from "../../mixins/data-tables";
  import InvoiceList from '../../models/invoiceList.js';
  import AxiosMixin from '../../mixins/Axios/component';


  export default {
    name: 'InvoiceList',
    mixins: [DataTables, AxiosMixin],
    data() {
      return {
        invoiceList: {},
        showAlert: false,
        alertMessage: null,
        alertType: 'success',
        pagination: {
          sortBy: 'count',
          descending: true
        },
        headers: [
          {text: 'Date', value: 'date'},
          {text: 'Titel', value: 'title'},
          {text: '', value: 'edit'},
          {text: '', value: 'del'},
        ],
      }
    },
    computed: {
      invoicesModels() {
        if(this.invoiceList.hasOwnProperty('models')){
          return this.invoiceList.models;
        }
      },
    },
    mounted() {
      this.invoiceList = new InvoiceList();
      this.invoiceList.fetch();
    },
    methods: {
      create() {
        return this.$router.push({name: "CustomerAdd"});
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
    },

  }
</script>
