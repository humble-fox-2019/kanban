<template>
  <div class="border-sm text-gray-700 text-sm">
    <div v-if="!addStatus">
      <button @click="newCard" class="pl-2">
        <i class="fas fa-plus"></i>
        <p class="inline-block pl-2">Add a card</p>
      </button>
    </div>
    <div class="w-full h-auto rounded-sm" v-else>
      <form>
        <input
          v-model="title"
          type="text"
          placeholder="Enter a title.."
          class="h-8 w-full mb-2 pl-2 focus:outline-none"
        />
        <button @click.prevent="submitCard" class="px-1 py-1 bg-green-my rounded text-white">
          Add Card
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from '../apis/firebase'
const { Task } = firebase

export default {
  props: ['head'],
  data() {
    return {
      title: '',
      status: '',
      description: '',
      addStatus: false
    }
  },
  methods: {
    newCard() {
      this.addStatus = true
    },
    submitCard() {
      Task.add({
        title: this.title,
        description: this.description,
        status: this.status
      })
        .then(docRef => {
          this.addStatus = false
          console.log(docRef.id)
        })
        .catch(console.log)
    }
  },
  mounted() {
    this.status = this.head
  }
}
</script>

<style scoped>
.bg-green-my {
  background-color: #61bd4f;
}
</style>
