<template>
  <div class="list-reset">
    <VueDrop
      @drop="dropTaskOrColumn"
    >
      <VueDrag
        :data-transfer="{
          type: 'task',
          fromColumnIndex: columnIndex,
          fromTaskIndex: taskIndex
        }"
      >
        <div
          @click="openTask(task)"
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
      </VueDrag>
    </VueDrop>
  </div>

</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import movingColumnsAndTasksMixin from '@/mixins/movingColumnsAndTasksMixin.js'
import VueDrop from '@/components/VueDrop.vue'
import VueDrag from '@/components/VueDrag.vue'

export default {
  name: 'ColumnTask',

  components: {
    VueDrop,
    VueDrag
  },

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

    const dropTask = ({ fromColumnIndex, fromTaskIndex }) => {
      const fromTasks = props.workspace.columns[fromColumnIndex].tasks
      store.dispatch('moveTask', {
        fromTasks,
        fromTaskIndex,
        toTasks: props.column.tasks,
        toTaskIndex: props.taskIndex
      }).then((response) => {
        console.log('TASK DRAG & DROP DONE')
      })
    }

    const dropColumn = ({ fromColumnIndex }) => {
      store.dispatch('moveColumn', {
        fromColumnIndex,
        toColumnIndex: props.columnIndex
      }).then((response) => {
        console.log('COLUMN DRAG & DROP DONE')
      })
    }

    const dropTaskOrColumn = (dataTransfer) => {
      if (dataTransfer.type === 'task') {
        dropTask(dataTransfer)
      } else {
        dropColumn(dataTransfer)
      }
    }

    return {
      openTask,
      dropTask,
      dropColumn,
      dropTaskOrColumn,
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
