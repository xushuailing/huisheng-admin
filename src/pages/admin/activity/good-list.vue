<template>
  <div class='good-list'>
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
import { ScTable } from '@/lib/@types/sc-table.d';
import { ScForm } from '@/lib/@types/sc-form.d';
import { obj } from '@/lib/@types/sc-param.d';

@Component
export default class ActvGood extends Vue {
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
      prop: 'none3',
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
          tag: { options: [], attr: { placeholder: '请选择店铺' } },
        },
        {
          label: '添加产品：',
          prop: 'gid',
          tag: { options: [], attr: { placeholder: '请选择商品' } },
        },
        {
          label: '有效期：',
          prop: 'startime_endtime',
          tag: {
            tagType: 'date-picker',
            attr: { type: 'datetime', placeholder: '请选择有效期' },
          },
        },
      ],
    ],
  };

  mounted() {
    this.getMerchantShopList();
  }

  async getMerchantShopList() {
    try {
      const api = this.$api.admin.merchant.shop.index;
      const { data } = await this.$http.get(api, { limit: 9e6 });


      // const item =

      console.log('data', data);
    } catch (error) {
      console.log('error', error);
    }
  }
}
</script>
