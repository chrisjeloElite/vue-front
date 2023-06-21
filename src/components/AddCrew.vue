<template>
  <form @submit.prevent="onSubmit">
    <div class="modal-body">
      <!-- Modal content -->
      <div class="form-group">
        <label for="first_name">First Name:</label>
        <input type="text" id="first_name" v-model="newCrew.first_name" class="form-control">
        <!-- <span class="help is-danger" :class="{ 'text-danger': error.get('first_name') }" v-text="error.get('first_name')" v-if="error.has('first_name')"></span> -->
      </div>
      <div class="form-group">
        <label for="middle_name">Middle Name:</label>
        <input type="text" id="middle_name" v-model="newCrew.middle_name" class="form-control">
        <!-- <span class="help is-danger" :class="{ 'text-danger': error.get('middle_name') }" v-text="error.get('middle_name')" v-if="error.has('middle_name')"></span> -->
      </div>
      <div class="form-group">
        <label for="last_name">Last Name:</label>
        <input type="text" id="last_name" v-model="newCrew.last_name" class="form-control">
        <!-- <span class="help is-danger" :class="{ 'text-danger': error.get('last_name') }" v-text="error.get('last_name')" v-if="error.has('last_name')"></span> -->
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="newCrew.email" class="form-control">
        <!-- <span class="help is-danger" :class="{ 'text-danger': error.get('email') }" v-text="error.get('email')" v-if="error.has('email')"></span> -->
      </div>
      <div class="form-group">
        <label for="address">Address:</label>
        <input type="text" id="address" v-model="newCrew.address" class="form-control">
        <!-- <span class="help is-danger" :class="{ 'text-danger': error.get('address') }" v-text="error.get('address')" v-if="error.has('address')"></span> -->
      </div>
      <div class="form-group">
        <label for="education">Education:</label>
        <input type="text" id="education" v-model="newCrew.education" class="form-control">
        <!-- <span class="help is-danger" :class="{ 'text-danger': error.get('education') }" v-text="error.get('education')" v-if="error.has('education')"></span> -->
      </div>
      <div class="form-group">
        <label for="contactDetails">Contact Details:</label>
        <input type="text" id="contactDetails" v-model="newCrew.contactDetails" class="form-control">
        <!-- <span class="help is-danger" :class="{ 'text-danger': error.get('contactDetails') }" v-text="error.get('contactDetails')" v-if="error.has('contactDetails')"></span> -->
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary" type="submit">Save Crew</button>
      <!-- <button class="btn btn-secondary" @click="showModal = false">Cancel</button> -->
    </div>
  </form>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "AddCrew",
  data() {
    return {
      newCrew: {
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        address: "",
        education: "",
        contactDetails: ""
      }
    };
  },
  methods: {
  ...mapActions(['saveCrew']),
    onSubmit(){
    this.saveCrew(this.newCrew)
    }
  },
  components: {}
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>
