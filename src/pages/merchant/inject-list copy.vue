<template>
  <div class="merchant-inject">

    <sc-search :config="searchConfig">

    </sc-search>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class MerchantInject extends Vue {

}
</script>
