<template>
  <div class="order-detail bg-white border-radius-4 p-30 mb-20">
    <el-tag type="warning"
            class="w100 font-14 p-10 pl-20"
            style="height:auto">
      <div>
        <span>当前订单状态：</span>
        <!-- TODO：拿不到 mixin 的 getStatus -->
        <span class="font-primary">{{data.status}}</span>
      </div>
      <div v-if="data.status===1">
        若用户在 <span class="font-danger">{{time}}</span> 内未收货，系统将自动确认收货
      </div>
    </el-tag>

    <el-radio-group v-if="isVirtual"
                    v-model="currentTab"
                    size="medium"
                    class="mt-20">
      <el-radio-button v-for="(item,i) in tabs"
                       :key="i"
                       :label="item.value">{{item.label}}</el-radio-button>
    </el-radio-group>

    <div v-if="isVirtual"
         class="info-container border-primary border-radius-4 mt-20 p-20">
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
        <div class="mt-20 font-bold font-danger pb-30">实付款：{{data.shop_goods_pay_price}}</div>
      </div>
      <div v-show="currentTab==='logistics'">
        <div class="font-16">物流信息</div>
        <div class="mt-20">
          <div v-for="item in logisticsInfo"
               :key="item.label"
               class="mt-10">{{item.label}}{{item.value}}</div>
        </div>
      </div>
    </div>

    <div v-else
         class="mt-20">
      <h3 class="mt-0">确认交易详情</h3>
      <div class="flex-jsb font-info">
        <span>订单编号：{{data.order.ordernumber}}</span>
        <span>创建时间：{{data.order.createtime}}</span>
        <span>订单类型：{{data.order.type}}</span>
      </div>
      <goods-table :header="header"
                   :list="list"></goods-table>

      <div class="mt-20 font-danger font-16">实收款：&yen; 280</div>
      <div class="mt-5 font-info">含运费：0.00</div>
      <div class="mt-40">
        <strong class="font-16">确认收货信息</strong>
        <p>收货地址：某某某，12345678910，浙江省杭州市滨江区卓信大厦</p>
        <el-button type="primary"
                   size="small"
                   class="mt-10"
                   @click="handleEditAddress">修改收货地址</el-button>
      </div>

      <div class="mt-40">
        <h3>选择物流服务</h3>
        <el-input v-model="awb"
                  placeholder="请输入运单号，在选择对应物流公司"
                  style="width:350px">
          <el-button slot="append"
                     :disabled="enableSubmit"
                     @click="handleSubmit">发货</el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import Mixin from './mixin';
import GoodsTable from './goods-table.vue';
import { obj } from '@/lib/@types/sc-param.d';

const lodashString = require('lodash/string');

@Component({ components: { GoodsTable } })
export default class OrderDetail extends Mixins(Mixin) {
  isVirtual = false;

  get id() {
    return this.$route.query.id;
  }

  tabs = [{ label: '订单详情', value: 'detail' }, { label: '收货与物流信息', value: 'logistics' }];

  currentTab = this.tabs[0].value;

  data: obj = {
    name: '哎呦喂',
    phone: '12345678910',
    position: '浙江  杭州',
    status: 2,
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
    price: '单价',
    num: '数量',
    total_price: '商品总价',
  };

  get list() {
    return this.data.order_goods || [];
  }

  time = '72:00:00';

  timer: any = null;

  get flag() {
    return this.time === '00:00:00';
  }

  timeDown() {
    this.timer = setInterval(() => {
      if (this.flag) {
        clearInterval(this.timer);
      }
      this.time = this.getTime();
    }, 1000);
  }

  getTime() {
    const [hour, minute, second] = this.time.split(':').map(Number);
    const time = (hour * 60 + minute) * 60 + second;
    const now = time - 1;
    const curHour = Math.floor(Math.floor(now / 60) / 60);
    const curMinute = Math.floor(now / 60) % 60;
    const curSecond = now - curHour * 3600 - curMinute * 60;
    const res = `${curHour}:${curMinute}:${curSecond}`;
    return res;
  }

  getDetail() {
    const api = this.$api.merchant.order.show;
    const param = { uid: '', oid: '' };
    this.$http.get(api, param).then((res) => {
      console.log('res.data: ', res.data);
      this.data = res.data || {};
      this.timeDown();
    });
  }

  handleEditAddress() {
    this.$router.push({ path: 'address', query: { id: this.id } });
  }

  awb = '';

  get enableSubmit() {
    console.log('!this.awb: ', !this.awb);

    return !this.awb;
  }

  handleSubmit() {
    console.log('%csubmit', 'color:#fff;background:#40b883;border-radius:5px;padding:2px 5px;');
  }

  mounted() {
    // this.getDetail();
  }

  destroyed() {
    clearInterval(this.timer);
  }
}
</script>
<style lang='scss' scoped>
  .order-detail {
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
    .mt-40{
      margin-top: 40px;
    }
  }
</style>
