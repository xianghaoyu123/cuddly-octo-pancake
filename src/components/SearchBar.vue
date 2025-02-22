<template>
    <view class="page-body__search">
      <u-search placeholder="请输入关键字"></u-search>
    </view>
  </template>
  
  <script>
  export default {
    data() {
      return {
        keyword: ''
      };
    },
    methods: {
      handleSearch() {
        console.log('Searching for:', this.keyword);
      }
    }
  }
  </script>
  
  <style scoped>
  .page-body__search {
    padding: 20rpx;
    background-color: #fff;
  }
  </style>
  