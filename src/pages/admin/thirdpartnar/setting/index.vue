
<template>
  <div class="TpSetting">
    <el-tabs class="sc-tabs"
             v-model="activeName">
      <el-tab-pane lazy
                   v-for="tab in tabs"
                   :key="tab.name"
                   :label="tab.label"
                   :name="tab.name">
        <component :is="tab.component"
                   class="mt-20"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import contract from './contract.vue';
import days from './days.vue';
import { obj } from '@/lib/@types/sc-param.d';

// TODO:  92、合同设置-列表，修改接口 91、代运营-列表，修改接口
@Component
export default class TpSetting extends Vue {
  tabs = [
    { label: '合同设置', name: 'contract', component: contract },
    { label: '代运营', name: 'days', component: days },
  ];

  activeName = this.tabs[1].name;
}
</script>
