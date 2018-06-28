<template>
  <div id="app">
  
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link class="navbar-brand" to="/">Transporteur Portal</router-link>
  
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
  
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            
          </li>
          <li class="nav-item">
            <router-link active-class="active" class="nav-link" to="/chauffeurs">Chauffeurs</router-link>
          </li>
          <li class="nav-item">
            <router-link active-class="active" class="nav-link" to="/vrachten">Vrachten</router-link>
          </li>
          <li class="nav-item">
            <router-link active-class="active" class="nav-link" to="/routes">Routes</router-link>
          </li>
          <li class="nav-item">
            <router-link active-class="active" class="nav-link" to="/rijtijden">Rijtijden</router-link>
          </li>
        </ul>
      </div>
    </nav>
  
    <div class="container-fluid">
      <router-view />
    </div>
  
  </div>
</template>

<script>
  import Dashboard from './components/Dashboard.vue'
  import Driver from './components/Driver.vue'
  import Cargo from './components/Cargo.vue'
  import Location from './components/Location.vue'
  import Drivetimes from './components/Drivetimes.vue'
  
  export default {
    name: 'app',
    components: {
      Dashboard,
      Driver,
      Cargo,
      Location,
      Drivetimes
    }
  }
</script>

<style>
  nav {
    margin-bottom: 50px;
  }
</style>



