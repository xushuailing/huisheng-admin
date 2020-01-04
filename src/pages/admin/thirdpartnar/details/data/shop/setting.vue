<template>
  <div class="bg-white p-20 border-radius-4">
    <sc-edit ref="scEdit"
             mode="page"
             :api="api"
             :config="config">
      <template slot="edit-header">
        <span></span>
      </template>
    </sc-edit>
  </div>
</template>
<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { ScForm } from '@/lib/@types/sc-form.d';
import mixins from './mixins';

@Component
export default class TpShopSetting extends Mixins(mixins) {
  config: ScForm.Edit = {
    width: '100%',
    'label-width': '85px',
    formAttr: { 'label-position': 'left' },
    requestMethod: 'get',
    handleSubmit: this.handleSubmit,
    type: 'specialty',
    data: [
      [
        {
          label: '店铺评分：',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
          prop: 'none1',
        },
        {
          label: '营业时间：',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
          prop: 'none2',
        },
        {
          label: '配送方式：',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
          prop: 'none3',
        },
        {
          label: '到店自取：',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
          prop: 'none4',
        },
        {
          label: '急速退货：',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
          prop: 'none5',
        },
        {
          label: '店铺名称：',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
          prop: 'none6',
        },
        {
          label: '经营品类：',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
          prop: 'none7',
        },
        {
          label: '接单方式：',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
          prop: 'none8',
        },
        {
          label: '专场海报：',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
          prop: 'none9',
        },
        {
          label: '产品图片：',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
          prop: 'none10',
        },
        {
          label: '规格属性：',

          default: '',
          handle: (data) => `${data}#${this.name}#`,
          prop: 'none11',
        },
        {
          label: '店铺公告：',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
          prop: 'none12',
        },
        {
          label: '套餐设计：',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
          prop: 'none13',
        },
        {
          label: '引流爆款：',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
          prop: 'none14',
        },
      ],
    ],
  };
}
</script>
