<template>
  <el-radio-group v-model="form.coupon_type">
    <div>
      <el-radio :label="0">永远有效</el-radio>
    </div>
    <div>
      <el-radio class="mt-20"
                :label="1">
        <span>
          <span class="mr-20">有效</span>
          <el-date-picker :disabled="!form.coupon_type"
                          v-model="form.date"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          type="datetimerange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
        </span>
      </el-radio>
    </div>
  </el-radio-group>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';

@Component
export default class ActvSortsAdd extends Vue {
  @Prop(Object)
  readonly value!: Object | undefined;

  form = {
    coupon_type: 0,
    date: '',
  };

  @Watch('value')
  onValueChange(val: any) {
    if (val) this.form = val;
  }

  @Watch('form', { deep: true })
  onFormChange(val: any) {
    this.$emit('update:value', val);
  }
}
</script>
