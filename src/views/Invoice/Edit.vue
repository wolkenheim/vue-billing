<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title primary-title>
            <v-flex xs12 sm8>
              <h3 class="headline mb-0">Edit Invoice</h3>
            </v-flex>
          <v-flex xs12 sm4>
            <v-btn small color="primary" v-on:click="generatePdf()">Download PDF<v-icon right dark>cloud_download</v-icon></v-btn>
          </v-flex>
        </v-card-title>

        <v-card-text>
          <invoice-form :invoice="invoice"></invoice-form>
          <invoice-item-list :invoice-id="invoice.id" :items="invoice.items"></invoice-item-list>
          <invoice-sum-block :invoice="invoice"></invoice-sum-block>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>

  import InvoiceForm from './Form.vue'
  import InvoiceSumBlock from './SumBlock';
  import Invoice from '../../models/invoice.js';
  import InvoiceItemList from './Item/List';
  import EventBus from '../../components/EventBus.js';

  export default {
    name: 'InvoiceEdit',
    components: {
      InvoiceForm,
      InvoiceSumBlock,
      InvoiceItemList,
    },
    data() {
      return {
        invoice: new Invoice()
      }
    },
    created() {
      EventBus.$on('invoiceItemUpdated', () => {
        this.fetchInvoice();
      });
    },
    mounted() {
      let id = this.$route.params.id;
      this.invoice.id = id;
      this.fetchInvoice();
    },
    methods: {
      fetchInvoice() {
        this.invoice.fetch().then().catch((error) => {
          console.log(error);
          return this.$router.push({name: "InvoiceListing"});
        });
      },
      generatePdf() {
        this.invoice.getPdf();
      }
    }
  }
</script>
