<template>
  <div class="list-reset">
    <div
      @click="openTask(task)"

      @dragstart="dragTask($event, taskIndex, columnIndex)"
      draggable="true"

      @drop.stop="dropTaskorColumn($event, column.tasks, columnIndex, taskIndex)"
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

</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import movingColumnsAndTasksMixin from '@/mixins/movingColumnsAndTasksMixin.js'

export default {
  name: 'ColumnTask',

  mixins: [movingColumnsAndTasksMixin],

  props: {
    task: {
      type: Object,
      default: () => {}
    },
    taskIndex: {
      type: Number,
      default: null
    }
  },

  setup(props) {
    const router = useRouter()
    const store = useStore()

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

    return {
      openTask,
      dragTask,
      dropTask,
      dropColumn,
      dropTaskorColumn,
    }
  }
}
</script>

<style scoped>
.task {
  background: #EEEEEE;
  color: #525153;
  cursor: pointer;
  border-top: 6px solid #1c658c; /* TODO: add the border color according to task tag */
  border-radius: 6px;
}
</style>
