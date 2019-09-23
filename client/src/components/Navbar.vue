<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item href="#">Home</b-nav-item>
        <b-nav-item href="#">About</b-nav-item>
        <b-button v-b-modal.modal-prevent-closing>Add new task</b-button>
      </b-navbar-nav>   
    </b-navbar>
    <b-modal id="modal-prevent-closing" ref="modal" title="Submit Your Name"  @ok="addTask">
      <b-form ref="form" @submit.prevent="addTask">
        <b-form-group label="Title" label-for="Title-input" invalid-feedback="Title is required">
          <b-form-input id="Title-input" v-model="title" required></b-form-input>
        </b-form-group>
        <b-form-group
          label="Description"
          label-for="Description-input"
          invalid-feedback="Description is required"
        >
          <b-form-input id="Description-input" v-model="description" required></b-form-input>
        </b-form-group>
        <button type="submit" class="" >Add</button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import db from '../apis/firestore'
export default {
  name: "navbar",
  data() {
    return {
      title: "",
      status: "backlog",
      description: ""
    };
  },
  methods: {
    addTask() {
        let title = this.title
        let status = this.status
        let description = this.description
      db.collection("task")
        .add({
          title,
          status,
          description
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    }
  }
};
</script>

<style>
</style>