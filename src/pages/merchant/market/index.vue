<template>
  <div class="preferential">
    <div v-for="item in list"
         :key="item.type+'_'+item.id"
         class="flex-column bg-white mb-30 mr-30 p-25 border-radius-4">
      <h2 class="m-0">{{item.title}}</h2>
      <div class="pt-15 pb-15 flex-1 font-text-secondary">{{item.introduction}}</div>
      <div>
        <el-button type="primary"
                   size="small"
                   class="pl-20 pr-20"
                   @click="onOpen(item)">开启</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';
import { _Shopid, _IsVirtual } from '../config';

interface CouponsItem {
  id: string;
  type: 'discount' | 'coupon';
  title: string;
  desc?: string;
}

@Component
export default class Market extends Vue {
  list: CouponsItem[] = [];

  onOpen({ id, type }: CouponsItem) {
    const path = type === 'discount' || _IsVirtual ? 'add' : 'add-discount';
    this.$router.push({ path, query: { id } });
  }

  getList() {
    const loading = this.$utils._Loading.show();
    const api = _IsVirtual ? 'virtual' : 'entity';
    this.$http
      .get(this.$api.merchant.market.index[api], { shopid: _Shopid })
      .then((res) => {
        let { discount = [], coupon = [] } = res.data || {};
        discount = discount.map((e: obj) => ({ ...e, type: 'discount' }));
        coupon = coupon.map((e: obj) => ({ ...e, type: 'coupon' }));
        this.list = [...discount, ...coupon];
      })
      .catch((err) => {
        this.$utils._ResponseError(err);
      })
      .finally(() => {
        loading.close();
      });
  }

  mounted() {
    this.getList();
  }
}
</script>

<style lang="scss" scoped>
  .preferential {
    display: grid;
    grid-template-columns: repeat(auto-fit, 25%);
    grid-template-rows: 300px;
  }
</style>
