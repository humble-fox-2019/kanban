<template>
    <div>
        <a href="#" id="blur" @click.prevent="backToTasks">
        </a>
        <div id="detail" class="shadow bg-white fixed z-20 rounded flex px-6">
            <div class="w-full p-4 text-center flex flex-col">
                <h1 class="text-5xl font-bold">add a new task </h1>
                <hr>
                <form class="w-full mt-4">
                    <div class="flex justify-start items-center mb-6">
                        <div class="md:w-3/12">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                Title
                            </label>
                        </div>
                        <div class="md:w-9/12">
                            <input 
                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white" type="text"
                                v-model="newTask.title">
                        </div>
                    </div>
                    <div class="flex justify-start items-center mb-6">
                        <div class="md:w-3/12">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-username">
                                Description
                            </label>
                        </div>
                        <div class="md:w-9/12">
                            <input 
                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white" type="text"
                                v-model="newTask.description">
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
                    <div class="qty w-full rounded py-2 mt-2 flex justify-end mt-auto">
                        <button
                            @click.prevent="createTask" 
                            class="rounded px-5 py-2 focus:outline-none bg-transparent border font-semibold button">create</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from '@/apis/firebase.js'

const { Task } = firebase

export default {
    components: {
    },
    props: ['loading'],
    data () {
        return {
            newTask: {
                title: '',
                description: '',
                status: ''
            }
        }
    },
    methods: {
        backToTasks() {
            this.$emit('backToTasks')
        },
        onChange($event) {
            console.log(event.target.value);
            this.newTask.status = event.target.value
        },
        createTask() {
            this.backToTasks()

            Task.add({
                title: this.newTask.title,
                description: this.newTask.description,
                status: this.newTask.status
            })
                .then(docRef => {
                    console.log(docRef.id)
                    this.$toast.open('Great, you success create one')
                })
                .catch(err => {
                    console.log(err)
                    this.$toast.error('Ops!, your action is failed')
                })
        }
    }
}
</script>

<style scoped>

* {
    color: #444d5a;
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

.createtask {
    background-color: #2ebc60;
    color: white;
}

.button {
    border-color: #2ebc60;
    color: #2ebc60;
}

.button:hover {
    background-color: #2ebc60;
    color: white;
}

</style>
