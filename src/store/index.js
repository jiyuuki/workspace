import { createStore } from 'vuex'
import defaultWorkspace from '@/data/default-workspace'
import { saveStatePlugin } from '@/helpers/utils'

const workspace = JSON.parse(localStorage.getItem('workspace')) || defaultWorkspace
export default createStore({
  plugins: [saveStatePlugin],
  state: {
    workspace: workspace,
    task: {}
  },
  mutations: {
    SET_TASK: (state, task) => {
      state.task = task
    }
  },
  actions: {
    getTask: ({ commit, state }, payload) => {
      try {
        for (const columns of state.workspace.columns) {
          for (const task of columns.tasks) {
            if (task.id === payload) {
              commit('SET_TASK', task)
              return task
            }
          }
        }
      } catch {
        return 'task not found'
      }
    }
  },
  getters: {
    getWorkspace: (state) => {
      return state.workspace
    },
    getTask: (state) => {
      return state.task
    }
  },
  modules: {},
});
