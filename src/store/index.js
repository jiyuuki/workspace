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
    getTask: (state) => (id) => {
      console.log({ workspace: state.workspace })
      state.workspace.columns.map((value, key) => {
        console.log({ value, key })
        return value.tasks.map(task => task.id === id)
      })
    }
  },
  mutations: {},
  actions: {},
  modules: {},
});
