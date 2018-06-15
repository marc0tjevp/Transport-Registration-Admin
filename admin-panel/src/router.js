import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from './components/Dashboard.vue'
import Driver from './components/Driver.vue'
import Cargo from './components/Cargo.vue'
import Location from './components/Location.vue'
import Drivetimes from './components/Drivetimes.vue'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/driver',
      name: 'driver',
      component: Driver
    },
    {
      path: '/cargo',
      name: 'cargo',
      component: Cargo
    },
    {
      path: '/location',
      name: 'location',
      component: Location
    },
    {
      path: '/Drivetimes',
      name: 'Drivetimes',
      component: Drivetimes
    }
  ]
})