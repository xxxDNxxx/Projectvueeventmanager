<template>
  <div>
    <h1>Manage Event</h1>
    <form class="custom-form" v-on:submit.prevent="onSubmit">
        <div class="form-group">
            <qrcode-vue :value="event.eventKey" :size="200" level="H"></qrcode-vue>
        </div>
        <div class="form-group">
          
        <label for="eventKey">Event Key</label>
        <h1
          name="eventKey"
          id="eventKey"
          >
          {{event.eventKey}}
        </h1>
      </div>
      <div class="form-group">
          
        <label for="title">Title</label>
        <h1
          name="title"
          id="title"
          >
          {{event.title}}
        </h1>
      </div>
      <div class="form-group">
        <label for="body">Event Description</label>
        <h1  
        name="body" id="body"  
        
        >
        {{event.body}}
        </h1>
      </div>
      <div class="form-group">
        <label for="due-date">Due Date</label>
        <h1
          name="due-date"
          id="due-date"
          >
          {{event.dueDate}}
        </h1>
      </div>
      
    </form>
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
           dueDate:''
       }
     }

   },
   beforeRouteEnter (to, from, next) {
       eventService.getEventById(to.params.id).then(response =>{
           if(!response){
               next('/events')
           }else{
               next(vm =>{
                   const event = response.data.event
                   event.dueDate = moment(event.dueDate).format('YYYY-MM-DD')
                   vm.event = event
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
   components:{
       QrcodeVue
   }
}
</script>
    

