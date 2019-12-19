<template>
  <el-radio-group v-model="form.isforever"
                  class="pt-10">
    <el-radio :label="1"
              class="block">永久有效</el-radio>
    <el-radio :label="0">
      <span>自发放日起</span>
      <el-input-number v-model="form.date"
                       size="small"
                       :controls="false"
                       :precision="0"
                       :min="0"
                       style="width:110px"
                       class="mt-15 ml-10 mr-10"></el-input-number>
      <span>天后失效</span>
    </el-radio>
  </el-radio-group>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';

interface IForm {
  isforever: number;
  date: number;
}

@Component
export default class ActvEffectDate extends Vue {
  @Prop([String, Array])
  readonly value!: string | IForm | undefined;

  form: IForm = { isforever: 0, date: 1 };

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
