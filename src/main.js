// main.js - 项目入口文件
import Vue from 'vue'; // 引入 Vue
import App from './App.vue'; // 引入主应用组件
import uView from 'uview-ui'; // 引入 uView UI 组件库
import store from './store'; // 引入 Vuex 状态管理
import router from './router'; // 引入路由配置

// 引入全局样式
import '@/common/scss/index.scss';

// 使用 uView UI
Vue.use(uView);

// 设置全局配置
Vue.config.productionTip = false; // 关闭生产环境提示

// 初始化 Vue 实例
const app = new Vue({
  store, // 注入 Vuex 状态管理
  router, // 注入路由
  render: h => h(App) // 渲染主应用组件
});

// 挂载 Vue 实例
app.$mount();

// 初始化 UniApp 配置
uni.$u.config.unit = 'rpx'; // 设置单位
uni.$u.config.theme = { // 设置主题
  primary: '#2979ff', // 主色调
  success: '#19be6b', // 成功色调
  error: '#fa3534', // 错误色调
  warning: '#ff9900' // 警告色调
};

// 全局错误处理
Vue.config.errorHandler = (err, vm, info) => {
  console.error('全局错误:', err, info);
  uni.showToast({
    title: '发生错误，请稍后重试',
    icon: 'none'
  });
};

// 全局路由守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated']; // 获取认证状态
  if (to.meta.requiresAuth && !isAuthenticated) {
    // 如果路由需要认证且用户未登录，跳转到登录页
    next({ path: '/pages/login/LoginPage' });
  } else {
    next(); // 继续导航
  }
});

// 全局加载状态
Vue.prototype.$showLoading = (title = '加载中') => {
  uni.showLoading({ title, mask: true });
};

Vue.prototype.$hideLoading = () => {
  uni.hideLoading();
};

// 全局提示
Vue.prototype.$showToast = (title, icon = 'none') => {
  uni.showToast({ title, icon });
};