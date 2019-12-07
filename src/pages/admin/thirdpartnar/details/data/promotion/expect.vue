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
export default class TpPmExpect extends Vue {
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
          label: '推广周期：',
          prop: 'none1',
        },
        {
          label: '日预算：',
          prop: 'none2',
        },
        {
          label: '投入产出比：',
          prop: 'none3',
        },
        {
          label: '类型选择：',
          prop: 'none4',
          tag: { tagType: 'select', options: [] },
        },
        {
          label: '时间选择：',
          prop: 'none5',
          tag: { tagType: 'date-picker', attr: { type: 'datetime', placeholder: '请选择' } },
        },
        {
          label: '其他设置：',
          prop: 'none6',
        },
      ],
    ],
  };
}
</script>
