<template>
  <v-form v-model="valid">
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <v-text-field
            v-model="customer.firstname"
            label="First Name"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field
            v-model="customer.lastname"
            label="Last Name"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            v-model="customer.street"
            label="Street"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field
            v-model="customer.zipcode"
            label="Zipcode"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field
            v-model="customer.city"
            label="City"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field
            v-model="customer.country"
            label="Country"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field
            v-model="customer.state"
            label="State"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field
            v-model="customer.email"
            label="Email"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field
            v-model="customer.tel"
            label="Tel"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-textarea
            v-model="customer.notes"
            label="Notes"
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

  export default {
    name: 'CustomerForm',
    props: ['customer'],
    data: () => ({
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    }),
    methods:{
      cancel() {
        return this.$router.push({name: "CustomerListing"});
      },
      submit() {
        let self = this;
        self.customer.save();

        /*
        if (self.$refs.createForm.validate()) {
          self.activity.save().then( (response) => {
            return self.$router.push({name: "CustomerListing"});
          })
        }
        */

      }
    }
  }
</script>
