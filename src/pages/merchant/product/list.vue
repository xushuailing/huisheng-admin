<template>
  <div class='test-min'>
    <sc-breadcrumb class="w100 flex-je pr-30 mb-10">
      <el-button type="primary"
                 @click="handleAdd">发布宝贝</el-button>
    </sc-breadcrumb>
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
import { ScTable } from '@/lib/@types/sc-table.d';
import { obj } from '@/lib/@types/sc-param.d';

const columns: ScTable.SetColumns = [
  ['产品图片', 'image', 100, null, 'img'],
  ['产品规格', 'parameter'],
  ['产品分类', 'tags'],
  ['价格', 'price'],
  ['商品类型', 'type'],
  ['销量', 'pnum'],
];

@Component
export default class MerchantInject extends Vue {
  userInfo = this.$utils._Storage.get('user_info');

  columns = this.$utils._SetTableColumns(columns);

  columnsHandler: ScTable.ColumnsHandler = [
    'detail',
    { name: 'shelves', title: '下架', type: 'danger' },
  ];

  paginationConfig = {
    slotAttr: {
      isCheckbox: true,
      text: '全部下架',
    },
  };

  tableConfig: ScTable.TableConfig = {
    api: this.$api.merchant.product,
    index: { shopid: this.userInfo.shopid },
  };

  onTableHandlerClick({ row, type }: { row: obj; type: string }) {
    if (type === 'detail') {
      this.$router.push({
        path: 'add',
        params: { detail: 'true', id: row.id },
        query: { detail: 'true', id: row.id },
      });
    } else {
      console.log('下架: ');
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
