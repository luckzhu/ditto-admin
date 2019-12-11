<template>
  <div>
    <el-submenu v-if="item.children" :index="item.path">
      <template slot="title">
        <item :icon="item.meta.icon" :title="item.meta.title"></item>
      </template>
      <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
        <item :icon="child.meta.icon" :title="child.meta.title"></item>
      </el-menu-item>
    </el-submenu>
    <el-menu-item v-else :index="item.path">
      <item :icon="item.meta.icon" :title="item.meta.title"></item>
    </el-menu-item>
  </div>
</template>

<script>
import Item from './Item'
export default {
  name: "SidebarItem",
  components: {
    Item
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>