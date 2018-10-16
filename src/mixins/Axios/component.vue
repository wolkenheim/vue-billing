<script>
  import axios from 'axios';
  import { mapState } from 'vuex'
  export default {
    name: 'AxiosMixin',
    data(){
      return {
        axios: axios.create()
      }
    },
    created(){
     // weniger interessant für login, als für alle anderen requests. Wenn token falsch oder abgelaufen.
      // methode muss das abfangen, token löschen und redirect zu login ausführen.

      this.axios.interceptors.response.use(
        response => response,
        error => {
          const {status} = error.response;
          if (status === 401) {
            console.log("401 error");

            self.$store.commit('setToken',"");
            self.$router.push({path: '/'});

          }
          return Promise.reject(error);
        }
      );

    },
    computed: mapState([
      'token'
    ]),
    methods: {
      getAuthHeaders() {
        return (typeof this.token === 'undefined') ? '' : {
          Authorization: 'Bearer ' + this.token
        };
      },
    }
  }
</script>
