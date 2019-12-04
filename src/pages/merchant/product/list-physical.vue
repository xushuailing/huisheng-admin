<template>
  <div class='test-min'>
    <el-radio-group v-model="currentTab"
                    size="medium"
                    @change="onTabChange">
      <el-radio-button v-for="(item,i) in tabs"
                       :key="i"
                       :label="item.value">{{item.label}}</el-radio-button>
    </el-radio-group>

    <sc-breadcrumb class="w100 flex-je pr-30 mb-10">
      <el-button type="primary"
                 @click="handleAdd">发布宝贝</el-button>
    </sc-breadcrumb>
    <sc-min-table class="mt-20"
                  stripe
                  ref="table"
                  :columns-type="['selection']"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  :table-config="tableConfig"
                  :search-config="searchConfig"
                  :paginationConfig="paginationConfig"
                  @pagination-onSlotClick="onSlotClick"
                  @table-emitTableHandlerClick="onTableHandlerClick">
    </sc-min-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop, Ref } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { obj } from '@/lib/@types/sc-param.d';

const columns: ScTable.SetColumns = [
  ['商品图片', 'image', 100, null, 'img'],
  ['商品名称', 'title'],
  ['价格', 'price'],
  ['商品类型', 'type'],
  ['商品类别', 'tags'],
  ['销量', 'pnum'],
  ['发货公司', 'nickname'],
];

@Component
export default class MerchantInject extends Vue {
  @Ref('table') $table!: ScTable;

  userInfo = this.$utils._Storage.get('user_info');

  tabs = [{ label: '已上架', value: 1 }, { label: '已下架', value: 0 }];

  currentTab = this.tabs[0].value;

  onTabChange(tab: number) {
    this.tableConfig.index!.status = tab;
    this.$table.setDataTable({});
  }

  columns = this.$utils._SetTableColumns(columns);

  columnsHandler: ScTable.ColumnsHandler = [
    'detail',
    { name: 'shelves', title: '下架', type: 'danger' },
    { name: 'shelves', title: '上架', type: 'danger' },
  ];

  paginationConfig = {
    slotAttr: {
      isCheckbox: true,
      text: '全部下架',
    },
  };

  tableConfig: ScTable.TableConfig = {
    api: this.$api.merchant.product,
    index: { shopid: this.userInfo.shopid, status: 1 },
  };

  searchConfig: ScTable.Search = {
    data: [
      {
        label: '商品名称：',
        prop: 'title',
        tag: { attr: { placeholder: '请输入商品名称' } },
      },
      {
        label: '商品类型：',
        prop: 'type',
        tag: {
          tagType: 'select',
          options: [],
          attr: { placeholder: '开始时间' },
        },
      },
      {
        label: '商品类别：',
        prop: 'tags',
        tag: {
          tagType: 'select',
          options: [],
          attr: { placeholder: '请选择商品类别' },
        },
      },
      {
        label: '发货公司：',
        prop: '',
        tag: { attr: { placeholder: '请输入发货公司' } },
      },
    ],
  };

  onTableHandlerClick({ row, type }: { row: obj; type: string }) {
    if (type === 'detail') {
      this.$router.push({
        path: 'add-physical',
        params: { detail: 'true', id: row.id },
        query: { detail: 'true', id: row.id },
      });
    } else {
      console.log('下架: ');
    }
  }

  handleAdd() {
    this.$router.push('add-physical');
  }

  onSlotClick() {
    console.log('1', 1);
  }
}
</script>
