<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">New Task</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">New Task</span>
        </v-card-title>
        <form @submit.prevent="addingTask">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Title" v-model="title" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Description" v-model="description" required></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="dialog = false" type="submit">add</v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import db from "../../api/firestore";
import Swal from "sweetalert2";
export default {
  data: () => ({
    dialog: false,
    title: "",
    description: ""
  }),
  methods: {
    addingTask() {
      let newTitle = this.title;
      let newDescription = this.description;
      let status = "Back-Log";
      db.collection("kanban")
        .add({
          title: newTitle,
          description: newDescription,
          status
        })
        .then(function() {
          Swal.fire({
            position: "center",
            type: "success",
            title: "Your Todo is Saved!",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    }
  }
};
</script>