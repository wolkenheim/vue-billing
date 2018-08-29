<template>
  <v-flex xs12 sm6 offset-sm6>
    <v-card>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-tile>
          <v-list-tile-content>Summe (netto):</v-list-tile-content>
          <v-list-tile-content class="align-end" v-html="formatPrice(invoice.sumNet)"></v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Umsatzsteuer:</v-list-tile-content>
          <v-list-tile-content class="align-end" v-html="formatPrice(invoice.sumTaxAmount)"></v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content><b>Gesamtsumme:</b></v-list-tile-content>
          <v-list-tile-content style="font-weight:bold;" class="align-end" v-html="formatPrice( invoice.sumTotal)"></v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-flex>
</template>
<script>
  import FormatPrice from "../../mixins/format-price";

  export default {
    name: 'InvoiceSumBlock',
    props: ['invoice'],
    mixins: [FormatPrice],
  }
</script>
