<template>
  <v-layout>
    <v-flex xs12 sm8 offset-sm2>
      <v-card>
        <v-card-title primary-title>
          <v-toolbar flat dark color="teal">
            <v-toolbar-title>Rechnung bearbeiten</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn icon @click="generatePdf()">
              <v-icon dark>cloud_download</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card-title>

        <v-card-text>
          <v-alert v-if="showAlert" @click="showAlert = false" :value="true" :type="alertType" dismissible>
            {{ alertMessage }}
          </v-alert>
          <invoice-form :invoice="invoice"></invoice-form>
        </v-card-text>
      </v-card>

      <invoice-item-list :invoice-id="invoice.id" :items="invoice.items"></invoice-item-list>
      <invoice-sum-block :invoice="invoice"></invoice-sum-block>

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
        invoice: new Invoice(),
        alertMessage: "",
        alertType: "",
        showAlert: false
      }
    },
    created() {
      EventBus.$on('invoiceAlert', (param) => {
        console.log(param);
        this.alertMessage = param.alertMessage;
        this.alertType = param.alertType;
        this.showAlert = true;
      });
      EventBus.$on('invoiceUpdated', () => {
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
