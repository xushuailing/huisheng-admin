<template>
  <sc-min-table stripe
                ref="table"
                :columns-type="['selection']"
                :columns-handler="columnsHandler"
                :columns="columns"
                :columns-props="{align:'center'}"
                :table-config="tableConfig"
                :search-config="searchConfig"
                @table-emitTableHandlerClick="onTableHandlerClick">
  </sc-min-table>
  <!-- TODO: 全选通过 -->
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { ScTable } from '../../lib/@types/sc-table.d';
import { ScForm } from '../../lib/@types/sc-form.d';
import { obj } from '@/lib/@types/sc-param.d';

const STATUS: obj<string> = {
  1: '审核中',
  2: '审核通过',
  3: '审核不通过',
};

@Component
export default class ActvAdsList extends Vue {
  $refs!: {
    table: any;
  };

  columns: ScTable.Columns = [
    { label: '店铺信息', prop: 'company' },
    { label: '推广类型', prop: 'none2' },
    { label: '价格', prop: 'none' },
    { label: '有效期', prop: 'none3' },
    {
      label: '申请时间',
      prop: 'createtime',
    },
    {
      label: '状态',
      prop: 'status',
      formater: (row, col) => {
        const value = row[col.prop];
        const style = value === '1' ? 'font-danger' : 'font-primary';
        return [{ class: style }, STATUS[value]];
      },
    },
  ];

  columnsHandler: ScTable.ColumnsHandler = [
    { name: 'pass', title: '通过' },
    { name: 'reject', title: '驳回', type: 'danger' },
  ];

  tableConfig: ScTable.TableConfig = {
    api: this.$api.merchant.inject,
  };

  searchConfig: ScTable.Search = {
    attr: { 'label-width': '110px' },
    data: [
      {
        label: '商家店铺名称：',
        prop: 'company',
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
