<template>
  <div class="main">
    <nav-bar />
    <div class="content flex flex-col m-10">
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
.main .content {
  color: #20201e;
  font-weight: 600;
  font-size: 20px;
}
</style>
