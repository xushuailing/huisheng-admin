<template>
  <el-radio-group v-model="form.isforever"
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
  isforever: number;
  strtime: any;
  endtime: any;
}

@Component
export default class ActvEffectDate extends Vue {
  @Prop([String, Array])
  readonly value!: string | IForm | undefined;

  form: IForm = { isforever: 0, strtime: '', endtime: '' };

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
