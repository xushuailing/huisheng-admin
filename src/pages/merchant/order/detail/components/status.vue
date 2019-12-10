<template>
  <el-tag type="warning"
          class="w100 font-16 p-20"
          style="height:auto">
    <div>
      <span class="font-black">当前订单状态：</span>
      <span class="font-primary">{{getStatus(status)}}</span>
    </div>
    <div v-if="remainTime"
         class="font-black">
      若用户在 <span class="font-danger">{{remainTime}}</span> 内{{tips}}
    </div>
  </el-tag>
</template>
<script lang="ts">
import { Component, Vue, Mixins, Prop, Watch } from 'vue-property-decorator';
import Mixin from '../../mixin';
import { obj } from '@/lib/@types/sc-param.d';

@Component
export default class OrderStatus extends Mixins(Mixin) {
  @Prop([Number, String]) status!: number | string;

  get tips() {
    return this.status == 1 ? '未付款，系统将自动取消订单' : '未收货，系统将自动确认收货';
  }

  @Prop(String) time!: string;

  remainTime = this.time;

  @Watch('time', { immediate: true })
  onTimeChange(time: string) {
    this.remainTime = time;

    if (time) {
      console.log('time: ', time);
      this.timeDown();
    }
  }

  timer: any = null;

  get flag() {
    return this.remainTime === '00:00:00';
  }

  timeDown() {
    this.timer = setInterval(() => {
      if (this.flag) {
        clearInterval(this.timer);
      }
      this.remainTime = this.getTime();
    }, 1000);
  }

  getTime() {
    const [hour, minute, second] = this.remainTime.split(':').map(Number);
    const time = (hour * 60 + minute) * 60 + second;
    const now = time - 1;
    const curHour = Math.floor(Math.floor(now / 60) / 60);
    const curMinute = Math.floor(now / 60) % 60;
    const curSecond = now - curHour * 3600 - curMinute * 60;
    const res = `${curHour}:${curMinute}:${curSecond}`;
    return res;
  }

  destroyed() {
    clearInterval(this.timer);
  }
}
</script>
