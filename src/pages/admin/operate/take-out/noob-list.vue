<template>
  <sc-min-table :ref="name"
                stripe
                :columns-handler="columnsHandler"
                :columns="columns"
                :columns-props="columnsProps"
                :table-config="tableConfig">
  </sc-min-table>
</template>
<script lang="ts">
import { Component, Vue, Prop, Mixins } from 'vue-property-decorator';
import mixins from './mixins';

export default class OperateNoob extends Mixins(mixins) {}
</script>
