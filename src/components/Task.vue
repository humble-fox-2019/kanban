<template>
    <div class="card mb-2" style="width: 16rem;">
        <div class="card-header">
            {{ task }}
        </div>
        <div class="card-body">
            <p>Point : 10</p>
            <p>Assigned to: Igun</p>
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