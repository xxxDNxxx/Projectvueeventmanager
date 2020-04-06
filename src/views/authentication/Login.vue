<template>
  <div>
    <h1>Login</h1>
    <form class="custom-form" v-on:submit="onSubmit">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          class="form-control"
          id="username"
          placeholder="Enter Username"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" placeholder="Enter Password" />
      </div>
      <div class="form-group">
          <button type="submit" class="btn btn-secondary">Login</button>
      </div>
      
    </form>
  </div>
</template>

<script>
import * as auth from '../../services/AuthService'
export default {
   name:'login',
   methods:{
      onSubmit: function(event){
        event.preventDefault();
        auth.login()
        this.$router.push({name:'home'})  
      }
   }
}
</script>
    
