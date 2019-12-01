<template>
  <div class="pb-15 pl-15 pr-15 border-radius-8">
    <el-checkbox v-model="form.checked">限制条件</el-checkbox>
    <div class="bg-border-color-extra-light p-15 border-radius-8">
      <el-form :disabled="!form.checked"
               v-for="(item,i) in form.data"
               :key="i"
               class="mb-30">
        <span>条件{{i+1}}：</span>
        <el-form-item class="mb-10"
                      label="满">
          <el-input type="number"
                    placeholder="请输入广告位价位"
                    v-model.number="form.data[i].none11">
          </el-input>
          <span class="ml-10">元</span>
        </el-form-item>
        <el-form-item class="mb-10"
                      label="减">
          <el-input type="number"
                    placeholder="请输入广告位价位"
                    v-model.number="form.data[i].none22">
          </el-input>
          <span class="ml-10">元</span>
        </el-form-item>
      </el-form>

      <el-button type="primary"
                 size="small"
                 :disabled="!form.checked"
                 @click="handleAdd">
        添加条件
      </el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';

export interface SortItem {
  checked: boolean;
  data: { none11: string; none22: string }[];
}

@Component
export default class ActvSortsAdd extends Vue {
  @Prop([Object])
  readonly value!: SortItem | undefined;

  checked = false;

  form = {
    checked: false,
    data: [this.temp()],
  };

  @Watch('value')
  onValueChange(val: any) {
    console.log('value: ', val);
    if (val) {
      this.form = typeof val === 'string' ? JSON.parse(val) : val;
    }
  }

  @Watch('form', { deep: true })
  onFormChange(val: any) {
    console.log('form: ', val, this.form.checked);
    if (this.form.checked) {
      this.$emit('update:value', val);
    } else {
      this.$emit('upadte:value', null);
    }
  }

  temp(): SortItem['data'][0] {
    return { none11: '', none22: '' };
  }

  handleAdd() {
    this.form.data.push(this.temp());
  }
}
</script>
