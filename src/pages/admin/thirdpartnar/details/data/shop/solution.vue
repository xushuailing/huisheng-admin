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
export default class TpShopSolution extends Mixins(mixins) {
  config: ScForm.Edit = {
    width: '100%',
    'label-width': '85px',
    formAttr: { 'label-position': 'left' },
    requestMethod: 'get',
    handleSubmit: this.handleSubmit,
    data: [
      [
        {
          label: '市场分析：',
          prop: 'none1',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
          tag: { tagType: 'editor' },
        },
        {
          label: '优秀同行：',
          prop: 'none2',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
          tag: { tagType: 'editor' },
        },
        {
          label: '基础设置：',
          prop: 'none3',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
          tag: { tagType: 'editor' },
        },
        {
          label: '数据分析：',
          prop: 'none4',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
          tag: { tagType: 'editor' },
        },
        {
          label: '营销策划：',
          prop: 'none5',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
          tag: { tagType: 'editor' },
        },
      ],
    ],
  };
}
</script>
