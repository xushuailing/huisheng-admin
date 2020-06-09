<template>
  <div class="order-evaluate">
    <o-table :thead="thead"
             :table-config="tableConfig"
             :search-config="searchConfig"
             class="mt-20">
      <template slot-scope="{ row, width }">
        <o-table-row>
          <div slot="top_th"
               class="flex-jsb">
            <span>订单编号：{{row.ordernumber}}</span>
            <span>提交时间：{{row.createtime}}</span>
          </div>
          <div class="flex-jc-ac text-c pt-10 pb-10">
            <div class="flex-ac"
                 :style="getWidth(width[0])">
              <img :width="80"
                   :height="80"
                   :src="row.image"
                   style="object-fit: cover"
                   class="mr-10">
              <strong class="ellipsis goods-name">{{row.title}}</strong>
            </div>
            <!-- <div>{{row.star}}</div>
            <div>{{row.content}}</div> -->
            <div>{{row.createtime}}</div>
            <div class="flex-jc-ac">
              <el-button type="text"
                         @click="handleReply(row.gid)">回复</el-button>
            </div>
          </div>
        </o-table-row>
      </template>
    </o-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { obj } from '@/lib/@types/sc-param.d';
import Mixin from './mixin';
import { _Shopid } from '../config';

@Component
export default class OrderEvaluate extends Mixins(Mixin) {
  currentTab = 'all';

  thead = [
    { label: '商品信息', width: 300 },
    // { label: '星级' },
    // { label: '内容呢' },
    { label: '创建时间' },
    { label: '操作' },
  ];

  tableConfig: ScTable.TableConfig = {
    api: this.$api.merchant.order.comment,
    index: { shopid: _Shopid },
  };

  searchConfig = {
    handleSubmit: (data: any) => {
      if (data && data.createtime) {
        const [start, end] = data.createtime.split(',');
        data.strtime = start;
        data.endtime = end;
        delete data.createtime;
      }
      return data;
    },
    data: [
      {
        label: '订单编号：',
        prop: 'ordernumber',
        tag: { attr: { placeholder: '请输入订单号' } },
      },
      {
        label: '下单时间：',
        prop: 'createtime',
        tag: {
          tagType: 'date-picker',
          attr: {
            type: 'daterange',
            'start-placeholder': '开始时间',
            'end-placeholder': '结束时间',
          },
        },
      },
      // {
      //   label: '订单类型：',
      //   prop: 'type',
      //   tag: {
      //     tagType: 'select',
      //     options: [],
      //     attr: { placeholder: '请选择订单类型' },
      //   },
      // },
    ],
  };

  handleReply(id: string) {
    this.$router.push({ path: 'comment-user', query: { id } });
  }
}
</script>
<style lang="scss" scoped>
  .order-evaluate {
    .goods-name {
      max-width: 110px;
    }
  }
</style>
