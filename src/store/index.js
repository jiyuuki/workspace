import { createStore } from 'vuex'
import defaultWorkspace from '@/data/default-workspace'
import { saveStatePlugin } from '@/helpers/utils'

const workspace = JSON.parse(localStorage.getItem('workspace')) || defaultWorkspace

export default createStore({
  plugins: [saveStatePlugin],
  state: {
    workspace: workspace
  },
  getters: {
    getWorkspace(state) {
      return state.workspace
    }
  },
  mutations: {},
  actions: {},
  modules: {},
});
