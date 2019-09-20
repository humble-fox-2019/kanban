<template>
    <div class="card mb-3" style="width: 16rem;">
        <div class="card-header">
            {{ task.title }}
        </div>
        <div class="card-body d-flex flex-column align-items-start">
            <p>Point : {{ task.point }}</p>
            <p>Assigned to: {{ task.assigned_to }}</p>
        </div>
         <div class="card-footer d-flex justify-content-end">
             <!-- <button class="btn btn-sm btn-success mx-1" v-b-modal.modal-prevent-closing>edit</button> -->
             <button class="btn btn-sm btn-danger" @click="deleteTask">delete</button>
        </div>
        <Modal></Modal>
    </div>
</template>

<script>
import db from '../apis/firebase'
import Swal from 'sweetalert2'
import Modal from '../components/Modal'

const tasks = db.collection('tasks')

export default {
    name: 'Task',
    props: ['task'],
    components: { Modal },
    methods: {
        deleteTask() {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.value) {
                    tasks.doc(this.task.id).delete()
                        .then(() => {
                           Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                            )  
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
                })
        }
    }
}
</script>

<style>

</style>