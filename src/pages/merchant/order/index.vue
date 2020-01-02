<template>
  <div class="Order">
    <el-radio-group v-model="currentTab"
                    size="medium"
                    @change="onTabChange">
      <el-radio-button v-for="(item,i) in tabs"
                       :key="i"
                       :label="item.value">{{item.label}}</el-radio-button>
    </el-radio-group>
    <o-table ref="table"
             :thead="thead"
             :table-config="tableConfig"
             :search-config="searchConfig"
             :paginationConfig="paginationConfig"
             @pagination-onSlotClick="handleSendAll"
             @select-all="onSelectAll"
             @emitGetTableDataComplete="getTableData"
             class="mt-20">
      <template slot-scope="{ row }">
        <o-table-row>
          <div slot="top_th">
            <span>订单编号：{{row.ordernumber}}</span>
            <!-- <span class="ml-30">订单类型：{{row.ordertype}}</span> -->
            <span class="ml-30">创建时间：{{row.ordertime}}</span>
          </div>
          <div v-for="item in row.ordergoods"
               :key="item.id"
               class="flex-jc-ac text-c">
            <!-- <el-checkbox-group v-show="currentTab===2"
                               v-model="selection"
                               :style="getWidth(width[0])">
              <el-checkbox :label="item.id">{{''}}</el-checkbox>
            </el-checkbox-group> -->
            <div class="flex-ac flex-1">
              <img :width="40"
                   :height="40"
                   :src="item.image"
                   style="object-fit: cover"
                   class="ml-20 mr-10 border-radius-100">
              <strong>{{item.title}}</strong>
            </div>
            <div>{{item.price}}</div>
            <div>{{item.num}}</div>
            <div>
              <div>{{item.username}}</div>
              <div>{{item.phone}}</div>
            </div>
            <div>
              <div v-if="currentTab===2||currentTab===3">
                <div class="font-danger">&yen; {{item.shop_goods_pay_price}}</div>
                <div class="font-info"
                     v-if="item.freight">含运费：{{item.freight}}}</div>
              </div>
              <span v-else
                    :class="item.status==1?'font-danger':'font-primary'">
                {{getStatus(item.status)}}
              </span>
            </div>
            <div class="flex-column flex-jc-ac">
              <el-button type="text"
                         @click="toDetail(row.oid,item.status)">详情</el-button>
              <el-button v-show="item.status==2"
                         type="primary"
                         size="mini"
                         @click="toDetail(row.oid,item.status)">发货</el-button>
            </div>
          </div>
        </o-table-row>
      </template>
    </o-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Ref, Mixins } from 'vue-property-decorator';
import { _Uid, _Shopid } from '../config';
import Mixin from './mixin';
import { ScTable } from '@/lib/@types/sc-table.d';
import { obj } from '@/lib/@types/sc-param.d';

const lodashArray = require('lodash/array');

@Component
export default class Order extends Mixins(Mixin) {
  @Ref('table') $table!: ScTable;

  tabs = [
    { label: '全部订单', value: 0 },
    { label: '待付款', value: 1 },
    { label: '待发货', value: 2 },
    { label: '待收货', value: 3 },
  ];

  currentTab = 0;

  get thead() {
    const price = [2, 3];
    const selectAll = this.currentTab === 2 ? [{ label: '', type: 'checked', width: 10 }] : [];
    return [
      ...selectAll,
      { label: '商品信息' },
      { label: '单价' },
      { label: '数量' },
      { label: '买家信息' },
      { label: price.includes(this.currentTab) ? '实收款' : '状态' },
      { label: '操作' },
    ];
  }

  get tableConfig(): ScTable.TableConfig {
    return {
      api: this.$api.merchant.order,
      index: { uid: _Uid, shopid: _Shopid, status: this.currentTab },
    };
  }

  searchConfig: ScTable.Search = {
    param: { uid: _Uid },
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
        label: '用户名：',
        prop: 'username',
        tag: { attr: { placeholder: '请输入用户名' } },
      },
      {
        label: '手机号：',
        prop: 'phone',
        tag: { attr: { placeholder: '请输入手机号' } },
      },
      // {
      //   label: '商品名称：',
      //   prop: 'title',
      //   tag: { attr: { placeholder: '请输入商品名称' } },
      // },
      {
        label: '创建时间',
        prop: 'createtime',
        tag: {
          tagType: 'date-picker',
          attr: {
            type: 'datetimerange',
            'start-placeholder': '开始时间',
            'end-placeholder': '结束时间',
          },
        },
      },
    ],
  };

  get paginationConfig() {
    const send = {
      // slotAttr: { isCheckbox: true, text: ' 批量发货' },
    };
    return this.currentTab === 2 ? send : {};
  }

  onTabChange() {
    this.$table.setDataTable({ pagination: { page: 1 } });
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

  toDetail(id: string, status: string) {
    const type: obj = {
      1: 'pay',
      2: 'send',
      3: 'receive',
      4: 'comment',
      5: 'finish',
    };
    this.$router.push({ path: `${type[status] || 'invalid'}-detail`, query: { id } });
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
