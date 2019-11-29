<template>
  <div class='ads-sorts'>
    <sc-min-table stripe
                  ref="table"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  :table-config="tableConfig"
                  :search-config="searchConfig"
                  :form-add-config="addConfig"
                  @table-emitTableHandlerClick="onTableHandlerClick">
    </sc-min-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import SortAdd from './components/ads-sorts-add.vue';
import { ScTable } from '@/lib/@types/sc-table.d';
import { ScForm } from '@/lib/@types/sc-form.d';
import { obj } from '@/lib/@types/sc-param.d';

export const ADS_TYPE: obj = {
  0: '广告',
  1: '活动',
};

@Component
export default class ActvAdsSorts extends Vue {
  columns: ScTable.Columns = [
    {
      label: '广告类型',
      prop: 'type',
      formater: (row, col) => ADS_TYPE[row[col.prop]] || '',
    },
    { label: '名称', prop: 'title' },
    {
      label: '价位',
      prop: 'price',
      formater: (row, col) => (row[col.prop] ? `￥ ${row[col.prop]}` : ''),
    },
    { label: '有效期', prop: 'none2' },
    { label: '创建时间', prop: 'createtime' },
  ];

  columnsHandler: ScTable.ColumnsHandler = ['look'];

  tableConfig: ScTable.TableConfig = {
    api: this.$api.admin.activity.adsSorts,
    breadcrumbButtons: ['add'],
  };

  searchConfig: ScTable.Search = {
    data: [
      {
        label: '广告类型：',
        prop: 'type',
        tag: {
          tagType: 'select',
          options: Object.keys(ADS_TYPE).map((k) => ({ label: ADS_TYPE[k], value: k })),
          attr: { placeholder: '请选择广告类型' },
        },
      },
      {
        label: '创建时间：',
        prop: 'createtime',
        tag: {
          tagType: 'date-picker',
          attr: { type: 'datetime', placeholder: '请选择创建时间' },
        },
      },
    ],
  };

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

  onTableHandlerClick({ row, type }: { row: obj; type: string }) {
    if (type === 'detail') {
      console.log('%c查看', 'color:#40b883;font-weight:bold');
      this.getDetails(row.id);
    }
  }

  getDetails(id: string) {
    this.$http.get(this.$api.admin.activity.adsSorts.show, { id }).then(({ data }: obj) => {
      console.log('res: ', data);
    });
  }
}
</script>
