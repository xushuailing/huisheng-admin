<template>
  <el-radio-group v-model="form.coupon_type"
                  class="pt-10">
    <el-radio :label="1"
              class="block">永久有效</el-radio>
    <el-radio :label="0" class="mt-20">
      <span class="mr-10">有效期</span>
      <el-date-picker v-model="form.strtime"
                      type="datetime"
                      placeholder="选择开始时间">
      </el-date-picker>
      <span class="ml-10 mr-10">至</span>
      <el-date-picker v-model="form.endtime"
                      type="datetime"
                      placeholder="选择结束时间">
      </el-date-picker>
    </el-radio>
  </el-radio-group>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';

interface IForm {
  coupon_type: number;
  strtime: any;
  endtime: any;
}

@Component
export default class ActvEffectDate extends Vue {
  @Prop(Object)
  readonly value!: Object | IForm | undefined;

  form: IForm = { coupon_type: 0, strtime: '', endtime: '' };

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
