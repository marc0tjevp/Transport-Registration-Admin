import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from './components/Dashboard.vue'
import Driver from './components/Driver.vue'
import Cargo from './components/Cargo.vue'
import Location from './components/Location.vue'
import Drivetimes from './components/Drivetimes.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      title: 'Dasboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/chauffeurs',
      title: 'Chauffeurs',
      name: 'driver',
      component: Driver
    },
    {
      path: '/vrachten',
      title: 'Vrachten',
      name: 'cargo',
      component: Cargo
    },
    {
      path: '/routes',
      title: 'Routes',
      name: 'location',
      component: Location
    },
    {
      path: '/rijtijden',
      title: 'Rijtijden',
      name: 'Drivetimes',
      component: Drivetimes
    }
  ]
})