<template>
  <div class="card-container">
    <div class="title" :class="name">
      <h1>{{ title }}</h1>
    </div>
    <div class="item-container">
      <draggable :list="list.list" group="kanban" @change="update" @start="drag=true" @end="drag=false">
        <Card
          v-for="item in list.list"
          :title="item.title"
          :description="item.description"
          :type="item.type"
          :id="item.id"
          :key="item.id">
        </Card>
      </draggable>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import draggable from 'vuedraggable'
import db from '@/api/firestore.js'

export default {
  props: ['title', 'name', 'list'],
  data: function () {
    return {
      todos: []
    }
  },
  components: {
    Card,
    draggable
  },
  methods: {
    update () {
      for (let i = 0; i < this.list.list.length; i++) {
        if (this.list.list[i].type === this.list.name) {
        } else {
          db.collection('kanban').doc(this.list.list[i].id).set({
            type: this.list.name
          }, { merge: true })
        }
      }
    }
  },
  created () {

  }
}
</script>

<style>

.card-container{
  background-color: #ffffff;
  flex-basis: 30%;
  align-self: flex-start;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0,0,0,.1);
}
.title{
  padding: 20px 10px 10px 10px;
  border-bottom: 2px solid #ffffff;
  border-radius: 10px 10px 0 0;
}
.title h1{
  color: #ffffff;
}
.todo{
  background-color: #e67e22;
}
.doing{
  background-color: #2980b9;
}
.done{
  background-color: #27ae60;
}
.item-container{
  padding: 20px;
  background-color: rgb(250,250,250);
  border-radius: 0 0 10px 10px;
}

</style>
