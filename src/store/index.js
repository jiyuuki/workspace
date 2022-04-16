import { createStore } from 'vuex';
import defaultWorkspace from '@/data/default-workspace';

export default createStore({
  state: {
    workspace: defaultWorkspace
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
