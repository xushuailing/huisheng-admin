<template>
  <div class='test-min'>
    <sc-min-table stripe
                  ref="table"
                  :columns-type="['selection']"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  :table-config="tableConfig"
                  :paginationConfig="paginationConfig"
                  @pagination-onSlotClick="onSlotClick"
                  @table-emitTableHandlerClick="onTableHandlerClick">
    </sc-min-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '../../lib/@types/sc-table.d';
import { obj } from '@/lib/@types/sc-param.d';

const columns: ScTable.SetColumns = [
  ['产品图片', 'image', 100, null, 'img'],
  ['产品规格', 'nickname'],
  ['价格', 'price'],
  ['产品分类', 'name'],
  ['商品类型', 'idCard'],
];

@Component
export default class ProductShelves extends Vue {
  columns = this.$utils._SetTableColumns(columns);

  columnsHandler: ScTable.ColumnsHandler = [
    'detail',
    { name: 'shelves', title: '上架', type: 'danger' },
  ];

  paginationConfig = {
    slotAttr: {
      isCheckbox: true,
      text: '全部上架',
    },
  };

  tableConfig: ScTable.TableConfig = {
    api: this.$api.merchant.product,
    index: { shopid: '', status: 0 },
  };

  onTableHandlerClick({ row, type }: { row: obj; type: string }) {
    if (type === 'detail') {
      console.log('查看: ');
    } else {
      console.log('上架: ');
    }
  }

  onSlotClick() {
    console.log('1', 1);
  }
}
</script>
