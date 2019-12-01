<template>
  <div class="Order">
    <el-radio-group v-model="currentTab"
                    size="medium">
      <el-radio-button v-for="(item,i) in tabs"
                       :key="i"
                       :label="item.value">{{item.label}}</el-radio-button>
    </el-radio-group>

    <o-table :thead="thead"
             :table-config="tableConfig"
             :search-config="searchConfig"
             class="mt-20">
      <template slot-scope="{ row }">
        <o-table-row>
          <div slot="top_th">
            <span>订单编号：{{row.id}}</span>
            <span class="ml-30">订单类型：{{row.parameter}}</span>
            <span class="ml-30">创建时间：{{row.createtime}}</span>
          </div>
          <div v-for="item in 1"
               :key="item"
               class="flex-jc-ac text-c">
            <div class="flex-ac flex-1">
              <el-checkbox v-show="currentTab==='send'"
                           :true-label="row.id"
                           @change="handleCheck"></el-checkbox>
              <img :width="40"
                   :height="40"
                   :src="row.image"
                   :alt="row.title"
                   style="object-fit: cover"
                   class="ml-20 mr-10 border-radius-100">
              <strong>{{row.title}}</strong>
            </div>
            <div>{{row.price}}</div>
            <div>{{row.num}}</div>
            <div>
              <div>{{row.parameter}}</div>
              <div>{{row.createtime}}</div>
            </div>
            <div class="font-danger"
                 v-if="currentTab==='send'||currentTab==='receive'">&yen; {{row.price}}</div>
            <div v-else
                 :class="currentTab==='pay'?'font-danger':'font-primary'">{{row.status}}</div>
            <div class="flex-column flex-jc-ac">
              <el-button type="text"
                         @click="toDetail">详情</el-button>
              <el-button type="primary"
                         size="small"
                         @click="toProgress">查看进度</el-button>
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

const lodashArray = require('lodash/array');

@Component
export default class Order extends Vue {
  tabs = [
    { label: '全部订单', value: 'all' },
    { label: '待付款', value: 'pay' },
    { label: '待发货', value: 'send' },
    { label: '待收货', value: 'receive' },
  ];

  currentTab = 'all';

  get thead() {
    const price = ['send', 'receive'];
    return [
      { label: '商品信息' },
      { label: '单价' },
      { label: '数量' },
      { label: '买家信息' },
      { label: price.includes(this.currentTab) ? '实收款' : '状态' },
      { label: '操作' },
    ];
  }

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
        label: '用户名：',
        prop: 'username',
        tag: { attr: { placeholder: '请输入用户名' } },
      },
      {
        label: '手机号：',
        prop: 'phone',
        tag: { attr: { placeholder: '请输入手机号' } },
      },
      {
        label: '商品名称：',
        prop: 'name',
        tag: { attr: { placeholder: '请输入商品名称' } },
      },
      {
        label: '创建时间',
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

  selections: any[] = [];

  handleCheck(value: string | boolean) {
    if (typeof value !== 'boolean') {
      this.selections.push(value);
    } else {
      lodashArray.pull(this.selections, value);
    }
    console.log('value: ', value, this.selections);
  }

  toDetail() {
    //
  }

  toProgress() {
    //
  }
}
</script>
