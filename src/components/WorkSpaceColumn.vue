<template>
  <div
    @drop="dropTaskorColumn($event, column.tasks, columnIndex, taskIndex)"
    @dragover.prevent
    @dragenter.prevent

    @dragstart.self="dragColumn($event, columnIndex)"
    draggable="true"

    class="column bg-grey-light p-2 mr-4 text-left shadow rounded"
  >
    <div class="flex items-center mb-2 font-bold">
      {{ column.name }}
    </div>

    <div class="list-reset">
      <div
        v-for="(task, $taskIndex) of column.tasks"
        :key="$taskIndex"

        @click="openTask(task)"

        @dragstart="dragTask($event, $taskIndex, columnIndex)"
        draggable="true"

        @drop.stop="dropTaskorColumn($event, column.tasks, columnIndex, $taskIndex)"
        @dragover.prevent
        @dragenter.prevent

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
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'WorkSpaceColumn',

  props: {
    workspace: {
      type: Object,
      default: () => {}
    },
    column: {
      type: Object,
      default: () => {}
    },
    columnIndex: {
      type: Number,
      default: null
    }
  },

  setup(props) {
    const store = useStore()
    const router = useRouter()

    const dropTask = (event, toTasks, toTaskIndex) => {
      const fromTaskIndex = event.dataTransfer.getData('from-task-index')
      const fromColumnIndex = event.dataTransfer.getData('from-column-index')
      const fromTasks = props.workspace.columns[fromColumnIndex].tasks
      store.dispatch('moveTask', { fromTasks, fromTaskIndex, toTasks, toTaskIndex }).then((response) => {
        console.log('TASK DRAG & DROP DONE')
      })
    }

    const dropColumn = (event, toColumnIndex) => {
      const fromColumnIndex = event.dataTransfer.getData('from-column-index')
      store.dispatch('moveColumn', { fromColumnIndex, toColumnIndex }).then((response) => {
        console.log('COLUMN DRAG & DROP DONE')
      })
    }

    const dropTaskorColumn = (event, toTasks, toColumnIndex, toTaskIndex) => {
      const type = event.dataTransfer.getData('type')
      if (type === 'task') {
        dropTask(event, toTasks, toTaskIndex !== undefined ? toTaskIndex : toTasks.length)
      } else {
        dropColumn(event, toColumnIndex)
      }
    }

    const dragColumn = (event, fromColumnIndex) => {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'

      event.dataTransfer.setData('from-column-index', fromColumnIndex)
      event.dataTransfer.setData('type', 'column')
    }

    const openTask = (task) => {
      router.push({
        name: 'TaskView',
        params: { id: task.id }
      })
    }

    const dragTask = (event, taskIndex, fromColumnIndex) => {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'

      event.dataTransfer.setData('from-task-index', taskIndex)
      event.dataTransfer.setData('from-column-index', fromColumnIndex)
      event.dataTransfer.setData('type', 'task')
    }

    const addTask = (event, tasks) => {
      if (event.target.value.trim() === '') return

      store.dispatch('addTask', { name: event.target.value, tasks }).then((response) => {
        event.target.value = ''
      })
    }

    return {
      dropTask,
      dropColumn,
      dropTaskorColumn,
      dragColumn,
      openTask,
      dragTask,
      addTask,
    }
  }
}
</script>

<style scoped>
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
</style>
