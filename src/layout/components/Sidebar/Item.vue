<template>
  <el-menu-item>
    <svg-icon v-if="icon" :icon-name="icon" />
    <span v-if="title" slot="title">{{title}}</span>
  </el-menu-item>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>