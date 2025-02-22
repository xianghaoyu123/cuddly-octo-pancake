<template>
    <view class="gjdtxsrecognitionmodelmanagement-form page page-detail">
      <u-navbar
        title="识别模型"
        :autoBack="true"
        safeAreaInsetTop
        placeholder
        :statusBarMode="device"
        :isWxMp="appMode === 2">
      </u-navbar>
  
      <u-cell-group customStyle="background: #fff;margin-top: 20px">
        <u-cell title="模型名称:" :arrow="false" :value="form.title"></u-cell>
        <u-cell title="模型版本:" :arrow="false" :value="form.model_version"></u-cell>
        <u-cell title="模型类型:" :arrow="false" :value="form.model_type"></u-cell>
        <u-cell title="训练数据集:" :arrow="false" :value="form.training_dataset"></u-cell>
        <u-cell title="模型精度:" :arrow="false" :value="form.model_accuracy"></u-cell>
        <u-cell title="模型状态:" :arrow="false" :value="form.model_status"></u-cell>
        <u-cell title="发布日期:" :arrow="false" :value="form.publish_date"></u-cell>
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
  
  const gjdtxsrecognitionmodelmanagementApi = {
    detail: ({ id } = {}) => {
      return https({
        url: '/gjdtxsrecognitionmodelmanagement/info',
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
          title: '',
          model_version: '',
          model_type: '',
          training_dataset: '',
          model_accuracy: '',
          model_status: '',
          publish_date: '',
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
        gjdtxsrecognitionmodelmanagementApi.detail({ id: this.id }).then(res => {
          uni.hideLoading()
          this.form = Object.assign({}, res.data)
        })
      },
      handleEdit() {
        uni.navigateTo({ url: `/pages/main/gjdtxsrecognitionmodelmanagement/form?id=${this.id}` })
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .gjdtxsrecognitionmodelmanagement-form {
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
  