
<template>
  <div class="tp-shop">
    <div class="tp-shop__header">
      <el-button size="small"
                 type="primary">一键导入</el-button>
      <el-button size="small"
                 type="primary">上传数据</el-button>
    </div>

    <el-tabs class="sc-tabs"
             v-model="activeName">
      <el-tab-pane v-for="tab in tabs"
                   :key="tab.name"
                   :label="tab.label"
                   lazy
                   :name="tab.name">
        <component :is="tab.component"
                   class="bg-white p-20"></component>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UseMarket from './market.vue';
import UsePeer from './peer.vue';
import UseSetting from './setting.vue';
import UseData from './data.vue';
import UsePlan from './plan.vue';
import UseSolution from './solution.vue';

@Component
export default class TpShop extends Vue {
  get id() {
    return this.$route.query && this.$route.query.id;
  }

  tabs = [
    { label: '市场分析', name: 'market', component: UseMarket },
    { label: '优秀同行', name: 'peer', component: UsePeer },
    { label: '基础设置', name: 'setting', component: UseSetting },
    { label: '数据分析', name: 'data', component: UseData },
    { label: '营销策划', name: 'plan', component: UsePlan },
    { label: '解决方案', name: 'solution', component: UseSolution },
  ];

  activeName = this.tabs[0] && this.tabs[0].name;

  mounted() {
    this.getData();
  }

  async getData() {
    const api = this.$api.admin.thirdpartnar.shops.show;
    const { data } = await this.$http.get(api, { id: this.id });
    console.log('data :', data);
  }
}
</script>
<style lang="scss" scoped>
.tp-shop {
  position: relative;
  &__header {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
