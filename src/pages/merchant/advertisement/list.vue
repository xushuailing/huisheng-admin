<template>
  <div class="ads-list">
    <el-row :gutter="20">
      <el-col v-for="item in data"
              :key="item.id"
              :span="8">
        <div class="ads-list-item bg-white border-radius-8 p-15 mt-20 p-30 pointer"
             @click="toDetail(item.id)">
          <div class="font-bold font-28">{{item.title}}</div>
          <div class="font-bold font-20 mt-20">
            &yen;{{item.banner_min}} - &yen;{{item.banner_max}}
          </div>
          <div class="mt-20 font-info font-18 ellipsis">{{item.introduction}}</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';

@Component
export default class Advertisement extends Vue {
  data: obj[] = [];

  async getList() {
    const api = this.$api.merchant.ads.index;
    const res = await this.$http.get(api);
    this.data = res.data;
    console.log('res.data: ', res.data);
  }

  toDetail(id: string) {
    this.$router.push({ path: 'buy', query: { id } });
  }

  mounted() {
    this.getList();
  }
}
</script>

<style lang="scss" scoped>
  .ads-list {
    &-item {
      height: 300px;
    }
    .ellipsis {
      line-height: 1.5;
      -webkit-line-clamp: 5;
    }
  }
</style>
