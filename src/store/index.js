import { createStore } from 'vuex'
import defaultWorkspace from '@/data/default-workspace'
import { saveStatePlugin } from '@/helpers/utils'

const workspace = JSON.parse(localStorage.getItem('workspace')) || defaultWorkspace
console.log({ workspace })
export default createStore({
  plugins: [saveStatePlugin],
  state: {
    workspace: workspace
  },
  getters: {
    getWorkspace(state) {
      return state.workspace
    },
    getTask(state) {
      return (id) => {
        for (const column of state.workspace.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    }
  },
  mutations: {},
  actions: {},
  modules: {},
});
