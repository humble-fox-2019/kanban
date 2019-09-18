<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Kanban</span>
        <span class="font-weight-light">Tive</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>
        <v-icon left>mdi-file-plus</v-icon>
        <span class="mr-2">Add new task</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>
