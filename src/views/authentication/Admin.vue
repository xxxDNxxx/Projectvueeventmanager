<template>
    <div>
        <h1>User management</h1>
        <div>
          <b-table striped hover :items="event.attendees" :fields="fields">
          <template v-slot:cell(operation)="data">
            <b-button @click="info(data)">Info</b-button>
          </template>
        </b-table>
        </div>
    </div>
</template>
<script>
import * as userService from "../../services/UserService"
export default {
  name:"admin",
  data: function(){
    return{
      users:null,
      currentUserId:null
    }
  },
  beforeRouteEnter(to,from,next){
    userService.getAllUser().then(res =>{
      next(vm =>{
        vm.users = res.data.users
      })
    })
  },
  methods:{
    
  }
}
</script>