<template>
  <div class='famous-list'>
    <sc-min-table stripe
                  ref="table"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  :columns-props="{align:'center'}"
                  :table-config="tableConfig"
                  :search-config="searchConfig">
    </sc-min-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import GoodsInfo from './components/img-name';
import { ScTable } from '../../lib/@types/sc-table.d';
import { ScForm } from '../../lib/@types/sc-form.d';
import { obj } from '@/lib/@types/sc-param.d';

@Component
export default class ActvFamous extends Vue {
  columns: ScTable.Columns = [
    {
      label: '店铺信息',
      prop: 'none1',
      propsHandler: ({ col, row }: obj) => ({ url: row.pic, text: row[col.prop], $vm: this }),
      component: GoodsInfo,
    },
    { label: '推广类型', prop: 'none2' },
    { label: '有效期', prop: 'none3' },
    {
      label: '申请时间',
      prop: 'none4',
      formater: (row, col) => this.$utils._FormatDate(row[col.prop]),
    },
  ];

  columnsHandler: ScTable.ColumnsHandler = ['del'];

  tableConfig: ScTable.TableConfig = {
    api: this.$api.merchant.inject,
    breadcrumbButtons: [],
  };

  searchConfig: ScTable.Search = {
    attr: { 'label-width': '110px' },
    data: [
      {
        label: '商家店铺名称：',
        prop: 'none',
        tag: {
          attr: { placeholder: '请输入商家店铺名称' },
        },
      },
      {
        label: '申请时间：',
        prop: 'none4',
        tag: {
          tagType: 'date-picker',
          attr: {
            type: 'datetime',
            placeholder: '请选择申请时间',
          },
        },
      },
    ],
  };

  addConfig: ScForm.Add = {
    type: 'plain',
    data: [
      [
        {
          label: '店铺名称：',
          prop: 'none1',
          tag: { attr: { placeholder: '请输入店铺名称' } },
        },
        {
          label: '有效期：',
          prop: 'none3',
          tag: {
            tagType: 'date-picker',
            attr: { type: 'datetime', placeholder: '请输入有效期' },
          },
        },
      ],
    ],
  };
}
</script>
