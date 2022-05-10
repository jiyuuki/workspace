<template>
  <div class="workspace bg-teal-dark h-full">
    <div class="flex p-4 flex-row items-start absolute">
      <WorkSpaceColumns
        v-for="(column, $columnIndex) of workspace.columns"
        :key="$columnIndex"
        :workspace="workspace"
        :column="column"
        :column-index="$columnIndex"
      />

      <div class="column flex rounded-md">
        <input
          type="text"
          class="p-2 mr-2 flex-grow bg-transparent focus:outline-none placeholder-current"
          placeholder="New Column Name"
          @keyup.enter="addColumn($event)"
        >
      </div>
    </div>

    <div
      v-if="isTaskOpen"
      class="task-bg bg-teal-dark h-full overflow-auto relative"
      @click.self="closeTask"
    >
      <router-view />
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import WorkSpaceColumns from '@/components/WorkSpaceColumns.vue'

export default {
  name: 'WorkSpaceView',

  components: {
    WorkSpaceColumns,
  },

  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const workspace = computed(() => store.getters['getWorkspace'])

    const isTaskOpen = computed(() => route.name === 'TaskView')

    const closeTask = () => {
      router.push({
        name: 'WorkSpaceView'
      })
    }

    const addColumn = (event) => {
      store.dispatch('addColumn', event.target.value).then((response) => {
        event.target.value = ''
      })
    }

    return {
      workspace,
      isTaskOpen,
      closeTask,
      addColumn,
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

.task-bg {
  background: rgba(0,0,0,0.5);
}
</style>
