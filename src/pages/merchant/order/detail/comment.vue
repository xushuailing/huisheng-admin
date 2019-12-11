<template>
  <div class="order-reply bg-white border-radius-4 p-30 mb-20">
    <h3 class="mt-0">订单详情</h3>
    <div class="flex-jsb font-info"
         style="width:60%">
      <span>订单编号：{{data.ordernumber}}</span>
      <span>创建时间：{{data.createtime}}</span>
    </div>

    <goods-table :header="header"
                 :list="list"></goods-table>

    <div class="mt-20 font-danger font-16">实收款：{{price.payPrice}}</div>
    <div class="mt-10 font-info font-12">运费：{{price.freight}}</div>

    <order-address title="收货信息"
                   :data="address"></order-address>

    <div class="mt-30">
      <strong class="font-16">评价详情：</strong>
      <span>{{data.star}}星</span>
    </div>

    <sc-edit mode="page"
             :api="api"
             :config="addConfig"
             style="margin-left:-10px;margin-right:-10px"
             @emitEditComplete="onEditComplete">
    </sc-edit>

  </div>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { ScForm } from '@/lib/@types/sc-form.d';
import { obj } from '@/lib/@types/sc-param.d';
import GoodsTable from '../goods-table.vue';
import OrderAddress from './components/address.vue';
import Mixin from './mixin';

@Component({ components: { GoodsTable, OrderAddress } })
export default class OrderReply extends Mixins(Mixin) {
  $refs!: {
    form: any;
  };

  get oid() {
    return this.$route.query.oid;
  }

  header = {
    title: '商品信息',
    size: '规格',
    price: '单价',
    num: '数量',
    total_price: '商品总价',
  };

  get price() {
    const order = this.data.order || {};
    const { shop_goods_pay_price = '', freight = '' } = order;
    return { payPrice: shop_goods_pay_price, freight };
  }

  get api() {
    return this.$api.merchant.order.comment.reply;
  }

  get addConfig(): ScForm.Add {
    return {
      width: '100%',
      'label-width': '0',
      formAttr: { 'label-position': 'top' },
      params: { id: this.id },
      requestMethod: 'get',
      buttons: [{ mode: 'submit', text: '回复' }],
      rules: [
        { reply: { value: [{ required: true, message: '请输入回复内容', trigger: 'blur' }] } },
      ],
      data: [
        [
          {
            label: '',
            prop: 'reply_content',
            isFull: true,
            tag: { attr: { type: 'textarea', rows: 8, placeholder: '请输入回复内容' } },
          },
        ],
      ],
    };
  }

  onEditComplete({ status }: any) {
    if (status) {
      this.$router.go(-1);
    }
  }

  getDetail() {
    const loading = this.$utils._Loading.show();
    const api = this.$api.merchant.order.comment.show;
    const param = { id: this.id, oid: this.oid };
    this.$http
      .get(api, param)
      .then((res) => {
        this.data = res.data || {};
      })
      .catch((err) => {
        this.$utils._ResponseError(err);
      })
      .finally(() => {
        loading.close();
      });
  }

  mounted() {
    this.getDetail();
  }
}
</script>
<style lang='scss' scoped>
  .order-reply {
    .table-header,
    .table-row {
      display: grid;
      grid-template-columns: 2fr repeat(4, 1fr);
      grid-template-rows: auto;
    }
  }
</style>
