<template>
  <nav-bar />
  <main>
    <router-view />
  </main>
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
