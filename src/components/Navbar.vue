<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top custom-bg-dark">
        <router-link to="/" class="navbar-brand" >
            <img style="max-height:25px" alt="Vue logo" src="../assets/logo.png" />
        Event Manager
        </router-link>
      
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav ml-auto">
          <!-- <li class="nav-item">
              <router-link to="/" class="nav-link" exact >
        Home
        </router-link>
            
          </li> -->
          <li v-if="$store.state.isLoggedIn" class="nav-item">
              <router-link to="/events" class="nav-link" exact>
        Event
        </router-link>
          </li>
          <li v-if="!$store.state.isLoggedIn" class="nav-item">
              <router-link to="/register" class="nav-link" exact>
        
        </router-link>
          </li>
          <!-- <li v-if="$store.state.isLoggedIn" class="nav-item">
              <router-link to="/admin" class="nav-link" exact>
        Manage User
        </router-link>
          </li> -->
          <li v-if="!$store.state.isLoggedIn" class="nav-item">
              <router-link to="/login" class="nav-link" exact>
        Login
        </router-link>
          </li>
          <li v-on:click.prevent="logout()" v-if="$store.state.isLoggedIn" class="nav-item">
            <a class="nav-link" href="#">Logout</a>
          </li>
          <li class="nav-item">
            <a  class="nav-link" href="#">
                {{this.$store.state.username ?
                this.$store.state.username : 'User'}}
            </a>
          </li>
          
        </ul>
      </div>
    </nav>
  </header>
</template>
<script>
import * as auth from '../services/AuthService'

export default {
  name:'Navbar',
  methods:{
    logout: function(){
      auth.logout()
      this.$router.push({name:'login'})
    }
  }
}
</script>