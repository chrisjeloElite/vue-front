<template>
  <div class="container">

    <!-- Button to trigger the modal -->
    <div class="d-flex justify-content-end mb-3">
      <button class="btn btn-primary" @click="showModal = true">+<i :class="getIconClass('user')" ></i> Add Crew</button>
    </div>
    <input
        type="text"
        v-model="searchQuery"
        placeholder="Search..."
        class="form-control mb-3" style = "width:250px;"
    />
    <table class="table grid">
      <!-- Table header -->
      <thead>
      <tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Middle Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Address</th>
        <th>Education</th>
        <th>Contact Details</th>
        <th>Action</th>
      </tr>
      </thead>
      <!-- Table body -->
      <tbody>
      <tr v-for="crew in crews" :key="crew.id">
        <td>{{ crew.id }}</td>
        <td>{{ crew.first_name }}</td>
        <td>{{ crew.middle_name }}</td>
        <td>{{ crew.last_name }}</td>
        <td>{{ crew.email }}</td>
        <td>{{ crew.address }}</td>
        <td>{{ crew.education }}</td>
        <td>{{ crew.contactDetails }}</td>
        <td><i @click="openEditModal(crew)" :class="getIconClass('pen')" style="color:dodgerblue"></i>
          &nbsp;<i @click="deleteCrewLink(crew.id)" :class="getIconClass('trash')" style="color:red"></i></td>
      </tr>
      <tr>
        <td colspan="9">
          <div class="text-center">
            <b-pagination
                v-if="pagination"
                v-model="pagination.current_page"
                :total-rows="pagination.total"
                :per-page="pagination.per_page"
                @input="fetchCrews"
            ></b-pagination>
          </div>
        </td>
      </tr>
      </tbody>
    </table>

    <ModalTemplate v-if="showModal" title="Add Crew" class="modal-dialog-centered" @close="showModal = false" @submit="onSubmit">
      <form @submit.prevent="onSubmit">
      <!-- Content for the modal -->
      <div class="modal-body">
        <div class="modal-form-container">
          <div class="form-inline">
            <label for="first_name">First Name:</label>
            <input type="text" id="first_name" v-model="newCrew.first_name" class="form-control">
          </div>
          <div class="form-inline">
            <label for="middle_name">Middle Name:</label>
            <input type="text" id="middle_name" v-model="newCrew.middle_name" class="form-control">
          </div>
          <div class="form-inline">
            <label for="last_name">Last Name:</label>
            <input type="text" id="last_name" v-model="newCrew.last_name" class="form-control">
          </div>
          <div class="form-inline">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="newCrew.email" class="form-control">
          </div>
          <div class="form-inline">
            <label for="address">Address:</label>
            <input type="text" id="address" v-model="newCrew.address" class="form-control">
          </div>
          <div class="form-inline">
            <label for="education">Education:</label>
            <input type="text" id="education" v-model="newCrew.education" class="form-control">
          </div>
          <div class="form-inline">
            <label for="contactDetails">Contact Details:</label>
            <input type="text" id="contactDetails" v-model="newCrew.contactDetails" class="form-control">
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" type="submit">Save Crew</button>
        <button class="btn btn-secondary" @click="showModal = false">Cancel</button>
      </div>
      </form>
    </ModalTemplate>
    <ModalTemplate v-if="showModal"  class="modal-dialog-centered" @close="showModal = false">
      <form @submit.prevent="onModalSubmit">
        <!-- Content for the modal -->
        <div class="modal-body">
          <div class="modal-form-container">

            <div class="form-group">
              <label for="first_name">First Name:</label>
              <input type="text" id="first_name" v-model="editedCrew.first_name" class="form-control">
            </div>
            <div class="form-group">
              <label for="middle_name">Middle Name:</label>
              <input type="text" id="middle_name" v-model="editedCrew.middle_name" class="form-control">
            </div>
            <div class="form-group">
              <label for="last_name">Last Name:</label>
              <input type="text" id="last_name" v-model="editedCrew.last_name" class="form-control">
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" v-model="editedCrew.email" class="form-control">
            </div>
            <div class="form-group">
              <label for="address">Address:</label>
              <input type="text" id="address" v-model="editedCrew.address" class="form-control">
            </div>
            <div class="form-group">
              <label for="education">Education:</label>
              <input type="text" id="education" v-model="editedCrew.education" class="form-control">
            </div>
            <div class="form-group">
              <label for="contactDetails">Contact Details:</label>
              <input type="text" id="contactDetails" v-model="editedCrew.contactDetails" class="form-control">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" type="submit">Update Crew</button>
          <button class="btn btn-secondary" @click="showModal = false">Cancel</button>
        </div>
      </form>
    </ModalTemplate>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ModalTemplate from "@/components/Modal.vue";

export default {
  name: "CrewList",
  components: {
    ModalTemplate,
  },
  data() {
    return {
      showEditModal: false, // Control the visibility of the edit crew modal
      searchQuery:"",
      showModal: false,
      editedCrew: {
        id: null,
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        address: "",
        education: "",
        contactDetails: "",
      },
      newCrew: {
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        address: "",
        education: "",
        contactDetails: "",
      },
    };
  },
  computed: {
    ...mapGetters(["crews", "pagination"]),
  },
  methods: {
    getIconClass(iconName) {
      return ['fa', `fa-${iconName}`];
    },
    openEditModal(crew) {
      this.editedCrew = { ...crew }; // Create a copy of the crew to avoid modifying the original data
      this.showModal = true; // Open the modal
    },
    ...mapActions(["fetchCrews",'saveCrew','editCrewLink','deleteCrewLink']),

    // eslint-disable-next-line no-unused-vars
    onSubmit({commit}, saveCrew) {
      // Handle form submission
      // Close the modal after submission
      this.showModal = false;
      this.saveCrew(this.newCrew, saveCrew)
    },
    onModalSubmit() {
      if (this.editedCrew.id) {
        // If the crew has an ID, it means it is an existing crew being edited
        // Call the editCrewLink action instead of saveCrew
        this.editCrewLink({ id: this.editedCrew.id, updatedCrew: this.editedCrew });
      } else {
        // If the crew doesn't have an ID, it means it is a new crew being added
        this.saveCrew(this.editedCrew);
      }

      this.showModal = false; // Close the modal after submission
      this.resetEditedCrew(); // Reset the editedCrew data property
    },

    resetEditedCrew() {
      // Reset the editedCrew data property to its initial state
      this.editedCrew = {
        id: null,
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        address: "",
        education: "",
        contactDetails: "",
      };
    },
  },
  created() {
    this.fetchCrews();
  },
};
</script>

<style>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.modal-content {
  max-width: 500px; /* Adjust the width as per your requirement */
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
}
.pen{

}
</style>
