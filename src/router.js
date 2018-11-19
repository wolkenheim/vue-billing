import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login'
import Logout from './views/Logout'
import store from './store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/customers',
      name: 'CustomerListing',
      component: () => import('./views/Customer/List.vue')
    },
    {
      path: '/customer/add',
      name: 'CustomerAdd',
      component: () => import('./views/Customer/Add.vue')
    },
    {
      path: '/customer/edit/:id',
      name: 'CustomerEdit',
      component: () => import('./views/Customer/Edit.vue')
    },
    {
      path: '/invoices',
      name: 'InvoiceListing',
      component: () => import('./views/Invoice/List.vue')
    },
    {
      path: '/invoice/edit/:id',
      name: 'InvoiceEdit',
      component: () => import('./views/Invoice/Edit.vue')
    },
    {
      path: '/invoice/add',
      name: 'InvoiceAdd',
      component: () => import('./views/Invoice/Add.vue')
    },
    {
      path: '/tickets',
      name: 'TicketListing',
      component: () => import('./views/Ticket/List.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        layout: "no-topbar",
        title: "Login"
      },
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout,
    }
  ],
});

router.beforeEach((to, from, next) => {
  if (!store.getters.isLoggedIn && to.name !== "Login") {
    next({path: '/login'})
  } else {
    next();
  }
});
export default router;

