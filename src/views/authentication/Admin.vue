<template>
    <div>
        <h1>User management</h1>
        <div>
          <b-table striped hover :items="user" :fields="fields">
          <template v-slot:cell(operation)="users">
            {{users}}
          </template>
        </b-table>
        </div>
    </div>
</template>
<script>
import * as userService from "../../services/UserService"
export default {

   name:'admin',
   data: function(){
     return{
       user:[{
         index:'',
         username:'',
         firstname:'',
         lastname:'',
         verify:''

       }],
       fields:['index','username','firstname','lastname','verify','operation']
     }
   },
   beforeRouteEnter (to, from, next) {
     userService.getAllUser().then(res =>{
       next(vm =>{
         vm.user = res.data.user
       })
     })
   }
}

</script>
