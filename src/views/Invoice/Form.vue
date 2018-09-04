<template>
  <v-form v-model="valid">
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <v-text-field
            v-model="invoice.title"
            label="Title"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field
            v-model="invoice.date"
            label="Date"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            v-model="invoice.invoice_number"
            label="Rechnungsnummer"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-textarea
            v-model="invoice.text_top"
            label="Text Top"
          ></v-textarea>
        </v-flex>
        <v-flex xs12>
          <v-textarea
            v-model="invoice.text_bottom"
            label="Text Bottom"
          ></v-textarea>
        </v-flex>
        <v-flex xs12>
          <v-textarea
            v-model="invoice.customer_address"
            label="Anschrift"
          ></v-textarea>
        </v-flex>
        <v-flex xs12>
          <v-btn @click="submit">Speichern</v-btn>
          <v-btn @click="cancel">Abbrechen</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>
<script>
  import EventBus from '../../components/EventBus.js';
  export default {
    name: 'InvoiceForm',
    props: ['invoice'],
    data: () => ({
      valid: false,

    }),
    methods:{
      cancel() {
        return this.$router.push({name: "InvoiceListing"});
      },
      submit() {
        let self = this;
        self.invoice.save().then( () => {
          EventBus.$emit('invoiceAlert', { alertMessage: "Rechnung wurde gespeichert.", alertType: "success" });
        }).catch(error => {
          if(error.hasOwnProperty('errors')){
            console.log(error.errors);
            EventBus.$emit('invoiceAlert', { alertMessage: error.errors, alertType: "error" });
          }

        });
      }
    }
  }
</script>
