
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
                   :name="tab.name">
        <component :is="tab.component"
                   :detail="detail"
                   :name="tab.name"
                   class="bg-white p-20"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import position from './position.vue';
import explosive from './explosive.vue';
import fullScale from './full_scale.vue';
import distribution from './distribution.vue';
import other from './other.vue';
import plan from './plan.vue';

@Component
export default class TpShop extends Vue {
  get id() {
    return this.$route.query && this.$route.query.id;
  }

  tabs = [
    { label: '产品定位', name: 'product_pricing', component: position },
    { label: '爆款引流', name: 'explosive_drainage', component: explosive },
    { label: '满减活动', name: 'full_scale_activities', component: fullScale },
    { label: '配送设计', name: 'distribution_design', component: distribution },
    { label: '其他活动', name: 'other_activities', component: other },
    { label: '营销策划表', name: 'table', component: plan },
  ];

  activeName = this.tabs[0].name;

  mounted() {
    this.getData();
  }

  detail = '';

  async getData() {
    const api = this.$api.admin.thirdpartnar.market.show;
    const { data } = await this.$http.get(api, { id: this.id });
    console.log('data :', data);

    this.detail = JSON.stringify(data);
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
