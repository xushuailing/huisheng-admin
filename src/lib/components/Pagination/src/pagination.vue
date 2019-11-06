<template>
  <div class='sc-pagination'>
    <el-pagination v-on="$listeners"
                   v-bind="bingAttr">
      <span v-if="slotAttr.isCheckbox"
            class="sc-pagination-slot">
        <el-button class="ml-10 mr-10"
                   type="primary"
                   size='mini'
                   @click="$emit('onSlotClick')">{{slotAttr.text||'下架'}}</el-button>
      </span>
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'ScPagination',

  data() {
    return { checked: false, layout: 'slot,total, sizes, prev, pager, next, jumper' };
  },
  computed: {
    slotAttr() {
      return this.$attrs.slotAttr || {};
    },
    bingAttr() {
      const { $attrs } = this;
      const pageSizes = [...new Set([10, 20, 50, 100].concat([$attrs.pageSize]))].sort(
        (a, b) => a - b,
      );
      const bind = {
        layout: this.layout,
        background: true,
        'page-sizes': pageSizes,
      };

      Object.keys($attrs).forEach((key) => {
        const v = $attrs[key];
        const uniformKey = key.replace(/([A-Z])/, '-$1').toLowerCase(); // 驼峰命名转换 : aB ==> a-b
        bind[uniformKey] = v;
      });

      return bind;
    },
  },
  methods: {},
};
</script>
<style lang='scss'>
.sc-pagination {
  text-align: center;
  padding: 24px 0;
  &-slot {
    margin-left: 15px;
    .el-button {
      background-color: $--color-primary;
    }
    .el-button:hover {
      color: #fff;
      border-color: $--color-primary-light-2;
      background-color: $--color-primary-light-2;
    }
  }
}
</style>
