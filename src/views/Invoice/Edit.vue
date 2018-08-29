<template>
  <div class="about">
    <h1>Edit Invoice</h1>
    <invoice-form :invoice="invoice"></invoice-form>
    <invoice-item-list :invoice-id="invoice.id" :items="invoice.items"></invoice-item-list>
    <invoice-sum-block :invoice="invoice"></invoice-sum-block>
  </div>
</template>
<script>

  import InvoiceForm from './Form.vue'
  import InvoiceSumBlock from './SumBlock';
  import Invoice from '../../models/invoice.js';
  import InvoiceItemList from './Item/List';

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
    mounted(){
      let id =  this.$route.params.id;
      this.invoice.id = id;
      this.invoice.fetch().then().catch((error) => {
        console.log(error);
        return this.$router.push({name: "InvoiceListing"});
      });
      }
  }
</script>
