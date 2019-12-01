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
export default class TpPmData extends Vue {
  @Prop({ type: [String, Number], required: true })
  id!: string;

  api = this.$api.platform.create;

  config: ScForm.Edit = {
    type: 'senior',
    width: '100%',
    formAttr: { 'label-position': 'left', 'label-width': '140px' },
    data: [
      [
        {
          label: '当前周曝光：',
          prop: 'none1',
        },
        {
          label: '当前周订单量：',
          prop: 'none2',
        },
        {
          label: '当前复购率：',
          prop: 'none3',
        },
        {
          label: '实收客单价：',
          prop: 'none4',
        },
        {
          label: '当前周入店转化率：',
          prop: 'none5',
        },
        {
          label: '当前周下单转化率：',
          prop: 'none6',
        },
      ],
    ],
  };
}
</script>
