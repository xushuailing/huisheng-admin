<template>
  <el-col class="market-mine">
    <h3>我的优惠券</h3>
    <el-col class="mt-20 mb-20 bg-white border-radius-8 p-20 pb-30">
      <el-row :gutter="40"
              class="mb-30">
        <!-- 满减 -->
        <el-col :span="12">
          <div class="bg-info-lighter border-radius-8 p-20">
            <sc-add-form mode="page"
                         :api="api"
                         :config="reductConfig">
              <el-button slot="delete"
                         size="small"
                         type="primary"
                         class="ml-20">删除</el-button>
            </sc-add-form>
          </div>
        </el-col>
        <!-- 折扣 -->
        <el-col :span="12"
                class="mb-30">
          <div class="bg-info-lighter border-radius-8 p-20">
            <sc-add-form mode="page"
                         :api="api"
                         :config="discountConfig">
              <el-button slot="delete"
                         size="small"
                         type="primary"
                         class="ml-20">删除</el-button>
            </sc-add-form>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-col>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ScForm } from '@/lib/@types/sc-form.d';
import { obj } from '@/lib/@types/sc-param.d';

@Component
export default class MarketMine extends Vue {
  get api() {
    return ''; //  this.$api.admin.activity.adsSorts.create;
  }

  formConfig = {
    width: '80%',
    buttons: [
      { mode: 'submit', text: '修改', attrs: { type: 'primary', size: 'small', plain: false } },
      { mode: 'slot', slotName: 'delete' },
    ],
    rules: [],
    handleSubmit: (data: any) => {
      console.log('data :', data);
    },
  };

  reductConfig = {
    ...this.formConfig,
    data: [
      [
        {
          label: '优惠券名称：',
          prop: 'none1',
          tag: {
            attr: { placeholder: '请输入优惠券名称', 'show-word-limit': true, maxlength: '10' },
          },
        },
        { label: '满：', prop: 'none2' },
        { label: '减：', prop: 'none3' },
        { label: '满：', prop: 'none4' },
        { label: '减：', prop: 'none5' },
        {
          label: '有效时间：',
          prop: 'none6',
          tag: {
            tagType: 'date-picker',
            attr: {
              type: 'daterange',
              placeholder: '请选择有效时间',
              'start-placeholder': '开始时间',
              'end-placeholder': '结束时间',
            },
          },
        },
      ],
    ],
  };

  discountConfig = {
    ...this.formConfig,
    data: [
      [
        {
          label: '优惠券名称：',
          prop: 'none1',
          tag: {
            attr: { placeholder: '请输入优惠券名称', 'show-word-limit': true, maxlength: '10' },
          },
        },
        { label: '数量 1：', prop: 'none2' },
        { label: '折扣 1：', prop: 'none3' },
        { label: '数量 1：', prop: 'none4' },
        { label: '折扣 1：', prop: 'none5' },
        {
          label: '有效时间：',
          prop: 'none6',
          tag: {
            tagType: 'date-picker',
            attr: {
              type: 'daterange',
              placeholder: '请选择有效时间',
              'start-placeholder': '开始时间',
              'end-placeholder': '结束时间',
            },
          },
        },
      ],
    ],
  };
}
</script>
<style lang='scss' scoped>
  .market-mine {
  }
</style>
