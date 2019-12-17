<template>
  <div class="sort-add bg-border-color-extra-light p-15 border-radius-8">
    <el-form v-for="(item,i) in form"
             :key="i"
             label-position="left"
             class="mb-30">
      <div>分类{{i+1}}</div>
      <el-form-item label="广告位分类：">
        <el-input placeholder="请输入广告位分类"
                  v-model="form[i].title"></el-input>
      </el-form-item>
      <el-form-item label="广告位价位：">
        <el-input placeholder="请输入广告位价位"
                  v-model="form[i].price">
          <span slot="prefix">￥</span>
        </el-input>
        <span class="font-16 ml-10">/个月</span>
      </el-form-item>
      <!-- <el-form-item label="有效期：">
        <el-input placeholder="请输入有效期"
                  v-model="form[i].validity"></el-input>
      </el-form-item> -->
      <el-form-item label="介绍：">
        <el-input placeholder="请输入介绍"
                  v-model="form[i].desc"
                  type="textarea"
                  rows="4"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary"
               size="small"
               @click="handleAdd">添加分类</el-button>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';

interface SortItem {
  title: string;
  price: string;
  // validity: string;
  desc: string;
}

@Component
export default class ActvSortsAdd extends Vue {
  @Prop([String, Array])
  readonly value!: string | SortItem[] | undefined;

  ruleForm = {
    pass: '',
  };

  temp: SortItem = {
    title: '',
    price: '',
    // validity: '',
    desc: '',
  };

  form = [this.temp];

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

  handleAdd() {
    this.form.push(this.temp);
  }
}
</script>

<style lang="scss">
.sc-add-form .el-form-item.vertical .sort-add .el-form-item__content {
  margin-left: 140px !important;
}
</style>
