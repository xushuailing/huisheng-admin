<template>
  <div class='admin-rootName bg-white p-15'>
    <div class="p-20">
      <sc-add-form mode="page"
                   api="http://baidu.com"
                   :config="config1">
      </sc-add-form>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class ShopBaseInfo extends Vue {
  /** 店铺管理 >信息修改 */
  config1 = {
    buttons: [
      {
        mode: 'submit',
        text: '上传审核',
      },
    ],
    data: [
      [
        {
          label: '掌柜名称',
          prop: 'none1',
          tag: {
            attr: { placeholder: '请输入掌柜名称' },
          },
        },
        {
          label: '店铺标志',
          prop: 'none12',
          tag: {
            tagType: 'upload-img',
            attr: { limit: 1 },
          },
        },
        {
          label: '服务号码',
          prop: 'none2',
          tag: {
            attr: { placeholder: '请输入手机号', type: 'number' },
          },
        },
        {
          label: '开店时间',
          tag: {
            tagType: 'date-picker',
            attr: { placeholder: '请选择开店时间', type: 'datetime' },
          },
        },
        {
          label: '营业时间',
          prop: 'none21',
          tag: {
            tagType: 'time-picker',
            attr: { 'start-placeholder': '营业开始时间', 'end-placeholder': '营业结束时间', 'is-range': true },
          },
        },
        {
          label: '经营品类',
          prop: 'none222',
          tag: {
            attr: { placeholder: '请输入手机号', type: 'number' },
          },
        },
        {
          label: '配送方式',
          prop: 'none1222',
          tag: {
            attr: { placeholder: '请输入手机号', type: 'number' },
          },
        },
        {
          label: '营业执照',
          prop: 'none2222',
          tag: {
            tagType: 'upload-img',
            attr: { limit: 1 },
          },
        },
        {
          label: '身份证',
          prop: 'id',
          tag: {
            tagType: 'upload-img',
            attr: { limit: 2 },
          },
        },
      ],
    ],
  };
}
</script>
