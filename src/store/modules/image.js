// image.js - 图像管理模块
import { fetchImagesApi, searchImagesApi, deleteImageApi } from '@/common/api/imageApi'; // 导入图像相关 API

const state = {
  imageList: [], // 图像列表
  isLoading: false, // 是否正在加载
  searchKeyword: '' // 搜索关键字
};

const mutations = {
  // 设置图像列表
  SET_IMAGE_LIST(state, imageList) {
    state.imageList = imageList;
  },
  // 设置加载状态
  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading;
  },
  // 设置搜索关键字
  SET_SEARCH_KEYWORD(state, keyword) {
    state.searchKeyword = keyword;
  },
  // 删除图像
  DELETE_IMAGE(state, imageId) {
    state.imageList = state.imageList.filter(image => image.id !== imageId);
  }
};

const actions = {
  // 获取图像列表
  async fetchImages({ commit }) {
    commit('SET_LOADING', true); // 开始加载
    try {
      const response = await fetchImagesApi(); // 调用获取图像列表接口
      commit('SET_IMAGE_LIST', response.data); // 保存图像列表
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      commit('SET_LOADING', false); // 结束加载
    }
  },

  // 搜索图像
  async searchImages({ commit }, keyword) {
    commit('SET_SEARCH_KEYWORD', keyword); // 保存搜索关键字
    commit('SET_LOADING', true); // 开始加载
    try {
      const response = await searchImagesApi(keyword); // 调用搜索图像接口
      commit('SET_IMAGE_LIST', response.data); // 保存搜索结果
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      commit('SET_LOADING', false); // 结束加载
    }
  },

  // 删除图像
  async deleteImage({ commit }, imageId) {
    try {
      await deleteImageApi(imageId); // 调用删除图像接口
      commit('DELETE_IMAGE', imageId); // 从状态中删除图像
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

const getters = {
  // 获取图像列表
  imageList: (state) => state.imageList,
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