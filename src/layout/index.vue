<template>
  <div>
    <sidebar />
    <navbar />
    <router-view>
      <app-main />
    </router-view>
  </div>
</template>

<script>
import { Sidebar,AppMain,Navbar } from './components/index.js'
export default {
  components: {
    Sidebar,
    AppMain,
    Navbar
  }
}
</script>

<style lang="scss" scoped>
</style>