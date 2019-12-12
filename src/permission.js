import router from "./router";
import store from "./store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "./utils/auth";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whilteList = ["/login"];

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  const hasToken = getToken();

  if (hasToken) {
    console.log({ hasToken });
    if ((to.path = "/login")) {
      next("/");
      NProgress.done();
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      console.log({ hasRoles });
      if (hasRoles) {
        next();
      } else {
        try {
          const roles = store.dispatch("user/getInfo", hasToken);
          const accessRoutes = store.dispatch("permission/generateRoutes", roles);
          router.addRoutes(accessRoutes);
          next({ ...to, replace: true });
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch("user/resetToken");
          Message.error(error || "Has Error");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    if (whilteList.includes(to.path)) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
