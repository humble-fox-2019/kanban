<template>
    <div>
        <navbar @newTask="newTask"/>
        <div class="flex" id="content">
            <div 
                class="w-full m-2" 
                v-for="category in categories" 
                :key="category.id">
                <container 
                    :category="category"
                    @getDetail="getDetail"/>
            </div>
        </div>
        <loader v-if="loading"></loader>
        <detail 
            :loading="loading"
            v-if="detailTask"
            :selectedTask="selectedTask"
            @backToTasks="backToTasks"/>
        <addTask
            :loading="loading"
            v-if="addTask"
            @backToTasks="backToTasks"/>
        <pagefooter />
    </div>
</template>

<script>
import container from '@/components/Container.vue'
import detail from '@/components/Detail.vue'
import addTask from '@/components/AddTask.vue'
import pagefooter from '@/components/PageFooter.vue'
import navbar from '@/components/Navbar.vue'
import loader from '@/components/Loader.vue'

export default {
    components: {
        container,
        detail,
        addTask,
        pagefooter,
        navbar,
        loader
    },
    data() {
        return {
            categories: [
                'Back-Log',
                'To-Do',
                'Doing',
                'Done'
            ],
            detailTask: false,
            selectedTask: {},
            addTask: false,
            loading: false
        }
    },
    methods: {
        getDetail(task) {
            this.detailTask = true
            this.selectedTask = task
        },
        backToTasks() {
            this.detailTask = false
            this.addTask = false
            this.loading = false
        },
        newTask() {
            this.addTask = true
        }
    }
}
</script>

<style>
#header {
    padding: 0 12%;
}

#content {
    margin: 0 10%;
    min-height: 70vh;
}
</style>
