<template>
    <div class="card mb-2" style="width: 16rem;">
        <div class="card-header">
            {{ task.title }}
        </div>
        <div class="card-body">
            <p>Point : {{ task.point }}</p>
            <p>Assigned to: {{ task.assigned_to }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Task',
    props: ['task']
}
</script>

<style>

</style>