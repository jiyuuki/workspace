<template>
  <div
    draggable="true"
    @drop="onDrop($event)"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script>

export default {
  name: 'VueDrop',

  emits: ['drop'],

  setup(props, { emit }) {
    const onDrop = (event) => {
      console.log({ event: JSON.parse(event.dataTransfer.getData('payload')) })
      const dataTransfer = JSON.parse(event.dataTransfer.getData('payload'))
      emit('drop', dataTransfer)
    }

    return {
      onDrop,
    }
  }
}
</script>

<style lang="css" scoped></style>
