<template>
  <div
    @drop.self="onDrop($event)"
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
      const dataTransfer = JSON.parse(event.dataTransfer.getData('payload'))
      emit('drop', dataTransfer)
    }

    return {
      onDrop,
    }
  }
}
</script>

<style>

</style>
