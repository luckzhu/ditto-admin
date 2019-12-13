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
      return !this.$store.getters.sidebar.opened
    },
    router() {
      return this.$store.getters.permission_routes
    }
  },
  methods: {
    handleSelect(key, keyPath) {}
  }
}
</script>

<style lang="scss"  >
.sidebar {
  text-align: left;
  .el-menu {
    border: none;
    height: 100%;
    width: 100% !important;
  }
}
.sidebar .el-menu .svg-icon {
  margin-right: 10px;
  font-size: 20px;
  vertical-align: middle;
}
</style>