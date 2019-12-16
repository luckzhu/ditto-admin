<template>
  <div class="navbar-container">
    <div class="trigger-container" @click="toggleSidebar">
      <svg-icon :icon-name="triggerIconName" icon-class="trigger-icon" />
    </div>
    <div class="right-menu">
      <header-search />
      <!-- <p class="name">{{name}}</p> -->
      <img :src="avatar" class="avatar" alt />

      <el-dropdown>
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>GitHub</el-dropdown-item>
          <el-dropdown-item>
            <span @click="onLogout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import HeaderSearch from '@/components/HeaderSearch'
import { mapGetters } from 'vuex'
export default {
  components: {
    HeaderSearch
  },
  computed: {
    ...mapGetters(['name', 'avatar', 'sidebar']),
    triggerIconName() {
      if (this.sidebar.opened) {
        return 'double-arrow-left'
      } else {
        return 'double-arrow-right'
      }
    }
  },
  methods: {
    toggleSidebar() {
      this.$store.commit('app/TOGGLE_SIDEBAR')
    },
    onLogout() {
      this.$store.dispatch('user/logout').then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar-container {
  height: 64px;
  padding: 0 20px 0 15px;
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.trigger-container {
  .trigger-icon {
    width: 30px;
    height: 30px;
  }
}
.right-menu {
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 4px;
  }
}
</style>

<style lang="scss">
.el-dropdown-menu__item {
  font-size: 13px;
  padding: 0 16px;
}
</style>