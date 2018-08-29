import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
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
  ]
})
