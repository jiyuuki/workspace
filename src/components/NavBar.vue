<template>
  <div class="navbar grid grid-cols-2 gap-4 place-content-between p-10">
    <div>
      Jiyuuki
    </div>
    <div>
      <router-link
        :to="{ name: 'HomeView' }"
        ref="Home"
        class="p-5"
      >
        Hone
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
  background: #157e7e;
  color: #fff;
}
</style>
