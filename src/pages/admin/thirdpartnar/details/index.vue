
<template>
  <div class="tp-detail">
    <el-button v-if="activeName=='data'"
               class="tp-detail__send"
               size="small"
               type="primary">发送感谢信</el-button>
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
import info from './info.vue';
import cost from './cost.vue';
import data from './data/index.vue';

@Component
export default class TpDetail extends Vue {
  get id() {
    return this.$route.query && this.$route.query.id;
  }

  tabs = [
    { label: '店铺信息', name: 'info', component: info },
    { label: '成本信息', name: 'cost', component: cost },
    { label: '数据上传', name: 'data', component: data },
  ];

  activeName = this.tabs[0] && this.tabs[0].name;
}
</script>
<style lang="scss" scoped>
.tp-detail {
  position: relative;
  &__send {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
