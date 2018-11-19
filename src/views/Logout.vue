<template>
  <v-container grid-list-lg>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm6 sm-offset-3>
        <v-card height=100%>
          <v-card-title>
            <div>
              <h3 class="headline mb-0">Logout</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <span>{{ msg }}</span><br/><br/>
            <router-link :to="{ path: 'login' }">Login</router-link>

          </v-card-text>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Logout',
    data() {
      return {
        msg: '',
      }
    },
    mounted() {
      let self = this;

      axios({
        method: 'GET',
        url: '/api/logout',
      }).then((response) => {
        self.msg = 'Sie sind ausgeloggt.';

      }).catch(function (error) {
        self.msg = 'Sie sind bereits ausgeloggt.';
        console.log(error);
      });

      localStorage.removeItem('token');
      self.$store.commit('LOGOUT_USER');

    }

  }
</script>
