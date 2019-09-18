<template>
    <div class="m-3">
        <div class="title">
            <h3>Title</h3>
            <div>{{ task.title }}</div>
        </div>
        <br>
        <div class="desc">
            <h3>Description</h3>
            <div>{{ task.description }}</div>
        </div>
        
        <div >
            <div v-if="task.status === 'backlog'" class="row">
                <button class="col" @click.prevent="deleteTask( task.id )">delete</button>
                <button class="col" @click.prevent="right( task.id , task.status )">todo</button>
            </div>
            <div v-else-if="task.status === 'todo'" class="row">
                <button class="col" @click.prevent='left( task.id , task.status )'>backlog</button>
                <button class="col" @click.prevent="deleteTask( task.id )">delete</button>
                <button class="col" @click.prevent="right( task.id , task.status )">doing</button>

            </div>
            <div v-else-if="task.status === 'doing'" class="row">
                <button class="col" @click.prevent='left( task.id , task.status )'>todo</button>
                <button class="col" @click.prevent="deleteTask( task.id )">delete</button>
                <button class="col" @click.prevent="right( task.id , task.status )">done</button>

            </div>
            <div v-else-if="task.status === 'done'" class="row">
                <button class="col" @click.prevent='left( task.id , task.status )'>doing</button>
                <button class="col" @click.prevent="deleteTask( task.id )">delete</button>

            </div>
        </div>
    </div>
</template>

<script>
import Kanban from '../api/db'
import Swal from 'sweetalert2'
export default {
    name: "Card",
    data () {
        return {
            
        }
    },
    methods : {
        left ( id , status ){
            let newStat = ''
            if ( status === 'todo') {
                newStat = 'backlog'
            } else if ( status == 'doing') {
                newStat = 'todo'
            } else if ( status == 'done') {
                newStat = 'doing'
            }
            this.updateStat( id , newStat )
        },
        right ( id , status ) {
            let newStat = ''
            if ( status === 'backlog') {
                newStat = 'todo'
            } else if ( status == 'todo') {
                newStat = 'doing'
            } else if ( status == 'doing') {
                newStat = 'done'
            }
            this.updateStat( id , newStat )
        },
        updateStat( id , status ) {
            Kanban.doc(id).update({status})
            .then( _ => {
            })
            .catch( err => {
                Swal.fire('Update failed' , 'something happen when update the task.. please reload' , 'error' )
                console.log( err );
            } )
        },
        deleteTask( id ) {
            // delete by id 
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
                    Kanban.doc(id).delete()
                    .then( _ => {
                        Swal.fire({
                            position: 'top-end',
                            type: 'success',
                            title: 'your task deleted succesfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
                    .catch( err => {
                        Swal.fire('Delete failed' , 'something happen when delete the task.. please reload' , 'error' )
                        console.log( err );
                    } )
                }
            })
            
        }
    },
    props : ['task']
}
</script>

<style scoped>
    .card {
        background-color: white;
    }
    button {
        width: 100%;
        border: none;
        background-color: antiquewhite;
    }
    button:hover {
        background-color:coral;
    }
</style>