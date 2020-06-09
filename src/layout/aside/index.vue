<template>
  <div class='app-aside'
       ref="app-aside">
    <router-link to="/"
                 class="logo sc-bg-primary">
    </router-link>
    <el-menu :unique-opened="true"
             :default-active="defaultActive">
      <sidebar-item v-for="route in routers"
                    :key="route.id"
                    :item="route" />
    </el-menu>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import adminRouter from '@/router/admin';
import merchantRouter from '@/router/merchant';
import commonRouter from '@/router/common';
import SidebarItem from './sidebar-item.vue';

@Component({ components: { SidebarItem } })
export default class Aside extends Vue {
  routers: any[] = [];

  get defaultActive() {
    return this.$route.path;
  }

  mounted() {
    this.routers = this.$utils._Storage.get<any[]>('user_menu') || [];
    console.log('this.routers', this.routers);
  }
}
</script>

<style lang='scss' scoped>
.app-aside {
  height: 100%;
  display: flex;
  flex-direction: column;
  .el-menu {
    flex: 1;
  }
}
</style>
