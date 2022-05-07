<template>
  <div class="task-view flex flex-row bg-white pin m-32 mx-auto py-4 text-left rounded shadow">
    <div
      v-if="task !== undefined"
      class="flex flex-col flex-grow items-start justify-between px-4"
    >
      {{ task.name }}
      <textarea
        :value="task.description"
        class="relative bg-transparent px-2 border mt-2 h-64 border-none leading-normal"
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
    return {
      task,
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
