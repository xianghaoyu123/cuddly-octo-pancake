<template>
    <view class="profile-index">
      <u-navbar
        title="个人信息"
        :autoBack="true"
        safeAreaInsetTop
        placeholder
        :statusBarMode="device"
        :isWxMp="appMode === 2">
      </u-navbar>
  
      <view class="profile-index__content">
        <view class="content-item">
          <view class="content-item__label">头像:</view>
          <view class="content-item__value">
            <view class="avatar-view">
              <u-avatar
                class="avatar-view__image"
                size="64"
                :src="avatarImage">
              </u-avatar>
              <view class="avatar-view__cover" @click="ChooseImage">
                <u-icon
                  name="camera-fill"
                  color="#ffffff"
                  size="24">
                </u-icon>
              </view>
            </view>
          </view>
        </view>
  
        <view class="content-item">
          <view class="content-item__label">姓名:</view>
          <view class="content-item__value">
            <u-input
              inputAlign="right"
              v-model="userInfo.realname"
              placeholder="请输入姓名"
              border="none"
              color="#999">
            </u-input>
          </view>
        </view>
  
        <view class="content-item">
          <view class="content-item__label">昵称:</view>
          <view class="content-item__value">
            <u-input
              inputAlign="right"
              v-model="userInfo.nickname"
              placeholder="请输入昵称"
              border="none"
              color="#999">
            </u-input>
          </view>
        </view>
  
        <view class="content-item">
          <view class="content-item__label">性别:</view>
          <view class="content-item__value">
            <u--input
              :value="userInfo.gender == 1 ? '男' : '女'"
              disabled
              disabledColor="#ffffff"
              placeholder="请选择性别"
              border="none"
              inputAlign="right"
              color="#999"
            ></u--input>
            <u-icon
              slot="right"
              name="arrow-right"
              color="#999"
            ></u-icon>
          </view>
        </view>
  
        <view class="content-item">
          <view class="content-item__label">手机号码:</view>
          <view class="content-item__value">
            <u-input
              inputAlign="right"
              v-model="userInfo.mobile"
              placeholder="输入手机号码"
              border="none"
              color="#999">
            </u-input>
          </view>
        </view>
  
        <view class="content-item">
          <view class="content-item__label">邮箱:</view>
          <view class="content-item__value">
            <u-input
              inputAlign="right"
              v-model="userInfo.email"
              placeholder="请输入邮箱"
              border="none"
              color="#999">
            </u-input>
          </view>
        </view>
      </view>
  
      <view class="btn-box">
        <u-button
          style="height: 80rpx;"
          type="primary"
          text="编辑"
          @click="handleEdit"></u-button>
      </view>
    </view>
  </template>
  
  <script>
  import dayjs from '@/vendor/dayjs.min'
  import { mapGetters, mapActions } from 'vuex'
  import { userApi } from "@/common";
  
  export default {
    computed: {
      ...mapGetters(['userInfo']),
      avatarImage() {
        let avatar = require(`@/static/avatar/1.jpg`)
        if (this.userInfo.avatar) {
          avatar = require(`@/static/avatar/${this.userInfo.avatar}.jpg`)
        }
        return avatar
      }
    },
    filters: {
      formatDate(val) {
        if (!val) return '未设置'
        return dayjs(val).unix().format('YYYY-MM-DD')
      }
    },
    onShow() {
      this.init()
    },
    methods: {
      ...mapActions(['GetUserInfo']),
      init() {
        uni.showLoading({
          title: '加载中'
        })
        this.GetUserInfo().then(res => {
          uni.hideLoading()
        })
      },
      handleEdit() {
        uni.showLoading({
          title: '修改中'
        })
        userApi.update(this.userInfo).then(res => {
          uni.hideLoading()
          if (res.code === 200) {
            uni.showToast({
              title: '提交成功',
              icon: 'success'
            })
            uni.navigateBack()
          }
        })
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .profile-index {
    &__content {
      .content-item {
        margin-top: 30rpx;
        padding: 30rpx;
        background-color: #FFFFFF;
        display: flex;
        align-items: center;
        &__label {
          flex-basis: 180rpx;
          font-size: 30rpx;
          color: #333333;
        }
        &__value {
          flex-grow: 1;
          display: flex;
          justify-content: flex-end;
          .avatar-view {
            position: relative;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 70px;
            height: 70px;
            border-radius: 50%;
            overflow: hidden;
            &__cover {
              display: flex;
              justify-content: center;
              align-items: center;
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, .3);
            }
          }
        }
      }
    }
  
    .btn-box {
      padding: 0rpx 30rpx;
      margin-top: 30rpx;
    }
  }
  </style>
  