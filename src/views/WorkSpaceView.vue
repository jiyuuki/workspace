<template>
  <div class="workspace">
    <div class="flex flex-row items-start">
      <div
        v-for="column of workspace.columns"
        :key="column"
        class="column"
      >
        <div
          v-for="task of column.tasks"
          :key="task"
          class="task"
        >
          {{ task }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'WorkSpaceView',

  setup() {
    const store = useStore()

    const workspace = computed(() => store.getters['getWorkspace'])

    return {
      workspace,
    }
  }
}
</script>

<style lang="css" scoped>
.workspace {
  @apply p-4 h-full overflow-auto;
  background: #1C658C;
}
.column {
  @apply p-2 mr-4 text-left shadow rounded;
  background: #398AB9;
  color: #EEEEEE;
}
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded no-underline;
  background: #EEEEEE;
  color: #525153;
}
</style>
