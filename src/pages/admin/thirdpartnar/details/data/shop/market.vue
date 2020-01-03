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
    handleSubmit: (data) => {
      console.log('data', data);
      return data;
    },
    data: [
      [
        {
          label: '目标人群：',
          prop: 'none1',
          tag: { tagType: 'editor', attr: { rows: 4 } },
        },
        {
          label: '位置状况：',
          prop: 'none2',
          tag: { tagType: 'editor' },
        },
        {
          label: '竞争分析：',
          prop: 'none3',
          tag: { tagType: 'editor' },
        },
        {
          label: '痛点分析：',
          prop: 'none4',
          tag: { tagType: 'editor' },
        },
      ],
    ],
  };
}
</script>
