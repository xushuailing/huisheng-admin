
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
        <component v-if="tab.component"
                   :is="tab.component"
                   :name="tab.name"
                   :id="id"
                   class="mt-10"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import position from './position.vue';
import plan from './plan.vue';

@Component
export default class TpShop extends Vue {
  get id() {
    return this.$route.query && this.$route.query.id;
  }

  tabs = [
    { label: '产品定位', name: 'product_pricing', component: position },
    { label: '爆款引流', name: 'explosive_drainage' },
    { label: '满减活动', name: 'full_scale_activities' },
    { label: '配送设计', name: 'distribution_design' },
    { label: '其他活动', name: 'other_activities' },
    { label: '营销策划表', name: 'plan', component: plan },
  ];

  activeName = this.tabs[0].name;

  mounted() {
    this.getData();
  }

  async getData() {
    const api = this.$api.admin.thirdpartnar.market.show;
    const { data } = await this.$http.get(api, { id: 16 });
    console.log('data', data);
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
