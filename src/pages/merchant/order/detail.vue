<template>
  <div class="order-detail bg-white border-radius-4 p-30 mb-20">
    <el-tag type="warning"
            class="w100 font-14 p-10 pl-20"
            style="height:auto">
      <div><span>当前订单状态：</span><span class="font-primary">{{status}}</span></div>
      <div><span>若用户在<span class="font-danger">{{time}}</span>内未收货，系统将自动确认收货</span></div>
    </el-tag>

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

        <div class="mt-30 border-horizontal border-vertical border-radius-8 text-c">
          <div class="table-header bg-info-lighter border-bottom">
            <div v-for="(item,key) in header"
                 :key="key"
                 class="p-20">{{item}}</div>
          </div>
          <div v-for="(row,i) in list"
               :key="i"
               class="table-row">
            <template v-for="(col,k) in row">
              <div v-if="columns.includes(k)"
                   :key="k"
                   class="p-20 flex-ac text-c">
                <div v-if="k === 'info'"
                     class="flex-ac">
                  <img :width="80"
                       :height="80"
                       :src="row.image"
                       :alt="col"
                       style="object-fit: cover"
                       class="mr-10">
                  <span>{{col}}</span>
                </div>
                <div v-else
                     class="w100">{{col}}</div>
              </div>
            </template>
          </div>
        </div>

        <div class="mt-20 font-bold font-danger pb-30">实付款：{{data.amount}}</div>
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
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';

const lodashString = require('lodash/string');

@Component
export default class OrderDetail extends Vue {
  status = '等待收货';

  tabs = [{ label: '订单详情', value: 'detail' }, { label: '收货与物流信息', value: 'logistics' }];

  currentTab = this.tabs[0].value;

  data = {
    name: '哎呦喂',
    phone: '12345678910',
    position: '浙江  杭州',
    id: '12345678910',
    createtime: '12345678910',
    paytime: '2019-07-01  15:45',
    transactionNo: '201701234567894101235',
    payType: '支付宝',
    serialNumber: '123456789101112',
    amount: '280.00',
    address: '浙江省杭州市滨江区卓信大厦',
  };

  get userInfo() {
    return [
      { label: '用户名：', value: this.data.name },
      { label: '手机号：', value: this.data.phone },
      { label: '所在地区：', value: this.data.position },
    ];
  }

  get orderInfo() {
    return [
      { label: '订单编号：', value: this.data.id },
      { label: '创建时间：', value: this.data.createtime },
      { label: '付款时间：', value: this.data.paytime },
      { label: '交易号：', value: this.data.transactionNo },
      { label: '支付方式：', value: this.data.payType },
      { label: '支付流水：', value: this.data.serialNumber },
    ];
  }

  get logisticsInfo() {
    return [
      { label: '收货人姓名：', value: this.data.name },
      { label: '收货人电话号码：', value: this.data.phone },
      { label: '收货地址：', value: this.data.address },
    ];
  }

  header = {
    info: '商品信息',
    price: '单价',
    num: '数量',
    amount: '商品总价',
  };

  get columns() {
    return Object.keys(this.header);
  }

  list: obj[] = [
    {
      info: '商品名称商品名称商品名称',
      price: '125.00',
      num: 1,
      amount: '￥140.00',
      image:
        'https://didulv.didu86.com/restaurant/storage/app/uploads/2019-11-04/3bed2e7bc036770f93bcd19335ad0868.jpg',
    },
  ];

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

  mounted() {
    this.timeDown();
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

    .table-header,
    .table-row {
      display: grid;
      grid-template-columns: 2fr repeat(3, 1fr);
      grid-template-rows: auto;
    }
  }
</style>
