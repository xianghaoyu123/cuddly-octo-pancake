<template>
    <view id="app">
      <u-navbar
        title="欢迎使用"
        leftIcon="arrow-left"
        :autoBack="true"
        safeAreaInsetTop
        :statusBarMode="device"
      />
      <view class="content">
        <router-view></router-view>
      </view>
    </view>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  import setting from '@/setting'
  
  export default {
    data() {
      return {
        device: setting.device
      }
    },
    computed: {
      ...mapGetters(['tabbarlist'])
    }
  }
  </script>
  
  <style lang="scss" scoped>
  #app {
    background-color: #f7f7f7;
    font-family: 'Helvetica', 'Arial', sans-serif;
  }
  
  .content {
    padding: 20rpx;
    background-color: #fff;
    margin-top: 20rpx;
    border-radius: 10rpx;
  }
  </style>
  