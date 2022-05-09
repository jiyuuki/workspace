<template>
  <div class="workspace bg-teal-dark h-full overflow-auto">
    <div class="flex p-4 flex-row items-start absolute">
      <div
        v-for="(column, $columnIndex) of workspace.columns"
        :key="$columnIndex"
        @drop="dropTaskorColumn($event, column.tasks, $columnIndex)"
        @dragover.prevent
        @dragenter.prevent
        draggable="true"
        @dragstart.self="dragColumn($event, $columnIndex)"
        class="column bg-grey-light p-2 mr-4 text-left shadow rounded"
      >
        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </div>

        <div class="list-reset">
          <div
            v-for="(task, $taskIndex) of column.tasks"
            :key="$taskIndex"
            @dragstart="dragTask($event, $taskIndex, $columnIndex)"
            @click="openTask(task)"
            draggable="true"
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

        <input
          type="text"
          class="add-task w-full block p-2 bg-transparent focus:outline-none placeholder-current"
          placeholder="+ Add new task"
          @keyup.enter="addTask($event, column.tasks)"
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

export default {
  name: 'WorkSpaceView',

  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const workspace = computed(() => store.getters['getWorkspace'])

    const isTaskOpen = computed(() => route.name === 'TaskView')

    const openTask = (task) => {
      router.push({
        name: 'TaskView',
        params: { id: task.id }
      })
    }

    const closeTask = () => {
      router.push({
        name: 'WorkSpaceView'
      })
    }

    const addTask = (event, tasks) => {
      if (event.target.value.trim() === '') return

      store.dispatch('addTask', { name: event.target.value, tasks }).then((response) => {
        event.target.value = ''
      })
    }

    const dragTask = (event, taskIndex, fromColumnIndex) => {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'

      event.dataTransfer.setData('task-index', taskIndex)
      event.dataTransfer.setData('from-column-index', fromColumnIndex)
      event.dataTransfer.setData('type', 'task')
    }

    const dragColumn = (event, fromColumnIndex) => {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'

      event.dataTransfer.setData('from-column-index', fromColumnIndex)
      event.dataTransfer.setData('type', 'column')
    }

    const dropTaskorColumn = (event, toTasks, toColumnIndex) => {
      const type = event.dataTransfer.getData('type')
      if (type === 'task') {
        dropTask(event, toTasks)
      } else {
        dropColumn(event, toColumnIndex)
      }
    }

    const dropTask = (event, toTasks) => {
      const taskIndex = event.dataTransfer.getData('task-index')
      const fromColumnIndex = event.dataTransfer.getData('from-column-index')
      const fromTasks = workspace.value.columns[fromColumnIndex].tasks
      store.dispatch('moveTask', { taskIndex, fromTasks, toTasks }).then((response) => {
        console.log('TASK DRAG & DROP DONE')
      })
    }

    const dropColumn = (event, toColumnIndex) => {
      const fromColumnIndex = event.dataTransfer.getData('from-column-index')
      store.dispatch('moveColumn', { fromColumnIndex, toColumnIndex }).then((response) => {
        console.log('COLUMN DRAG & DROP DONE')
      })
    }

    return {
      workspace,
      isTaskOpen,
      openTask,
      closeTask,
      addTask,
      dragTask,
      dragColumn,
      dropTask,
      dropColumn,
      dropTaskorColumn,
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
  cursor: pointer;
  border-top: 6px solid #1c658c; /* TODO: add the border color according to task tag */
  border-radius: 6px;
}

.add-task {
  color: #c6eafd
}

.task-bg {
  background: rgba(0,0,0,0.5);
}
</style>
