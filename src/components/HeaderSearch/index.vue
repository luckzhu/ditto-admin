<template>
  <div :class="{'header-search':true,'is-select-show':isSelectShow}">
    <div class="icon-container" @click="toggleSelect">
      <svg-icon icon-name="search" icon-class="search-icon" />
    </div>

    <el-select
      v-model="search"
      class="el-select-search"
      filterable
      remote
      :remote-method="remoteMethod"
      :loading="loading"
      placeholder="Search"
      @change="change"
    >
      <el-option
        v-for="item in options"
        :key="item.path"
        :label="item.title.join(' > ')"
        :value="item"
      ></el-option>
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
      search: '',
      loading: false,
      options: [],
      list: [],
      searchPool: [],
      fuse: ''
    }
  },
  computed: {
    routes() {
      return this.$store.getters.permission_routes
    }
  },
  watch: {
    routes(val) {
      this.searchPool = this.generateOptions(val)
    },
    searchPool(list) {
      this.initFuse(list)
    }
  },
  mounted() {
    this.searchPool = this.generateOptions(this.routes)
  },
  methods: {
    change(val) {
      this.$router.push(val.path)
      this.search = ''
      this.options = []
      this.$nextTick(() => {
        this.isSelectShow = false
      })
    },
    toggleSelect() {
      this.isSelectShow = !this.isSelectShow
    },
    // 过滤掉可以显示在侧栏中的路由，并生成国际化的标题
    generateOptions(routes, basePath = '/', prefixTitle = []) {
      let res = []

      for (const router of routes) {
        // 跳过隐藏路由, continue 控制程序跳转到指定循环的下一次迭代，而非当前循环
        if (router.hidden) {
          continue
        }
        const data = {
          /**
           * path.resolve方法用于将相对路径转为绝对路径。
           * 它可以接受多个参数，依次表示所要进入的路径，直到将最后一个参数转为绝对路径。
           * 如果根据参数无法得到绝对路径，就以当前所在路径作为基准。
           * 除了根目录，该方法的返回值都不带尾部的斜杠。
           */
          path: path.resolve(basePath, router.path),
          title: [...prefixTitle]
        }

        if (router.meta && router.meta.title) {
          data.title = [...data.title, router.meta.title]

          if (router.redirect !== 'noRedirect') {
            // only push the routes with title
            // 需要排除父路由没有设置 redirect
            res.push(data)
          }
        }

        // 递归子路由
        if (router.children) {
          const tempRoutes = this.generateOptions(
            router.children,
            data.path,
            data.title
          )
          if (tempRoutes.length >= 1) {
            res = [...res, ...tempRoutes]
          }
        }
      }
      return res
    },
    initFuse(list) {
      this.fuse = new Fuse(list, {
        shouldSort: true, // 需要排序
        threshold: 0.4, // 在什么情况下匹配算法会放弃。0.0的阈值需要完全匹配(字母和位置)，1.0的阈值可以匹配任何内容。
        location: 0, // 大致确定文本中期望找到的模式的位置
        distance: 100, // 确定匹配必须与模糊位置(由位置指定)的距离
        maxPatternLength: 32, // 模式越长(即搜索查询)，搜索操作就越密集。
        minMatchCharLength: 1, // 最低匹配字符长度
        keys: [
          {
            //要搜索的属性列表。支持嵌套属性、加权搜索、在字符串和对象数组中搜索
            name: 'title',
            weight: 0.7
          },
          {
            name: 'path',
            weight: 0.3
          }
        ]
      })
    },
    remoteMethod(query) {
      if (query !== '') {
        this.options = this.fuse.search(query)
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