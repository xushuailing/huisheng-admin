<template>
  <div class='ads-sorts-detail bg-white p-15 border-r'>
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
  get api() {
    return this.$api.admin.activity.adsSorts.create;
  }

  addConfig: ScForm.Add = {
    'label-width': '140px',
    header: { title: '新增分类' },
    formAttr: { 'label-position': 'left' },
    data: [
      [
        {
          label: '请输入广告位名称：',
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
  };

  mounted() {
    const { id } = this.$route.query;

    if (id) this.getDetails(id as string);
  }

  getDetails(id: string) {
    this.$http.get(this.$api.admin.activity.adsSorts.show, { id }).then(({ data }: obj) => {
      console.log('res: ', data);
    });
  }
}
</script>
