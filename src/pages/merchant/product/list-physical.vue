<template>
  <div class='products'>
    <sc-breadcrumb class="w100 flex-je pr-30 mb-10">
      <el-button type="primary"
                 class="mr-10"
                 @click="handleAdd">发布宝贝</el-button>
    </sc-breadcrumb>
    <el-radio-group v-model="currentTab"
                    size="medium"
                    @change="onTabChange">
      <el-radio-button v-for="(item,i) in tabs"
                       :key="i"
                       :label="item.value">{{item.label}}</el-radio-button>
    </el-radio-group>
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
import { Component, Vue, Prop, Ref } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { obj } from '@/lib/@types/sc-param.d';
import { _Shopid } from '../config';

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
export default class MerchantInject extends Vue {
  @Ref('table') $table!: ScTable;

  userInfo = this.$utils._Storage.get('user_info');

  tabs = [{ label: '已上架', value: 0 }, { label: '已下架', value: 1 }];

  currentTab = this.tabs[0].value;

  onTabChange(tab: number) {
    this.tableConfig.index!.status = tab;
    this.$table.setDataTable({});
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
        text: this.currentTab ? '全部上架' : '全部下架',
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
      // {
      //   label: '商品类型：',
      //   prop: 'type',
      //   tag: {
      //     tagType: 'select',
      //     options: [],
      //     attr: { placeholder: '请选择商品类型' },
      //   },
      // },
      {
        label: '商品类别：',
        prop: 'pid',
        tag: {
          tagType: 'select',
          options: [],
          attr: { filterable: true, placeholder: '请选择商品类别' },
        },
      },
      // {
      //   label: '发货公司：',
      //   prop: '',
      //   tag: { attr: { placeholder: '请输入发货公司' } },
      // },
    ],
  };

  onTableHandlerClick({ row, type }: { row: obj; type: string }) {
    if (type === 'detail') {
      this.$router.push({
        path: 'add-physical',
        params: { detail: 'true', id: row.id },
        query: { detail: 'true', id: row.id },
      });
    } else if (type === 'unshelve') {
      console.log('下架: ');
      this.handleShelves([{ gid: row.id, status: row.status }]);
    } else if (type === 'shelves') {
      console.log('上架: ');
      this.handleShelves([{ gid: row.id, status: row.status }]);
    }
  }

  handleAdd() {
    this.$router.push('add-physical');
  }

  handleShelves(list: Shelves[]) {
    const api = this.$api.merchant.product.shelves;
    const params = { shopid: _Shopid, list };
    this.$http.post(api, params).then((res) => {
      console.log('res.data: ', res.data);
    });
  }

  onSlotClick() {
    const data = this.$table.selectTableData;
    const list: Shelves[] = data.map((v) => ({ gid: v.id, status: v.status }));
    this.handleShelves(list);
  }

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
