<template>
  <div class='products'>
    <sc-breadcrumb class="w100 flex-je">
      <el-button type="primary"
                 @click="handleAdd">发布宝贝</el-button>
    </sc-breadcrumb>
    <el-tabs class="sc-tabs"
             v-model="currentTab"
             @tab-click="onTabChange">
      <el-tab-pane v-for="(item,i) in tabs"
                   :label="item.label"
                   :key="i"
                   :name="item.value">
      </el-tab-pane>
    </el-tabs>
    <sc-min-table class="mt-20"
                  stripe
                  ref="table"
                  :columns="columns"
                  :columns-type="['selection']"
                  :columns-handler="columnsHandler"
                  :columns-schema="columnsSchema"
                  :table-config="tableConfig"
                  :search-config="searchConfig"
                  :paginationConfig="paginationConfig"
                  @pagination-onSlotClick="onSlotClick"
                  @table-emitTableHandlerClick="onTableHandlerClick">
    </sc-min-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop, Ref, Mixins } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { obj } from '@/lib/@types/sc-param.d';
import { _Shopid } from '../../config';
import mixin from './mixin';

interface Shelves {
  gid: string;
  status: string;
}

const columns: ScTable.SetColumns = [
  ['商品图片', 'image', 100, null, 'img'],
  ['商品名称', 'title'],
  ['价格', 'price'],
  ['商品类型', 'type'],
  ['商品类别', 'typetitle'],
  ['发货公司', 'company'],
];

@Component
export default class MerchantInject extends Mixins(mixin) {
  @Ref('table') $table!: ScTable;

  tabs = [{ label: '已上架', value: '0' }, { label: '已下架', value: '1' }];

  currentTab = this.tabs[0].value;

  onTabChange(tab: obj) {
    this.tableConfig.index!.status = tab.name;
    this.$table.setDataTable({});
    // 清空选项
  }

  columns = this.$utils._SetTableColumns(columns);

  columnsHandler: ScTable.ColumnsHandler = [
    'detail',
    { name: 'shelves', title: '下架', type: 'danger', handler: ({ row }) => !row.status },
    { name: 'shelves', title: '上架', type: 'danger', handler: ({ row }) => !!row.status },
  ];

  columnsSchema: ScTable.ColumnsSchema = {
    商品类型: {
      formater: () => '普通商品',
    },
  };

  get paginationConfig() {
    return {
      slotAttr: {
        isCheckbox: true,
        text: this.currentTab === '1' ? '全部上架' : '全部下架',
      },
    };
  }

  tableConfig: ScTable.TableConfig = {
    api: this.$api.merchant.product,
    index: { shopid: _Shopid, status: this.tabs[0].value },
  };

  searchConfig: ScTable.Search = {
    data: [
      {
        label: '商品名称：',
        prop: 'title',
        tag: { attr: { placeholder: '请输入商品名称' } },
      },
      {
        label: '商品类别：',
        prop: 'pid',
        tag: {
          tagType: 'select',
          options: [],
          attr: { filterable: true, placeholder: '请选择商品类别' },
        },
      },
    ],
  };

  async getGoodsType() {
    const api = this.$api.merchant.product.types;
    const res = await this.$http.get(api, { limit: 10e5 });
    const options = res.data || [];
    this.searchConfig.data![1].tag!.options = options.map((o: obj) => ({
      label: o.title,
      value: o.id,
    }));
  }

  mounted() {
    this.getGoodsType();
  }
}
</script>
