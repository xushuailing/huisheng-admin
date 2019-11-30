<template>
  <div class='ads-sorts-detail bg-white p-15 border-radius-8'>
    <sc-add-form mode="page"
                 :api="api"
                 :config="addConfig">
    </sc-add-form>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import SortAdd from './components/ads-sorts-add.vue';
import { ScTable } from '@/lib/@types/sc-table.d';
import { ScForm } from '@/lib/@types/sc-form.d';
import { obj } from '@/lib/@types/sc-param.d';

@Component
export default class ActvAdsSortsDetail extends Vue {
  id: string = '';

  get api() {
    return this.$api.admin.activity.adsSorts.create;
  }

  // TODO: 缺少广告位名称、广告位介绍字段，一个广告位应对应多组分类
  addConfig: ScForm.Add = {
    'label-width': '140px',
    header: { title: '新增分类' },
    formAttr: { 'label-position': 'left' },
    data: [
      [
        {
          label: '广告位名称：',
          prop: 'title',
          tag: { attr: { placeholder: '请输入广告位名称' } },
        },
        {
          label: '介绍：',
          prop: 'none3',
          inline: false,
          tag: { attr: { type: 'textarea', rows: 6, placeholder: '请输入介绍' } },
        },
        {
          label: '',
          prop: 'sort',
          inline: false,
          tag: { tagType: 'component', components: SortAdd },
        },
      ],
    ],
    handleSubmit: (data) => {
      if (this.id) return { ...data, id: this.id };
      return data;
    },
  };

  created() {
    const id = this.$route.query.id as string;
    this.id = id;
    if (id) this.getDetails(id);
  }

  // TODO: 缺少详情接口
  getDetails(id: string) {
    this.$http.get(this.$api.admin.activity.adsSorts.show, { id }).then(({ data }: obj) => {
      console.log('res: ', data);
    });
  }
}
</script>
