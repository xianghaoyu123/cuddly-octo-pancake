// model.js - 识别模型管理模块
import { fetchModelsApi, searchModelsApi, deleteModelApi } from '@/common/api/modelApi'; // 导入模型相关 API

const state = {
  modelList: [], // 模型列表
  isLoading: false, // 是否正在加载
  searchKeyword: '' // 搜索关键字
};

const mutations = {
  // 设置模型列表
  SET_MODEL_LIST(state, modelList) {
    state.modelList = modelList;
  },
  // 设置加载状态
  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading;
  },
  // 设置搜索关键字
  SET_SEARCH_KEYWORD(state, keyword) {
    state.searchKeyword = keyword;
  },
  // 删除模型
  DELETE_MODEL(state, modelId) {
    state.modelList = state.modelList.filter(model => model.id !== modelId);
  }
};

const actions = {
  // 获取模型列表
  async fetchModels({ commit }) {
    commit('SET_LOADING', true); // 开始加载
    try {
      const response = await fetchModelsApi(); // 调用获取模型列表接口
      commit('SET_MODEL_LIST', response.data); // 保存模型列表
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      commit('SET_LOADING', false); // 结束加载
    }
  },

  // 搜索模型
  async searchModels({ commit }, keyword) {
    commit('SET_SEARCH_KEYWORD', keyword); // 保存搜索关键字
    commit('SET_LOADING', true); // 开始加载
    try {
      const response = await searchModelsApi(keyword); // 调用搜索模型接口
      commit('SET_MODEL_LIST', response.data); // 保存搜索结果
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      commit('SET_LOADING', false); // 结束加载
    }
  },

  // 删除模型
  async deleteModel({ commit }, modelId) {
    try {
      await deleteModelApi(modelId); // 调用删除模型接口
      commit('DELETE_MODEL', modelId); // 从状态中删除模型
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

const getters = {
  // 获取模型列表
  modelList: (state) => state.modelList,
  // 获取加载状态
  isLoading: (state) => state.isLoading,
  // 获取搜索关键字
  searchKeyword: (state) => state.searchKeyword
};

export default {
  namespaced: true, // 启用命名空间
  state,
  mutations,
  actions,
  getters
};