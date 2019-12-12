import Vue from "vue";

import "normalize.css/normalize.css"; // a modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import App from "./App.vue";

Vue.use(ElementUI);

import router from "./router";
import store from "./store";

import "./permission";

import "./icons";
// import "./mock";
import { mockXHR } from "./mock";
mockXHR();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
