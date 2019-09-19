<template>
  <v-card class="mx-auto" max-width="400" light>
    <v-card-title>
      <p class="title">{{title}}</p>
    </v-card-title>
    <v-card-text>
      <div class="text--primary">{{description}}</div>
    </v-card-text>
    <v-card-actions class="d-flex flex-column">
      <v-btn text color="deep-purple accent-2">Detail</v-btn>
      <div class="d-flex flex-column">
        <span class="caption">Created: {{new Date(createdAt).toString().substring(0, 15)}}</span>
        <span class="caption">Updated: {{new Date(updatedAt).toString().substring(0, 15)}}</span>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: function() {
    return {
      title: "Buy Chicken Wings on Wednesday",
      description: "Buy one get one",
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "backlog"
    };
  }
};
</script>