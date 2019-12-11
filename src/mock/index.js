import Mock from "mockjs";
import loginAPI from "./login"; //模块化

// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
  timeout: "300-600"
});

Mock.mock(/\/user\/login/, "post", loginAPI.login);
Mock.mock(/\/user\/logout/, "post", loginAPI.logout);
