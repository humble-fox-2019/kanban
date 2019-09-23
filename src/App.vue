<template>
  <div id="app">
    <Navbar style="margin-bottom: 20px;"></Navbar>
    
    <div>
      <Modal></Modal>
    </div>

    <div class="container-fluid d-flex justify-content-center">
        <Category>
        </Category>
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
        this.task.title = '',
        this.task.description = '',
        this.task.point = '',
        this.task.assigned_to = '',
        this.task.status = ''
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
      // Push the task to firebase
      tasks.add(this.task)
          .then(docRef => {
            console.log('Task added with id', docRef.id)
          })
          .catch(err => {
            console.log(err)
          })
      
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
