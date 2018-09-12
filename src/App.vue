<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          :class="item.class"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" @click="navigateTo(item.routeName)"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-toolbar-title v-text="title"></v-toolbar-title>

    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    methods: {
      navigateTo: function (routeName) {
        return this.$router.push({name: routeName});
      },
      setActiveClass(routeName) {
        this.items.forEach((item) => {
          if (item.routeName == routeName) {
            item.class = "active-menu";
          } else {
            item.class = '';
          }
        })
      }
    },
    watch: {
      '$route' (to, from) {
        this.setActiveClass(this.$route.name);
      }
    },
    data() {
      return {
        activeClass: "",
        clipped: false,
        drawer: true,
        fixed: false,
        items: [{
          icon: 'face',
          title: 'Customers',
          routeName: 'CustomerListing',
          class: ''
        }, {
          icon: 'receipt',
          title: 'Invoices',
          routeName: 'InvoiceListing',
          class: ''
        }, {
          icon: 'message',
          title: 'Tickets',
          routeName: 'TicketListing',
          class: ''
        }],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Billing'
      }
    }
  }
</script>
<style type="css">
  .active-menu {
    background-color: #ccc;
  }
</style>
