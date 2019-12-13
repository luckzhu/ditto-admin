<template>
  <div>
    <el-button @click="onLogout">logout</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    onLogout() {
      this.$store.dispatch('user/logout').then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>