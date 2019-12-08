<template>
  <div class="order-info">
    <div class="font-16">买家信息</div>
    <div class="pt-20 pb-20 border-dashed">
      <span v-for="item in userInfo"
            :key="item.label"
            class="mr-30">{{item.label}}{{item.value}}</span>
    </div>
    <div class="pt-20">
      <div class="font-16">订单信息</div>
      <div class="info mt-10">
        <span v-for="item in orderInfo"
              :key="item.label"
              class="mt-10">{{item.label}}{{item.value}}</span>
      </div>
    </div>
    <goods-table :header="header"
                 :list="list"></goods-table>
    <div class="mt-20 font-bold font-danger font-16">实付款：{{payPrice}}</div>
    <div v-if="typeof freight !== 'undefined'"
         class="mt-5 font-bold font-info pb-30">含运费：{{freight}}</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import GoodsTable from '../../goods-table.vue';
import { obj } from '@/lib/@types/sc-param.d';

@Component({ components: { GoodsTable } })
export default class OrderInfo extends Vue {
  @Prop(Array) userInfo!: obj[];

  @Prop(Array) orderInfo!: obj[];

  @Prop(Object) header!: object;

  @Prop(Array) list!: obj[];

  @Prop([String, Number]) payPrice!: string | number;

  @Prop([String, Number]) freight!: string | number;
}
</script>
<style lang='scss' scoped>
  .order-info {
    .border-dashed {
      border-bottom: 1px dashed #bbbbbb;
    }
    .info {
      width: 50%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
