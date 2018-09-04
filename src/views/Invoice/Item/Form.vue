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
  import EventBus from '../../../components/EventBus.js';
  import InvoiceItem from '../../../models/invoiceItem.js';

  export default {
    name: 'InvoiceItemForm',
    props: ['item'],
    data: () => ({
      dialog: false,
      valid: false,
    }),
    created() {
      EventBus.$on('openItemForm', () => this.dialog = true);
    },
    methods: {
      openItemForm(){
        this.dialog = true;
      },
      cancel() {
        EventBus.$emit("closeDialog");
      },
      submit() {
        this.item.save().then((response) => {
          this.dialog = false;
          EventBus.$emit('invoiceItemUpdated');
        }).catch(error => {
          if (error.hasOwnProperty('errors')) {
            console.log(error.errors);
          }

        });
      }
    }
  }
</script>
