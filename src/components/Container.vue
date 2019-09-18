<template>
    <div class="rounded border shadow-xl w-full container">
        <div class="text-center font-extrabold text-lg text-white rounded-t p-4 containerbox w-full">
            {{ category }}
        </div>
        <div v-for="task in tasks" :key="task.id">
            <task 
                :task="task"
                @getDetail="getDetail"
                class="m-4"/>
        </div>
    </div>
</template>

<script>
import task from '@/components/Task.vue'
import firebase from '@/apis/firebase.js'

const { Task } = firebase

export default {
    components: {
        task
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