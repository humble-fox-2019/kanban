<template>
  <div id="app">
    <Navbar style="margin-bottom: 20px;"></Navbar>
    
    <div>
      <div class="mt-3">
        Submitted Names:
        <div v-if="submittedNames.length === 0">--</div>
        <ul v-else class="mb-0 pl-3">
          <li v-for="(name, i) in submittedNames" :key="i">{{ name }}</li>
        </ul>
      </div>

      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Add new task"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            :state="titleState"
            label="Title"
            label-for="title-input"
            invalid-feedback="Title is required"
          >
            <b-form-input
              id="title-input"
              v-model="task.title"
              :state="nameState"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            :state="nameState"
            label="Name"
            label-for="name-input"
            invalid-feedback="Name is required"
          >
            <b-form-input
              id="name-input"
              v-model="name"
              :state="nameState"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            :state="nameState"
            label="Name"
            label-for="name-input"
            invalid-feedback="Name is required"
          >
            <b-form-input
              id="name-input"
              v-model="name"
              :state="nameState"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            :state="nameState"
            label="Name"
            label-for="name-input"
            invalid-feedback="Name is required"
          >
            <b-form-input
              id="name-input"
              v-model="name"
              :state="nameState"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            :state="nameState"
            label="Name"
            label-for="name-input"
            invalid-feedback="Name is required"
          >
            <b-form-input
              id="name-input"
              v-model="name"
              :state="nameState"
              required
            ></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </div>

    <div class="container-fluid">
      <div class="row">
        <Category>
        </Category>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Category from './components/Category'
import Modal from './components/Modal'
import db from './apis/firebase'

const tasks = db.collection('tasks')

export default {
  components: {
    Navbar, Category, Modal
  },
  
  data() {
    return {
      name: '',
      states: {
        titleState: null,
        descriptionState: null,
        pointState: null,
        assigned_toState: null,
        statusState: null
      },
      submittedNames: [],
      task: {
        title: '',
        description: '',
        point: '',
        assigned_to: '',
        status: ''
      }
    }
  },
  methods: {
    checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid ? 'valid' : 'invalid'
        return valid
    },
    resetModal() {
      this.name = ''
      this.nameState = null
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the name to submitted names
      this.submittedNames.push(this.name)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs.modal.hide()
      })
    }
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
</style>
