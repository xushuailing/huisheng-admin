<template>
  <div class='test-min'>
    <sc-breadcrumb class="w100 flex-je pr-30 mb-10">
      <el-button type="primary"
                 class="mr-10"
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
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { obj } from '@/lib/@types/sc-param.d';
import { _Shopid } from '../config';

const columns: ScTable.SetColumns = [
  ['产品图片', 'image', 100, null, 'img'],
  ['产品规格', 'parameter'],
  ['产品分类', 'typetitle'],
  ['价格', 'price'],
  ['商品类型', 'type'],
  ['销量', 'xnum'],
];

@Component
export default class MerchantInject extends Vue {
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

  onTableHandlerClick({ row, type }: { row: obj; type: string }) {
    if (type === 'detail') {
      this.$router.push({
        path: 'add',
        query: { id: row.id },
      });
    } else if (type === 'unshelve') {
      console.log('下架: ');
    } else if (type === 'shelves') {
      console.log('上架: ');
    }
  }

  handleAdd() {
    this.$router.push('add');
  }

  onSlotClick() {
    console.log('1', 1);
  }
}
</script>
