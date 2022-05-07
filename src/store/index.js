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
