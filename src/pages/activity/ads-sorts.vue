<template>
  <div class='ads-sorts'>
    <sc-min-table stripe
                  ref="table"
                  :columns-type="['index']"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  :columns-props="{align:'center'}"
                  :table-config="tableConfig"
                  :search-config="searchConfig"
                  @table-emitTableHandlerClick="onTableHandlerClick">
    </sc-min-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import SortAdd from './components/ads-sorts-add.vue';
import { ScTable } from '../../lib/@types/sc-table.d';
import { ScForm } from '../../lib/@types/sc-form.d';
import { obj } from '@/lib/@types/sc-param.d';

@Component
export default class ActvAdsSorts extends Vue {
  columns: ScTable.Columns = [
    { label: '广告类型', prop: 'type' },
    { label: '名称', prop: 'name' },
    { label: '价位', prop: 'none1' },
    { label: '有效期', prop: 'none2' },
    {
      label: '创建时间',
      prop: 'createdAt',
      formater: (row, col) => this.$utils._FormatDate(row[col.prop]),
    },
  ];

  columnsHandler: ScTable.ColumnsHandler = ['detail'];

  tableConfig: ScTable.TableConfig = {
    api: this.$api.merchant.inject,
    breadcrumbButtons: [],
  };

  searchConfig: ScTable.Search = {
    data: [
      {
        label: '广告类型：',
        prop: 'type',
        tag: {
          tagType: 'select',
          options: [],
          attr: { placeholder: '请选择广告类型' },
        },
      },
      {
        label: '创建时间：',
        prop: 'createdAt',
        tag: {
          tagType: 'date-picker',
          attr: { type: 'datetime', placeholder: '请选择申请时间' },
        },
      },
    ],
  };

  addConfig: ScForm.Add = {
    type: 'plain',
    'label-width': '140px',
    formAttr: { 'label-position': 'left' },
    data: [
      [
        {
          label: '请输入广告位名称：',
          prop: 'none1',
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
          prop: 'none4',
          inline: false,
          tag: { tagType: 'component', components: SortAdd },
        },
      ],
    ],
  };

  onTableHandlerClick({ row, type }: { row: obj; type: string }) {
    if (type === 'detail') {
      console.log('%c查看', 'color:#40b883;font-weight:bold');
    }
  }
}
</script>
