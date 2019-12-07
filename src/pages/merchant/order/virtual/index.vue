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
             :paginationConfig="paginationConfig"
             @pagination-onSlotClick="handleSendAll"
             @select-all="onSelectAll"
             @emitGetTableDataComplete="getTableData"
             class="mt-20">
      <template slot-scope="{ row, width }">
        <o-table-row>
          <div slot="top_th">
            <span>订单编号：{{row.ordernumber}}</span>
            <span class="ml-30">订单类型：{{row.ordertype}}</span>
            <span class="ml-30">创建时间：{{row.ordertime}}</span>
          </div>
          <div v-for="item in 1"
               :key="item"
               class="flex-jc-ac text-c">
            <el-checkbox-group v-show="currentTab===2"
                               v-model="selection"
                               :style="getWidth(width[0])">
              <el-checkbox :label="row.id">{{''}}</el-checkbox>
            </el-checkbox-group>
            <div class="flex-ac flex-1">
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
              <div>{{row.username}}</div>
              <div>{{row.phone}}</div>
            </div>
            <div class="font-danger">{{getStatus(row.status)}}</div>
            <div class="flex-column flex-jc-ac">
              <el-button type="text"
                         @click="toDetail(row.oid)">详情</el-button>
            </div>
          </div>
        </o-table-row>
      </template>
    </o-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import Mixin from '../mixin';
import { ScTable } from '@/lib/@types/sc-table.d';
import { obj } from '@/lib/@types/sc-param.d';

const lodashArray = require('lodash/array');

@Component
export default class Order extends Mixins(Mixin) {
  userInfo = this.$utils._Storage.get('user_info');

  tabs = [
    { label: '全部订单', value: 0 },
    { label: '待付款', value: 1 },
    { label: '待评价', value: 4 },
    { label: '已完成', value: 5 },
  ];

  currentTab = 0;

  thead = [
    { label: '商品信息' },
    { label: '单价' },
    { label: '数量' },
    { label: '买家信息' },
    { label: '状态' },
    { label: '操作' },
  ];

  get tableConfig(): ScTable.TableConfig {
    return {
      api: this.$api.merchant.order,
      index: { uid: (this.userInfo && this.userInfo.uid) || 1 },
    };
  }

  searchConfig: ScTable.Search = {
    param: { uid: '' },
    handleSubmit: (data: any) => {
      if (data.createtime) {
        const [start, end] = data.createtime.split(',');
        data.strtime = start;
        data.endtime = end;
        delete data.createtime;
      }
      console.log('data: ', data);
      return data;
    },
    data: [
      {
        label: '订单编号：',
        prop: 'ordernumber',
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
        prop: 'title',
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
    ],
  };

  get paginationConfig() {
    const send = {
      slotAttr: { isCheckbox: true, text: ' 批量发货' },
    };
    return this.currentTab === 2 ? send : {};
  }

  handleSendAll() {
    console.log('this.selection: ', this.selection);
  }

  selection: any[] = [];

  onSelectAll(status: string) {
    if (status) {
      this.selection = this.tableData.map((t) => t.id);
    }
  }

  tableData: obj[] = [];

  getTableData({ response }: obj) {
    this.tableData = response.data;
  }

  toDetail(id: string) {
    this.$router.push({ path: 'detail', query: { id } });
  }

  toProgress(id: string) {
    this.$router.push({ path: 'detail', query: { id } });
  }

  handleDelivery(id: string | string[]) {
    const api = this.$api.merchant.order.delivery;
    const param = { oid: id, name: '', number: '', text: '' };
    this.$http
      .get(api, param)
      .then((res) => {
        console.log('res: ', res);
      })
      .catch((err) => {
        this.$utils._ResponseError(err);
      });
  }
}
</script>
