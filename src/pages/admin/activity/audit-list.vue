<template>
  <sc-min-table stripe
                ref="table"
                :columns-type="['selection']"
                :columns-handler="columnsHandler"
                :columns="columns"
                :columns-props="{align:'center'}"
                :columns-schema="columnsSchema"
                :table-config="tableConfig"
                :search-config="searchConfig"
                @table-emitTableHandlerClick="onTableHandlerClick">
  </sc-min-table>
  <!-- TODO: 全选通过 -->
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { ScForm } from '@/lib/@types/sc-form.d';
import { obj } from '@/lib/@types/sc-param.d';

const STATUS: obj<string> = {
  1: '审核中',
  2: '审核通过',
  3: '审核不通过',
};
const columns: ScTable.SetColumns = [
  ['店铺信息', 'none1'],
  ['推广类型', 'title'],
  ['价格', 'none2'],
  ['有效期', 'endtime'],
  ['申请时间', 'createtime'],
  ['状态', 'status'],
];

@Component
export default class ActvAdsList extends Vue {
  $refs!: {
    table: ScTable;
  };

  columns = this.$utils._SetTableColumns(columns);

  columnsSchema: ScTable.ColumnsSchema = {
    状态: {
      formater: (row, col) => {
        const value = row[col.prop];
        const style = value === '1' ? 'font-danger' : 'font-primary';
        return [{ class: style }, STATUS[value]];
      },
    },
  };

  columnsHandler: ScTable.ColumnsHandler = [
    { name: 'pass', title: '通过' },
    { name: 'reject', title: '驳回', type: 'danger' },
  ];

  // TODO: 缺少所有接口
  tableConfig: ScTable.TableConfig = {
    api: this.$api.admin.activity.ads,
  };

  searchConfig: ScTable.Search = {
    attr: { 'label-width': '130px' },
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
        prop: 'title',
        tag: {
          tagType: 'select',
          options: [],
          attr: { placeholder: '请选择推广类型' },
        },
      },
      {
        label: '申请时间：',
        prop: 'createtime',
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

  onTableHandlerClick({ row, type }: { row: obj; type: string }) {
    if (type === 'pass') {
      this.handlePass(row.id);
    } else {
      this.handleReject(row.id);
    }
  }

  handlePass(id: string) {
    this.$http.get('', { id }).then((res) => {
      console.log('res: ', res);
      if (res.status) {
        this.$message.success('审核通过');
        this.$refs.table.setDataTable({});
      }
    });
  }

  handleReject(id: string) {
    this.$http.get('', { id }).then((res) => {
      console.log('res: ', res);
      if (res.status) {
        this.$message.success('申请已驳回');
        this.$refs.table.setDataTable({});
      }
    });
  }
}
</script>
