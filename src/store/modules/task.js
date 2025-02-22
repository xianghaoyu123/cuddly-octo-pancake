// task.js - 任务管理模块
import { fetchTasksApi, createTaskApi, updateTaskApi, deleteTaskApi } from '@/common/api/taskApi'; // 导入任务相关 API

const state = {
  taskList: [], // 任务列表
  isLoading: false, // 是否正在加载
  currentTask: null // 当前选中的任务
};

const mutations = {
  // 设置任务列表
  SET_TASK_LIST(state, taskList) {
    state.taskList = taskList;
  },
  // 设置加载状态
  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading;
  },
  // 设置当前任务
  SET_CURRENT_TASK(state, task) {
    state.currentTask = task;
  },
  // 添加任务
  ADD_TASK(state, task) {
    state.taskList.push(task);
  },
  // 更新任务
  UPDATE_TASK(state, updatedTask) {
    const index = state.taskList.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      state.taskList.splice(index, 1, updatedTask);
    }
  },
  // 删除任务
  DELETE_TASK(state, taskId) {
    state.taskList = state.taskList.filter(task => task.id !== taskId);
  }
};

const actions = {
  // 获取任务列表
  async fetchTasks({ commit }) {
    commit('SET_LOADING', true); // 开始加载
    try {
      const response = await fetchTasksApi(); // 调用获取任务列表接口
      commit('SET_TASK_LIST', response.data); // 保存任务列表
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      commit('SET_LOADING', false); // 结束加载
    }
  },

  // 创建任务
  async createTask({ commit }, taskData) {
    try {
      const response = await createTaskApi(taskData); // 调用创建任务接口
      commit('ADD_TASK', response.data); // 将新任务添加到状态中
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // 更新任务
  async updateTask({ commit }, taskData) {
    try {
      const response = await updateTaskApi(taskData); // 调用更新任务接口
      commit('UPDATE_TASK', response.data); // 更新状态中的任务
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // 删除任务
  async deleteTask({ commit }, taskId) {
    try {
      await deleteTaskApi(taskId); // 调用删除任务接口
      commit('DELETE_TASK', taskId); // 从状态中删除任务
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // 设置当前任务
  setCurrentTask({ commit }, task) {
    commit('SET_CURRENT_TASK', task); // 设置当前任务
  }
};

const getters = {
  // 获取任务列表
  taskList: (state) => state.taskList,
  // 获取加载状态
  isLoading: (state) => state.isLoading,
  // 获取当前任务
  currentTask: (state) => state.currentTask
};

export default {
  namespaced: true, // 启用命名空间
  state,
  mutations,
  actions,
  getters
};