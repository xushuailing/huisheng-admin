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
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScForm } from '@/lib/@types/sc-form.d';
import { obj } from '@/lib/@types/sc-param.d';

@Component
export default class TpShopMarket extends Vue {
  // @Prop({ type: [String, Number], required: true })
  // id!: string;

  // TODO: 缺少接口
  api = this.$api.test.create;

  config: ScForm.Edit = {
    width: '100%',
    'label-width': '85px',
    formAttr: { 'label-position': 'left' },
    data: [
      [
        {
          label: '目标人群：',
          prop: 'none1',
          tag: { attr: { type: 'textarea', rows: 4 } },
        },
        {
          label: '位置状况：',
          prop: 'none2',
          tag: { attr: { type: 'textarea', rows: 4 } },
        },
        {
          label: '竞争分析：',
          prop: 'none3',
          tag: { attr: { type: 'textarea', rows: 4 } },
        },
        {
          label: '痛点分析：',
          prop: 'none4',
          tag: { attr: { type: 'textarea', rows: 4 } },
        },
      ],
    ],
  };
}
</script>
