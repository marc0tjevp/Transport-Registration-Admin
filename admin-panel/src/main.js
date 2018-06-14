import Vue from 'vue'
import App from './App.vue'
import VeeValidate from 'vee-validate'
import router from './router'
import VueResource from 'vue-resource';

import VueIziToast from 'vue-izitoast';
import 'izitoast/dist/css/iziToast.css';
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDhW9FqZV46tlSwsGJAOIBxBWnZ_h95DaE",
    libraries: "places"
  }
});

Vue.use(VueResource)
Vue.use(VeeValidate)
Vue.use(VueIziToast)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')