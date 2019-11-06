<template>
  <component :is="componentId"
             ref="scAddForm"
             v-bind="attrs"
             v-on="$listeners">
    <template v-for="slot in Object.keys($slots)">
      <slot :slot="slot"
            :name="slot"></slot>
    </template>
  </component>
</template>
<script>
import dialogAddForm from './components/dialog-add-form.vue';
import pageAddForm from './components/page-add-form.vue';

export default {
  name: 'ScAddForm',
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
    return { componentId: dialogAddForm };
  },
  created() {
    if (this.mode === 'dialog') {
      this.componentId = dialogAddForm;
    }
    if (this.mode === 'page') {
      this.componentId = pageAddForm;
    }
  },
};
</script>

<style lang="scss">
@import './style/common.scss';
</style>
