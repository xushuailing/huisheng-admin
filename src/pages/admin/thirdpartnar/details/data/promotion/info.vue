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

@Component
export default class TpPmInfo extends Vue {
  @Prop({ type: [String, Number], required: true })
  id!: string;

  api = this.$api.platform.create;

  config: ScForm.Edit = {
    type: 'specialty',
    width: '100%',
    formAttr: { 'label-position': 'left', 'label-width': '85px' },
    data: [
      [
        {
          label: '店铺名称：',
          prop: 'none1',
          tag: { attr: { placeholder: '某某某店铺' } },
        },
        {
          label: '日期：',
          prop: 'none2',
          tag: { tagType: 'date-picker', attr: { type: 'date', placeholder: '请选择' } },
        },
        {
          label: '品类：',
          prop: 'none3',
        },
        {
          label: '平台：',
          prop: 'none4',
        },
        {
          label: '月销量：',
          prop: 'none5',
        },
        {
          label: '当前评分：',
          prop: 'none6',
        },
      ],
    ],
  };
}
</script>
