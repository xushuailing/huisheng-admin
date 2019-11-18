<template>
  <div class="sort-add">

  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';

interface SortItem {
  name: string;
  price: string;
  validity: string;
  desc: string;
}

@Component
export default class ActvSortsAdd extends Vue {
  @Prop([String, Array])
  readonly value!: string | SortItem[] | undefined;

  form: SortItem[] = [];

  @Watch('value')
  onValueChange(val: any) {
    console.log('value: ', val);
    if (val) {
      this.form = typeof val === 'string' ? JSON.parse(val) : val;
    }
  }

  @Watch('form')
  onFormChange(val: any) {
    console.log('form: ', val);
    this.$emit('upadte:value', val);
  }
}
</script>
