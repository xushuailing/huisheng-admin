<template>
  <div class="market-mine">
    <h3>我的优惠券</h3>
    <div class="list mt-20 bg-white border-radius-8 p-30">
      <div v-for="item in list"
           :key="item.type+'_'+item.id"
           class="bg-info-lighter border-radius-8 p-20">
        <div v-for="row in columns[item.type]"
             :key="row.prop"
             class="flex-ac pt-10 pb-10 pr-30">
          <span class="list-label text-e">{{row.label}}</span>
          <span class="list-value flex-1 bg-white border-radius-4 border-solid">
            {{item[row.prop]}}
          </span>
        </div>
        <div class="list-buttons mt-10">
          <el-button size="small"
                     type="primary"
                     @click="handleEdit(item)">修改</el-button>
          <el-button class="ml-20"
                     size="small"
                     type="primary"
                     @click="handleDelete(item)">删除</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';
import { _Shopid } from '../config';

interface CouponsItem {
  id: string;
  type: 'coupon' | 'discount';
  title: string;
  strtime: string;
  endtime: string;
}

@Component
export default class MarketMine extends Vue {
  list: CouponsItem[] = [];

  columns = {
    coupon: [
      { label: '优惠券名称：', prop: 'title' },
      { label: '满：', prop: 'num_one' },
      { label: '减：', prop: 'coupon_price_one' },
      { label: '满：', prop: 'num_two' },
      { label: '减：', prop: 'coupon_price_two' },
      { label: '满：', prop: 'num_three' },
      { label: '减：', prop: 'coupon_price_three' },
      { label: '有效时间：', prop: 'date' },
    ],
    discount: [{ label: '优惠券名称：', prop: 'title' }, { label: '有效时间：', prop: 'date' }],
  };

  handleEdit({ id, type }: CouponsItem) {
    const path = type === 'discount' ? 'add' : 'add-discount';
    this.$router.push({ path, query: { id } });
  }

  async handleDelete({ id, type }: CouponsItem) {
    if (!id) return;

    const TypeMap = { coupon: 0, discount: 1 };
    const api = this.$api.merchant.market.delete;
    const params = { shopid: _Shopid, id, type: TypeMap[type] };
    await this.$http.get(api, params);
    this.getList();
  }

  getList() {
    const loading = this.$utils._Loading.show();
    this.$http
      .get(this.$api.merchant.market.mine, { shopid: _Shopid })
      .then((res) => {
        let { discount = [], coupon = [] } = res.data || {};
        discount = discount.map((e: obj) => ({
          ...e,
          type: 'discount',
          date: `${e.strtime || ''} - ${e.endtime || ''}`,
        }));
        coupon = coupon.map((e: obj) => ({
          ...e,
          type: 'coupon',
          date: `${e.strtime || ''} - ${e.endtime || ''}`,
        }));
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
  $labelWidth: 100px;
  .market-mine {
    .list {
      min-height: 80vh;
      display: grid;
      grid-template-columns: repeat(2, calc(50% - 15px));
      grid-template-rows: 560px;
      grid-gap: 30px;
      &-label {
        width: $labelWidth;
      }
      &-value {
        padding: 8px 12px;
      }
      &-buttons {
        padding-left: $labelWidth;
      }
    }
  }
</style>
