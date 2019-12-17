<template>
  <div class='new-list'>
    <sc-min-table stripe
                  ref="table"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  :columns-props="{align:'center'}"
                  :table-config="tableConfig"
                  :formAddConfig="addConfig"
                  :search-config="searchConfig">
    </sc-min-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import GoodsInfo from '@/components/img-name';
import { ScTable, Scope } from '@/lib/@types/sc-table.d';
import { ScForm } from '@/lib/@types/sc-form.d';
import { obj } from '@/lib/@types/sc-param.d';

interface Select {
  value: string | number;
  label: string;
}

@Component
export default class ActvNew extends Vue {
  columns: ScTable.Columns = [
    {
      label: '商品信息',
      prop: 'goodstitle',
      propsHandler: ({ col, row }: obj) => ({
        url: row.goodsimage,
        text: row[col.prop],
      }),
      component: GoodsInfo,
    },
    { label: '店铺信息', prop: 'shopname', width: 300 },
    { label: '推广类型', prop: 'bannertitle', width: 150 },
    {
      label: '有效期',
      prop: 'startime_endtime',
      formater: (row, col) => `${row.startime} - ${row.endtime}`,
    },
    { label: '申请时间', prop: 'createtime', width: 150 },
  ];

  columnsHandler: ScTable.ColumnsHandler = ['del'];

  tableConfig: ScTable.TableConfig = {
    api: this.$api.admin.activity.goods,
    breadcrumbButtons: ['add'],
    delMethod: 'get',
  };

  searchConfig: ScTable.Search = {
    attr: { 'label-width': '140px' },
    data: [
      {
        label: '商家店铺名称：',
        prop: 'shopname',
        tag: {
          attr: { placeholder: '请输入商家店铺名称' },
        },
      },
      {
        label: '申请时间：',
        prop: 'createtime',
        tag: {
          tagType: 'date-picker',
          attr: {
            type: 'datetime',
            placeholder: '请选择申请时间',
          },
        },
      },
    ],
  };

  addConfig: ScForm.Add = {
    header: { title: '添加好物' },
    buttons: [
      {
        mode: 'submit',
        text: '确认添加',
      },
    ],
    rules: [
      {
        shopid: {
          value: [{ required: true, trigger: 'change', message: '请选择店铺' }],
        },
        gid: {
          value: [{ required: true, trigger: 'change', message: '请选择商品' }],
        },
        startime_endtime: {
          value: [{ required: true, trigger: 'change', message: '请选择有效期' }],
        },
      },
    ],
    data: [
      [
        {
          label: '店铺名称：',
          prop: 'shopid',
          tag: {
            tagType: 'select',
            options: [],
            listeners: {
              change: (id: number) => {
                this.getMerchantShopGoodsList(id);
              },
            },
            attr: { placeholder: '请选择店铺' },
          },
        },
        {
          label: '添加产品：',
          prop: 'gid',
          tag: { tagType: 'select', options: [], attr: { placeholder: '请选择商品' } },
        },
        {
          label: '有效期：',
          prop: 'startime_endtime',
          tag: {
            tagType: 'date-picker',
            attr: {
              type: 'datetimerange',
              placeholder: '请选择有效期',
              'range-separator': '至',
              'start-placeholder': '开始日期',
              'end-placeholder': '结束日期',
            },
          },
        },
      ],
    ],
    handleSubmit: (data) => {
      const [startime, endtime] = this.$utils._DataTypeChange(data.startime_endtime);
      delete data.startime_endtime;
      return {
        ...data,
        startime,
        endtime,
      };
    },
  };

  goodsList: Select[] = [];

  shopsList: Select[] = [];

  mounted() {
    this.getMerchantShopList();
  }

  async getMerchantShopGoodsList(shopid: number) {
    try {
      const api = this.$api.admin.merchant.shop.goods.index;
      const { data } = await this.$http.get<any[]>(api, { limit: 9e6, shopid });
      const item = this.$utils._GetConfigItemData(this.addConfig.data, 'gid');
      const list = data.map((v) => ({ label: v.title, value: v.id }));

      this.goodsList = list;
      if (item) item.tag!.options = list;
      console.log('getMerchantShopGoodsList', data);
    } catch (error) {
      console.log('error', error);
    }
  }

  async getMerchantShopList() {
    try {
      const api = this.$api.admin.merchant.shop.index;
      const { data } = await this.$http.get<any[]>(api, { limit: 9e6 });
      const item = this.$utils._GetConfigItemData(this.addConfig.data, 'shopid');

      const list = data.map((v) => ({ label: v.shopname, value: v.id }));
      this.shopsList = list;

      if (item) item.tag!.options = list;

      console.log('getMerchantShopList', data, item);
    } catch (error) {
      console.log('error', error);
    }
  }
}
</script>
