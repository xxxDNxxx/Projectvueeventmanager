<template>
  <div>
    <h1>Edit Event</h1>
    <form class="custom-form" v-on:submit.prevent="onSubmit">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          v-model="event.title"
          type="text"
          name="title"
          class="form-control"
          id="title"
          placeholder="Enter Eventname"
        />
      </div>
      <div class="form-group">
        <label for="body">Event Description</label>
        <textarea class="form-control" 
        v-model="event.body" 
        name="body" id="body"  
        placeholder="Enter Description"
        cols="30" 
        rows="10">
        
        </textarea>
      </div>
      <div class="form-group">
        <label for="due-date">Due Date</label>
        <input
          v-model="event.dueDate"
          type="date"
          name="due-date"
          class="form-control"
          id="due-date"
          placeholder="Due Date"
        />
      </div>
      <div class="form-group">
          <button type="submit" class="btn btn-success">Update</button>
      </div>
      
    </form>
  </div>
</template>

<script>
import * as eventService from '../../services/EventService'
import moment from 'moment'
export default {
   name:'events-edit',
   data: function(){
     return{
       event:{
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
   }
}
</script>
    
