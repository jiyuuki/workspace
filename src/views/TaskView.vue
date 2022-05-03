<template>
  <div class="task-view">
    <div
      class="flex flex-col flex-grow items-start justify-between px-4"
    >
      {{ task }}
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'TaskView',

  setup() {
    const store = useStore()
    const task = computed(() => store.getters.getTask(12))

    console.log({ task: task })

    return {
      task
    }
  }
}
</script>

<style scoped>
.task-view {
  max-width: 700px;
  color: #fff
}
</style>
