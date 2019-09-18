<template>
    <div class="topnav">
        <b-button id="show-btn" @click="$bvModal.show('bv-modal-example')">New Task</b-button>

        <b-modal id="bv-modal-example" hide-footer>
            <div class="d-block text-center">
                <h3>Add New Task</h3>
                <form @submit.prevent="newTask()"> 
                    <input type="text" placeholder="Title" v-model='kanbanData.title'>
                    <input type="text" placeholder="Description" v-model='kanbanData.description'>
                    <select v-model="kanbanData.status">
                        <option value='backlog' selected>Backlog</option>
                        <option value='todo'>Todo</option>
                        <option value='doing'>Doing</option>
                        <option value='done'>Done</option>
                    </select>
                    <button class="mybtn task-btn" @click="$bvModal.hide('bv-modal-example')"> Add Task </button>
                </form>
            </div>
        </b-modal>
    </div>
</template>

<script>
import firebase from '../config/firebase'
import Kanban from '../api/db'
import Swal from 'sweetalert2'

export default {
    name : "Navbar",
    data :function () {
        return {
            kanbanData : {
                title : "",
                description : "",
                status: "backlog",
                created : null
            }
        }
    },
    methods : {
        newTask() {
            Swal.showLoading()
            this.kanbanData.created = new Date()
            Kanban.add( this.kanbanData )
            .then(function(docRef) {
                Swal.close()
                console.log("Document written with ID: ", docRef.id);
                Swal.fire('Add New Task' , 'Success!' , 'success')
            })
            .catch(function(error) {
                Swal.close()
                console.error("Error adding document: ", error);
                Swal.fire('Ooppss' , 'something went wrong.. please reload!' , 'error')
            });

            this.kanbanData = {
                title : "",
                description : "",
                status:"",
                created : null
            }
        },
    },
    created() {
        console.log( firebase.firestore.FieldValue.serverTimestamp() )    
    }
}
</script>

<style scoped>
    .topnav {
        background-color: orange;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
    }

    .topnav a {
        float: left;
        color: black;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 17px;
    }

    .topnav a:hover {
        background-color: darkorange;
        color: black;
    }

    .topnav a.active {
        background-color: #4CAF50;
        color: white;
    }
    input, select {
        margin-top: 30px;
        width: 100%;
        padding: 10px;
        border: 0;
        outline: 0;
        background: transparent;
        border-bottom: 1px solid black;
    }
    .mybtn {
        border-radius: 20px;
    }
    .task-btn {
        padding: 10px;
        margin: 20px;
    }
    .task-btn:hover {
        background-color : grey;
    }
    
</style>