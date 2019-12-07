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
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScForm } from '@/lib/@types/sc-form.d';
import { obj } from '@/lib/@types/sc-param.d';

@Component
export default class TpShopPlan extends Vue {
  @Prop({ type: [String, Number], required: true })
  id!: string;

  // TODO: 缺少接口
  api = this.$api.test.create;

  config: ScForm.Edit = {
    type: 'specialty',
    width: '100%',
    formAttr: { 'label-position': 'left', 'label-width': '85px' },
    data: [
      [
        {
          label: '产品定价：',
          prop: 'none1',
        },
        {
          label: '店铺拉新：',
          prop: 'none2',
        },
        {
          label: '老客维护：',
          prop: 'none3',
        },
        {
          label: '精准营销：',
          prop: 'none4',
        },
        {
          label: '平台活动：',
          prop: 'none5',
        },
        {
          label: '引流爆款：',
          prop: 'none6',
        },
        {
          label: '活动方式：',
          prop: 'none7',
          isFull: true,
          tag: { attr: { type: 'textarea', rows: 4 } },
        },
      ],
    ],
  };
}
</script>
