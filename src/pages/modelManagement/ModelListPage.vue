<template>
    <view class="gjdtxsrecognitionmodelmanagement-list page page-list">
      <u-navbar
        title="识别模型查询"
        :autoBack="true"
        :leftIcon="isTabbar == 1 ? '' : 'arrow-left'"
        safeAreaInsetTop
        placeholder
        :statusBarMode="device"
        :isWxMp="appMode === 2">
        <view class="navbar-action" slot="right" v-if="hasAdd == 1" @click="handleAdd">
          <u-icon name="plus-circle" size="18" :color="color" style="margin-right: 5rpx"></u-icon>
          添加
        </view>
      </u-navbar>
  
      <view class="page-body">
        <view class="page-body__search">
          <u-search placeholder="请输入关键字"></u-search>
        </view>
  
        <es-card class="page-body__list" :border="false" padding="20" margin="20rpx" v-for="(item, index) in list" :key="index" @click="handleDetail(item)">
          <view class="list-head" slot="head">
            <view class="list-head__title">
              <u-image class="avatar" shape="circle" width="35" height="35" :src="item.image" v-if="item.image"></u-image>
              {{ item.title }}
            </view>
          </view>
  
          <view class="list-body" slot="body">
            <view class="list-body__item">
              <view class="item-label">模型版本：</view>
              <view class="item-value">{{ item.model_version }}</view>
            </view>
            <view class="list-body__item">
              <view class="item-label">模型类型：</view>
              <view class="item-value">{{ item.model_type }}</view>
            </view>
            <view class="list-body__item">
              <view class="item-label">训练数据集：</view>
              <view class="item-value">{{ item.training_dataset }}</view>
            </view>
            <view class="list-body__item">
              <view class="item-label">模型精度：</view>
              <view class="item-value">{{ item.model_accuracy }}</view>
            </view>
            <view class="list-body__item">
              <view class="item-label">模型状态：</view>
              <view class="item-value">{{ item.model_status }}</view>
            </view>
          </view>
        </es-card>
      </view>
    </view>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  import { https } from '@/common/interface'
  import setting from '@/setting';
  
  const gjdtxsrecognitionmodelmanagementApi = {
    list: () => {
      return https({
        url: '/gjdtxsrecognitionmodelmanagement/index',
        method: 'GET'
      })
    }
  }
  
  export default {
    data() {
      return {
        id: '',
        list: [],
        pages: {
          page: 1,
          limit: 5
        },
        more: true,
        appMode: setting.appMode,
        device: setting.device,
        color: setting.color
      }
    },
    computed: {
      ...mapGetters(['tabbarlist'])
    },
    methods: {
      getList(init) {
        if (init) {
          this.pages = { page: 1, limit: 5 }
        }
        let params = { ...this.pages }
        uni.showLoading({ title: '加载中' })
        gjdtxsrecognitionmodelmanagementApi.list(params).then(res => {
          uni.hideLoading()
          if (res.code === 0) {
            this.list = init ? res.data : [...this.list, ...res.data]
            this.more = this.list.length < res.count
          }
        })
      },
      handleAdd() {
        uni.navigateTo({ url: '/pages/main/gjdtxsrecognitionmodelmanagement/add' })
      },
      handleDetail(item) {
        uni.navigateTo({ url: `/pages/main/gjdtxsrecognitionmodelmanagement/detail?id=${item.id}` })
      }
    },
    onLoad() {
      this.getList(true)
    },
    onPullDownRefresh() {
      this.getList(true)
    },
    onReachBottom() {
      if (!this.more) return
      this.pages.page += 1
      this.getList(false)
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .gjdtxsrecognitionmodelmanagement-list {
    .navbar-action {
      display: flex;
      align-items: center;
      font-size: 28rpx;
    }
    .page-body {
      &__search {
        padding: 20rpx;
        background-color: #fff;
      }
      &__list {
        .list-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          &__title {
            font-size: 28rpx;
            font-weight: bold;
            color: #333;
          }
        }
        .list-body {
          &__item {
            display: flex;
            line-height: 48rpx;
            font-size: 28rpx;
            .item-label {
              width: 100px;
              color: #999;
            }
            .item-value {
              flex: 1;
              color: #333;
            }
          }
        }
      }
    }
  }
  </style>
  