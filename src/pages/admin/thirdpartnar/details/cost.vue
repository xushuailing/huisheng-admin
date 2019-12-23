<template>
  <sc-min-table stripe
                ref="table"
                :columns-handler="columnsHandler"
                :columns="columns"
                :columns-schema="columnsSchema"
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
    { label: '产品名称', prop: 'name' },
    { label: '成本', prop: 'cost' },
    { label: '价格', prop: 'price' },
    { label: '创建时间', prop: 'update_time' },
  ];

  columnsHandler = ['edit', 'del'];

  columnsSchema: ScTable.ColumnsSchema = {
    成本: { formater: (row, col) => `￥${row[col.prop]}` },
    价格: { formater: (row, col) => `￥${row[col.prop]}` },
  };

  // TODO: 删除字段不符合，没有show接口
  tableConfig: ScTable.TableConfig = {
    api: this.$api.admin.thirdpartnar.cost,
  };

  editConfig: ScTable.Eidt = {
    type: 'plain',
    width: '70%',
    header: { title: '修改成本信息' },
    rules: [
      {
        name: {
          value: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
        },
        cost: {
          value: [{ required: true, message: '请输入成本', trigger: 'blur' }],
        },
        price: {
          value: [{ required: true, message: '请输入价格', trigger: 'blur' }],
        },
      },
    ],
    data: [
      [
        {
          label: '产品名称：',
          prop: 'name',
          tag: { attr: { placeholdre: '请输入产品名称' } },
        },
        {
          label: '成本：',
          prop: 'cost',
          tag: { attr: { placeholdre: '请输入成本', type: 'number' } },
        },
        {
          label: '价格：',
          prop: 'price',
          tag: { attr: { placeholdre: '请输入价格', type: 'number' } },
        },
      ],
    ],
  };
}
</script>
