<template>
  <div id="app">
  
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Transporteur Portal</a>
  
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
  
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/driver">Chauffeurs</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cargo">Cargo</router-link>
          </li>
        </ul>
      </div>
    </nav>
  
    <div class="container">
      <router-view />
    </div>
  
  </div>
</template>

<script>
  import Skills from './components/Skills.vue'
  import Driver from './components/Driver.vue'
  import Cargo from './components/Cargo.vue'
  
  export default {
    name: 'app',
    components: {
      Skills,
      Driver,
      Cargo
    }
  }
</script>

<style>
  @import url('https://use.fontawesome.com/releases/v5.0.13/css/all.css');
  @import url('https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css');
  nav {
    margin-bottom: 50px;
  }
</style>