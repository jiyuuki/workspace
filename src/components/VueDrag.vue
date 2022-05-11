<template>
  <div
    draggable="true"
    @dragstart.self="onDrag($event)"
    @dragenter.prevent
    @dragover.prevent
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VueDrag',

  props: {
    dataTransfer: {
      type: Object,
      require: true,
      default: () => {}
    }
  },

  setup(props) {
    const onDrag = (event) => {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.setData('payload', JSON.stringify(props.dataTransfer))
    }

    return {
      onDrag,
    }
  }
}
</script>

<style lang="css" scoped></style>
