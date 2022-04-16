<template>
  <div class="workspace">
    <div
      v-for="(column, index) in workspace"
      :key="index"
      class="column"
    >
      <pre>
        {{ column }}
      </pre>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'WorkSpaceView',

  setup() {
    const store = useStore()

    const workspace = computed(() => store.getters['getWorkspace'])

    return {
      workspace,
    }
  }
}
</script>

<style lang="css" scoped>
.workspace {
  @apply p-4 h-full overflow-auto;
  background: #1C658C;
}
.column {
  @apply p-2 mr-4 text-left shadow rounded;
  background: #398AB9;
  color: #EEEEEE;
}
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded no-underline;
  background: #EEEEEE;
  color: #398AB9;
}
</style>
