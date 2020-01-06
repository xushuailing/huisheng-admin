<template>
  <div class="ads-detail">
    <el-row :gutter="20">
      <el-col v-for="item in data"
              :key="item.id"
              :span="12"
              class="mb-20">
        <div class="ads-detail-item bg-white border-radius-8 p-15 banner pt-30">
          <div v-for="row in list"
               :key="row.label">
            <div v-if="isShow(item,row)"
                 class="banner-item mb-20">
              <span class="label">{{row.label}}</span>
              <div class="content">
                <el-image v-if="row.type==='image'&&item[row.prop]"
                          :src="item[row.prop]"
                          class="banner-image"></el-image>
                <div v-else-if="isNoData(item,row)"
                     class="font-primary">未上传</div>
                <span v-else>{{getData(item,row)}}</span>
              </div>
            </div>
          </div>
          <div class="text-c">
            <el-button v-if="showDetailButton(item)"
                       class="mb-20"
                       type="primary"
                       @click="toDetail(item)">查看</el-button>
            <el-button v-else
                       class="mt-30"
                       type="primary"
                       @click="onUpload(item)">上传信息</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';
import { _Shopid } from '../config';

interface Ads {
  id: string;
  /** 0:广告 1:活动 */
  type: string;
  banner_title: string;
  title: string;
  totalprice: string;
  startime: string;
  endtime: string;
  image: string;
  bannerid: string;
}

type Row = {
  label: string;
  prop: keyof Ads;
  type?: string;
  handle?(data: Ads): string;
};

@Component
export default class Advertisement extends Vue {
  list: Row[] = [
    { label: '推广名称：', prop: 'banner_title' },
    { label: '推广种类：', prop: 'title' },
    { label: '价格：', prop: 'totalprice' },
    {
      label: '有效期：',
      prop: 'startime',
      handle: (data) => `${data.startime} — ${data.endtime}`,
    },
    { label: 'banner图片：', prop: 'image', type: 'image' },
    { label: '商品ID：', prop: 'bannerid' },
  ];

  data: Ads[] = [];

  isShow(row: Ads, col: Row) {
    const banner = row.type == '0' && col.prop != 'bannerid';
    const activity = row.type == '1' && col.prop != 'image';
    return banner || activity;
  }

  isNoData(row: Ads, col: Row) {
    return (col.prop === 'image' || col.prop === 'bannerid') && !row[col.prop];
  }

  getData(row: Ads, col: Row) {
    return col.handle ? col.handle(row) : row[col.prop];
  }

  showDetailButton(row: Ads) {
    const banner = row.type == '0' && row.image;
    const activity = row.type == '1' && row.bannerid;
    return banner || activity;
  }

  async getList() {
    const loading = this.$utils._Loading.show();
    const api = this.$api.merchant.ads.user;
    const res = await this.$http.get(api, { shopid: _Shopid, limit: 10e5 });
    this.data = res.data;
    console.log('res.data: ', res.data);
    loading.close();
  }

  mounted() {
    this.getList();
  }

  onUpload({ type, id }: Ads) {
    const path = type == '0' ? 'upload' : 'add-goods';
    this.$router.push({ path: 'upload', query: { id } });
  }

  toDetail({ type, id }: Ads) {
    console.log('type: ', type);

    const path = type == '0' ? 'upload' : 'today-detail';
    this.$router.push({ path, query: { id } });
  }
}
</script>
<style lang="scss" scoped>
  .ads-detail {
    &-item {
      min-height: 490px;
    }
    .banner {
      // display: flex;
      // justify-content: center;
      // flex-wrap: wrap;
      // align-items: center;
      &-item {
        width: 100%;
        display: flex;
      }
      &-image {
        width: 200px;
        height: 200px;
      }
    }
    .label {
      width: 150px;
      text-align: right;
      padding-right: 5px;
    }
    .content {
      width: 50%;
      padding-left: 5px;
    }
  }
</style>
