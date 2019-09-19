<template>
  <v-card class="mx-auto mt-2" outlined>
    <v-card-text>{{cardData.title}}</v-card-text>

    <v-card-actions>
        <v-btn text>Detail</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['cardData'],
};
</script>

<style>
</style>
