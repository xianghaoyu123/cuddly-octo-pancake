<template>
    <view class="questions-index">
      <u-navbar
        :title="title"
        leftIcon="arrow-left"
        safeAreaInsetTop
        autoBack
        :statusBarMode="device"
      />
    </view>
  </template>
  
  <script>
  export default {
    data() {
      return {
        title: '自定义标题',
        device: 'auto'
      };
    },
    mounted() {
      // 初始化处理
    }
  };
  </script>
  
  <style scoped>
  .questions-index {
    padding: 20px;
  }
  </style>
  