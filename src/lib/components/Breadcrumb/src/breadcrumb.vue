<template>
  <div class="sc-breadcrumb flex flex-jsb flex-ac pl-5">
    <div class="flex-1">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item, index) in breadcrumb"
                            :key="index">
          {{item.title}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <slot></slot>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class ScBreadcrumb extends Vue {
  get breadcrumb() {
    return this.$route.meta.breadcrumb;
  }
}
</script>
<style lang="scss" scoped>
.sc-breadcrumb {
  height: 40px;
}
.el-breadcrumb {
  font-size: 18px;
  line-height: 30px;
}
</style>
