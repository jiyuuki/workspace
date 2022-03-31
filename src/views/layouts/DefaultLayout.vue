<template>
  <div class="main">
    <nav-bar />
    <div class="flex flex-col m-10">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'DefaultLayout',

  components: {
    NavBar
  }
}
</script>

<style>
.main {
  height: 100%;
  position: absolute;
  background: #fff;
  margin: 0px;
}
</style>
