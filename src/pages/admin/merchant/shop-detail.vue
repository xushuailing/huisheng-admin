<template>
  <div class='merchant-shop-detail pb-30'>
    <el-tabs v-model="activeName">
      <el-tab-pane label="店铺基本信息"
                   lazy
                   name="1">
        <div class="p-30 bg-white border-radius-8">
          <div v-for="item in detail"
               :key="item.prop"
               class="pb-15 mb-10">
            <div v-if="item.type ==='img'"
                 class="flex">
              <div style="width:90px">{{item.label}}</div>
              <img v-for="img in item.value"
                   :width="item.width"
                   :height="item.height"
                   class="mr-10"
                   :key="img"
                   :src="img"
                   alt="">
            </div>
            <div v-else
                 class="flex">
              <div style="width:90px">{{item.label}}</div>
              <div>{{item.value}}</div>
            </div>
          </div>
          <el-button type="primary"
                     class="mt-20">
            下架
          </el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="产品列表"
                   lazy
                   name="2">
        <sc-min-table stripe
                      ref="table"
                      :columns-handler="columnsHandler"
                      :columns="columns"
                      :table-config="tableConfig">
        </sc-min-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';

const columns: ScTable.SetColumns = [
  ['商品信息', 'title'],
  ['商品类型', 'type'],
  ['商品类别', 'type_title'],
  ['销量', 'xnum', 100],
  ['店铺名称', 'companyname'],
];

@Component
export default class MerchantShopDetail extends Vue {
  columns = this.$utils._SetTableColumns(columns);

  columnsHandler = [{ name: 'editsales', title: '修改销量' }];

  tableConfig = {
    api: this.$api.admin.merchant.shop.goods,
    index: {
      shopid: 1,
    },
    handleWidth: 100,
  };

  activeName = '1';

  detail = [
    { label: '店铺名称：', value: '', prop: 'shopname' },
    { label: '店铺状态：', value: '', prop: 'status' },
    {
      label: '店铺标志：',
      value: ['http://placehold.it/200x200'],
      prop: 'none3',
      type: 'img',
      width: '120px',
      height: '120px',
    },
    { label: '掌柜名称：', value: '', prop: 'none4' },
    { label: '服务电话：', value: '', prop: 'com_phone' },
    { label: '开店时间：', value: '', prop: 'none6' },
    { label: '营业时间：', value: '', prop: 'none7' },
    { label: '经营品类：', value: '', prop: 'none8' },
    { label: '配送方式：', value: '', prop: 'none9' },
    {
      label: '营业执照：',
      value: ['http://placehold.it/200x201', 'http://placehold.it/200x202'],
      prop: 'none10',
      type: 'img',
      width: '260px',
      height: '150px',
    },
    {
      label: '身份证：',
      value: ['http://placehold.it/200x203', 'http://placehold.it/200x204'],
      prop: 'none11',
      type: 'img',
      width: '260px',
      height: '150px',
    },
  ];

  mounted() {
    const { id, uid } = this.$route.query;
    this.getDetaill(id, uid);
  }

  async getDetaill(shopid: any, uid: any) {
    const api = this.$api.admin.merchant.shop.show;
    const { data } = await this.$http.get(api, { uid, shopid });

    this.detail.forEach((v) => {
      v.value = data[v.prop];
    });

    console.log('this.detail', this.detail);
  }
}
</script>
