// auth.js - 用户认证模块
import { loginApi, logoutApi, getUserInfoApi } from '@/common/api/authApi'; // 导入认证相关 API

const state = {
  token: localStorage.getItem('token') || '', // 从本地存储中获取 token
  userInfo: null, // 用户信息
  isAuthenticated: false // 是否已认证
};

const mutations = {
  // 设置 Token
  SET_TOKEN(state, token) {
    state.token = token;
    localStorage.setItem('token', token); // 将 token 存储到本地
  },
  // 设置用户信息
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  // 设置认证状态
  SET_AUTHENTICATED(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated;
  },
  // 清除认证信息（用于退出登录）
  CLEAR_AUTH(state) {
    state.token = '';
    state.userInfo = null;
    state.isAuthenticated = false;
    localStorage.removeItem('token'); // 清除本地存储的 token
  }
};

const actions = {
  // 登录操作
  async login({ commit }, credentials) {
    try {
      const response = await loginApi(credentials); // 调用登录接口
      const { token, user } = response.data;

      commit('SET_TOKEN', token); // 保存 Token
      commit('SET_USER_INFO', user); // 保存用户信息
      commit('SET_AUTHENTICATED', true); // 设置认证状态为 true

      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // 退出登录操作
  async logout({ commit }) {
    try {
      await logoutApi(); // 调用退出登录接口
      commit('CLEAR_AUTH'); // 清除认证信息
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // 获取用户信息
  async fetchUserInfo({ commit }) {
    try {
      const response = await getUserInfoApi(); // 调用获取用户信息接口
      commit('SET_USER_INFO', response.data); // 保存用户信息
      commit('SET_AUTHENTICATED', true); // 设置认证状态为 true
      return Promise.resolve(response);
    } catch (error) {
      commit('CLEAR_AUTH'); // 如果获取用户信息失败，清除认证信息
      return Promise.reject(error);
    }
  },

  // 初始化认证状态（用于页面加载时检查用户是否已登录）
  initializeAuth({ commit }) {
    const token = localStorage.getItem('token');
    if (token) {
      commit('SET_TOKEN', token);
      commit('SET_AUTHENTICATED', true);
    } else {
      commit('CLEAR_AUTH');
    }
  }
};

const getters = {
  // 获取 Token
  token: (state) => state.token,
  // 获取用户信息
  userInfo: (state) => state.userInfo,
  // 获取认证状态
  isAuthenticated: (state) => state.isAuthenticated
};

export default {
  namespaced: true, // 启用命名空间
  state,
  mutations,
  actions,
  getters
};