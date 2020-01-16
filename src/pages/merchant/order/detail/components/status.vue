<template>
  <el-tag type="warning"
          class="w100 font-16 p-20"
          style="height:auto">
    <div>
      <span class="font-black">当前订单状态：</span>
      <span class="font-primary">{{getStatus(status)}}</span>
    </div>
    <div v-if="remainTime>0"
         class="font-black">
      若用户在 <span class="font-danger">{{timeString}}</span> 内{{tips}}
    </div>
  </el-tag>
</template>
<script lang="ts">
import { Component, Vue, Mixins, Prop, Watch } from 'vue-property-decorator';
import Mixin from '../../mixin';
import { obj } from '@/lib/@types/sc-param.d';

@Component
export default class OrderStatus extends Mixins(Mixin) {
  @Prop([Number, String]) id!: number | string;

  @Prop([Number, String]) status!: number | string;

  @Prop([Number, String]) time!: number;

  get isPay() {
    return this.status == 1;
  }

  get tips() {
    return this.isPay ? '未付款，系统将自动取消订单' : '未收货，系统将自动确认收货';
  }

  remainTime = this.getRemainTime(this.time);

  get timeString() {
    return this.remainTime > 0 ? this.$utils._Dayjs(this.remainTime * 1000).format('HH:mm:ss') : '';
  }

  @Watch('time')
  onTimeChange(time: number) {
    if (time) {
      this.remainTime = this.getRemainTime(time);
      this.time && this.timeDown();
    }
  }

  getRemainTime(time: number) {
    return time * 1000 - Date.now();
  }

  timer: any = null;

  get flag() {
    return this.remainTime > 0;
  }

  timeDown() {
    this.timer = setInterval(() => {
      if (this.flag) {
        this.remainTime--;
      } else {
        clearInterval(this.timer);
        this.handleTimeout();
      }
    }, 1000);
  }

  /** 自动发货/收货 */
  handleTimeout() {
    const apis = this.$api.merchant.order;
    const api = this.status == 1 ? apis.close : apis.confirm;
    const message = this.isPay ?
      '该订单超过24小时未支付，已自动关闭！' :
      '该订单超过7天未确认收货，系统已自动收货！';

    this.$http.spGet(api).finally(() => {
      this.$message.error(message);
      const path = this.isPay ? 'send-detail' : 'finish-detail';
      this.$router.push({ path, query: { id: String(this.id) } });
    });
  }

  destroyed() {
    clearInterval(this.timer);
  }
}
</script>
