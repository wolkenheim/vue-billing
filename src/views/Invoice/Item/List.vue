<template>
  <v-card>
    <v-card-title primary-title>
      <v-toolbar flat dark color="teal">
        <v-toolbar-title>Rechnungsposten</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn icon @click="addItem()">
          <v-icon dark>add</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card-title>

    <v-card-text>
      <v-alert v-if="showAlert" @click="showAlert = false" :value="true" :type="alertType" dismissible>
        {{ alertMessage }}
      </v-alert>
      <v-data-table

        v-model="selected"
        :headers="headers"
        :items="items"
        :search="search"
        :loading="loading"
        select-all
        :hide-actions="true"
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
            <td><b>{{ props.item.title}}</b><br/>{{ props.item.description }}
            </td>
            <td>{{ props.item.tax_rate }}</td>
            <td v-html="formatPrice(props.item.price)"></td>
            <td>
              <v-btn icon small @click="editItem(props.item)">
                <v-icon>edit</v-icon>
              </v-btn>
            </td>
            <td>
              <v-btn icon small @click="deleteItem( props.item )">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
        <template slot="pageText" slot-scope="props">
          {{ props.pageStart }} - {{ props.pageStop }} von {{ props.itemsLength }}
        </template>
      </v-data-table>
      <invoice-item-form :item="itemToEdit"></invoice-item-form>
    </v-card-text>

  </v-card>
</template>

<script>
  import DataTables from "../../../mixins/data-tables";
  import FormatPrice from "../../../mixins/format-price";
  import InvoiceItemForm from "./Form";
  import EventBus from '../../../components/EventBus.js';
  import InvoiceItem from '../../../models/invoiceItem.js';

  export default {
    name: 'InvoiceItemList',
    props: ['items','invoiceId'],
    mixins: [DataTables,FormatPrice],
    components: {
      InvoiceItemForm,
    },
    data() {
      return {
        itemToEdit: new InvoiceItem(),
        showAlert: false,
        alertMessage: null,
        alertType: 'success',
        pagination: {
          sortBy: 'count',
          descending: true
        },
        headers: [
          {text: 'Titel', value: 'title', width: '50%'},
          {text: 'Steuer', value: 'tax_rate', width: '50px'},
          {text: 'Preis (netto)', value: 'price', width: '50px'},
          {text: '', value: 'edit', width: '20px'},
          {text: '', value: 'del', width: '20px'},
        ],
      }
    },
    methods: {
      addItem() {
        this.itemToEdit = new InvoiceItem();
        this.itemToEdit.invoice_id = this.invoiceId;
        EventBus.$emit('openItemForm');
      },
      editItem(item) {
        this.itemToEdit = new InvoiceItem(item);
        EventBus.$emit('openItemForm');
      },
      deleteItem(item) {
        let itemToDelete = new InvoiceItem(item);
        itemToDelete.delete().then((response) => {
          if (response.response.data.hasOwnProperty('message')) {
            this.alertMessage = response.response.data.message;
            this.alertType = (response.response.data.success) ? 'success' : 'error';
            this.showAlert = true;
            EventBus.$emit('invoiceUpdated');
          }
        });
      }
    },

  }
</script>
