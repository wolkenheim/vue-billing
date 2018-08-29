<template>
  <v-card height=100%>
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
              <v-btn icon small @click="deleteCustomer( props.item.id )">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
        <template slot="pageText" slot-scope="props">
          {{ props.pageStart }} - {{ props.pageStop }} von {{ props.itemsLength }}
        </template>
      </v-data-table>
      <invoice-item-add :invoiceId="invoiceId"></invoice-item-add>
      <invoice-item-edit :item="itemToEdit"></invoice-item-edit>
    </v-card-text>

  </v-card>
</template>

<script>
  import DataTables from "../../../mixins/data-tables";
  import FormatPrice from "../../../mixins/format-price";
  import InvoiceItemAdd from "./Add";
  import InvoiceItemEdit from "./Edit";
  import EventBus from '../../../components/EventBus.js';
  import InvoiceItem from '../../../models/invoiceItem.js';

  export default {
    name: 'InvoiceItemList',
    props: ['items','invoiceId'],
    mixins: [DataTables,FormatPrice],
    components: {
      InvoiceItemAdd,
      InvoiceItemEdit
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
          {text: 'Titel', value: 'title'},
          {text: 'Steuer', value: 'tax_rate'},
          {text: 'Preis (netto)', value: 'price'},

          {text: '', value: 'edit'},
          {text: '', value: 'del'},
        ],
      }
    },
    methods: {
      editItem(item) {
        this.itemToEdit = new InvoiceItem(item);
        EventBus.$emit('openEditDialog');
      },
      deleteItem(id) {

      }
    },

  }
</script>
