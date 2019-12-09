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
            <span>订单编号：{{row.ordernumber}}</span>
            <span>创建时间：{{row.createtime}}</span>
            <!-- <span>订单类型：{{row.type}}</span> -->
          </div>
          <div v-for="item in row.goods"
               :key="item"
               class="flex-jc-ac text-c pt-10 pb-10">
            <div class="flex-ac"
                 :style="getWidth(width[0])">
              <img :width="80"
                   :height="80"
                   :src="item.image"
                   style="object-fit: cover"
                   class="mr-10">
              <strong class="ellipsis goods-name">{{item.title}}</strong>
            </div>
            <div>{{item.price}}</div>
            <div>{{item.num}}</div>
            <div>
              <div>{{item.username}}</div>
              <div>{{item.phone}}</div>
            </div>
            <div class="font-primary">{{getStatus(item.status)}}
            </div>
            <div>{{row.pay_type}}</div>
            <div>{{row.createtime}}</div>
            <div class="flex-jc-ac">
              <el-button type="text"
                         class="font-black"
                         @click="toDetail(item.oid)">详情</el-button>
              <el-button type="text"
                         @click="handleRefund(item.oid)">退款</el-button>
              <el-button type="text"
                         class="font-danger"
                         @click="handleReject(item.oid)">驳回</el-button>
            </div>
          </div>
          <div slot="footer_th">
            <strong class="font-danger">申请退款理由：</strong>
            <span class="ml-5">{{row.refund_reason}}</span>
          </div>
        </o-table-row>
      </template>
    </o-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Ref, Mixins } from 'vue-property-decorator';
import Mixin from './mixin';
import { ScTable } from '@/lib/@types/sc-table.d';
import { obj } from '@/lib/@types/sc-param.d';
import { _Uid } from '../config';

@Component
export default class OrderReturn extends Mixins(Mixin) {
  @Ref('table') $table!: ScTable;

  thead = [
    { label: '商品信息', width: 300 },
    { label: '退款金额' },
    { label: '数量' },
    { label: '买家信息' },
    { label: '状态' },
    { label: '支付方式' },
    { label: '申请时间' },
    { label: '操作' },
  ];

  tableConfig: ScTable.TableConfig = {
    api: this.$api.merchant.order.return,
    index: { uid: _Uid },
  };

  searchConfig = {
    handleSubmit: (data: any) => {
      if (data.createtime) {
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

  toDetail(id: string) {
    this.$router.push({ path: 'detail', query: { id } });
  }

  handleRefund(id: string) {
    this.$router.push({ path: 'return-detail', query: { id } });
  }

  handleReject(id: string) {
    const loading = this.$utils._Loading.show({ text: '正在驳回...' });
    const api = this.$api.merchant.order.return.reject;
    this.$http
      .get(api, { id })
      .then((res) => {
        if (res.status) {
          this.$table.setDataTable({});
        } else {
          console.error('驳回失败: ', res.data.message);
        }
      })
      .finally(() => {
        loading.close();
      });
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
