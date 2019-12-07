<template>
  <div class="home">
    <div class="bg-warning-lighter p-20">
      <div v-for="(router,i) in routers"
           :key="i">
        <div :key="i+ii"
             v-for="(route,ii) in router">
          <p>{{route.name}}</p>
          <span class="pl-20"
                :key="i+i+a"
                v-for="(item,a) in route.children">
            <router-link class="font-primary"
                         :to="route.path+'/'+item.path">{{item.name}}</router-link>
          </span>
        </div>

        <hr />
      </div>

    </div>
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
export default class Home extends Vue {
  get routers() {
    const admin = this.$utils._Clone(adminRouter) as any;
    const common = this.$utils._Clone(commonRouter) as any;
    const merchant = this.$utils._Clone(merchantRouter) as any;
    return [admin, merchant, common];
  }
}
</script>
<style lang="scss" >
.home {
  &-title {
    font-size: 20px;
    padding-bottom: 20px;
  }
}
</style>
