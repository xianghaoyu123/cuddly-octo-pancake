<template>
    <view class="gjdtxstaskmanagement-list page page-list">
      <u-navbar
        title="任务管理查询"
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
  
        <view class="page-body__list">
          <view v-for="(item, index) in list" :key="index" class="content-item es-card" @click="handleDetail(item)">
            <view class="content-item__image" v-if="item.image">
              <u-image width="120rpx" height="120rpx" :src="item.image"></u-image>
            </view>
            <view class="content-item__info">
              <view class="info-header">
                <view class="title">{{item.title}}</view>
                <view class="status" v-if="item.status"></view>
              </view>
              <view class="info-content">
                <view class="content-flex">
                  <view class="label">任务类型：</view>
                  <view class="value">{{item.task_type}}</view>
                </view>
                <view class="content-flex">
                  <view class="label">任务状态：</view>
                  <view class="value">{{item.task_status}}</view>
                </view>
                <view class="content-flex">
                  <view class="label">指派人员：</view>
                  <view class="value">{{item.assigned_person}}</view>
                </view>
                <view class="content-flex">
                  <view class="label">相关图像数量：</view>
                  <view class="value">{{item.related_photo_count}}</view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
  
      <es-tabbar v-if="isTabbar == 1" current="/pages/main/gjdtxstaskmanagement/list" :list="tabbarlist"></es-tabbar>
    </view>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  import { https } from '@/common/interface'
  import dayjs from '@/vendor/dayjs.min'
  import setting from '@/setting';
  
  const gjdtxstaskmanagementApi = {
    list: () => {
      return https({
        url: '/gjdtxstaskmanagement/index',
        method: 'GET'
      })
    }
  }
  
  export default {
    data() {
      return {
        id: '',
        isTabbar: 0,
        hasAdd: 0,
        currentTab: 0,
        lineColor: setting.color,
        columns: [
          { label: "任务名称", name: "title" },
          { label: "任务类型", name: "task_type" },
          { label: "完成时间", name: "complete_t" },
          { label: "任务状态", name: "task_status" },
          { label: "指派人员", name: "assigned_person" },
          { label: "相关图像数量", name: "related_photo_count" },
        ],
        isUpdate: false,
        isLoading: false,
        approval_time_show: false,
        list: [],
        pages: {
          page: 1,
          limit: 5
        },
        more: true,
        appMode: setting.appMode,
        device: setting.device
      }
    },
    computed: {
      ...mapGetters(['tabbarlist'])
    },
    filters: {
      formatTime: (val, format = 'YYYY年MM月DD日') => {
        if (!val) return
        let res = dayjs.unix(val).format(format)
        if (val.length > 10) {
          res = dayjs(val).format(format)
        }
        return res == 'Invalid Date' ? val : res
      }
    },
    onLoad() {
      this.getList(true)
    },
    methods: {
      getList(init) {
        if (init) {
          this.pages = { page: 1, limit: 5 }
        }
        let params = { keyword: this.keyword, ...this.pages }
        uni.showLoading({ title: '加载中' })
        gjdtxstaskmanagementApi.list(params).then(res => {
          uni.hideLoading()
          uni.stopPullDownRefresh()
          if (res.code === 0) {
            if (this.list.length + res.data.length === res.count) {
              this.more = false
            }
            this.list = init ? res.data : this.list.concat(res.data)
          }
        })
      },
      handleAdd() {
        uni.navigateTo({ url: '/pages/main/gjdtxstaskmanagement/add' })
      },
      handleDetail(item) {
        uni.navigateTo({ url: `/pages/main/gjdtxstaskmanagement/detail?id=${item.id}` })
      }
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
  .gjdtxstaskmanagement-list {
    overflow: hidden;
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
          &__time {
            color: #999999;
            font-size: 22rpx;
          }
        }
        .list-body {
          &__item {
            display: flex;
            line-height: 48rpx;
            font-size: 28rpx;
            .item-label {
              width: 100px;
              color: #999999;
            }
            .item-value {
              flex: 1;
              flex-shrink: 1;
              color: #333;
            }
          }
        }
        .list-foot {
          color: $u-primary;
          text-align: right;
        }
      }
    }
  }
  </style>
  