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
            <span>订单编号：{{row.id}}</span>
            <span>创建时间：{{row.createtime}}</span>
            <span>订单类型：{{row.parameter}}</span>
            <span>支付方式：{{row.type}}</span>
          </div>
          <div v-for="item in 1"
               :key="item"
               class="flex-jc-ac text-c pt-10 pb-10">
            <div class="flex-ac"
                 :style="{width:width[0]?width[0]+'px':'auto',flex:width[0]?'none':1}">
              <img :width="80"
                   :height="80"
                   :src="row.image"
                   :alt="row.title"
                   style="object-fit: cover"
                   class="mr-10">
              <strong class="ellipsis goods-name">{{row.title}}</strong>
            </div>
            <div>{{row.num}}</div>
            <div>{{row.createtime}}</div>
            <div class="flex-jc-ac">
              <el-button type="text"
                         class="font-black"
                         @click="toDetail">详情</el-button>
              <el-button type="text"
                         @click="toDetail">回复</el-button>
            </div>
          </div>
        </o-table-row>
      </template>
    </o-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { obj } from '@/lib/@types/sc-param.d';

@Component
export default class OrderEvaluate extends Vue {
  currentTab = 'all';

  thead = [
    { label: '商品信息', width: 300 },
    { label: '星级' },
    { label: '内容呢' },
    { label: '创建时间' },
    { label: '操作' },
  ];

  tableConfig: ScTable.TableConfig = {
    api: this.$api.merchant.product,
  };

  searchConfig = {
    param: {},
    data: [
      {
        label: '订单编号：',
        prop: 'id',
        tag: { attr: { placeholder: '请输入订单号' } },
      },
      {
        label: '下单时间',
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
      {
        label: '订单类型：',
        prop: 'type',
        tag: {
          tagType: 'select',
          options: [],
          attr: { placeholder: '请选择订单类型' },
        },
      },
    ],
  };

  toDetail() {
    //
  }

  toProgress() {
    //
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
