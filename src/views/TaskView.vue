<template>
  <div class="task-view">
    <div
      v-if="task !== undefined"
      class="flex flex-col flex-grow items-start justify-between px-4"
    >
      {{ task.name }} wewe
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
        console.log({ response })
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
  color: #fff
}
</style>
