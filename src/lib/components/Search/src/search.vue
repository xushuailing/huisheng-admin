<template>
  <div class="sc-search">
    <component :is="isComponent"
               v-on="$listeners"
               :config="config"
               :visible.sync="searchFormVisible">
    </component>
  </div>
</template>
<script>
import CCollapse from './search-collapse.vue';
import CDialog from './search-dialog.vue';
import mixins from '../mixins';

export default {
  name: 'ScSearch',
  mixins: [mixins],
  props: { model: String },
  watch: {
    searchFormVisible(val) {
      this.$emit('emitSearchStatus', val);
    },
  },
  computed: {
    isComponent() {
      let is = null;
      if (this.model === 'dialog') {
        is = CDialog;
      } else {
        is = CCollapse;
      }
      return is;
    },
  },
};
</script>
