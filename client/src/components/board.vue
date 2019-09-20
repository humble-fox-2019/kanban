<template>

    <v-card  class="text-xs-center ma-3 pa-2" :min-height="300">
        <v-toolbar :color="boardss.color">
            <v-toolbar-title>{{boardss.name}}</v-toolbar-title>
        </v-toolbar>
                <cards v-for="(k,i) in boardss.kanbans" :key="i" :isi="k" />
    </v-card>


</template>

<script>
import cards from '../components/cards'
  export default {
      components:{
          cards
      },
      props:['boardss'],
    data: () => ({
    }),
  }
</script>

<style scoped>
</style>