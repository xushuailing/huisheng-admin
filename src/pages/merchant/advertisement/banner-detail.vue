<template>
  <div class="adv-detail">
    <el-row :gutter="20">
      <el-col v-for="(item,i) in data"
              :key="i"
              :span="24">
        <div class="adv-detail__item bg-white border-radius-8 p-30 mt-20">
          <el-button v-if="item.price"
                     type="primary"
                     size="small"
                     class="adv-detail__buy"
                     @click="handleBuy(item)">购买</el-button>
          <div :class="['font-bold',i?'font-20':'font-28']">{{item.title}}</div>
          <div v-if="i"
               class="font-bold font-20 mt-10">&yen;{{item.price}}/个月</div>
          <div class="mt-10 mb-10 font-info font-18">{{item.introduction}}</div>
        </div>
      </el-col>
    </el-row>
    <buy :visible.sync="dialogVisible"
         :type="type"
         :id="buy.id"
         :price="buy.price"></buy>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';
import Buy from './buy.vue';

@Component({ components: { Buy } })
export default class Advertisement extends Vue {
  data: obj[] = [];

  type = '0';

  buy: obj = {
    id: '',
    price: '',
  };

  dialogVisible = false;

  handleBuy(item: obj) {
    this.buy.price = item.price;
    this.buy.id = this.type === '0' ? item.id : this.$route.query.id;
    this.dialogVisible = true;
  }

  async getList() {
    const loading = this.$utils._Loading.show();
    const api = this.$api.merchant.ads.detail;
    const res = await this.$http.get(api, { id: this.$route.query.id });
    const data = res.data || {};
    this.type = data.type;
    this.data = [
      { id: data.id, title: data.title, introduction: data.introduction },
      ...(data.banner_list || []),
    ];
    console.log('data: ', this.data);
    loading.close();
  }

  mounted() {
    this.getList();
  }
}
</script>
<style lang="scss" scoped>
  .adv-detail {
    &__item {
      position: relative;
    }
    &__buy {
      position: absolute;
      top: 20px;
      right: 20px;
    }
  }
</style>
