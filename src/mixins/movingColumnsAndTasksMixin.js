export default {
  props: {
    workspace: {
      type: Object,
      default: () => {}
    },
    column: {
      type: Object,
      default: () => {}
    },
    columnIndex: {
      type: Number,
      default: null
    }
  }
}
