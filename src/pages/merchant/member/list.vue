<template>
  <sc-min-table v-if="isInit"
                stripe
                ref="table"
                :columns="columns"
                :search-config="searchConfig"
                :table-config="tableConfig">
  </sc-min-table>
</template>
<script lang='ts'>
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { _Uid } from '../config';

@Component
export default class MemberDetail extends Vue {
  @Ref('table') $table!: ScTable;

  isInit = false;

  memberType: 'agent' | 'member' = 'member';

  get isAgent() {
    return this.memberType === 'agent';
  }

  @Watch('route')
  onRouteChange() {
    this.isInit = false;
    this.init();
  }

  init() {
    this.memberType = this.$route.path.includes('agent') ? 'agent' : 'member';
    this.columns = this.setColumns();
    this.$nextTick(() => {
      this.isInit = true;
    });
  }

  setColumns(): ScTable.Columns {
    return [
      { label: '会员头像', prop: 'avatarurl', width: 100, special: 'img' },
      { label: '名称', prop: 'nickname' },
      { label: '会员类型', prop: 'member_name' },
      {
        label: '会员费用',
        prop: 'agent_money',
        isHide: !this.isAgent,
        formater: (row, col) => (row[col.prop] ? `￥${row[col.prop]}` : ''),
      },
      { label: '创建时间', prop: 'createtime' },
      {
        label: '佣金比例',
        prop: 'divide_comparisons',
        isHide: this.isAgent,
        formater: (row, col) => `${row[col.prop]}%`,
      },
      {
        label: this.isAgent ? '获得返利' : '获得佣金',
        prop: 'money',
        formater: (row, col) => {
          const value = row[col.prop];
          return [
            { class: this.isAgent ? '' : 'font-primary' },
            this.isAgent ? `+￥${row[col.prop]}` : `+${value}`,
          ];
        },
      },
    ];
  }

  columns: ScTable.Columns = [];

  get tableConfig(): ScTable.TableConfig {
    return {
      api: this.$api.merchant.member[this.memberType].list,
      index: { uid: _Uid },
    };
  }

  searchConfig: ScTable.Search = {
    data: [
      {
        label: '下线名称：',
        prop: 'name',
        tag: { attr: { placeholder: '请输入会员名称' } },
      },
      {
        label: '会员类型：',
        prop: 'type',
        tag: {
          tagType: 'select',
          options: [
            { label: '黄金会员', value: 1 },
            { label: '铂金会员', value: 2 },
            { label: '钻石会员', value: 3 },
          ],
          attr: { placeholder: '请选择会员类型' },
        },
      },
      {
        label: '选择时间：',
        prop: 'createtime',
        tag: {
          tagType: 'date-picker',
          attr: { type: 'datetime', placeholder: '请选择开始时间' },
        },
      },
    ],
  };

  created() {
    this.init();
  }
}
</script>
