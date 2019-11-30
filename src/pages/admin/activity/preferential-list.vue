<template>
  <div class="preferential">
    <div v-for="item in list"
         :key="item.id"
         class="flex-column bg-white p-25 border-radius-4">
      <div class="font-20 font-bold">{{item.title}}</div>
      <div style="height:200px"
           class="pt-15 pb-15  font-text-secondary">{{item.desc}}</div>
      <div>
        <el-button type="primary"
                   size="small"
                   class="pl-20 pr-20"
                   @click="onOpen(item.id)">开启</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';

interface CouponsItem {
  id: string;
  title: string;
  desc?: string;
}

@Component
export default class ActvPreferential extends Vue {
  list: CouponsItem[] = [];

  onOpen(id: string) {
    this.$router.push({ path: '/activity/preferential-add', query: { id } });
  }

  getList() {
    this.$http
      .get(this.$api.admin.activity.coupon.index, { limit: 1e6 })
      .then((res) => {
        // TODO: 没返回规则字段
        this.list = res.data || [];
      })
      .catch((err) => {
        this.$utils._ResponseError(err);
      });
  }

  mounted() {
    this.getList();
  }
}
</script>

<style lang="scss" scoped>
.preferential {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}
</style>
