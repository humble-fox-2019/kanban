<template>
  <v-card class="mx-auto" max-width="400">
    <v-toolbar flat :color="boardData.color" dark>
      <v-toolbar-title>{{boardData.name}}</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <Card v-for="card in boardData.cards" :key="card.id" :card-data="card" />
    </v-card-text>

    <v-btn text block @click.stop="dialog = true">Add new card</v-btn>

    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>Add {{boardData.name}} Card</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="title"
                :counter="60"
                label="Title"
                required
              ></v-text-field>

              <v-textarea
                v-model="description"
                :counter="400"
                label="Description"
                required
              ></v-textarea>

              <v-text-field v-model="point" :counter="2" label="Point" required></v-text-field>

              <v-text-field
                v-model="assignedTo"
                :counter="20"
                label="Assigned To"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" text @click="dialog = false">Close</v-btn>
            <v-btn color="success" text @click="createCard">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-card>
</template>

<script>
import Card from "@/components/Card.vue";
import db from "@/apis/firebase";

export default {
  props: ["boardData"],
  data() {
    return {
      valid: true,
      dialog: false,
      title: "",
      description: "",
      point: "",
      assignedTo: ""
    };
  },
  methods: {
    createCard() {
      
      if (
        this.title == "" ||
        this.description == "" ||
        this.point == "" ||
        this.assignedTo == ""
      ) {
        } else {
          this.dialog = false;
          db.collection("cards")
          .add({
            title: this.title,
            description: this.description,
            point: this.point,
            assignedTo: this.assignedTo,
            category: this.boardData.name
          })
          .then(function() {
            this.clearForm();
            console.log("Document successfully written!");
          })
          .catch(function(error) {
            this.clearForm();
            console.error("Error writing document: ", error);
          });
      }
    },
    clearForm() {
      title = "";
      description = "";
      point = "";
      assignedTo = "";
    }
  },
  components: {
    Card
  }
};
</script>

<style>
</style>
