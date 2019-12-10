<template>
  <div class="order-pay-detail bg-white border-radius-4 p-30 mb-20">
    <status :status="order.status"
            :time="data.time"></status>

    <div class="mt-30">
      <h3>确认交易详情</h3>
      <div class="flex-jsb font-info"
           style="width:60%">
        <span>订单编号：{{order.ordernumber}}</span>
        <span>创建时间：{{order.createtime}}</span>
      </div>
      <goods-table :header="header"
                   :list="list"></goods-table>

      <el-form ref="form"
               :model="form"
               size="small"
               class="mt-30"
               label-position="left">
        <el-form-item label="应付款："
                      prop="shop_goods_pay_price">
          <el-input v-model="form.shop_goods_pay_price"
                    type="number"
                    placeholder="请输入应付金额">
            <template slot="prepend">&yen;</template>
          </el-input>
        </el-form-item>
        <el-form-item label="运费："
                      prop="freight">
          <el-input v-model="form.freight"
                    type="number"
                    placeholder="请输入运费">
            <template slot="prepend">&yen;</template>
          </el-input>
        </el-form-item>
        <order-address :data="address"
                 class="pt-10"></order-address>
        <el-form-item class="pt-20">
          <el-button type="primary"
                     class="pl-30 pr-30"
                     @click="handlePay">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';
import { _Uid } from '../../config';
import Mixin from './mixin';
import GoodsTable from '../goods-table.vue';
import Status from './components/status.vue';
import OrderAddress from './components/address.vue';

@Component({ components: { Status, GoodsTable, OrderAddress } })
export default class OrderPayDetail extends Mixins(Mixin) {
  header = {
    title: '商品信息',
    size: '规格',
    price: '单价',
    num: '数量',
    total_price: '商品总价',
  };

  form: obj = {
    shop_goods_pay_price: '',
    freight: '',
  };

  getDetail() {
    const api = this.$api.merchant.order.show;
    const param = { uid: _Uid, oid: this.id };
    this.$http.get(api, param).then((res) => {
      const data = res.data || {};
      this.data = data;
      if (data.order) {
        Object.keys(this.form).forEach((k) => {
          this.form[k] = data.order[k];
        });
      }
    });
  }

  async handlePay() {
    const api = this.$api.merchant.order.pay;
    const param = { ...this.form, oid: this.id, uid: '' };
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
