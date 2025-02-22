<template>
    <view class="login-index">
      <u-navbar
        title="账号登录"
        leftIcon=""
        :autoBack="true"
        :statusBarMode="device"
        :isWxMp="appMode === 2"
        safeAreaInsetTop
        placeholder>
      </u-navbar>
      <view class="app-name">{{title}}</view>
      <view class="login-index__login-card">
        <view class="login-form">
          <view class="login-form__item">
            <u-input
              type="text"
              placeholder="请输入账号"
              id="username"
              prefixIcon="account-fill"
              v-model="form.username"
              clearable
              border="none"
              :customStyle="{
                 height: '80rpx',
                 padding: '0 30rpx',
                 border: 'rgba(255,255,255, 0.6) solid 1px',
                 backgroundColor: 'rgba(243,243,243,1)',
                 borderRadius: '20rpx'
              }">
            </u-input>
          </view>
          <view class="login-form__item">
            <u-input
              id="password"
              type="password"
              placeholder="请输入密码"
              prefixIcon="lock-fill"
              suffixIcon="eye-off"
              v-model="form.password"
              border="none"
              :customStyle="{
                 height: '80rpx',
                 padding: '0 30rpx',
                 border: 'rgba(255,255,255, 0.6) solid 1px',
                 backgroundColor: 'rgba(243,243,243,1)',
                 borderRadius: '20rpx'
              }">
            </u-input>
          </view>
          <view class="login-form__item">
            <u-input
              type="text"
              placeholder="请输入验证码"
              prefixIcon="integral-fill"
              id="captcha"
              v-model="form.captcha"
              border="none"
              maxlength="4"
              :customStyle="{
                 height: '80rpx',
                 padding: '0 30rpx',
                 border: 'rgba(255,255,255, 0.6) solid 1px',
                 backgroundColor: 'rgba(243,243,243,1)',
                 borderRadius: '20rpx'
              }">
            </u-input>
            <u-image
              :src="captcha"
              style="margin-left: 10rpx"
              width="260rpx"
              height="80rpx"
              radius="20rpx"
              @click="getCaptcha">
            </u-image>
          </view>
          <view class="login-form__item">
            <view class="msg-box">
              <u-radio-group v-model="isAgree">
                <u-radio :name="true" shape="circle" :activeColor="color" inactiveColor="#cacaca">
                  <view class="agree-text">
                    同意<text>用户协议、隐私政策</text>和<text>用户发布规范协议</text>
                  </view>
                </u-radio>
              </u-radio-group>
            </view>
          </view>
        </view>
        <view
          id="login-btn"
          class="submit-btn" @click="handleSubmit">
          <view class="text-val">立即登录</view>
        </view>
      </view>
    </view>
  </template>
  
  <script>
  import { mapActions } from 'vuex'
  import { authApi } from '@/common'
  import setting from '@/setting'
  
  export default {
    data() {
      return {
        form: {
          username: '',
          password: '',
          captcha: '',
          key: '',
          remember: true
        },
        rules: {
          username: [{
            required: true,
            message: '请输入账号',
            trigger: ['blur']
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: ['blur']
          }],
          captcha: [{
            required: true,
            message: '请输入验证码',
            trigger: ['blur']
          }]
        },
        captcha: '',
        loading: false,
        isAgree: true,
        tips: '获取验证码'
      }
    },
    mounted() {
      this.getCaptcha()
    },
    methods: {
      ...mapActions([
        'GetUserInfo',
        'InitTabbar'
      ]),
      getCaptcha() {
        authApi.captcha().then(res => {
          this.captcha = res.data.captcha;
          this.form.key = res.data.key;
        })
      },
      handleLink(url) {
        uni.redirectTo({
          url
        })
      },
      handleSubmit() {
        if (!this.isAgree) {
          uni.showModal({
            title: '提示',
            content: '请先同意用户协议、隐私政策和用户发布规范协议',
            showCancel: false
          })
          return
        }
        this.loading = true
        authApi.login(this.form).then(res => {
          this.loading = false
          uni.setStorageSync('Authorization', res.data.access_token)
          this.GetUserInfo().then(() => {
            this.InitTabbar()
            uni.redirectTo({
              url: '/pages/index'
            })
          })
        })
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .login-index {
    position: relative;
    height: 100vh;
    padding: 30rpx;
    .app-name {
      margin-top: 100rpx;
      padding-bottom: 100rpx;
      text-align: center;
      font-size: 40rpx;
      font-weight: bold;
    }
    &__login-card {
      position: relative;
      padding: 30rpx;
      box-sizing: border-box;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      min-height: 800rpx;
      background-image: url("./image/icon-card.png");
      .login-form {
        margin-top: 30rpx;
        padding: 0rpx 30rpx;
        &__item {
          display: flex;
          margin-bottom: 60rpx;
          .msg-box {
            color: #333;
            font-size: 23rpx;
          }
        }
      }
      .submit-btn {
        transform: rotate(5deg);
        position: absolute;
        bottom: 30rpx;
        right: 20rpx;
        width: 220rpx;
        height: 100rpx;
        box-sizing: border-box;
        padding: 10rpx 20rpx;
        border-radius:  60rpx 40rpx 60rpx 40rpx;
        background-color: $u-primary;
        color: #FFFFFF;
        font-size: 30rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        .text-val {
          display: flex;
          transform: rotate(-5deg);
          letter-spacing: 5rpx;
        }
      }
    }
  }
  </style>
  