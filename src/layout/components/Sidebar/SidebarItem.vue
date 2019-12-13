<template>
  <div v-if="!item.hidden">
    <el-submenu v-if="item.children" :index="resolvePath({routePath:item.path})">
      <template slot="title">
        <item :icon="item.meta.icon" :title="item.meta.title"></item>
      </template>
      <el-menu-item
        v-for="child in item.children"
        :key="child.path"
        :index="resolvePath({basePath:item.path,routePath:child.path})"
      >
        <item v-if="child.meta" :icon="child.meta && child.meta.icon" :title="child.meta.title"></item>
      </el-menu-item>
    </el-submenu>

    <el-menu-item v-else :index="item.path">
      <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title"></item>
    </el-menu-item>
  </div>
</template>

<script>
import Item from './Item'
import path from 'path'
export default {
  name: 'SidebarItem',
  components: {
    Item
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    resolvePath({ basePath = '', routePath }) {
      return path.resolve(basePath, routePath)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>