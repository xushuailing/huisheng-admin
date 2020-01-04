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
  @Prop({ type: String, required: true })
  detail!: string;

  @Prop({ type: String, required: true })
  name!: string;

  // TODO: 缺少接口
  api = this.$api.admin.thirdpartnar.shops.update;

  get form() {
    if (this.detail) {
      return JSON.parse(this.detail);
    }
    return {};
  }

  get val() {
    return this.form[this.name];
  }

  config: ScForm.Edit = {
    width: '100%',
    'label-width': '85px',
    requestMethod: 'get',
    formAttr: { 'label-position': 'left' },
    handleSubmit: (data) => {
      let value = '';
      Object.keys(data).forEach((item) => {
        if (item === 'id') return;
        value += data[item];
      });
      return { id: this.form.id, [this.name]: value };
    },
    data: [
      [
        {
          label: '目标人群：',
          prop: 'none1',
          handle: (data) => `${data}#${this.name}#`,
          tag: { tagType: 'editor', attr: { rows: 4 } },
        },
        {
          label: '位置状况：',
          prop: 'none2',
          handle: (data) => `${data}#${this.name}#`,
          tag: { tagType: 'editor' },
        },
        {
          label: '竞争分析：',
          prop: 'none3',
          handle: (data) => `${data}#${this.name}#`,
          tag: { tagType: 'editor' },
        },
        {
          label: '痛点分析：',
          prop: 'none4',
          handle: (data) => `${data}#${this.name}#`,
          tag: { tagType: 'editor' },
        },
      ],
    ],
  };
}
</script>
