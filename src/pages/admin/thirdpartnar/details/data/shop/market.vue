<template>
  <div class="border-radius-4">
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
export default class TpShopMarket extends Mixins(mixins) {
  config: ScForm.Edit = {
    width: '100%',
    'label-width': '85px',
    requestMethod: 'get',
    formAttr: { 'label-position': 'left' },
    handleSubmit: this.handleSubmit,
    data: [
      [
        {
          label: '目标人群：',
          prop: 'none1',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
          tag: { tagType: 'editor' },
        },
        {
          label: '位置状况：',
          prop: 'none2',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
          tag: { tagType: 'editor' },
        },
        {
          label: '竞争分析：',
          prop: 'none3',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
          tag: { tagType: 'editor' },
        },
        {
          label: '痛点分析：',
          prop: 'none4',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
          tag: { tagType: 'editor' },
        },
      ],
    ],
  };
}
</script>
