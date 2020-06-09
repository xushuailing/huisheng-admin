<template>
  <div class='ads-sorts-detail bg-white p-15 border-radius-8'>
    <sc-edit v-if="id"
             mode="page"
             :api="api"
             :config="editConfig">
    </sc-edit>
    <sc-add-form v-else
                 mode="page"
                 :api="api"
                 :config="editConfig"
                 @emitAddComplete="onAddComplete">
    </sc-add-form>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { ScForm } from '@/lib/@types/sc-form.d';
import { obj } from '@/lib/@types/sc-param.d';
import SortAdd from './components/ads-sorts-add.vue';

@Component
export default class ActvAdsSortsDetail extends Vue {
  id: string = '';

  sortAddValidate!: () => boolean;

  get api() {
    return this.$api.admin.activity.adsSorts.create;
  }

  editConfig: ScForm.Edit = {
    'label-width': '140px',
    header: { title: '新增分类' },
    formAttr: { 'label-position': 'left' },
    data: [
      [
        {
          label: '广告位名称：',
          prop: 'title',
          default: '',
          tag: { attr: { placeholder: '请输入广告位名称' } },
        },
        {
          label: '介绍：',
          prop: 'introduction',
          inline: false,
          default: '',
          tag: { attr: { type: 'textarea', rows: 6, placeholder: '请输入介绍' } },
        },
        {
          label: '',
          prop: 'banner_list',
          inline: false,
          default: [],
          tag: {
            tagType: 'component',
            components: SortAdd,
            listeners: {
              emitValidate: this.getSortAddThis,
            },
          },
        },
      ],
    ],
    handleSubmit: this.onSubmit,
  };

  created() {
    const id = this.$route.query.id as string;
    if (id) this.getDetails(id);
  }

  onSubmit(data: any) {
    if (this.sortAddValidate()) {
      if (this.id) return { ...data, id: this.id };
      return data;
    }
    return false;
  }

  onAddComplete({ status }: { status: boolean }) {
    if (status) {
      this.$router.back();
    }
  }

  getSortAddThis(validate: () => boolean) {
    this.sortAddValidate = validate;
  }

  getDetails(id: string) {
    this.id = id;

    this.$http.get(this.$api.admin.activity.adsSorts.show, { id }).then(({ data }: obj) => {
      for (let i = 0; i < this.editConfig.data.length; i++) {
        const item = this.editConfig.data[i];
        for (let index = 0; index < item.length; index++) {
          const e = item[index];
          if (data[e.prop]) {
            this.$set(e, 'default', data[e.prop]);
          }
        }
      }
    });
  }
}
</script>
