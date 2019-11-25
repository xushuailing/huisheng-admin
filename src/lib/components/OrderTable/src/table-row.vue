<template>
  <div class="tablecolumn">
    <div class="tablecolumn-header">
      <slot name="top_th"></slot>
    </div>
    <div class="tablecolumn-body">
      <slot></slot>
    </div>
    <div class="tablecolumn-footer">
      <slot name="footer_th"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.tablecolumn {
  border-radius: 8px;
  overflow: hidden;
  &-header {
    padding: 0 20px;
    line-height: 40px;
    background: #f7f7f7;
    border-bottom: 1px solid #ebebeb;
  }
  &-body {
    padding: 0 20px;
  }
  &-footer{
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
  }
}
</style>
