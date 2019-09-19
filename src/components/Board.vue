<template>
  <v-card class="mx-auto" max-width="400" >
    <v-toolbar
      flat
      :color="boardData.color"
      dark
    >
      <v-toolbar-title>{{boardData.name}}</v-toolbar-title>
    </v-toolbar>

    <v-card-text>

      <Card v-for="card in boardData.cards" :key="card.id" :card-data="card" />

    </v-card-text>
  </v-card>
</template>

<script>

import Card from '@/components/Card.vue';

export default {
  props: ['boardData'],
  components: {
    Card,
  },
};
</script>

<style>

</style>
