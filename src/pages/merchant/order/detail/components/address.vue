<template>
  <div class="mt-30">
    {{title}}
    <strong class="font-16">{{title}}</strong>
    <p>收货地址：{{logisticsInfo}}</p>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';

@Component
export default class Address extends Vue {
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
        address = '',
      } = this.data;
      return `${username},${phone},${address_provinces}${address_city}${address_areas}${address}`;
    }
    return '';
  }

  mounted() {
    console.log('%cadr', 'color:#fff;background:#40b883;border-radius:5px;padding:2px 5px;');
  }
}
</script>
