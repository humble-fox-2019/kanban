<template>
  <v-card class="mx-auto" max-width="400" >
    <v-toolbar
      flat
      :color="color"
      dark
    >
      <v-toolbar-title>{{name}}</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <h2 class="title mb-2">Card Here</h2>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['color', 'name'],
};
</script>

<style>

</style>
