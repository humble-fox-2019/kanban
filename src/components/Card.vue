<template>
  <v-card class="mx-auto mt-2" outlined>
    <v-card-text>{{cardData.title}}</v-card-text>
    <v-btn text @click.stop="dialog = true" small><v-icon>mdi-format-align-left</v-icon></v-btn>
    <p></p>
    
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>Detail</v-card-title>
          <v-divider></v-divider>
          <v-card-text>

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
export default {
  props: ['cardData'],
  data() {
    return {
      valid: true,
      dialog: false,
    };
  },
};
</script>

<style>
</style>
