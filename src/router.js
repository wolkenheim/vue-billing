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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
