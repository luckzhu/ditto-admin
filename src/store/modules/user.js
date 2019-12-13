import { login, getInfo, logout } from "../../api/user";
import { getToken, setToken, removeToken } from "../../utils/auth";
import { Message } from "element-ui";

const state = {
  token: getToken(),
  avatar: "",
  name: "",
  roles: []
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_NAME(state, name) {
    state.name = name;
  },
  SET_AVATAR(state, avatar) {
    state.avatar = avatar;
  },
  SET_ROLES(state, roles) {
    state.roles = roles;
  }
};

const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password })
        .then(response => {
          const { token } = response.data;
          commit("SET_TOKEN", token);
          setToken(token);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getInfo({ commit }, token) {
    return new Promise((resolve, reject) => {
      getInfo(token)
        .then(response => {
          const { data } = response;
          if (!data) {
            reject("获取用户信息失败，请重新登录！");
          }
          const { name, avatar, roles } = data;
          if (!roles || roles.length <= 0) {
            reject("roles必须是一个非空数组！");
          }
          commit("SET_NAME", name);
          commit("SET_AVATAR", avatar);
          commit("SET_ROLES", roles);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(response => {
          commit("SET_ROLES", []);
          commit("SET_TOKEN", "");
          removeToken();
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeToken();
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
