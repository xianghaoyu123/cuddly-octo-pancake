<template>
    <view class="page-body">
      <u-cell-group customStyle="background: #fff;margin-top: 20px">
        <u-cell title="图片:" :arrow="false">
          <es-upload name="image" v-model="form.image" :multiple="false" :maxCount="1" slot="right-icon"></es-upload>
        </u-cell>
        <u-cell title="图像名称:" :arrow="false" :value="form.title"></u-cell>
        <u-cell title="图像类型:" :arrow="false" :value="form.photo_type"></u-cell>
        <u-cell title="图像来源:" :arrow="false" :value="form.photo_source"></u-cell>
        <u-cell title="上传时间:" :arrow="false" :value="form.upload_date"></u-cell>
        <u-cell title="上传用户:" :arrow="false" :value="form.upload_user"></u-cell>
        <u-cell title="图像描述:" :arrow="false" :value="form.photo_description"></u-cell>
      </u-cell-group>
      <view class="action" v-if="hasEdit">
        <u-button type="primary" text="编辑" shape="circle" :customStyle="{ boxShadow: '4px 4px 10px 0px rgba(60, 156, 255, .2)' }" @click="handleEdit"></u-button>
      </view>
    </view>
  </template>
  
  <script>
  import { https } from '@/common/interface'
  import { commonApi } from '@/common'
  import dayjs from '@/vendor/dayjs.min'
  import setting from '@/setting';
  
  const gjdtxsphotomanagementApi = {
    detail: ({ id } = {}) => {
      return https({
        url: '/gjdtxsphotomanagement/info',
        method: 'GET',
        data: { id }
      })
    }
  }
  
  export default {
    data() {
      return {
        id: '',
        form: {
          image: '',
          title: '',
          photo_type: '',
          photo_source: '',
          upload_date: '',
          upload_user: '',
          photo_description: '',
        },
        isLoading: false,
        picList: [],
        appMode: setting.appMode,
        device: setting.device,
        hasEdit: 0
      }
    },
    filters: {
      formatTime: (val, format = 'YYYY-MM-DD HH:mm:ss') => {
        if (!val) return
        const res = dayjs.unix(val).format(format)
        if (val.length > 10) {
          return res == 'Invalid Date' ? val : res
        }
        return res == 'Invalid Date' ? val : res
      },
    },
    onLoad(option) {
      this.id = option.id
      this.init()
      this.isUpdate = true
    },
    methods: {
      init() {
        uni.showLoading({ title: '加载中' })
        gjdtxsphotomanagementApi.detail({ id: this.id }).then(res => {
          uni.hideLoading()
          this.form = Object.assign({}, res.data)
        })
      },
      handleEdit() {
        uni.navigateTo({ url: `/pages/main/gjdtxsphotomanagement/form?id=${this.id}` })
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .gjdtxsphotomanagement-form {
    overflow: hidden;
    .container {
      padding: 0 30rpx;
      margin-bottom: 180rpx;
      background-color: #fff;
    }
    .action {
      position: fixed;
      width: 100%;
      bottom: 0;
      padding: 40rpx 60rpx;
      box-sizing: border-box;
    }
    ::v-deep .u-form-item__body__left__content__label {
      padding-left: 15rpx;
    }
    ::v-deep .u-form-item__body__left__content__required {
      left: -5px;
    }
    ::v-deep .u-cell__body {
      align-items: flex-start;
    }
    ::v-deep .u-cell__body__content {
      flex: 1 0 auto;
      flex-shrink: 0;
      margin-right: 30rpx;
    }
  }
  </style>
  