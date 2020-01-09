<template>
  <div class='test-min'>
    <sc-breadcrumb class="w100 flex-je">
      <el-button type="primary"
                 @click="handleAdd">发布宝贝</el-button>
    </sc-breadcrumb>
    <sc-min-table stripe
                  ref="table"
                  :columns="columns"
                  :columns-type="['selection']"
                  :columns-handler="columnsHandler"
                  :columns-schema="columnsSchema"
                  :table-config="tableConfig"
                  :paginationConfig="paginationConfig"
                  @pagination-onSlotClick="onSlotClick"
                  @table-emitTableHandlerClick="onTableHandlerClick">
    </sc-min-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop, Ref, Mixins } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { _Shopid } from '../../config';
import mixin from './mixin';

const columns: ScTable.SetColumns = [
  ['产品图片', 'image', 100, null, 'img'],
  ['产品规格', 'parameter'],
  ['产品分类', 'typetitle'],
  ['价格', 'price'],
  ['商品类型', 'type'],
  ['销量', 'xnum'],
];

@Component
export default class MerchantInject extends Mixins(mixin) {
  userInfo = this.$utils._Storage.get('user_info');

  columns = this.$utils._SetTableColumns(columns);

  columnsHandler: ScTable.ColumnsHandler = [
    'detail',
    { name: 'unshelve', title: '下架', type: 'danger', handler: ({ row }) => !row.status },
    { name: 'shelves', title: '上架', type: 'danger', handler: ({ row }) => !!row.status },
  ];

  columnsSchema: ScTable.ColumnsSchema = {
    商品类型: {
      formater: () => '虚拟商品',
    },
  };

  paginationConfig = {
    slotAttr: {
      isCheckbox: true,
      text: '全部下架',
    },
  };

  tableConfig: ScTable.TableConfig = {
    api: this.$api.merchant.product,
    index: { shopid: _Shopid },
  };
}
</script>
