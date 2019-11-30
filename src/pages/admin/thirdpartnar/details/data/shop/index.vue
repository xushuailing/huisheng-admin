
<template>
  <div class="tp-shop">
    <div class="tp-shop__header">
      <el-button size="small"
                 type="primary">一键导入</el-button>
      <el-button size="small"
                 type="primary">上传数据</el-button>
    </div>
    <el-tabs v-model="activeName"
             type="card"
             :lazy="true">
      <el-tab-pane v-for="tab in tabs"
                   :key="tab.name"
                   :label="tab.label"
                   :name="tab.name">
        <component :is="tab.component"
                   :id="id"
                   class="mt-10"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import market from './market.vue';
import peer from './peer.vue';
import setting from './setting.vue';
import data from './data.vue';
import plan from './plan.vue';
import solution from './solution.vue';

@Component
export default class TpShop extends Vue {
  get id() {
    return this.$route.query && this.$route.query.id;
  }

  tabs = [
    { label: '市场分析', name: 'market', component: market },
    { label: '优秀同行', name: 'peer', component: peer },
    { label: '基础设置', name: 'setting', component: setting },
    { label: '数据分析', name: 'data', component: data },
    { label: '营销策划', name: 'plan', component: plan },
    { label: '解决方案', name: 'solution', component: solution },
  ];

  activeName = this.tabs[0] && this.tabs[0].name;
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
