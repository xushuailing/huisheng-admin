<template>
  <sc-min-table stripe
                ref="table"
                :columns-handler="columnsHandler"
                :columns-props="{align:'center'}"
                :columns="columns"
                :editConfig="editConfig"
                :table-config="tableConfig">
  </sc-min-table>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { ScForm } from '@/lib/@types/sc-form.d';

@Component
export default class TpCost extends Vue {
  columns: ScTable.Columns = [
    { label: '产品名称', prop: 'none1' },
    { label: '成本', prop: 'none2' },
    { label: '价格', prop: 'none3' },
    {
      label: '创建时间',
      prop: 'none4',
      formater: (row, col) => this.$utils._FormatDate(row[col.prop]),
    },
  ];

  columnsHandler = ['edit', 'del'];

  tableConfig: ScTable.TableConfig = {
    api: this.$api.platform,
    breadcrumbButtons: [],
  };

  editConfig: ScTable.Eidt = {
    type: 'plain',
    width: '70%',
    header: { title: '修改成本信息' },
    data: [
      [
        {
          label: '产品名称：',
          prop: 'none1',
          tag: { attr: { placeholdre: '请输入产品名称' } },
        },
        {
          label: '成本：',
          prop: 'none2',
          tag: { attr: { placeholdre: '请输入成本' } },
        },
        {
          label: '价格：',
          prop: 'none3',
          tag: { attr: { placeholdre: '请输入价格' } },
        },
      ],
    ],
  };
}
</script>
