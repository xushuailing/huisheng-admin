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
export default class TpShopData extends Mixins(mixins) {
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
          label: '曝光量：',
          prop: 'none1',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
        },
        {
          label: '入店转化率：',
          prop: 'none2',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
        },
        {
          label: '下单转化率：',
          prop: 'none3',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
        },
        {
          label: '复购率：',
          prop: 'none4',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
        },
        {
          label: '客单价：',
          prop: 'none5',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
        },
        {
          label: '顾客类型：',
          prop: 'none6',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
        },
        {
          label: '新顾客占比：',
          prop: 'none7',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
        },
        {
          label: '老顾客占比： ：',
          prop: 'none8',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
        },
        {
          label: '下单时间：',
          prop: 'none9',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
        },
      ],
    ],
  };
}
</script>
