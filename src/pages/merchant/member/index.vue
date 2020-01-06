<template>
  <div class="member">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="member-info bg-white border-radius-8 p-15">
          <div class="font-22">{{info.member_name}}</div>
          <div class="mt-20 flex-jsb">
            <span class="font-20">本月收益：&yen;{{info.month_money}}</span>
            <el-button class="font-primary"
                       type="text"
                       @click="showDetail">查看明细</el-button>
          </div>
          <div class="mt-10 pt-5 border-top">
            <template v-if="isAgent">
              <div v-for="(item,i) in info.quota"
                   :key="i"
                   class="mt-10">
                <span class="mr-30">剩余{{item.name}}：</span>
                <span><b class="font-primary">{{item.surplus_quota}}</b>/{{item.total_quota}}</span>
              </div>
            </template>
            <template v-if="!isAgent">
              <div class="mt-10">
                <span class="mr-30">剩余下线名额：</span>
                <span><b class="font-primary">{{info.surplus_quota}}</b>/{{info.total_quota}}</span>
              </div>
              <div class="mt-10">
                <span class="font-info mr-30">我的上级代理：</span>
                <span>{{info.superior_agent_name}} — {{info.superior_agent_user_name}}</span>
              </div>
            </template>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="bg-white border-radius-8 p-15">
          <el-radio-group v-model="moneyType"
                          size="mini"
                          @change="onMoneyTypeChange">
            <el-radio-button v-for="(item,i) in moneyOptions"
                             :key="i"
                             :label="item.value">{{item.label}}</el-radio-button>
          </el-radio-group>
          <ve-histogram height="200px"
                        :extend="histogram.extend"
                        :legend-visible="false"
                        :data="histogram.chartData"></ve-histogram>
        </div>
      </el-col>
    </el-row>

    <sc-min-table stripe
                  ref="table"
                  class="mt-30"
                  :columns="columns"
                  :columns-props="{align:'center'}"
                  :table-config="tableConfig">
    </sc-min-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { _Uid } from '../config';
import { obj } from '../../../lib/@types/sc-param';

type MoneyKey = 'day' | 'week' | 'month';

type MoneyData = {
  [k in MoneyKey]: { money: number; time: string }[];
};

@Component
export default class Vip extends Vue {
  @Ref('table') $table!: ScTable;

  userInfo = this.$utils._Storage.get('user_info');

  memberType: 'agent' | 'member' = 'member';

  get isAgent() {
    return this.memberType === 'agent';
  }

  info = {};

  histogram: obj = {
    extend: {
      grid: {
        left: '20',
        right: '20',
        top: '15%',
        bottom: '0',
        containLabel: true,
      },
      yAxis: { show: true },
    },
    settings: {
      labelMap: { time: '日期', money: '成交额' },
    },
    chartData: {
      columns: ['time', 'money'],
      rows: [],
    },
  };

  moneyOptions = [
    { label: '日成交额', value: 'day' },
    { label: '周成交额', value: 'week' },
    { label: '月成交额', value: 'month' },
  ];

  moneyType: keyof MoneyData = 'day';

  moneyData: MoneyData = { day: [], week: [], month: [] };

  @Watch('moneyData', { deep: true })
  onMoneyDataChange(data: obj) {
    this.histogram.chartData.rows = data[this.moneyType];
  }

  onMoneyTypeChange(type: MoneyKey) {
    this.histogram.chartData.rows = this.moneyData[type];
  }

  get columns(): ScTable.Columns {
    return [
      { label: '会员头像', prop: 'avatarurl', width: 100, special: 'img' },
      { label: '名称', prop: 'nickname' },
      { label: '会员类型', prop: 'member_name' },
      {
        label: '会员金额',
        prop: 'member_money',
        formater: (row, col) => (row[col.prop] ? `￥${row[col.prop]}` : ''),
      },
      {
        label: '佣金比例',
        prop: 'divide_comparisons',
        isHide: this.isAgent,
        formater: (row, col) => `${row[col.prop]}%`,
      },
      { label: '创建时间', prop: 'createtime' },
    ];
  }

  tableConfig: ScTable.TableConfig = {
    api: this.$api.merchant.member,
    index: { uid: _Uid },
    disableDefaultRequest: true,
  };

  async getStatistics() {
    const api = this.$api.merchant.member[this.memberType].statistics;
    const loading = this.$utils._Loading.show();
    const res = await this.$http.get(api, { uid: _Uid });
    const data = res.data || { user_info: {}, MembershipData: { day: [], week: [], month: [] } };
    loading.close();
    this.info = data.user_info;
    this.moneyData = data.MembershipData;
  }

  showDetail() {
    this.$router.push(`${this.memberType}-detail`);
  }

  created() {
    this.memberType = this.$route.path.includes('agent') ? 'agent' : 'member';
    this.$table.setDataTable({});
    this.getStatistics();
  }
}
</script>
<style lang="scss" scoped>
  .member {
    &-info {
      height: 258px;
    }
  }
</style>
