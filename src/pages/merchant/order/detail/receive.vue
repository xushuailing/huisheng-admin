<template>
  <div class="order-receive-detail bg-white border-radius-4 p-30 mb-20">
    <status :status="order.status"
            :time="order.time"
            :id="id"></status>

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
          <div class="mt-10">运送方式：{{logistics.expresstitle}}</div>
          <div v-if="logistics.data"
               ref="logistics"
               class="mt-30">
            <div v-for="(item,i) in logistics.data"
                 :key="i"
                 :class="['logistics-item flex',i?'font-info':'font-primary']">
              <span :class="['font-16',i?'':'font-bold']">
                {{i==logistics.data.length-1?'已发货':'运输中'}}
              </span>
              <span class="ml-30">{{item.time}}</span>
              <span class="flex-1 ml-30">{{item.context}}</span>
            </div>
          </div>
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

  logistics = {
    data: [
      {
        time: '2019-06-15 12:02:05',
        ftime: '2019-06-15 12:02:05',
        context: '快件由【华东绍兴枢纽】发往【SN杭州城站】',
      },
      {
        time: '2019-06-15 09:33:55',
        ftime: '2019-06-15 09:33:55',
        context:
          '客官，您的快件已签收，签收人【门卫】，如有任何疑问，请联系【18969974306】/【SN杭州上城复兴路快递站18314895580】或致电总部服务热线4001888888。风里来雨里去，快递小哥不容易！【天天小哥诚邀您点亮五颗星哦】',
      },
      {
        time: '2019-06-15 08:29:40',
        ftime: '2019-06-15 08:29:40',
        context: '【SN杭州上城复兴路快递站18314895580】的赵志永18969974306正在派件',
      },
      {
        time: '2019-06-15 07:51:08',
        ftime: '2019-06-15 07:51:08',
        context: '快件到达【SN杭州上城复兴路快递站18314895580】',
      },
      {
        time: '2019-06-14 11:54:32',
        ftime: '2019-06-14 11:54:32',
        context: '快件到达【华东绍兴枢纽】',
      },
      {
        time: '2019-06-13 10:15:30',
        ftime: '2019-06-13 10:15:30',
        context: '快件由【华北廊坊枢纽】发往【华东绍兴枢纽】',
      },
      {
        time: '2019-06-13 10:08:14',
        ftime: '2019-06-13 10:08:14',
        context: '快件到达【华北廊坊枢纽】',
      },
      {
        time: '2019-06-13 09:16:16',
        ftime: '2019-06-13 09:16:16',
        context: '快件由【SN北京市场部4001888888】发往【华北廊坊枢纽】',
      },
      {
        time: '2019-06-13 08:57:09',
        ftime: '2019-06-13 08:57:09',
        context: '【SN北京市场部4001888888】的恒信纸业巴枪二已收件',
      },
    ],
    expresstitle: '天天快递',
  };

  getLogistics() {
    const loading = this.$utils._Loading.show({ target: this.$refs.logistics.$el });
    const api = this.$api.merchant.order.logistics;
    const param = { oid: this.id };
    this.$http
      .get(api, param)
      .then((res) => {
        const logistics = res.data || {};
        if (logistics.data) {
          logistics.data = logistics.data.receive();
        }
        this.logistics = logistics;
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
    // this.getLogistics();
  }
}
</script>

<style lang='scss' scoped>
  .order-receive-detail {
    min-height: 550px;
    .border-primary {
      border: 1px solid rgba(86, 119, 252, 0.59);
    }
    .logistics-item {
      padding-bottom: 40px;
      position: relative;
    }
    .logistics-item:not(:last-child)::before {
      position: absolute;
      top: 28px;
      left: 24px;
      display: block;
      content: '';
      width: 1px;
      height: calc(100% - 34px);
      background-color: #bbbbbb;
    }
  }
</style>
