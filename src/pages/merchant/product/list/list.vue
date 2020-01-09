<template>
  <component :is="component"></component>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { _IsVirtual } from '../../config';
import Virtual from './virtual.vue';
import Entity from './entity.vue';

@Component({ components: {} })
export default class OrderDetail extends Vue {
  component = _IsVirtual ? Virtual : Entity;
}
</script>
