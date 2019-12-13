<template>
  <div class="app-main-container">
    <keep-alive>
      <router-view :key="this.$route.path"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.app-main-container {
  min-height: calc(100vh - 65px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>