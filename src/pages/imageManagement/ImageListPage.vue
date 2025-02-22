<template>
    <view class="gjdtxsphotomanagement-list page page-list">
      <u-navbar
        title="图像管理查询"
        :autoBack="true"
        :leftIcon="isTabbar == 1 ? '' : 'arrow-left'"
        safeAreaInsetTop
        placeholder
        :statusBarMode="device"
        :isWxMp="appMode === 2">
        <view
          class="navbar-action"
          slot="right"
          v-if="hasAdd == 1"
          @click="handleAdd">
          <u-icon
            name="plus-circle"
            size="18"
            :color="color"
            style="margin-right: 5rpx"></u-icon>
          添加
        </view>
      </u-navbar>
  
      <view class="page-body">
        <view class="page-body__search">
          <u-search placeholder="请输入关键字"></u-search>
        </view>
  
        <es-card
          class="page-body__list"
          :border="false"
          padding="20"
          margin="20rpx"
          v-for="(item, index) in list"
          :key="index"
          @click="handleDetail(item)">
          <view class="list-head" slot="head">
            <view class="list-head__title">
              <u-image
                class="avatar"
                shape="circle"
                width="35"
                height="35"
                :src="item.image"
                v-if="item.image">
              </u-image>
              {{ item.title }}
            </view>
          </view>
  
          <view class="list-body" slot="body">
            <view class="list-body__item">
              <view class="item-label">图像类型：</view>
              <view class="item-value">{{ item.photo_type }}</view>
            </view>
            <view class="list-body__item">
              <view class="item-label">图像来源：</view>
              <view class="item-value">{{ item.photo_source }}</view>
            </view>
            <view class="list-body__item">
              <view class="item-label">上传用户：</view>
              <view class="item-value">{{ item.upload_user }}</view>
            </view>
            <view class="list-body__item">
              <view class="item-label">图像描述：</view>
              <view class="item-value">{{ item.photo_description }}</view>
            </view>
          </view>
        </es-card>
      </view>
    </view>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  import { https } from '@/common/interface'
  import dayjs from '@/vendor/dayjs.min'
  import setting from '@/setting'
  
  const gjdtxsphotomanagementApi = {
    list: () => {
      return https({
        url: '/gjdtxsphotomanagement/index',
        method: 'GET'
      })
    }
  }
  
  export default {
    data() {
      return {
        isTabbar: 1,
        hasAdd: 0,
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
        gjdtxsphotomanagementApi.list(params).then(res => {
          uni.hideLoading()
          if (res.code === 0) {
            this.list = init ? res.data : [...this.list, ...res.data]
            this.more = this.list.length < res.count
          }
        })
      },
      handleAdd() {
        uni.navigateTo({ url: '/pages/main/gjdtxsphotomanagement/add' })
      },
      handleDetail(item) {
        uni.navigateTo({ url: `/pages/main/gjdtxsphotomanagement/detail?id=${item.id}` })
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
  .gjdtxsphotomanagement-list {
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
            display: flex;
            align-items: center;
            font-size: 28rpx;
            color: #333;
            font-weight: bold;
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
  