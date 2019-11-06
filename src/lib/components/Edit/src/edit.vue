<template>
  <component :is="componentId"
             ref='scEdit'
             v-bind="attrs"
             v-on="$listeners">
    <template v-for="slot in Object.keys($slots)">
      <slot :slot="slot"
            :name="slot"></slot>
    </template>
    <!-- <template slot="edit-footer-btn">
      <slot name="edit-footer-btn"></slot>
    </template>
    <template slot="edit-header">
      <slot name="edit-header"></slot>
    </template> -->
  </component>
</template>
<script>
import dialogEdit from './components/dialog-edit.vue';
import pageEdit from './components/page-edit.vue';

export default {
  name: 'ScEdit',
  props: {
    mode: {
      type: String,
      default: 'dialog',
    },
  },
  computed: {
    attrs() {
      return Object.assign({}, this.$attrs, { mode: this.mode });
    },
  },
  data() {
    return { componentId: dialogEdit };
  },
  created() {
    if (this.mode === 'dialog') {
      this.componentId = dialogEdit;
    }
    if (this.mode === 'page') {
      this.componentId = pageEdit;
    }
  },
};
</script>
<style lang='scss'>
@import './style/common.scss';
</style>
