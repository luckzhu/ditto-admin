const userMap = {
  admin: {
    status: 200,
    roles: ["admin"],
    token: "admin",
    introduction: "我是超级管理员",
    avatar:
      "https://raw.githubusercontent.com/mgbq/nx-admin/master/src/assets/img/home/logo.png",
    name: "Super Admin"
  },
  editor: {
    status: 200,
    roles: ["editor"],
    token: "editor",
    introduction: "我是编辑",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Normal Editor"
  }
};

export default {
  login: config => {
    const { username } = JSON.parse(config.body);
    return userMap[username];
  },
  logout: () => {
    return {
      status: 200,
      Message: "success"
    };
  }
};
