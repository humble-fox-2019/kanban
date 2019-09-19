<template>
    <div class="rounded border shadow-xl w-full container">
        <div class="text-center font-extrabold text-lg text-white rounded-t p-4 containerbox w-full">
            {{ category }}
        </div>
        <!-- <div v-for="task in tasks" :key="task.id">
            <task 
                :task="task"
                @getDetail="getDetail"
                class="m-4"/>
        </div> -->
        <draggable v-model="tasks" group="people" @start="drag=true" @end="drag=false">
            <div v-for="task in tasks" :key="task.id">
                <task 
                :task="task"
                @getDetail="getDetail"
                class="m-4"/>
            </div>
        </draggable>
    </div>
</template>

<script>
import task from '@/components/Task.vue'
import firebase from '@/apis/firebase.js'
import draggable from 'vuedraggable'

const { Task } = firebase

export default {
    components: {
        task,
        draggable
    },
    props: ['category'],
    data() {
        return {
            tasks: []
        }
    },
    methods: {
        getTasks() {
            Task.where('status', '==', this.category)
                .onSnapshot(querySnapshot => {
                    const tempTasks = []

                    querySnapshot.forEach((doc) => {
                        const newTask = {
                            id: doc.id,
                            ...doc.data()
                        }
                        tempTasks.push(newTask)
                    })
                    this.tasks = tempTasks
                })
        },
        getDetail(task) {
            this.$emit('getDetail', task)
        }
    },
    created: function () {
        this.getTasks()
    },
    watch: {
        tasks: function () {
            this.tasks.forEach(task => {
                if (task.status !== this.category) {
                    Task.doc(task.id).update({
                        status: this.category
                    })
                    .then(() => {
                        console.log('sukses diupdate tjoy');
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

<style scoped>

.container {
    min-height: 150px;
}

.containerbox {
    background-color: #2ebc60;
    color: #444d5a;
}

</style>