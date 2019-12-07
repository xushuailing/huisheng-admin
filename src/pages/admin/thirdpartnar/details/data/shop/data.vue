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
export default class TpShopData extends Vue {
  @Prop({ type: [String, Number], required: true })
  id!: string;

  // TODO: 缺少接口
  api = this.$api.test.create;

  config: ScForm.Edit = {
    type: 'specialty',
    width: '100%',
    formAttr: { 'label-position': 'left', 'label-width': '100px' },
    data: [
      [
        {
          label: '曝光量：',
          prop: 'none1',
        },
        {
          label: '入店转化率：',
          prop: 'none2',
        },
        {
          label: '下单转化率：',
          prop: 'none3',
        },
        {
          label: '复购率：',
          prop: 'none4',
        },
        {
          label: '客单价：',
          prop: 'none5',
        },
        {
          label: '顾客类型：',
          prop: 'none6',
        },
        {
          label: '新顾客占比：',
          prop: 'none7',
        },
        {
          label: '老顾客占比： ：',
          prop: 'none8',
        },
        {
          label: '下单时间：',
          prop: 'none9',
          tag: { tagType: 'date-picker', attr: { type: 'datetime', placeholder: '请选择' } },
        },
      ],
    ],
  };
}
</script>
