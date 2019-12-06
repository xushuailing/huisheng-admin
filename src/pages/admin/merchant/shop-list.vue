<template>
  <div v-if="typeIds">
    <sc-min-table stripe
                  ref="table"
                  :columns-type="['selection']"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  :columns-schema="columnsSchema"
                  :search-config="searchConfig"
                  :table-config="tableConfig"
                  :paginationConfig="paginationConfig"
                  @pagination-onSlotClick="onSlotClick"
                  @table-emitTableHandlerClick="onTableHandlerClick">
    </sc-min-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop, Ref } from 'vue-property-decorator';
import { Action, namespace } from 'vuex-class';
import { ScTable } from '@/lib/@types/sc-table.d';
import { State } from '@/store/common';
import { _MerchantState } from '../data';

const columns: ScTable.SetColumns = [
  ['门店名称', 'shopname'],
  ['公司名称', 'company'],
  ['门店分类', 'typeid'],
  ['联系人', 'username', 100],
  ['公司电话', 'com_phone', 100],
  ['门店地址', 'address', 220],
  ['申请时间', 'createtime', 220],
  ['状态', 'company_state', 80],
];

@Component
export default class MerchantShop extends Vue {
  @(namespace('common').Action) getShopTypes!: () => Promise<State['shopTypes']>;

  @Ref('table') $table!: ScTable;

  columns = this.$utils._SetTableColumns(columns);

  columnsHandler = ['look', { name: 'prohibit', title: '下架', type: 'danger' }];

  columnsSchema: ScTable.ColumnsSchema = {
    状态: {
      formater: (row, col) => {
        const data = _MerchantState(row[col.prop]);
        return data && [{ class: data.color }, data.label];
      },
    },
    门店分类: {
      formater: (row, col) => {
        const types = this.getTypeIds();

        const type = (types && types.find((v) => v.value == row[col.prop])) || {};
        return type.label;
      },
    },
  };

  paginationConfig = {
    slotAttr: {
      isCheckbox: true,
      text: '下架',
    },
  };

  tableConfig = {
    api: this.$api.admin.merchant.shop,
  };

  searchConfig = {
    attr: { 'label-width': '120px' },
    data: [
      {
        label: '门店名称：',
        prop: 'shopname',
        tag: {
          attr: {
            placeholder: '请输入门店名称',
          },
        },
      },

      {
        label: '店铺类型：',
        prop: 'typeid',
        tag: {
          tagType: 'select',
          options: [],
          attr: {
            placeholder: '请选择审核状态',
          },
        },
      },
      {
        label: '店铺状态：',
        prop: 'company_state',
        tag: {
          tagType: 'select',
          options: _MerchantState,
          attr: {
            placeholder: '请选择店铺类型',
          },
        },
      },
      {
        label: '创建时间：',
        prop: 'createtime',
        tag: {
          tagType: 'date-picker',
          attr: {
            type: 'daterange',
            'range-separator': '至',
            'start-placeholder': '开始日期',
            'end-placeholder': '结束日期',
          },
        },
      },
    ],
  };

  typeIds: any[] | null = null;


  created() {
    this.getTypeid();
  }

  getTypeIds() {
    return this.typeIds;
  }

  async getTypeid() {
    try {
      const api = this.$api.admin.merchant.shop.types;
      const data = await this.getShopTypes();
      this.typeIds = data;

      this.$set(this.searchConfig.data[1].tag, 'options', data);
    } catch (error) {
      console.log('error', error);
    }
  }

  onTableHandlerClick({ type, row }: ScTable.Event.TableHandlerClick) {
    if (type === 'look') {
      this.$router.push({ path: '/merchant/shop-detail', query: { uid: row.uid, id: row.id } });
    } else if (type === 'prohibit') {
      this.onProhibit([row.id]);
    }
  }

  async onProhibit(ids: any[]) {
    try {
      const flag = await this.$utils._MessageConfirm('是否下架该店铺', '下架');

      if (flag) {
        const api = this.$api.admin.merchant.shop.prohibit;
        const res = await this.$http.get(api, {
          shopids: ids,
        });

        this.$table.emitRefresh();

        this.$message.success('成功下架');
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  onSlotClick() {
    const select = this.$table.selectTableData;
    if (!select.length) {
      this.$message.warning('请选择要下架的店铺');
      return;
    }
    const ids = select.map((v) => v.id);

    this.onProhibit(ids);
  }
}
</script>
