<script>
  export default {
    name: 'FormatPrice',
    methods: {
      formatPrice(price) {
        if(price === null || price == "") return "";
        return parseFloat(price).toFixed(2) + " &euro;"
      },
    }
  }
</script>
