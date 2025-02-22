import Vue from 'vue'
import App from './App.vue'
import store from './store'  // 引入 Vuex 状态管理
import router from './router'  // 引入路由配置
import uView from 'uview-ui'  // 引入 uView UI 库
import 'uview-ui/theme.css'  // 引入 uView UI 样式

Vue.config.productionTip = false  // 关闭生产模式下的提示

// 使用 uView UI 库
Vue.use(uView)

// 创建 Vue 实例并挂载到 #app 元素
new Vue({
  render: h => h(App),
  store,  // 使用 Vuex 状态管理
  router  // 使用 Vue Router
}).$mount('#app')
