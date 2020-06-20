<template>
  <div>
    <!--content-->
    <div class="container">
            <div class="row">
                <div class="col-sm">
                    <h1 class="text-center">{{event.title}}</h1>
                </div>
            </div>
                 <!-- QRModal -->
      <div>
  <b-modal id="bv-modal-example" hide-footer>
    <template v-slot:modal-title>
      <code>{{event.title}}</code> 
    </template>
    <div class="d-block text-center">
      <div class="form-group">
            <qrcode-vue :value="event.eventKey" :size="400" level="H"></qrcode-vue>
        </div>
        <div class="form-group">
          
        <label style="color:black;" for="eventKey">Event Key</label>
        <h1 style="color:black;"
          name="eventKey"
          id="eventKey"
          >
          {{event.eventKey}}
        </h1>
      </div>
    </div>
    <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close</b-button>
  </b-modal>
</div>
      <!-- EndQRModal -->
            
   <!-- Event info -->         
  <div class="row mt-5">
    <div style="background-color: #60B1C0;" class="col-sm">
      <div>
          <h1>Event Info</h1>
          </div>
          <div>
              <h2>description:</h2>
              <p>{{event.body}}</p>
          </div>
          
      
      <div>
          <h2>Expire Date:</h2>
          <p>{{event.dueDate}}</p>
      </div>
      <div>
        <b-button id="show-btn" @click="$bvModal.show('bv-modal-example')">Scan QR</b-button>      
        </div>
        
    </div>
    <!-- End Event Info -->

    <!-- Attendees -->
    <div class="col-sm">
      <label>Attendee</label>
      <div>
        <b-table striped hover :items="user" :fields="fields">
          
        </b-table>
      </div>
    </div>
    <!-- End Attendees -->

  
  </div>
</div>
    <!--end content-->
 
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import * as eventService from '../../services/EventService'
import moment from 'moment'
export default {
  
   name:'events-manage',
   data: function(){
     return{
       event:{
           eventKey:'',
           title:'',
           body:'',
           dueDate:'',
           attendees:[
              
             ]
             
       },
       user:{
         id:'',
         type:'',
         username:''

       },
       fields:['id','username','type']
     }

   },
   beforeRouteEnter (to, from, next) {
       eventService.getEventById(to.params.id).then(response =>{
           if(!response){
               next('/events')
           }else{
               next(vm =>{
                   const event = response.data.event
                   const user = response.data.users
                   event.dueDate = moment(event.dueDate).format('YYYY-MM-DD')
                   vm.event = event
                   vm.user = user
                   console.log(event)
               })
           }
       })
       
   },
   methods:{
      onSubmit: async function(){
        const request = {
            event:this.event
            
          
        }
        await eventService.updateEvent(request)
        this.$router.push({name:'events-all'})  
      }
   },
    components: {
      QrcodeVue
    }
}
</script>
    

