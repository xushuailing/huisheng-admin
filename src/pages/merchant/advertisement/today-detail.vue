<template>
  <div class="today-detail bg-white border-radius-8">
    <sc-breadcrumb class="w100 flex-je pr-30 mb-10">
      <el-button type="primary"
                 @click="toEdit"
                 class="mr-10">编辑</el-button>
    </sc-breadcrumb>
    <div class="pl-25 pr-25">
      <el-row :gutter="20">
        <el-col v-for="item in data"
                :key="item.id"
                :span="8">
          <div class="p-30 flex">
            <el-image :src="item.image"
                      class="today-detail__image"></el-image>
            <div class="flex-column flex-jsb ml-10 pt-10 pb-10">
              <div class="font-16">{{item.title}}</div>
              <div>&yen;{{item.price}}</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';

interface Goods {
  id: string | number;
  title: string;
  image: string;
  price: string;
}

@Component
export default class Advertisement extends Vue {
  toEdit() {
    this.$router.push({ path: 'add-goods', query: { id: this.$route.query.id } });
  }

  data: Goods[] = [
    {
      id: 1,
      title: '商品名称商品名称',
      image: 'asdf',
      price: '120.00',
    },
  ];

  async getList() {
    const api = this.$api.merchant.ads.user;
    const res = await this.$http.get(api, { limit: 10e5 });
    this.data = res.data;
    console.log('res.data: ', res.data);
  }

  mounted() {
    // this.getList();
  }
}
</script>
<style lang="scss" scoped>
  .today-detail {
    min-height: 80vh;
    &__image {
      width: 100px;
      height: 100px;
    }
  }
</style>
