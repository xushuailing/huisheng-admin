<template>
  <div class='app-aside'
       ref="app-aside">
    <router-link to="/"
                 class="logo sc-bg-primary">
    </router-link>
    <el-menu class="el-menu-vertical-demo"
             :unique-opened="true"
             :default-active="defaultActive">
      <sidebar-item v-for="route in routers"
                    :key="route.id"
                    :item="route" />
    </el-menu>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SidebarItem from './sidebar-item.vue';
import adminRouter from '@/router/admin';
import merchantRouter from '@/router/merchant';
import commonRouter from '@/router/common';

@Component({ components: { SidebarItem } })
export default class Aside extends Vue {
  get defaultActive() {
    return this.$route.path;
  }

  get routers() {
    // const routes = [].concat(commonRouter, merchantRouter, adminRouter);
    return [];
    // return commonRouter.concat(merchantRouter, adminRouter);
  }

  mounted() {
    console.log(this, 'this');
    // console.log('adminRouter :', adminRouter);
  }
}
</script>

<style lang='scss' scoped>
.app-aside {
}
</style>
