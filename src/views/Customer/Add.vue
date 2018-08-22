<template>
  <div class="about">
    <h1>Add new Customer</h1>
    <customer-form :customer="customer"></customer-form>
  </div>
</template>
<script>

  import CustomerForm from './Form.vue'

  export default {
    name: 'CustomerAdd',
    components: {
      CustomerForm
    },
    computed: {
      config(){
        return this.$store.state.config;
      }
    },
    created(){
      console.log(this.config);
    },
    data() {
      return {
        customer: {
          firstname: "Harry",
          lastname: "Sally",
          street: "Hausgasse 16",
          zipcode: "76723",
          city: "Stuttgart",
          country: "Deutschland",
          state: "",
          email: ""
        }

      }
    },
  }
</script>
