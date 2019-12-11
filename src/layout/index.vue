<template>
  <div>
    <el-container>
      <el-aside width="220px">
        <sidebar />
      </el-aside>
      <el-container>
        <el-header>
          <navbar />
        </el-header>
        <el-main>
          <router-view>
            <app-main />
          </router-view>
        </el-main>
      </el-container>
    </el-container>
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