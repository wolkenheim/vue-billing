<template>
  <div class="about">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-btn fab small dark color="indigo" @click="init()" slot="activator">
        <v-icon dark>add</v-icon>
      </v-btn>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Add new Item
        </v-card-title>

        <v-card-text>
          <invoice-item-form :formRef="formRef" :item="item"></invoice-item-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn flat @click="dialog = false">Abbrechen</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="submit">Speichern</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>

  import InvoiceItemForm from './Form.vue'
  import InvoiceItem from '../../../models/invoiceItem.js';
  import EventBus from '../../../components/EventBus.js';

  export default {
    name: 'InvoiceItemAdd',
    components: {
      InvoiceItemForm
    },
    data() {
      return {
        formRef: "add",
        item: new InvoiceItem(),
        dialog: false,
      }
    },
    created(){
      EventBus.$on('closeDialog', () => this.dialog = false);
    },
    methods: {
      init(){
        this.item = new InvoiceItem();
      },
      submit(){
        EventBus.$emit('saveInvoiceItem', this.formRef)
      }
    }
  }
</script>
