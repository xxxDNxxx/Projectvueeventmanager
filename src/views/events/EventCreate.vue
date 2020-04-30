<template>
  <div>
    <h1>Create Event</h1>
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
          <button type="submit" class="btn btn-secondary">Create</button>
      </div>
      
    </form>
  </div>
</template>

<script>
import * as eventService from '../../services/EventService'
export default {
   name:'events-create',
   data: function(){
     return{
       event:{
           title:'',
           body:'',
           dueDate:''
       }
     }

   },
   methods:{
      onSubmit: async function(){
        const request = {
            event:this.event
            
          
        }
        await eventService.createEvent(request)
        this.$router.push({name:'events-all'})  
      }
   }
}
</script>
    
