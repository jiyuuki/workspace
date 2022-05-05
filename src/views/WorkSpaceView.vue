<template>
  <div class="workspace bg-teal-dark h-full overflow-auto">
    <div class="flex p-4 flex-row items-start absolute">
      <div
        v-for="(column, $columnIndex) of workspace.columns"
        :key="$columnIndex"
        class="column bg-grey-light p-2 mr-4 text-left shadow rounded"
      >
        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </div>
        <div class="list-reset">
          <div
            v-for="(task, $taslIndex) of column.tasks"
            :key="$taslIndex"
            class="task flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline"
          >
            <span class="w-full flex-no-shrink font-bold">
              {{ task.name }}
            </span>
            <p
              v-show="task.description"
              class="w-full flex-no-shrink text-sm"
            >
              {{ task.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="isTaskOpen"
      class="task-bg bg-teal-dark h-full overflow-auto relative"
    >
      <router-view />
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'WorkSpaceView',

  setup() {
    const store = useStore()
    const route = useRoute()

    const workspace = computed(() => store.getters['getWorkspace'])

    const isTaskOpen = computed(() => route.name === 'TaskView')

    return {
      workspace,
      isTaskOpen,
    }
  }
}
</script>

<style lang="css" scoped>
.workspace {
  background: #1C658C;
}
.column {
  background: #398AB9;
  color: #EEEEEE;
}
.task {
  background: #EEEEEE;
  color: #525153;
}
.task-bg {
  background: rgba(0,0,0,0.5);
}
</style>
