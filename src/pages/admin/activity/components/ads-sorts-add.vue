<template>
  <div class="sort-add bg-border-color-extra-light p-15 border-radius-8">
    <template v-for="(item,i) in form">
      <el-form :key="i"
               label-position="left"
               ref="elForm"
               :model="item"
               class="mb-30">
        <div>分类{{i+1}}</div>
        <el-form-item label="广告位分类："
                      prop="title"
                      :rules="{required: true, message: '请输入广告位分类', trigger: 'blur'}">
          <el-input placeholder="请输入广告位分类"
                    v-model="form[i].title"></el-input>
        </el-form-item>
        <el-form-item label="广告位价位："
                      prop="price"
                      :rules="{required: true, message: '请输入广告位价位', trigger: 'blur'}">
          <el-input placeholder="请输入广告位价位"
                    v-model="form[i].price">
            <span slot="prefix">￥</span>
          </el-input>
          <span class="font-16 ml-10">/个月</span>
        </el-form-item>
        <el-form-item label="介绍：">
          <el-input placeholder="请输入介绍"
                    v-model="form[i].introduction"
                    type="textarea"
                    rows="4"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <el-button type="primary"
               size="small"
               @click="handleAdd">添加分类</el-button>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator';
import { ElForm } from 'element-ui/types/form';
import { obj } from '@/lib/@types/sc-param.d';

interface SortItem {
  title: string;
  price: string;
  // validity: string;
  introduction: string;
  id: '';
}

@Component
export default class ActvSortsAdd extends Vue {
  @Prop([String, Array])
  readonly value!: string | SortItem[] | undefined;

  @Ref('elForm') elForm!: ElForm[];

  ruleForm = {
    pass: '',
  };

  form = [this.initForm()];

  @Watch('value')
  onValueChange(val: any) {
    if (val) {
      this.form = typeof val === 'string' ? JSON.parse(val) : val;
    }
  }

  @Watch('form')
  onFormChange(val: any) {
    this.$emit('upadte:value', val);
  }

  mounted() {
    this.$emit('emitValidate', this.validate);
  }

  validate() {
    let flag = false;
    const validate = (el: ElForm) => {
      el.validate((valid) => {
        flag = valid;
      });
    };

    for (let i = 0; i < this.elForm.length; i++) {
      const form = this.elForm[i];
      validate(form);
      if (!flag) break;
    }

    return flag;
  }

  handleAdd() {
    if (this.validate()) {
      this.form.push(this.initForm());
    }
  }

  initForm(): SortItem {
    return {
      title: '',
      price: '',
      introduction: '',
      id: '',
    };
  }
}
</script>

<style lang="scss">
.sc-add-form .el-form-item.vertical .sort-add .el-form-item__content {
  margin-left: 140px !important;
}
.sort-add .el-form-item {
  margin-bottom: 20px;
}
</style>
