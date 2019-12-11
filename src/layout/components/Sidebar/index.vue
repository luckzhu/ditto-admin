<template>
  <div class="sidebar">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="vertical"
      :collapse="isCollapse"
      @select="handleSelect"
    >
      <sidebar-item v-for="route in router" :key="route.path" :item="route">
        <sidebar-item v-for="child in route.children" :key="child.path" :item="child"></sidebar-item>
      </sidebar-item>
    </el-menu>
    <div class="line"></div>
  </div>
</template>

<script>
import SidebarItem from "./SidebarItem"
export default {
  components: {
    SidebarItem
  },
  data() {
    return {
      activeIndex: "1"
    }
  },
  computed: {
    isCollapse() {
      return false
    },
    router() {
      console.log(this.$router.options.routes)
      return this.$router.options.routes
    }
  },
  methods: {
    handleSelect(key,keyPath) {
      console.log(key,keyPath);
    }
  }
}
</script>

<style lang="scss" >
.sidebar .svg-icon {
  margin-right: 10px;
  font-size: 20px;
  vertical-align: middle;
}

</style>