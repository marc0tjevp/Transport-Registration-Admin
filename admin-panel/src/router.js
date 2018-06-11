import Vue from 'vue'
import Router from 'vue-router'
import Skills from './components/Skills.vue'
import Driver from './components/Driver.vue'
import Cargo from './components/Cargo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'skills',
      component: Skills
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
    }
  ]
})