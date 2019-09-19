<template>
    <div>
        <a href="#" id="blur" @click.prevent="backToTasks">
        </a>
        <div id="detail" class="shadow bg-white fixed z-20 rounded flex justify-center px-6">
            <div class="w-full p-4 text-center flex flex-col">
                <h1 class="text-5xl font-bold">{{ selectedTask.title }}</h1>
                <hr>
                <form class="w-full mt-4">
                    <div class="flex justify-start items-center mb-6">
                        <div class="md:w-3/12">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-username">
                                Description
                            </label>
                        </div>
                        <div class="md:w-9/12">
                            <input 
                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white" type="text"
                                v-model="selectedTask.description">
                        </div>
                    </div>
                    <div class="flex justify-start items-center mb-6">
                        <div class="md:w-3/12">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-username">
                                Status
                            </label>
                        </div>
                        <div class="md:w-9/12">
                            <div class="inline-block w-full">
                                <select 
                                    @change="onChange($event)"
                                    class="block appearance-none w-full bg-white border border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none">
                                    <option>-</option>
                                    <option>Back-Log</option>
                                    <option>To-Do</option>
                                    <option>Doing</option>
                                    <option>Done</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="qty w-full rounded py-2 mt-2 flex justify-between mt-auto">
                    <button 
                        @click.prevent="deleteTask(selectedTask.id)"
                        class="rounded px-5 py-2 focus:outline-none bg-transparent border font-semibold delete">delete</button>
                    <button 
                        @click.prevent="updateTask(selectedTask.id)"
                        class="rounded px-5 py-2 focus:outline-none bg-transparent border font-semibold button">update</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from '@/apis/firebase.js'

const { Task } = firebase

export default {
    props: ['selectedTask', 'loading'],
    data () {
        return {

        }
    },
    methods: {
        backToTasks() {
            this.$emit('backToTasks')
        },
        deleteTask(id) {
            this.backToTasks()

            Task.doc(id).delete()
                .then(() => {
                    console.log('sukses dihapus tjoy');
                    this.$toast.open('Great, you success delete one')
                })
                .catch(err => {
                    console.log(err)
                    this.$toast.error('Ops!, your action is failed')
                })
        },
        updateTask(id) {
            this.backToTasks()

            Task.doc(id).update({
                title: this.selectedTask.title,
                description: this.selectedTask.description,
                status: this.selectedTask.status
            })
                .then(() => {
                    console.log('sukses diupdate tjoy')
                    this.$toast.open('Great, you success delete one')
                })
                .catch(err => {
                    console.log(err)
                    this.$toast.error('Ops!, your action is failed')
                })
        },
        onChange($event) {
            console.log(event.target.value)
            this.selectedTask.status = event.target.value
        }
    }
}
</script>

<style scoped>

* {
    color: #444d5a;
}

.add-to-cart {
    background-color: #41B882;
    color: #efeded;
}

#detail {
    top: 20%;
    left: 25%;
    width: 50vw;
    height: 50vh;
}

#blur {
    width: 100%;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
    background-color: black;
    opacity: 0.5;
    cursor: default;
}

.button {
    border-color: #2ebc60;
    color: #2ebc60;
}

.button:hover {
    background-color: #2ebc60;
    color: white;
}

.delete {
    border-color: #e73e33;
    color: #e73e33;
}

.delete:hover {
    background-color: #e73e33;
    color: white;
}

</style>
