<template>
  <div class="order-return">
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
            <div>{{row.price}}</div>
            <div>{{row.num}}</div>
            <div>
              <div>{{row.parameter}}</div>
              <div>{{row.createtime}}</div>
            </div>
            <div :class="currentTab==='pay'?'font-danger':'font-primary'">{{row.status}}</div>
            <div>{{row.price}}</div>
            <div>{{row.createtime}}</div>
            <div class="flex-jc-ac">
              <el-button type="text"
                         class="font-black"
                         @click="toDetail">详情</el-button>
              <el-button type="text"
                         @click="handleRefund">退款</el-button>
              <el-button type="text"
                         class="font-danger"
                         @click="handleReject">驳回</el-button>
            </div>
          </div>
          <div slot="footer_th">
            <strong class="font-danger">申请退款理由：</strong>
            <span class="ml-5">尺码错误</span>
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

const lodashArray = require('lodash/array');

@Component
export default class OrderReturn extends Vue {
  currentTab = 'all';

  thead = [
    { label: '商品信息', width: 300 },
    { label: '单价' },
    { label: '数量' },
    { label: '买家信息' },
    { label: '状态' },
    { label: '支付方式' },
    { label: '申请时间' },
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

  handleRefund() {
    //
  }

  handleReject() {
    //
  }
}
</script>

<style lang="scss" scoped>
  .order-return {
    .goods-name {
      max-width: 110px;
    }
  }
</style>
