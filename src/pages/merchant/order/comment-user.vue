<template>
  <sc-min-table class="mt-30"
                stripe
                ref="table"
                :columns="columns"
                :columns-schema="columnsSchema"
                :columns-handler="columnsHandler"
                :table-config="tableConfig"
                @table-emitTableHandlerClick="onTableHandlerClick">
  </sc-min-table>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { obj } from '@/lib/@types/sc-param.d';
import GoodsInfo from '@/components/img-name';
import { _Shopid } from '../config';

const columns: ScTable.SetColumns = [
  ['用户信息', 'nickname'],
  ['评价内容', 'content'],
  ['星级', 'star'],
  ['创建时间', 'createtime'],
];

@Component
export default class OrderEvaluate extends Vue {
  get id() {
    return this.$route.query.id;
  }

  columns = this.$utils._SetTableColumns(columns);

  columnsSchema: ScTable.ColumnsSchema = {
    用户信息: {
      propsHandler: ({ col, row }: obj) => ({ url: row.avatarurl, text: row[col.prop] }),
      component: GoodsInfo,
    },
    星级: {
      formater: (row, col) => (row[col.prop] ? `${row[col.prop]}星` : ''),
    },
  };

  columnsHandler: ScTable.ColumnsHandler = [
    { name: 'reply', title: '回复', handler: ({ row }) => row.comment_status },
  ];

  get tableConfig(): ScTable.TableConfig {
    return {
      api: this.$api.merchant.order.commentUser,
      index: { gid: this.id, shopid: _Shopid },
    };
  }

  onTableHandlerClick({ row, type }: any) {
    if (type === 'reply') {
      this.$router.push({ path: 'comment-detail', query: { id: row.id, oid: row.oid } });
    }
  }
}
</script>
