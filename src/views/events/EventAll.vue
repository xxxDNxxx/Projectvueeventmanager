<template>
  <div class="d-flex flex-column">
    <h1>Event</h1>
    <div class="mb-4">
      <router-link to="/events/new" class="btn btn-success ml-2" exact>Create Event</router-link>
    </div>

    <div v-if="events && events.length > 0" class="d-flex flex-wrap justify-content-start">
      <div
        v-for="event in events"
        v-bind:key="event._id"
        class="card mb-2 ml-2 text-white bg-dark"
        style="width: 18rem;"
      >
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <h5 class="card-title">{{ event.title }}</h5>
            <span v-bind:class="{ late: eventIsLate(event.dueDate)}" class="small">{{ event.dueDate | date }}</span>
          </div>

          <h6 class="card-subtitle mb-2 text-muted">Created by {{ event.author.username }}</h6>

          <p class="card-text">{{event.body}}</p>

          

          <div
            v-if="event.author._id === $store.state.userId"
            class="d-flex justify-content-between"
          >
            <router-link
              type="button"
              tag="button"
              class="card-link btn btn-warning"
              :to="{name: 'events-edit',params:{id:event._id}}"
              exact
            >Edit</router-link>
            <router-link
              type="button"
              tag="button"
              class="card-link btn btn-success"
              :to="{name: 'events-manage',params:{id:event._id}}"
              exact
            >Manage</router-link>
            <a
              v-on:click.prevent="currentEventId = event._id"
              class="card-link btn btn-danger"
              href="#"
              v-b-modal.modal1
            >Delete</a>
          </div>
        </div>
      </div>
      <div>
          <b-modal id="modal1" ref="modal" centered title="Delete Confirmation">
        <p class="my-4">Are you sure you would like to delete this event?</p>
        <div slot="modal-footer" class="w-100 text-right">
          <b-btn slot="md" class="mr-1" variant="danger" @click="deleteEvent">Delete</b-btn>
          <b-btn slot="md" variant="secondary"  @click="cancelModal">Cancel</b-btn>
        </div>
      </b-modal>
      </div>
    </div>

    <div v-if="events && events.length === 0" class="ml-2">
        <div class="alert alert-info">No events found.</div>
    </div>

  </div>
</template>

<script>
import * as eventService from "../../services/EventService";
import moment from 'moment'
export default {
  name: "events-all",
  data: function() {
    return {
      events: null,
      currentEventId: null
    };
  },
  beforeRouteEnter(to, from, next) {
    eventService.getAllEvents().then(res => {
      next(vm => {
        vm.events = res.data.events;
      });
    });
  },
  methods:{
      eventIsLate: function(date){
          return moment(date).isBefore()

      },
      cancelModal: function(){
          this.$refs.modal.hide()
          this.currentEventId = null
      },
      deleteEvent: async function(){
          this.$refs.modal.hide()
          await eventService.deleteEvent(this.currentEventId)
          const index = this.events.findIndex(event => event._id === this.currentEventId)
          this.events.splice(index, 1)
          this.currentEventId = null
      }
  }
};
</script>
