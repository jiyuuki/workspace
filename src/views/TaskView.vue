<template>
  <div class="task-view flex flex-row bg-white pin m-32 mx-auto py-4 text-left rounded shadow">
    <div
      v-if="task !== undefined"
      class="flex flex-col flex-grow items-start justify-between px-4"
    >
      <input
        :value="task.name"
        type="text"
        @keyup.enter.prevent="updateTask($event, 'name')"
        class="p-2 mr-2 flex-grow w-full text-xl font-bold focus:outline-none"
      >
      <textarea
        :value="task.description"
        class="relative bg-transparent w-full border-none px-2mt-2 h-64 leading-normal focus:outline-none"
        @keyup.enter.prevent="updateTask($event, 'description')"
      />
    </div>
    <div
      v-else
      class="px-4"
    >
      Task not found
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default {
  name: 'TaskView',

  setup() {
    const store = useStore()
    const route = useRoute()
    const task = ref({})

    onMounted(() => {
      store.dispatch('getTask', route.params.id).then((response) => {
        task.value = response
      }).catch((error) => {
        console.log({ error })
      })
    })

    const updateTask = (event, key) => {
      console.log({ event: event.target.value })
      store.dispatch('updateTask', { task: task.value, key, value: event.target.value })
    }
    return {
      task,
      updateTask,
    }
  }
}
</script>

<style scoped>
.task-view {
  max-width: 700px;
  color: #525153
}
</style>
