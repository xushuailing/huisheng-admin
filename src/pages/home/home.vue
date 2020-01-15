<template>
  <div class="home">
    <div>
      <c-statisticsfrom></c-statisticsfrom>
      <div class="mt-20">
        <c-line></c-line>
      </div>
      <div class="mt-20">
        <c-admin-component></c-admin-component>
      </div>
      <el-row :gutter="20"
              class="mt-20">
        <el-col :span="14">
          <c-histogram></c-histogram>
        </el-col>
        <el-col :span="10">
          <c-messages></c-messages>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import CStatisticsfrom from './components/statistics.vue';
import CLine from './components/line.vue';
import CHistogram from './components/histogram.vue';
import CMessages from './components/messages.vue';
import CAdminComponent from './components/admin-component.vue';
import adminRouter from '@/router/admin';
import commonRouter from '@/router/common';
import merchantRouter from '@/router/merchant';

@Component({ components: { CStatisticsfrom, CLine, CHistogram, CMessages, CAdminComponent } })
export default class Home extends Vue {}
</script>
<style lang="scss" >
.home {
  &-title {
    font-size: 20px;
    padding-bottom: 20px;
  }
}
</style>
