<template>
  <div class='test-min'>
    <sc-breadcrumb class="mb-10">
      <el-button type="primary">添加</el-button>
    </sc-breadcrumb>
    <sc-min-table stripe
                  ref="table"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  :table-config="tableConfig"
                  @pagination-onSlotClick="onSlotClick"
                  @emitTableHandlerClick="onTableHandlerClick">
    </sc-min-table>

    <o-table :tableData="list11"
            :thead="thead">
      <template slot-scope="props">
        <o-table-row>
          <div slot="top_th">
            订单号： 13123123, 订单号： 13123123, 订单号： 13123123
          </div>
          <div v-for="item in 3"
               :key="item"
               style="display:flex;justify-content: flex-start;align-items: center;">
            <div style="flex:1;text-align:center;line-height: 40px;">{{props.row.key1}}</div>
            <div style="flex:1;text-align:center;line-height: 40px;">{{props.row.key1}}</div>
            <div style="flex:1;text-align:center;line-height: 40px;">{{props.row.key1}}</div>
            <div style="flex:1;text-align:center;line-height: 40px;">{{props.row.key1}}</div>
            <div style="flex:1;text-align:center;line-height: 40px;">{{props.row.key1}}</div>
          </div>
          <div slot="footer_th">213123</div>
        </o-table-row>
      </template>
    </o-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '../../lib/@types/sc-table.d';

const columns: ScTable.SetColumns = [
  ['头像', 'avatar', null, null, 'img'],
  ['昵称', 'nickname', 200],
  ['电话', 'phone', 150],
  ['工作时间', 'idCard', 220],
  ['创建时间', 'pnum', 150],
];

@Component
export default class MerchantInject extends Vue {
  columns = this.$utils._SetTableColumns(columns);

  columnsHandler: ScTable.ColumnsHandler = ['del'];

  thead = ['退款单号', '原单号', '学校', '姓名', '身份证号'];

  list11 = [
    {
      key1: 1,
      key2: 1,
      key3: 1,
      key4: 1,
      key5: 1,
    },
    {
      key1: 2,
      key2: 2,
      key3: 2,
      key4: 2,
      key5: 2,
    },
  ];

  tableConfig = {
    api: this.$api.merchant.inject,
    // isSearch: false,

    // disabledRequest: true,
    table: {
      // storageKey: 'myTable',
    },
    isSetting: true,
    isExports: true,
  };

  onTableHandlerClick() {}

  onSlotClick() {
    console.log('1', 1);
  }
}
</script>
