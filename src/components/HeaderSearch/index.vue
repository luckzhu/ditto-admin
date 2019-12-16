<template>
  <div :class="{'header-search':true,'is-select-show':isSelectShow}">
    <div class="icon-container" @click="toggleSelect">
      <svg-icon icon-name="search" icon-class="search-icon" />
    </div>

    <el-select
      v-model="value"
      class="el-select-search"
      filterable
      remote
      :remote-method="remoteMethod"
      :loading="loading"
      placeholder="Search"
    >
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>

<script>
import Fuse from 'fuse.js'
import path from 'path'
export default {
  name: 'Search',
  data() {
    return {
      isSelectShow: false,
      value: '',
      loading: false,
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ]
    }
  },
  mounted() {
    this.generateOptions(this.$store.getters.permission_routes)
  },
  methods: {
    toggleSelect() {
      this.isSelectShow = !this.isSelectShow
    },
    generateOptions(routes, basePath = '/', prefixTitle = []) {
      let res = []
      routes.forEach(route => {
        if (route.hidden) {
          return
        }
        const data = {
          title: [...prefixTitle],
          path: path.resolve(basePath, route.path)
        }
        if (route.meta && route.meta.title) {
          data.title = [...prefixTitle, route.meta.title]
          if (route.redirect !== 'noRedirect') {
            res.push(data)
          }
        }

        if (route.children) {
          const tempRoutes = this.generateOptions(
            route.children,
            data.path,
            data.title
          )

          if (tempRoutes && tempRoutes.length >= 1) {
            res = [...res, tempRoutes]
          }
        }
      })
      console.log(res)
      return res
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.options = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.options = []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-search {
  display: flex;
  align-items: center;
  .icon-container {
    transition: right 1s;
    cursor: pointer;
  }
  .el-select-search {
    width: 0;
    overflow: hidden;
    transition: width 0.3s;
  }
}
.is-select-show .el-select-search {
  width: 200px;
  margin-right: 20px;
}
.svg-icon.search-icon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
</style>

<style >
.el-input__inner,
.el-input__icon {
  height: 34px;
  line-height: 34px;
}
</style>