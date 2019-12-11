<template>
  <div class="order-receive-detail bg-white border-radius-4 p-30 mb-20">
    <status :status="order.status"
            :time="data.time"></status>

    <el-radio-group v-model="currentTab"
                    size="medium"
                    class="mt-20">
      <el-radio-button v-for="(item,i) in tabs"
                       :key="i"
                       :label="item.value">{{item.label}}</el-radio-button>
    </el-radio-group>

    <div class="info-container border-primary border-radius-4 mt-20 p-20">
      <order-info v-show="currentTab==='detail'"
                  :userInfo="userInfo"
                  :orderInfo="orderInfo"
                  :header="header"
                  :list="list"
                  :payPrice="price.payPrice"
                  :freight="price.freight"></order-info>
      <div v-show="currentTab==='logistics'">
        <div class="font-16">物流信息</div>
        <div class="mt-20">
          <order-address title=" "
                         :data="address"
                         style="margin-top:0"></order-address>
          <!-- TODO: 只有实物有 -->
          <div class="mt-10">运送方式：快递</div>
          <div class="h100"
               ref="logistics"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';
import { _Uid, _PayType } from '../../config';
import Mixin from './mixin';
import Status from './components/status.vue';
import OrderInfo from './components/order-info.vue';
import OrderAddress from './components/address.vue';

@Component({ components: { Status, OrderInfo, OrderAddress } })
export default class OrderReceiveDetail extends Mixins(Mixin) {
  $refs!: {
    logistics: any;
  };

  tabs = [{ label: '订单详情', value: 'detail' }, { label: '收货与物流信息', value: 'logistics' }];

  currentTab = this.tabs[0].value;

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

  form = {
    shop_goods_pay_price: '',
    freight: '',
  };

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

  getLogistics() {
    const loading = this.$utils._Loading.show({ target: this.$refs.logistics.$el });
    const api = this.$api.merchant.order.logistics;
    const param = { oid: this.id };
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
    this.getLogistics();
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
