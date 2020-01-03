<template>
  <div class="preferential">
    <div v-for="item in list"
         :key="item.type+'_'+item.id"
         class="flex-column bg-white mb-30 mr-30 p-25 border-radius-4">
      <h2 class="m-0">{{item.title}}</h2>
      <div class="pt-15 pb-15 flex-1 font-text-secondary">{{item.introduction}}</div>
      <div>
        <el-button type="primary"
                   size="small"
                   class="pl-20 pr-20"
                   @click="onOpen(item)">开启</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import mixin from './mixin';

@Component
export default class Market extends Mixins(mixin) {}
</script>

<style lang="scss" scoped>
  .preferential {
    display: grid;
    grid-template-columns: repeat(auto-fit, 25%);
    grid-template-rows: 300px;
  }
</style>
