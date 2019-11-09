<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>

    <el-container>
      <!-- <el-aside width="200px">
        <Aside></Aside>
      </el-aside> -->
      <el-main>
        <template v-if="$route.meta && $route.meta.breadcrumb && $route.meta.breadcrumb.length">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item, index) in $route.meta.breadcrumb" :key="index">{{
              item.title
            }}</el-breadcrumb-item>
          </el-breadcrumb>
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
export default class App extends Vue {}
</script>
<style lang="scss" scoped>
.el-container {
  height: 100%;
}
.el-header,
.el-aside {
  background: $--color-primary;
}
.el-main {
  background: $--background-color-base;
  padding-top: 70px;
  position: relative;
}
.el-breadcrumb {
  position: absolute;
  top: 20px;
  font-size: 18px;
  line-height: 30px;
}
</style>
