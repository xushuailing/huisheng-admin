
<template>
  <div class="tp-promotion">
    <div class="tp-promotion__header">
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
        <component v-if="tab.component"
                   :is="tab.component"
                   :id="id"
                   class="mt-10"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import info from './info.vue';
import data from './data.vue';
import expect from './expect.vue';

@Component
export default class TpPromotion extends Vue {
  get id() {
    return this.$route.query && this.$route.query.id;
  }

  tabs = [
    { label: '基本信息', name: 'info', component: info },
    { label: '数据考核', name: 'data', component: data },
    { label: '推广预期', name: 'expect', component: expect },
  ];

  activeName = this.tabs[0] && this.tabs[0].name;
}
</script>
<style lang="scss" scoped>
.tp-promotion {
  position: relative;
  &__header {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
