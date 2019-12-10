<template>
  <div class="order-return-detail bg-white border-radius-4 p-30 mb-20">
    <status :status="data.status"
            :time="data.time"></status>

    <div class="mt-30">
      <h3>订单详情</h3>
      <div class="flex-jsb font-info"
           style="width:60%">
        <span>订单编号：{{data.ordernumber}}</span>
        <span>创建时间：{{data.createtime}}</span>
      </div>
      <goods-table :header="header"
                   :list="list"></goods-table>
      <h3 class="mt-30">买家详情</h3>
      <p>{{logisticsInfo}}</p>

      <el-form ref="form"
               :model="form"
               size="small"
               class="mt-30"
               label-position="left">
        <el-form-item label="申请退款理由："
                      prop="refund_reason"
                      class="font-bold font-danger">
          <el-input v-model="form.refund_reason"
                    :disabled="true"></el-input>
        </el-form-item>
        <div class="font-primary font-bold">付款方式：{{getPriceType(data.pay_type)}}</div>
        <div class="mt-30 pt-20 font-danger font-16">实收款：￥{{data.refund_price}}</div>
        <div class="mt-5 font-info">运费：{{data.freight}}</div>
        <el-form-item class="mt-30 font-danger"
                      label="应退款："
                      prop="refund_price">
          <el-input v-model="form.refund_price"
                    type="number"
                    placeholder="请输入应退款"></el-input>
        </el-form-item>
        <el-form-item class="mt-30 pt-20 font-16">
          <el-button type="primary"
                     class="pl-30 pr-30"
                     @click="handleReturn">退款</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';
import { _Uid } from '../../config';
import Mixin from '../mixin';
import Status from './components/status.vue';
import GoodsTable from '../goods-table.vue';

@Component({ components: { Status, GoodsTable } })
export default class OrderReturnDetail extends Mixins(Mixin) {
  get id() {
    return this.$route.query.id;
  }

  data: obj = {};

  get logisticsInfo() {
    const {
      username = '',
      phone = '',
      address_provinces = '',
      address_city = '',
      address_areas = '',
      address = '',
    } = this.data;
    return `${username}，${phone}，${address_provinces}${address_city}${address_areas}${address}`;
  }

  getPriceType(price: string) {
    const PAY_TYPE: obj = { 1: '余额', 2: '微信支付', 3: '支付宝支付' };
    return PAY_TYPE[price] || '';
  }

  get list() {
    return this.data.order_goods || [];
  }

  header = {
    title: '商品信息',
    size: '规格',
    price: '单价',
    num: '数量',
    total_price: '商品总价',
  };

  form: obj = {
    refund_reason: '',
    refund_price: '',
  };

  getDetail() {
    const api = this.$api.merchant.order.return.show;
    const param = { id: this.id };
    this.$http.get(api, param).then((res) => {
      const data = res.data || {};
      this.data = data;
      Object.keys(this.form).forEach((k) => {
        this.form[k] = data[k];
      });
    });
  }

  async handleReturn() {
    const api = this.$api.merchant.order.return.return;
    const param = { refund_price: this.form.refund_price, id: this.id };
    const Loading = this.$utils._Loading.show({ text: '退货中...' });
    try {
      const { status, message }: obj = await this.$http.get(api, param);
      this.$message.success(message);
      this.$nextTick(() => {
        this.$router.go(-1);
      });
    } catch (err) {
      this.$message.error(err.message);
    }
    Loading.close();
  }

  async handlePay() {
    const api = this.$api.merchant.order.pay;
    const param = { ...this.form, oid: this.id, uid: _Uid };
    const Loading = this.$utils._Loading.show({ text: '确认中...' });
    try {
      const { status, message }: obj = await this.$http.get(api, param);
      this.$message.success(message);
      this.$nextTick(() => {
        this.$router.go(-1);
      });
    } catch (err) {
      this.$message.error(err.message);
    }
    Loading.close();
  }

  mounted() {
    this.getDetail();
  }
}
</script>
<style lang="scss">
  .order-return-detail {
    .font-danger {
      .el-form-item__label,
      .el-input__inner {
        color: inherit;
      }
    }
    .font-16 {
      .el-form-item__label {
        font-size: 16px;
      }
    }
  }
</style>
