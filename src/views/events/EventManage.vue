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
  <b-modal id="bv-modal-eventinfo" hide-footer>
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
    <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-eventinfo')">Close</b-button>
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
        <b-button id="show-btn" @click="$bvModal.show('bv-modal-eventinfo')">Scan QR</b-button>      
        </div>
        
    </div>
    <!-- End Event Info -->

    <!-- Attendees -->
    <div class="col-sm">
      
      <div v-if="user.length>0">
        <label>Member</label>
        <b-table thead-class="text-center" tbody-class="text-center" bordered hover :items="user" :fields="fields">
          <template v-slot:cell(index)="user">
        {{ user.index + 1 }}
        
      </template>
          <template v-slot:cell(operation)="user">
            
            <div>
              <b-button v-if="user.item.verify == false " variant="warning" @click="updateVerify(user.item.userid)">
                Verify
                </b-button>
                &nbsp;
              <b-button v-if="user.item.type == 'fail'" variant="success" @click="updateAttend(user.item.id)">
                Attended
                </b-button>
            </div>
          </template>
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
       user:[{
         id:'',
         userid:'',
         index:'',
         type:'',
         username:'',
         firstname:'',
         lastname:'',
         verify:''

       }],
       
       fields:['index','username','verify','type','operation']
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
      },
      updateAttend: async function(id){
        
        const attendees = {
          id:id
        }
        
        // console.log(attendees)
        await eventService.updateAttend(attendees)
        await this.refresh()
        
      },
      refresh: async function() {
        const resEvent = await eventService.getEventById(this.$route.params.id)
        const event = resEvent.data.event
        const user = resEvent.data.users
        event.dueDate = moment(event.dueDate).format('YYYY-MM-DD')
        this.event = event
        this.user = user
      },
      updateVerify: async function(id){
        const verifies = {
          userid:id
        }
        await eventService.updateVerify(verifies)
        await this.refresh()
        
      }
   },
    components: {
      QrcodeVue
    }
}
</script>
    

