import { createStore } from 'vuex'
import defaultWorkspace from '@/data/default-workspace'
import { saveStatePlugin, uuid } from '@/helpers/utils'

const workspace = JSON.parse(localStorage.getItem('workspace')) || defaultWorkspace
export default createStore({
  plugins: [saveStatePlugin],
  state: {
    workspace: workspace,
    currentTask: {}
  },
  mutations: {
    CURRENT_TASK: (state, currentTask) => {
      state.currentTask = currentTask
    },
    ADD_TASK: (state, { name, tasks }) => {
      tasks.push({
        name,
        id: uuid(),
        description: ''
      })
    },
    UPDATE_TASK: (state, { task, key, value }) => {
      task[key] = value
    },
    MOVE_TASK: (state, { taskIndex, fromTasks, toTasks }) => {
      const taskToMove = fromTasks.splice(taskIndex, 1)[0]
      toTasks.push(taskToMove)
    },
    MOVE_COLUMN: (state, { fromColumnIndex, toColumnIndex }) => {
      const columns = state.workspace.columns

      const columnToMove = columns.splice(fromColumnIndex, 1)[0]
      columns.splice(toColumnIndex, 0, columnToMove)
    }
  },
  actions: {
    getTask: ({ commit, state }, payload) => {
      try {
        for (const columns of state.workspace.columns) {
          for (const task of columns.tasks) {
            if (task.id === payload) {
              commit('CURRENT_TASK', task)
              return task
            }
          }
        }
      } catch {
        return 'task not found'
      }
    },
    addTask: ({ commit }, { name, tasks }) => {
      try {
        commit('ADD_TASK', { name, tasks })
      } catch {
        console.log('there\'s somthing wrong please try later')
      }
    },
    updateTask: ({ commit }, { task, key, value }) => {
      try {
        commit('UPDATE_TASK', { task, key, value })
      } catch {
        console.log('there\'s somthing wrong please try later')
      }
    },
    moveTask: ({ commit }, { taskIndex, fromTasks, toTasks }) => {
      try {
        commit('MOVE_TASK', { taskIndex, fromTasks, toTasks })
      } catch {
        console.log('ther\'s somthing wrong please try later')
      }
    },
    moveColumn: ({ commit }, { fromColumnIndex, toColumnIndex }) => {
      try {
        commit('MOVE_COLUMN', { fromColumnIndex, toColumnIndex })
      } catch {
        console.log('there\'s somthing wrong try later')
      }
    }
  },
  getters: {
    getWorkspace: (state) => {
      return state.workspace
    },
    getTask: (state) => {
      return state.currentTask
    }
  },
  modules: {},
});
