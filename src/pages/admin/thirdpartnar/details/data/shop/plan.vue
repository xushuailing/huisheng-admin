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
export default class TpShopPlan extends Mixins(mixins) {
  config: ScForm.Edit = {
    width: '100%',
    'label-width': '85px',
    type: 'specialty',
    formAttr: { 'label-position': 'left' },
    requestMethod: 'get',
    handleSubmit: this.handleSubmit,
    data: [
      [
        {
          label: '产品定价：',
          prop: 'none1',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
        },
        {
          label: '店铺拉新：',
          prop: 'none2',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
        },
        {
          label: '老客维护：',
          prop: 'none3',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
        },
        {
          label: '精准营销：',
          prop: 'none4',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
        },
        {
          label: '平台活动：',
          prop: 'none5',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
        },
        {
          label: '引流爆款：',
          prop: 'none6',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
        },
        {
          label: '活动方式：',
          prop: 'none7',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
          isFull: true,
          tag: { attr: { type: 'textarea', rows: 4 } },
        },
      ],
    ],
  };
}
</script>
