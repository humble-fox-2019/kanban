<template>
  <div id="app">
    <Navbar style="margin-bottom: 20px;"></Navbar>

    <div class="container-fluid">
      <div class="row">

        <div class="col-md-3" id="backlog">
          <Category :category="'Backlog'">
            <draggable v-model="backlog" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
              <transition-group type="transition" :name="'flip-list'">
                <Task v-for="(task, i) in backlog" :key="i" :task="task"></Task>            
              </transition-group>
            </draggable>
          </Category>
        </div>

        <div class="col-md-3" id="todo">
          <Category :category="'Todo'">
            <draggable v-model="todo" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
              <transition-group type="transition" :name="'flip-list'">
                <Task v-for="(task, i) in todo" :key="i" :task="task"></Task>            
              </transition-group>
            </draggable>
          </Category>
        </div>

        <div class="col-md-3" id="doing">
          <Category :category="'doing'">
            <draggable v-model="doing" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
              <transition-group type="transition" :name="'flip-list'">
                <Task v-for="(task, i) in doing" :key="i" :task="task"></Task>            
              </transition-group>
            </draggable>
          </Category>
        </div>

        <div class="col-md-3" id="done">
          <Category :category="'done'">
            <draggable v-model="done" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
              <transition-group type="transition" :name="'flip-list'">
                <Task v-for="(task, i) in done" :key="i" :task="task"></Task>            
              </transition-group>
            </draggable>
          </Category>
        </div>

      </div>
    </div>

    
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Navbar from './components/Navbar'
import Category from './components/Category'
import Task from './components/Task'

export default {
  components: {
    draggable, Navbar, Category, Task
  },
  
  data() {
    return {
      editable: true,
      isDragging: false,
      // categories: ['Backlog', 'Todo', 'Doing', 'Done'],
      backlog: ['makan', 'tidur'],
      todo: ['mandi', 'sarapan', 'ke kampus'],
      doing: ['belajar'],
      done: ['solat isya']
    }
  },
  methods: {
    onMove(evt){
      return (evt.draggedContext.element.name!=='apple');
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 1,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    },
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

Navbar {
  position: fixed-top;
  margin-bottom: 20px;
}

Task {
  
}

#box-category {
  /* margin-left: 20px; */
}


</style>
