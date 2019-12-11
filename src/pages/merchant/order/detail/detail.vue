<template>
  <component v-if="component"
             :is="component"
             :data="data"></component>
  <div v-else></div>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import Pay from './pay.vue';
import Receive from './receive.vue';
import Return from './return.vue';
import Send from './send.vue';
import { obj } from '@/lib/@types/sc-param.d';
import { _Uid } from '../../config';

const Components: obj = {
  1: Pay,
  2: Send,
  3: Receive,
  4: Return,
};

@Component({ components: {} })
export default class OrderDetail extends Vue {
  get id() {
    return this.$route.query.id;
  }

  data: obj = {};

  get component() {
    return (this.data.status && Components[this.data.status]) || null;
  }

  getDetail() {
    const api = this.$api.merchant.order.show;
    const param = { uid: _Uid, oid: this.id };
    this.$http.get(api, param).then((res) => {
      this.data = res.data || {};
    });
  }

  mounted() {
    this.getDetail();
  }
}
</script>
<style lang='scss' scoped>
  .order-detail {
    min-height: 550px;
    .border-dashed {
      border-bottom: 1px dashed #bbbbbb;
    }
    .border-primary {
      border: 1px solid rgba(86, 119, 252, 0.59);
    }
    .order-info {
      width: 50%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
    .mt-40 {
      margin-top: 40px;
    }
  }
</style>
