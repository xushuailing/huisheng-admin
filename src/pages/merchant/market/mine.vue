<template>
  <div class="market-mine">
    <h3>我的优惠券</h3>
    <div class="list mt-20 bg-white border-radius-8 p-30">
      <div v-for="item in list"
           :key="item.type+'_'+item.id"
           class="bg-info-lighter border-radius-8 p-20">
        <span>{{item.title}}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';
import { _Shopid } from '../config';
import mixin from './mixin';

@Component
export default class MarketMine extends Mixins(mixin) {}
</script>

<style lang="scss" scoped>
  .market-mine {
    .list {
      min-height: 80vh;
      display: grid;
      grid-template-columns: repeat(2, 50%);
      grid-template-rows: 300px;
      grid-gap: 30px;
    }
  }
</style>
