<template>
  <VueDrop
    @drop="dropTaskorColumn"
  >
    <VueDrag
      :data-transfer="{
        type: 'column',
        fromColumnIndex: columnIndex,
      }"
      class="column bg-grey-light p-2 mr-4 text-left shadow rounded"
    >
      <div>
        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </div>

        <ColumnTasks
          v-for="(task, $taskIndex) of column.tasks"
          :key="$taskIndex"
          :task-index="$taskIndex"
          :column-index="columnIndex"
          :workspace="workspace"
          :column="column"
          :task="task"
        />
      </div>
      <input
        type="text"
        class="add-task w-full block p-2 bg-transparent focus:outline-none placeholder-current"
        placeholder="+ Add new task"
        @keyup.enter="addTask($event, column.tasks)"
      >
    </VueDrag>
  </VueDrop>
</template>

<script>
import { useStore } from 'vuex'
import ColumnTasks from '@/components/ColumnTasks.vue'
import movingColumnsAndTasksMixin from '@/mixins/movingColumnsAndTasksMixin.js'
import VueDrag from '@/components/VueDrag.vue'
import VueDrop from '@/components/VueDrop.vue'

export default {
  name: 'WorkSpaceColumns',

  mixins: [movingColumnsAndTasksMixin],

  components: {
    ColumnTasks,
    VueDrag,
    VueDrop,
  },

  setup(props) {
    const store = useStore()

    const dropColumn = ({ fromColumnIndex }) => {
      store.dispatch('moveColumn', {
        fromColumnIndex: fromColumnIndex,
        toColumnIndex: props.columnIndex
      }).then((response) => {
        console.log('COLUMN DRAG & DROP DONE')
      })
    }

    const dropTaskorColumn = (dataTransfer) => {
      console.log({ dataTransfer })
      if (dataTransfer.type === 'column') {
        dropColumn(dataTransfer)
      }
    }

    const addTask = (event, tasks) => {
      if (event.target.value.trim() === '') return

      store.dispatch('addTask', { name: event.target.value, tasks }).then((response) => {
        event.target.value = ''
      })
    }

    return {
      dropColumn,
      dropTaskorColumn,
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

.add-task {
  color: #c6eafd
}
</style>
