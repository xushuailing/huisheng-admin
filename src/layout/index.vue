<template>
  <el-container class="h100">
    <el-header>
      <Header></Header>
    </el-header>

    <el-container>
      <!-- <el-aside width="200px">
        <Aside></Aside>
      </el-aside> -->
      <el-main class="flex-column" :class="{
          'el-main-p': breadcrumb,
        }">
        <template v-if="breadcrumb">
          <sc-breadcrumb></sc-breadcrumb>
        </template>
        <Main></Main>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Main from './main.vue';
import Header from './header.vue';
import Aside from './aside.vue';

@Component({ components: { Main, Header, Aside } })
export default class App extends Vue {
  get breadcrumb() {
    const { $route } = this;
    const { breadcrumb, breadcrumbHide } = $route.meta;
    return $route.meta && breadcrumb && breadcrumb.length && !breadcrumbHide;
  }
}
</script>
<style lang="scss">
.el-container {
  // height: 100%;
}
.el-header,
.el-aside {
  background: $--color-primary;
}
.el-main {
  background: $--background-color-base;
}
.el-main-p {
  padding-top: 70px;
  position: relative;
}

.el-main-p .sc-breadcrumb {
  position: absolute;
  top: 20px;
}
</style>
