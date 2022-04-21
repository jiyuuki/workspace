<template>
  <div class="task-view">
    <div
      class="flex flex-col flex-grow items-start justify-between px-4"
    >
      {{ task.name }}
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default {
  name: 'TaskView',

  setup() {
    const store = useStore()
    const route = useRoute()

    const task = computed(() => store.getters[{ getTask: 'getTask', id: route.params.id }])

    return {
      task
    }
  }
}
</script>

<style scoped>
.task-view {
  max-width: 700px;
}
</style>
