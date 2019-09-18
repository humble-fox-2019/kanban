<template>
  <v-card class="mx-auto" max-width="400" >
    <v-toolbar
      flat
      :color="boardConfig.color"
      dark
    >
      <v-toolbar-title>{{boardConfig.name}}</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      
      <Card />
      
    </v-card-text>
  </v-card>
</template>

<script>

import Card from '@/components/Card.vue';

export default {
  props: ['boardConfig'],
  components: {
    Card
  }
};
</script>

<style>

</style>
