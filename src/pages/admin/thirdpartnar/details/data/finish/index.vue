
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
    { label: '招牌设计', name: 'signage_design', component: editor },
    { label: '专场海报', name: 'special_poster', component: editor },
    { label: '产品图片', name: 'product_pictures', component: editor },
    { label: '店铺公告', name: 'shop_notices', component: editor },
    { label: '产品描述', name: 'product_description', component: editor },
    { label: '产品展示', name: 'product_display', component: editor },
    { label: '产品名称', name: 'product_name', component: editor },
    { label: '分类排版', name: 'typesetting', component: editor },
    { label: '规格属性', name: 'specification_attribute', component: editor },
    { label: '店铺logo', name: 'shop_log', component: editor },
    { label: '商品标签', name: 'commodity_label', component: editor },
    { label: '套餐设计', name: 'package_design', component: editor },
  ];

  activeName = this.tabs[0].name;

  mounted() {
    this.getData();
  }

  detail = '';

  async getData() {
    const api = this.$api.admin.thirdpartnar.finish.show;
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
