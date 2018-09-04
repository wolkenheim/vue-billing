<template>
  <div class="about">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Edit Item

        </v-card-title>

        <v-card-text>

          <invoice-item-form :formRef="formRef" :item="item"></invoice-item-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn flat @click="dialog = false">Abbrechen</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" :formRef="formRef" @click="submit">Speichern</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>

  import InvoiceItemForm from './Form.vue'
  import EventBus from '../../../components/EventBus.js';

  export default {
    name: 'InvoiceItemAdd',
    props: ['item'],
    components: {
      InvoiceItemForm
    },
    data() {
      return {
        formRef: "edit",
        dialog: false,

      }
    },
    created(){
      EventBus.$on('closeDialog', () => this.dialog = false);
      EventBus.$on('openEditDialog', () => this.dialog = true);
    },
    methods:{
      submit(){
        EventBus.$emit('saveInvoiceItem',this.formRef)
      },

    }
  }
</script>
