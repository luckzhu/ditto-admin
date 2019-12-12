<template>
  <div class="sidebar">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="vertical"
      :collapse="isCollapse"
      router
      @select="handleSelect"
    >
      <sidebar-item v-for="route in router" :key="route.path" :item="route"></sidebar-item>
    </el-menu>
    <div class="line"></div>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem'
export default {
  components: {
    SidebarItem
  },
  data() {
    return {
      activeIndex: '1'
    }
  },
  computed: {
    isCollapse() {
      return false
    },
    router() {
      console.log(this.$store.getters.permission_routes)
      return this.$store.getters.permission_routes
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss"  >
.sidebar {
  text-align: left;
}
.sidebar .el-menu .svg-icon {
  margin-right: 10px;
  font-size: 20px;
  vertical-align: middle;
}
</style>