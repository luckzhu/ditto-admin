import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout/index.vue";

Vue.use(VueRouter);

export const constantRoutes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login"),
    hidden: true
  },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    meta: { title: "管理", icon: "all" },
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/Home.vue"),
        meta: { title: "选项1", icon: "add" }
      },
      {
        path: "home2",
        name: "Home2",
        component: () => import("@/views/Home.vue"),
        meta: { title: "选项2", icon: "add-cart" }
      },
      {
        path: "home3",
        name: "Home3",
        component: () => import("@/views/Home.vue"),
        meta: { title: "选项3", icon: "add-account" }
      }
    ]
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue"),
    meta: { title: "关于", icon: "arrow-lift" }
  }
];

export const asyncRoutes = [
  {
    path: "/test",
    component: Layout,
    redirect: "/test/normal",
    meta: { title: "测试", icon: "arrow-right", roles: ["admin", "editor"] },
    children: [
      {
        path: "normal",
        name: "Normal",
        component: () => import("@/views/test/test1"),
        meta: { title: "normal", icon: "arrow-up" }
      },
      {
        path: "admin",
        name: "Admin",
        component: () => import("@/views/test/test2"),
        meta: { title: "admin", icon: "assessed-badge", roles: ["admin"] }
      },
      {
        path: "editor",
        name: "Editor",
        component: () => import("@/views/test/test3"),
        meta: { title: "editor", icon: "bad", roles: ["editor"] }
      }
    ]
  }
];

const createRouter = () =>
  new VueRouter({
    routes: constantRoutes
  });

const router = createRouter();

//当切换用户登录时，需要重置上一次动态加载的路由。用户logout时调用即可
export function resetRouter(routes) {
  console.log(router);
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
  console.log(router);
}

export default router;
