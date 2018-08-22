<script>
  import { EventBus } from "./event-bus";
  export default {
    name: 'DataTables',
    methods: {
      changeSort(column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending;
        } else {
          this.pagination.sortBy = column;
          this.pagination.descending = false;
        }
      },
    },
    data() {
      return {
        loading: false,
        noResultsText: "Keine passenden Einträge gefunden.",
        noDataText: "Keine Daten vorhanden",
        rowsPerPageItems: [10, 50, 100, {"text": "Alle", "value": -1}],
        rowsPerPageText: "Anzahl Zeilen",
        search: '',
        pagination: {
          sortBy: 'count',
          descending: true
        },
        selected: [],

      }
    }
  }
</script>
