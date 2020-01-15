<template>
  <component class="product-add"
             :is="component"
             :id="id"
             :data="data"
             :is-detail="isDetail"
             :sorts="sorts"></component>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import Virtual from './virtual.vue';
import Entity from './entity.vue';
import { obj } from '@/lib/@types/sc-param.d';
import { _Shopid, _IsVirtual } from '../../config';

interface Option {
  name: string;
  id: string;
}

@Component({ components: {} })
export default class ProductAdd extends Vue {
  component = _IsVirtual ? Virtual : Entity;

  get id() {
    return this.$route.query.id;
  }

  get isDetail() {
    return !!this.data;
  }

  data = null;

  sorts: Option[] = [];

  async getDetail() {
    if (!this.id) return;

    const loading = this.$utils._Loading.show();
    const type = _IsVirtual ? 'virtual' : 'entity';
    const api = this.$api.merchant.product.show[type];
    const params = { gid: this.id, shopid: _Shopid };

    try {
      const res = await this.$http.get(api, params);
      this.data = res.data || {};
    } catch (error) {
      console.log('获取商品数据失败: ', error);
    } finally {
      loading.close();
    }
  }

  async getSorts() {
    const api = this.$api.merchant.product.goodsType;
    const res = await this.$http.get(api, { shopid: _Shopid });
    this.sorts = res.data || [];
  }

  mounted() {
    this.getDetail();
    this.getSorts();
  }
}
</script>
<style lang="scss">
  .product-add {
    .el-table__header tr {
      height: auto;
    }
    .el-table__header tr .cell {
      font-size: 14px;
      color: inherit;
    }
    .sc-edit-table__form .el-table td,
    .sc-edit-table__form .el-table th {
      padding: 4px 0;
    }
    .sc-edit-table__form .el-form-item {
      margin-top: 10px;
    }
    // .el-form-item--mini.el-form-item,
    // .el-form-item--small.el-form-item {
    //   margin-bottom: 14px;
    // }
    &__image {
      width: 50px;
      height: 50px;
    }
    .main-image {
      .img-uploader {
        line-height: 0;
      }
    }
  }
</style>
