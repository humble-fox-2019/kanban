<template>
  <nav class="p-2">
    <div class="container d-flex justify-content-between align-items-center">
      <div class="logo">
        <img src="../assets/logo.png" alt="Bukan Kanban Logo" />
      </div>
      <div>
        <b-button class="addbtn" v-b-modal.modal-center>New Task</b-button>
        <b-modal
          id="modal-center"
          centered
          title="Add New Task"
          ok-only
          ok-variant="secondary"
          ok-title="Cancel"
        >
          <form
            class="d-flex flex-column justify-content-center align-items-center"
            @submit.prevent="saveTask()"
          >
            <div>
              <label>Title</label>
              <input
                v-model="title"
                class="form-control"
                type="text"
                placeholder="Input your title"
                style="width: 40vh"
              />
            </div>
            <div class="mt-2">
              <label>Description</label>
              <textarea
                v-model="description"
                class="form-control"
                type="text"
                placeholder="Input your description"
                style="width: 40vh"
              />
            </div>
            <div class="mt-3">
              <button
                type="submit"
                block
                @click="$bvModal.hide('modal-center')"
                class="btn"
              >Save Task</button>
            </div>
          </form>
        </b-modal>
      </div>
    </div>
  </nav>
</template>

<script>
import db from "../../api/firebase";
import firebase from "firebase";
export default {
  data: () => {
    return {
      title: "",
      description: ""
    };
  },
  methods: {
    saveTask() {
      db.collection("todos")
        .add({
          title: this.title,
          description: this.description,
          status: "Backlog",
          created: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          console.log("Document successfully written!");
          this.title = "";
          this.description = "";
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");
/* font-family: 'Barriecito', cursive;
font-family: 'Walter Turncoat', cursive; */
nav {
  z-index: 10;
  background-color: #262626;
}
.logo {
  color: gold;
  font-family: "Roboto", sans-serif;
}
.addbtn {
  background-color: #262626;
  color: gold;
  border: 2px solid gold;
  font-weight: bold;
}
b-modal{
  color: gold;
  font-family: "Roboto", sans-serif;
}
.addbtn:hover {
  color: #262626;
  border: 2px solid gold;
  background-color: gold;
  font-weight: bold;
}
label {
  font-family: "Roboto", sans-serif;
  font-weight: bolder;
}
.btn {
  background-color: #262626;
  color: gold;
  border: 2px solid gold;
  font-weight: bold;
}
.btn:hover {
  color: #262626;
  background-color: gold;
  font-weight: bold;
}
</style>