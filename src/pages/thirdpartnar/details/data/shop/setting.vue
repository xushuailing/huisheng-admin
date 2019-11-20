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
export default class TpShopSetting extends Vue {
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
          label: '店铺评分：',
          prop: 'none1',
        },
        {
          label: '营业时间：',
          prop: 'none2',
          tag: { tagType: 'date-picker', attr: { type: 'datetime', placeholder: '请选择' } },
        },
        {
          label: '配送方式：',
          prop: 'none3',
        },
        {
          label: '到店自取：',
          prop: 'none4',
          tag: { tagType: 'select', options: [] },
        },
        {
          label: '急速退货：',
          prop: 'none5',
          tag: { tagType: 'select', options: [] },
        },
        {
          label: '店铺名称：',
          prop: 'none6',
        },
        {
          label: '经营品类：',
          prop: 'none7',
          tag: { tagType: 'select', options: [] },
        },
        {
          label: '接单方式：',
          prop: 'none8',
          tag: { tagType: 'select', options: [] },
        },
        {
          label: '专场海报：',
          prop: 'none9',
          tag: { tagType: 'select', options: [] },
        },
        {
          label: '产品图片：',
          prop: 'none10',
          tag: { tagType: 'select', options: [] },
        },
        {
          label: '规格属性：',
          prop: 'none11',
          tag: { tagType: 'select', options: [] },
        },
        {
          label: '店铺公告：',
          prop: 'none12',
          tag: { tagType: 'select', options: [] },
        },
        {
          label: '套餐设计：',
          prop: 'none13',
          tag: { tagType: 'select', options: [] },
        },
        {
          label: '引流爆款：',
          prop: 'none14',
          tag: { tagType: 'select', options: [] },
        },
      ],
    ],
  };
}
</script>
