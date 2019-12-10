<template>
  <div class="order-send-detail bg-white border-radius-4 p-30 mb-20">
    <status :status="order.status"></status>

    <div class="mt-30">
      <h3>订单详情</h3>
      <div class="flex-jsb font-info"
           :style="{width:order.deliveryTime?'inherit':'50%'}">
        <span>订单编号：{{order.ordernumber}}</span>
        <span>创建时间：{{order.createtime}}</span>
        <span v-if="order.deliveryTime">发货时间：{{order.deliveryTime}}</span>
        <span v-if="order.finishTime">成交时间：{{order.finishTime}}</span>
      </div>
      <goods-table :header="header"
                   :list="list"></goods-table>
      <div class="mt-20 font-danger font-16">实收款：{{price.payPrice?'&yen; '+price.payPrice:''}}</div>
      <div class="mt-5 font-info">含运费：{{price.freight}}</div>
      <div class="mt-40">
        <strong class="font-16">确认收货信息</strong>
        <p>收货人姓名：{{address.username}}</p>
        <p>收货人电话号码：{{address.phone}}</p>
        <p>收货地址：{{address.logistics}}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';
import { _Uid } from '../../config';
import GoodsTable from '../goods-table.vue';
import Status from './components/status.vue';
import GetValue from '../mixin';
import Detail from './mixin';

@Component({ components: { Status, GoodsTable } })
export default class OrderInvalidDetail extends Mixins(Detail, GetValue) {
  header = {
    title: '商品信息',
    size: '规格',
    num: '数量',
    total_price: '价格',
  };

  get price() {
    const order = this.data.order || {};
    const { shop_goods_pay_price = '', freight = '' } = order;
    return { payPrice: shop_goods_pay_price, freight };
  }

  get address() {
    const attr = this.data.address;
    if (attr) {
      const {
        username = '',
        phone = '',
        address_provinces = '',
        address_city = '',
        address_areas = '',
        address = '',
      } = attr;
      return {
        username,
        phone,
        logistics: `${address_provinces}${address_city}${address_areas}${address}`,
      };
    }
    return '';
  }

  getDetail() {
    const api = this.$api.merchant.order.show;
    const param = { uid: _Uid, oid: this.id };
    this.$http.get(api, param).then((res) => {
      this.data = res.data || {};
    });
  }

  mounted() {
    this.getDetail();
  }
}
</script>
<style lang="scss">
  .order-send-detail {
    .mt-40 {
      margin-top: 40px;
    }
    .font-danger {
      .el-form-item__label,
      .el-input__inner {
        color: inherit;
      }
    }
  }
</style>
