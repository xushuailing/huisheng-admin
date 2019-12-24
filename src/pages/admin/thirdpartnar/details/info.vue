<template>
  <div class="flex-column p-20 bg-white border-radius-4">
    <div v-for="(item,key) in data"
         :key="key"
         class="pt-10 pb-10">
      <span>{{item.label}}</span>
      <el-button v-if="key==='contract'"
                 type="primary"
                 size="small"
                 @click="handleDetail(item.value)">查看合同</el-button>
      <span v-else
            class="pl-10">{{item.value}}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';

// TODO: 95、详情接口
@Component
export default class TpShopInfo extends Vue {
  // @Prop({ type: String, required: true })
  // id!: string;

  data = {
    name: { label: '店铺名称：', value: '名称名称名称' },
    package: { label: '代运营套餐：', value: '单平台单月' },
    platform: { label: '平台选择：', value: '美团' },
    effectiveDate: { label: '有效期：', value: '2019.09.04 - 2020.09.04' },
    contract: { label: '合同：', value: '' },
  };

  handleDetail(url: string) {
    // 查看合同
    this.$message.warning('没有原型图');
  }
}
</script>
