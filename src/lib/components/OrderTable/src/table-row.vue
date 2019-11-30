<template>
  <div class="tablecolumn bg-white border-radius-8">
    <div class="tablecolumn-header bg-info-lighter border-bottom">
      <slot name="top_th"></slot>
    </div>
    <div class="tablecolumn-body">
      <slot></slot>
    </div>
    <div v-if="$slots.footer_th"
         class="tablecolumn-footer p-15">
      <slot name="footer_th"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
  .tablecolumn {
    border-radius: 20px;
    overflow: hidden;
    &-header {
      padding: 0 20px;
      line-height: 40px;
    }
    &-body {
      & > * > * {
        flex: 1;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 15px;
        padding-right: 15px;
      }
    }
    &-footer {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
</style>
