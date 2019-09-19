<template>
  <v-card class="mx-auto" max-width="400">
    <v-toolbar flat :color="boardData.color" dark>
      <v-toolbar-title>{{boardData.name}}</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <Card v-for="card in boardData.cards" :key="card.id" :card-data="card" />
    </v-card-text>

    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">Add new card</v-btn>
        </template>
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
            <v-btn color="success" text @click="dialog = false">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-card>
</template>

<script>
import Card from '@/components/Card.vue';

export default {
  props: ['boardData'],
  data() {
    return {
      dialog: false,
    };
  },
  components: {
    Card,
  },
};
</script>

<style>
</style>
