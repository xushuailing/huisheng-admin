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
export default class TpMarketPostion extends Mixins(mixins) {
  config: ScForm.Edit = {
    width: '100%',
    'label-width': '85px',
    requestMethod: 'get',
    formAttr: { 'label-position': 'left' },
    handleSubmit: this.handleSubmit,
    data: [
      [
        {
          label: '同行优点：',
          prop: 'none1',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
          tag: { tagType: 'editor' },
        },
        {
          label: '营销方式：',
          prop: 'none2',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
          tag: { tagType: 'editor' },
        },
        {
          label: '本店差异：',
          prop: 'none3',
          default: '',
          handle: (data) => `${data}#${this.name}#`,
          tag: { tagType: 'editor' },
        },
      ],
    ],
  };
}
</script>
