
<template>
  <div class="tp-shop">
    <!-- <div class="tp-shop__header">
      <el-button size="small"
                 type="primary">一键导入</el-button>
      <el-button size="small"
                 type="primary">上传数据</el-button>
    </div> -->
    <el-tabs class="sc-tabs"
             v-model="activeName">
      <el-tab-pane v-for="tab in tabs"
                   :key="tab.name"
                   :label="tab.label"
                   :name="tab.name">
        <component :is="tab.component"
                   :detail="detail"
                   :name="tab.name"
                   class="bg-white p-20"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import editor from './editor.vue';

@Component
export default class TpShop extends Vue {
  get id() {
    return this.$route.query && this.$route.query.id;
  }

  tabs = [
    { label: '曝光率', name: 'exposure_rate', component: editor },
    { label: '转化率', name: 'shop_conversion_rate', component: editor },
    { label: '下单转化率', name: 'order_conversion_rate', component: editor },
    { label: '复购率', name: 'repeat_purchase_rate', component: editor },
    { label: '客单价', name: 'customer_unit_price', component: editor },
    { label: '店铺诊断', name: 'shop_diagnosis', component: editor },
    { label: '店铺装修', name: 'shop_decoration', component: editor },
    { label: '营销策划', name: 'marketing_planning', component: editor },
    { label: '推广设计', name: 'extension_design', component: editor },
    { label: '感谢信', name: 'thank_you_letter', component: editor },
  ];

  activeName = this.tabs[0].name;

  mounted() {
    this.getData();
  }

  detail = '';

  async getData() {
    const api = this.$api.admin.thirdpartnar.maintain.show;
    const { data } = await this.$http.get(api, { id: this.id });
    console.log('data :', data);

    this.detail = JSON.stringify(data);
  }
}
</script>
<style lang="scss" scoped>
.tp-shop {
  position: relative;
  &__header {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
