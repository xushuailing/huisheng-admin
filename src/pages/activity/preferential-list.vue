<template>
  <div class="preferential">
    <div v-for="item in list"
         :key="item.id"
         class="flex-column bg-white mr-30 p-25 border-radius-4">
      <h2 class="m-0">{{item.title}}</h2>
      <div class="pt-15 pb-15 flex-1 font-text-secondary">{{item.desc}}</div>
      <div>
        <el-button type="primary"
                   size="small"
                   class="pl-20 pr-20"
                   @click="onOpen(item.id)">开启</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';

interface CouponsItem {
  id: string;
  title: string;
  desc?: string;
}

@Component
export default class ActvPreferential extends Vue {
  list: CouponsItem[] = [
    {
      id: '1',
      title: '新人红包',
      desc: '规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规',
    },
  ];

  onOpen(id: string) {
    this.$router.push({ name: '新增优惠券', query: { id } });
  }
}
</script>

<style lang="scss" scoped>
  .preferential {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 350px));
    grid-template-rows: repeat(auto-fit, 300px);
  }
</style>
