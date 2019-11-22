<template>
  <div class='ads-list'>
    <sc-min-table stripe
                  ref="table"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  :columns-props="{align:'center'}"
                  :table-config="tableConfig"
                  :search-config="searchConfig"
                  :form-add-config="addConfig"
                  @table-emitTableHandlerClick="onTableHandlerClick">
    </sc-min-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { ScTable } from '../../lib/@types/sc-table.d';
import { ScForm } from '../../lib/@types/sc-form.d';
import { obj } from '@/lib/@types/sc-param.d';

@Component
export default class ActvAdsList extends Vue {
  columns: ScTable.Columns = [
    { label: '店铺信息', prop: 'none1' },
    { label: '推广类型', prop: 'none2' },
    { label: '图片', prop: 'none', special: 'img' },
    { label: '有效期', prop: 'none3' },
    {
      label: '申请时间',
      prop: 'none4',
      formater: (row, col) => this.$utils._FormatDate(row[col.prop]),
    },
  ];

  columnsHandler: ScTable.ColumnsHandler = ['detail'];

  tableConfig: ScTable.TableConfig = {
    api: this.$api.merchant.inject,
  };

  searchConfig: ScTable.Search = {
    attr: { 'label-width': '110px' },
    data: [
      {
        label: '商家店铺名称：',
        prop: 'none1',
        tag: {
          attr: { placeholder: '请输入商家店铺名称' },
        },
      },
      {
        label: '推广类型：',
        prop: 'none2',
        tag: {
          tagType: 'select',
          options: [],
          attr: { placeholder: '请选择推广类型' },
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
          label: '添加图片',
          prop: 'none',
          tag: {
            tagType: 'upload-img',
            attr: { limit: 100, fileSize: 10000, custom: { timeout: 2e6 } },
          },
        },
        {
          label: '跳转地址：',
          prop: 'none5',
          tag: { attr: { placeholder: '请输入跳转地址' } },
        },
        {
          label: '跳转类型：',
          prop: 'none6',
          tag: {
            tagType: 'select',
            options: [],
            attr: { placeholder: '请选择跳转类型' },
          },
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
