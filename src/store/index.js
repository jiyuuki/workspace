import { createStore } from 'vuex'
import defaultWorkspace from '@/data/default-workspace'
import { saveStatePlugin } from '@/helpers/utils'

const workspace = JSON.parse(localStorage.getItem('workspace')) || defaultWorkspace
console.log({ workspace })
export default createStore({
  plugins: [saveStatePlugin],
  state: {
    workspace: workspace,
  },
  mutations: {},
  actions: {
    getTask: ({ commit, state }, payload) => {
      for (const columns of state.workspace.columns) {
        columns.tasks.find(task => task.id === payload)
      }
    }
  },
  getters: {
    getWorkspace: (state) => {
      return state.workspace
    }
  },
  modules: {},
});
