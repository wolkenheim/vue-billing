<template>
  <v-form v-model="valid">
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            v-model="item.title"
            label="Title"
            :error-messages="item.errors.title"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-textarea
            v-model="item.description"
            label="Description"
          ></v-textarea>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field
            v-model="item.price"
            label="Price (net)"
            :error-messages="item.errors.price"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field
            v-model="item.tax_rate"
            label="Tax Rate (%)"
            :error-messages="item.errors.tax_rate"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>
<script>
  import EventBus from '../../../components/EventBus.js';
  export default {
    name: 'InvoiceItemForm',
    props: ['item','formRef'],
    data: () => ({
      valid: false,
    }),
    created(){
      EventBus.$on('saveInvoiceItem', (formRef) => { if(formRef === this.formRef) this.submit(); } );
    },
    methods:{
      cancel() {
        EventBus.$emit("closeDialog");
      },
      submit() {
        this.item.save().then( (response) => {
          EventBus.$emit("closeDialog");
        }).catch(error => {
          if(error.hasOwnProperty('errors')){
            console.log(error.errors);
          }

        });
      }
    }
  }
</script>
