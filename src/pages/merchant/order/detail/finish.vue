<template>
  <div class="order-receive-detail bg-white border-radius-4 p-30 mb-20">
    <status :status="order.status"></status>
    <order-info class="mt-30"
                :userInfo="userInfo"
                :orderInfo="orderInfo"
                :header="header"
                :list="list"
                :payPrice="price.payPrice"
                :freight="price.freight"></order-info>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';
import { _Uid, _PayType } from '../../config';
import GetValue from '../mixin';
import Detail from './mixin';
import Status from './components/status.vue';
import OrderInfo from './components/order-info.vue';

@Component({ components: { Status, OrderInfo } })
export default class OrderReceiveDetail extends Mixins(Detail, GetValue) {
  get userInfo() {
    const { username = '', phone = '', address_provinces = '', address_city = '' } =
      this.data.address || {};
    return [
      { label: '用户名：', value: username },
      { label: '手机号：', value: phone },
      { label: '所在地区：', value: `${address_provinces} ${address_city}` },
    ];
  }

  get orderInfo() {
    const { ordernumber = '', createtime = '', paytime = '', transaction_id = '', pay_type = '' } =
      this.data.order || {};
    return [
      { label: '订单编号：', value: ordernumber },
      { label: '创建时间：', value: createtime },
      { label: '付款时间：', value: paytime },
      { label: '支付方式：', value: (_PayType as obj)[pay_type] || '' },
      { label: '支付流水：', value: transaction_id },
    ];
  }

  get logisticsInfo() {
    const {
      username = '',
      phone = '',
      address_provinces = '',
      address_city = '',
      address_areas = '',
      address = '',
    } = this.data.address || {};
    return [
      { label: '收货人姓名：', value: username },
      { label: '收货人电话号码：', value: phone },
      {
        label: '收货地址：',
        value: `${address_provinces}${address_city}${address_areas}${address}`,
      },
    ];
  }

  get price() {
    const order = this.data.order || {};
    const { shop_goods_pay_price = '', freight = '' } = order;
    return { payPrice: shop_goods_pay_price, freight };
  }

  header = {
    title: '商品信息',
    size: '规格',
    price: '单价',
    num: '数量',
    total_price: '商品总价',
  };

  getDetail() {
    const loading = this.$utils._Loading.show();
    const api = this.$api.merchant.order.show;
    const param = { uid: _Uid, oid: this.id };
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
  .order-receive-detail {
    min-height: 550px;
    .border-primary {
      border: 1px solid rgba(86, 119, 252, 0.59);
    }
  }
</style>
