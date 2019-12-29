<template>
  <div class="mt-30">
    <strong class="font-16">{{title}}</strong>
    <p>收货地址：{{logisticsInfo}}</p>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Mixin from '../../mixin';
import { obj } from '@/lib/@types/sc-param.d';

@Component
export default class OrderStatus extends Vue {
  @Prop(Object) data!: obj;

  @Prop({ type: String, default: '确认收货信息' }) title!: string;

  get logisticsInfo() {
    if (this.data) {
      const {
        username = '',
        phone = '',
        address_provinces = '',
        address_city = '',
        address_areas = '',
        address_title = '',
        address = '',
      } = this.data;
      const addressTitle = address || address_title || '';
      return `${username}，${phone}，${address_provinces}${address_city}${address_areas}${addressTitle}`;
    }
    return '';
  }
}
</script>
