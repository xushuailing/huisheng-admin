<template>
  <div class='app-header'>
    <div class="flex flex-ac h100 app-header-title">
      欢迎来到莱赶集商家后台管理系统~
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class AppHeader extends Vue {}
</script>
<style lang="scss" scoped>
.app-header {
  height: 100%;
  &-title {
    color: #fff;
    font-size: 16px;
  }
}
</style>
