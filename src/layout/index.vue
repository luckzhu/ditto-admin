<template>
  <div :class="classObj">
    <sidebar class="sidebar-container" />
    <div class="right-container">
      <navbar />
      <app-main />
    </div>
  </div>
</template>

<script>
import { Sidebar, AppMain, Navbar } from './components/index.js'
export default {
  components: {
    Sidebar,
    AppMain,
    Navbar
  },
  computed: {
    classObj() {
      return {
        'layout-ontainer': true,
        'hide-sidebar': !this.$store.getters.sidebar.opened
      }
    }
  }
}
</script>

<style lang="scss" >
.right-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: 200px;
  position: relative;
}
.sidebar-container {
  width: 200px;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  outline: 1px solid #dcdfe6;
}

.hide-sidebar {
  .sidebar-container {
    width: 50px;
  }
  .right-container {
    margin-left: 50px;
  }
}
.el-icon-arrow-right {
  display: none;
}
.el-menu--vertical {
  .el-menu-item {
    .svg-icon {
      margin-right: 10px;
      font-size: 20px;
      vertical-align: middle;
    }
  }
}
</style>