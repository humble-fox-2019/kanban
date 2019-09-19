<template>
  <v-card class="mx-auto mt-2" outlined>
    <v-card-text>{{cardData.title}}</v-card-text>

    <v-card-actions>
        <v-btn text @click.stop="dialog = true">Detail</v-btn>
    </v-card-actions>

    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title><v-icon>mdi-eye</v-icon> Detail</v-card-title>
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
