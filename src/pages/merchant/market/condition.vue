<template>
  <div class="add-coupon-condition pb-15 pl-15 pr-15 border-radius-8">
    <el-checkbox v-model="checked"
                 disabled>限制条件</el-checkbox>
    <div class="bg-border-color-extra-light p-15 border-radius-8">
      <template v-for="(item,i) in data">
        <el-form ref="elForm"
                 :key="i"
                 :model="item"
                 :disabled="!checked"
                 label-position="left"
                 label-width="40px"
                 class="mb-30">
          <span>条件{{i+1}}：</span>
          <el-form-item label="满"
                        prop="num"
                        :rules="{required: true, message: '请输入金额', trigger: 'blur'}">
            <el-input v-model.number="data[i].num"
                      type="number"
                      placeholder="请输入金额">
            </el-input>
            <span class="ml-10">元</span>
          </el-form-item>
          <el-form-item label="减"
                        prop="coupon_price"
                        :rules="{required: true, message: '请输入金额', trigger: 'blur'}">
            <el-input v-model.number="data[i].coupon_price"
                      type="number"
                      placeholder="请输入金额">
            </el-input>
            <span class="ml-10">元</span>
          </el-form-item>
        </el-form>
      </template>

      <el-button type="primary"
                 size="small"
                 :disabled="!checked"
                 @click="handleAdd">
        添加条件
      </el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Ref, Prop, Watch } from 'vue-property-decorator';
import { ElForm } from 'element-ui/types/form';
import { obj } from '@/lib/@types/sc-param.d';

export interface SortItem {
  num: string;
  coupon_price: string;
}

@Component
export default class ActvSortsAdd extends Vue {
  @Prop(Array)
  readonly value!: SortItem[] | undefined;

  @Ref('elForm') elForm!: ElForm[];

  checked = false;

  data = [this.temp()];

  @Watch('value')
  onValueChange(val: any) {
    console.log('value: ', val);
    if (val) {
      this.data = val;
    }
  }

  @Watch('data', { deep: true })
  onDataChange(val: any) {
    console.log('data: ', val);
    this.$emit('update:value', val);
  }

  temp(): SortItem {
    return { num: '', coupon_price: '' };
  }

  validate() {
    let flag = false;
    const validate = (el: ElForm) => {
      el.validate((valid) => {
        console.log('valid: ', valid);

        flag = valid;
      });
    };

    for (let i = 0; i < this.elForm.length; i++) {
      const form = this.elForm[i];

      validate(form);
      console.log('form: ', form);
      if (!flag) break;
    }

    return flag;
  }

  handleAdd() {
    console.log('this.validate(): ', this.validate());

    if (this.validate()) {
      this.data.push(this.temp());
    }
  }
}
</script>
<style lang="scss">
  .add-coupon-condition .el-form-item {
    margin-bottom: 20px;
  }
</style>
