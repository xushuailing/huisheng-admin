<template>
  <div class="order-receive-detail bg-white border-radius-4 p-30 mb-20">
    <status :status="data.status"
            :time="data.time"></status>

    <el-radio-group v-model="currentTab"
                    size="medium"
                    class="mt-20">
      <el-radio-button v-for="(item,i) in tabs"
                       :key="i"
                       :label="item.value">{{item.label}}</el-radio-button>
    </el-radio-group>

    <div class="info-container border-primary border-radius-4 mt-20 p-20">
      <div v-show="currentTab==='detail'">
        <div class="font-16">买家信息</div>
        <div class="pt-20 pb-20 border-dashed">
          <span v-for="item in userInfo"
                :key="item.label"
                class="mr-30">{{item.label}}{{item.value}}</span>
        </div>
        <div class="pt-20">
          <div class="font-16">订单信息</div>
          <div class="order-info mt-10">
            <span v-for="item in orderInfo"
                  :key="item.label"
                  class="mt-10">{{item.label}}{{item.value}}</span>
          </div>
        </div>
        <goods-table :header="header"
                     :list="list"></goods-table>
        <div class="mt-20 font-bold font-danger font-16">实付款：{{data.shop_goods_pay_price}}</div>
        <div class="mt-5 font-bold font-info pb-30">含运费：{{data.freight}}</div>
      </div>
      <div v-show="currentTab==='logistics'">
        <div class="font-16">物流信息</div>
        <div class="mt-20">
          <div v-for="item in logisticsInfo"
               :key="item.label"
               class="mt-10">{{item.label}}{{item.value}}</div>
          <!-- 只有实物有 -->
          <div class="mt-10">运送方式：快递</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import Mixin from '../mixin';
import Status from './status.vue';
import GoodsTable from '../goods-table.vue';
import { obj } from '@/lib/@types/sc-param.d';

const lodashString = require('lodash/string');

@Component({ components: { Status, GoodsTable } })
export default class OrderReceiveDetail extends Mixins(Mixin) {
  get id() {
    return this.$route.query.id;
  }

  tabs = [{ label: '订单详情', value: 'detail' }, { label: '收货与物流信息', value: 'logistics' }];

  currentTab = this.tabs[0].value;

  data: obj = {
    name: '哎呦喂',
    phone: '12345678910',
    position: '浙江  杭州',
    status: 3,
    time: '72:00:00',
    freight: 0.0,
    order: {
      ordernumber: '201909101622564',
      createtime: '12345678910',
      paytime: '2019-07-01  15:45',
      transactionNo: '201701234567894101235',
      payType: '支付宝',
      serialNumber: '123456789101112',
    },
    order_goods: [
      {
        title: '商品名称商品名称商品名称',
        size: '规格1：规格2',
        price: '125.00',
        num: 1,
        total_price: '￥140.00',
        image:
          'https://didulv.didu86.com/restaurant/storage/app/uploads/2019-11-04/3bed2e7bc036770f93bcd19335ad0868.jpg',
      },
    ],
    shop_goods_pay_price: '280.00',
    address: {
      username: '测试',
      phone: '18094714282',
      address_provinces: '浙江省',
      address_areas: '滨江区',
      address: '我桌信大厦31',
    },
  };

  get userInfo() {
    return [
      { label: '用户名：', value: this.data.name },
      { label: '手机号：', value: this.data.phone },
      { label: '所在地区：', value: this.data.position },
    ];
  }

  get orderInfo() {
    const { order } = this.data;
    return [
      { label: '订单编号：', value: order.ordernumber },
      { label: '创建时间：', value: order.createtime },
      { label: '付款时间：', value: order.paytime },
      { label: '交易号：', value: order.transactionNo },
      { label: '支付方式：', value: order.payType },
      { label: '支付流水：', value: order.serialNumber },
    ];
  }

  get logisticsInfo() {
    const data = this.data.address;
    return [
      { label: '收货人姓名：', value: data.username },
      { label: '收货人电话号码：', value: data.phone },
      { label: '收货地址：', value: data.address_provinces + data.address_areas + data.address },
    ];
  }

  header = {
    title: '商品信息',
    size: '规格',
    price: '单价',
    num: '数量',
    total_price: '商品总价',
  };

  get list() {
    return this.data.order_goods || [];
  }

  getDetail() {
    const api = this.$api.merchant.order.show;
    const param = { uid: '', oid: '' };
    this.$http.get(api, param).then((res) => {
      console.log('res.data: ', res.data);
      this.data = res.data || {};
    });
  }

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

  mounted() {
    // this.getDetail();
  }
}
</script>

<style lang='scss' scoped>
  .order-receive-detail {
    min-height: 550px;
    .border-dashed {
      border-bottom: 1px dashed #bbbbbb;
    }
    .border-primary {
      border: 1px solid rgba(86, 119, 252, 0.59);
    }
    .order-info {
      width: 50%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
