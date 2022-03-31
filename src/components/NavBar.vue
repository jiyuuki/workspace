<template>
  <div class="navbar grid grid-cols-2 p-5">
    <div class="self-center">
      Jiyuuki
    </div>
    <div class="self-center">
      <router-link
        :to="{ name: 'HomeView' }"
        ref="Home"
        class="p-5"
      >
        Home
      </router-link>
      <router-link
        :to="{ name: 'WorkSpaceView' }"
        ref="Workspace"
        class="p-5"
      >
        Workspace
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',

  setup() {

  }
}
</script>

<style scoped>
.navbar {
  background: #efe9fe;
  color: #020003;
  font-weight: bolder;
  font-size: 20px;
  height: 100px;
}
</style>
