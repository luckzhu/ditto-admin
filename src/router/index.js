import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout/index.vue";

Vue.use(VueRouter);

const constantRoutes = [
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

const router = new VueRouter({
  routes: constantRoutes
});

export default router;
