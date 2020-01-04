<template>
  <el-radio-group v-model="form.coupon_type"
                  class="pt-10">
    <el-radio :label="0"
              class="block">永久有效</el-radio>
    <el-radio :label="1"
              class="mt-20">
      <span class="mr-10">有效期</span>
      <el-date-picker :disabled="!form.coupon_type"
                      v-model="form.date"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
      </el-date-picker>
    </el-radio>
  </el-radio-group>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';

@Component
export default class EffectiveTime extends Vue {
  @Prop(Object)
  readonly value!: Object | undefined;

  form = {
    coupon_type: 0,
    date: '',
  };

  @Watch('value', { immediate: true, deep: true })
  onValueChange(val: any) {
    if (val) this.form = val;
  }

  @Watch('form', { deep: true })
  onFormChange(val: any) {
    this.$emit('update:value', val);
  }
}
</script>
