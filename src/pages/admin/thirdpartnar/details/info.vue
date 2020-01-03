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

const platform = ['', '美团', '饿了么', '美团,饿了么'];

@Component
export default class TpShopInfo extends Vue {
  @Prop({ type: String, required: true })
  id!: string;

  data = {
    name: { label: '店铺名称：', value: '' },
    package: { label: '代运营套餐：', value: '' },
    platform: { label: '平台选择：', value: '' },
    effectiveDate: { label: '有效期：', value: '' },
    contract: { label: '合同：', value: '' },
  };

  mounted() {
    this.getDetail();
  }

  getDetail() {
    const api = this.$api.admin.thirdpartnar.show;
    this.$http.get(api, { id: this.id }).then(({ data }) => {
      this.data.name.value = data.shop_name;
      this.data.package.value = data.package_name;
      this.data.platform.value = platform[data.platform];
      this.data.effectiveDate.value = `${data.start_time} - ${data.end_time}`;

      console.log('data', data);
    });
  }

  handleDetail(url: string) {
    // 查看合同
    this.$message.warning('没有原型图');
  }
}
</script>
